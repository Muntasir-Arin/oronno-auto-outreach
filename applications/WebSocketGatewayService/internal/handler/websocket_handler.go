package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/oronno/websocket-gateway-service/internal/audio"
	"github.com/oronno/websocket-gateway-service/internal/pool"
	"go.uber.org/zap"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// TODO: Implement proper origin checking for production
		return true
	},
	ReadBufferSize:  8192,
	WriteBufferSize: 8192,
}

// WebSocketHandler handles WebSocket connections for voice streaming
type WebSocketHandler struct {
	connectionPool *pool.Pool
	audioProcessor *audio.AudioProcessor
	logger         *zap.Logger
}

// NewWebSocketHandler creates a new WebSocket handler
func NewWebSocketHandler(connectionPool *pool.Pool, audioProcessor *audio.AudioProcessor, logger *zap.Logger) *WebSocketHandler {
	return &WebSocketHandler{
		connectionPool: connectionPool,
		audioProcessor: audioProcessor,
		logger:         logger,
	}
}

// HandleConnection handles a new WebSocket connection
func (h *WebSocketHandler) HandleConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		h.logger.Error("Failed to upgrade connection", zap.Error(err))
		return
	}
	defer conn.Close()

	sessionID := uuid.New().String()
	h.logger.Info("New WebSocket connection",
		zap.String("session_id", sessionID),
		zap.String("remote_addr", r.RemoteAddr),
	)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Handle the connection
	h.handleSession(ctx, conn, sessionID)
}

// handleSession handles a WebSocket session
func (h *WebSocketHandler) handleSession(ctx context.Context, conn *websocket.Conn, sessionID string) {
	// Set read and write deadlines
	conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	conn.SetPongHandler(func(string) error {
		conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	// Start ping ticker
	pingTicker := time.NewTicker(54 * time.Second)
	defer pingTicker.Stop()

	// Channel for incoming audio
	audioChan := make(chan []byte, 10)
	errorChan := make(chan error, 1)

	// Start reading audio from WebSocket
	go h.readAudio(ctx, conn, audioChan, errorChan)

	// Start processing audio
	go h.processAudio(ctx, sessionID, audioChan, conn)

	// Handle connection lifecycle
	for {
		select {
		case <-ctx.Done():
			h.logger.Info("Session context cancelled",
				zap.String("session_id", sessionID),
			)
			return
		case err := <-errorChan:
			if err != nil {
				h.logger.Error("Error in session",
					zap.String("session_id", sessionID),
					zap.Error(err),
				)
				return
			}
		case <-pingTicker.C:
			if err := conn.WriteControl(websocket.PingMessage, []byte{}, time.Now().Add(10*time.Second)); err != nil {
				h.logger.Error("Failed to send ping",
					zap.String("session_id", sessionID),
					zap.Error(err),
				)
				return
			}
		}
	}
}

// readAudio reads audio data from WebSocket
func (h *WebSocketHandler) readAudio(ctx context.Context, conn *websocket.Conn, audioChan chan<- []byte, errorChan chan<- error) {
	for {
		select {
		case <-ctx.Done():
			return
		default:
			messageType, data, err := conn.ReadMessage()
			if err != nil {
				if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
					errorChan <- fmt.Errorf("websocket error: %w", err)
				}
				return
			}

			if messageType == websocket.BinaryMessage {
				// Process audio data
				processedAudio, err := h.audioProcessor.ProcessAudioPacket(data)
				if err != nil {
					h.logger.Error("Failed to process audio packet", zap.Error(err))
					continue
				}
				
				select {
				case audioChan <- processedAudio:
				case <-ctx.Done():
					return
				}
			} else if messageType == websocket.TextMessage {
				// Handle text messages (e.g., control messages)
				var msg map[string]interface{}
				if err := json.Unmarshal(data, &msg); err == nil {
					h.logger.Debug("Received text message",
						zap.Any("message", msg),
					)
				}
			}
		}
	}
}

// processAudio processes audio and sends to Gemini Live API
func (h *WebSocketHandler) processAudio(ctx context.Context, sessionID string, audioChan <-chan []byte, conn *websocket.Conn) {
	for {
		select {
		case <-ctx.Done():
			return
		case audioData := <-audioChan:
			// Get connection from pool
			geminiConn, err := h.connectionPool.GetConnection(ctx)
			if err != nil {
				h.logger.Error("Failed to get connection from pool",
					zap.String("session_id", sessionID),
					zap.Error(err),
				)
				continue
			}

			// Send audio to Gemini Live API
			if err := geminiConn.SendAudio(ctx, audioData); err != nil {
				h.logger.Error("Failed to send audio to Gemini",
					zap.String("session_id", sessionID),
					zap.Error(err),
				)
				h.connectionPool.ReturnConnection(geminiConn)
				continue
			}

			// Receive response from Gemini
			responseAudio, err := geminiConn.ReceiveAudio(ctx)
			if err != nil {
				h.logger.Error("Failed to receive audio from Gemini",
					zap.String("session_id", sessionID),
					zap.Error(err),
				)
				h.connectionPool.ReturnConnection(geminiConn)
				continue
			}

			// Return connection to pool
			h.connectionPool.ReturnConnection(geminiConn)

			// Process response audio
			processedResponse, err := h.audioProcessor.ProcessAudioPacket(responseAudio)
			if err != nil {
				h.logger.Error("Failed to process response audio", zap.Error(err))
				continue
			}

			// Send response back to WebSocket client
			if err := conn.WriteMessage(websocket.BinaryMessage, processedResponse); err != nil {
				h.logger.Error("Failed to send response to client",
					zap.String("session_id", sessionID),
					zap.Error(err),
				)
				return
			}

			h.logger.Debug("Processed audio packet",
				zap.String("session_id", sessionID),
				zap.Int("input_size", len(audioData)),
				zap.Int("output_size", len(processedResponse)),
			)
		}
	}
}

