package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/oronno/websocket-gateway-service/internal/audio"
	"github.com/oronno/websocket-gateway-service/internal/config"
	"github.com/oronno/websocket-gateway-service/internal/handler"
	"github.com/oronno/websocket-gateway-service/internal/pool"
	"go.uber.org/zap"
)

func main() {
	// Initialize logger
	logger, err := zap.NewProduction()
	if err != nil {
		panic(fmt.Sprintf("failed to initialize logger: %v", err))
	}
	defer logger.Sync()

	logger.Info("Starting WebSocket Gateway Service")

	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		logger.Fatal("Failed to load configuration", zap.Error(err))
	}

	// Validate configuration
	if cfg.GeminiAPIKey == "" {
		logger.Fatal("GEMINI_API_KEY is required")
	}

	// Initialize audio processor
	audioProcessor := audio.NewAudioProcessor(logger)

	// Initialize connection pool
	createConn := func() (pool.Connection, error) {
		return pool.NewGeminiConnection(cfg.GeminiAPIKey, cfg.GeminiAPIEndpoint, logger), nil
	}
	connectionPool := pool.NewPool(cfg.ConnectionPoolSize, createConn, logger)

	// Initialize WebSocket handler
	wsHandler := handler.NewWebSocketHandler(connectionPool, audioProcessor, logger)

	// Setup HTTP routes
	mux := http.NewServeMux()
	mux.HandleFunc("/ws", wsHandler.HandleConnection)
	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/stats", statsHandler(connectionPool, logger))

	// Create HTTP server
	server := &http.Server{
		Addr:         ":" + cfg.ServerPort,
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		logger.Info("WebSocket Gateway Service started",
			zap.String("port", cfg.ServerPort),
		)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Failed to start server", zap.Error(err))
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down WebSocket Gateway Service")

	// Graceful shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		logger.Error("Server forced to shutdown", zap.Error(err))
	}

	// Close connection pool
	if err := connectionPool.Close(); err != nil {
		logger.Error("Error closing connection pool", zap.Error(err))
	}

	logger.Info("WebSocket Gateway Service stopped")
}

// healthHandler handles health check requests
func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, `{"status":"healthy","service":"websocket-gateway-service"}`)
}

// statsHandler handles statistics requests
func statsHandler(connectionPool *pool.Pool, logger *zap.Logger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		active, available := connectionPool.GetStats()
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"active_connections":%d,"available_connections":%d}`, active, available)
	}
}

