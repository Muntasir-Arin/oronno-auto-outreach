package pool

import (
	"context"
	"fmt"
	"sync"
	"time"

	"go.uber.org/zap"
)

// Connection represents a connection to Gemini Live API
type Connection interface {
	SendAudio(ctx context.Context, audioData []byte) error
	ReceiveAudio(ctx context.Context) ([]byte, error)
	Close() error
	IsHealthy() bool
}

// Pool manages a pool of connections to Gemini Live API
type Pool struct {
	connections chan Connection
	maxSize     int
	createConn  func() (Connection, error)
	logger      *zap.Logger
	mu          sync.RWMutex
	activeCount int
}

// NewPool creates a new connection pool
func NewPool(maxSize int, createConn func() (Connection, error), logger *zap.Logger) *Pool {
	return &Pool{
		connections: make(chan Connection, maxSize),
		maxSize:     maxSize,
		createConn:  createConn,
		logger:      logger,
		activeCount: 0,
	}
}

// GetConnection gets a connection from the pool
func (p *Pool) GetConnection(ctx context.Context) (Connection, error) {
	select {
	case conn := <-p.connections:
		// Check if connection is healthy
		if !conn.IsHealthy() {
			p.logger.Warn("Connection unhealthy, creating new one")
			conn.Close()
			return p.createNewConnection(ctx)
		}
		p.mu.Lock()
		p.activeCount++
		p.mu.Unlock()
		return conn, nil
	case <-ctx.Done():
		return nil, ctx.Err()
	default:
		// No available connection, create new one if under max size
		p.mu.RLock()
		canCreate := p.activeCount < p.maxSize
		p.mu.RUnlock()
		
		if canCreate {
			return p.createNewConnection(ctx)
		}
		
		// Wait for a connection to become available
		select {
		case conn := <-p.connections:
			p.mu.Lock()
			p.activeCount++
			p.mu.Unlock()
			return conn, nil
		case <-ctx.Done():
			return nil, ctx.Err()
		case <-time.After(5 * time.Second):
			return nil, fmt.Errorf("timeout waiting for connection")
		}
	}
}

// ReturnConnection returns a connection to the pool
func (p *Pool) ReturnConnection(conn Connection) {
	if conn == nil {
		return
	}
	
	p.mu.Lock()
	p.activeCount--
	p.mu.Unlock()

	select {
	case p.connections <- conn:
		// Connection returned successfully
	default:
		// Pool is full, close the connection
		p.logger.Warn("Pool full, closing connection")
		conn.Close()
	}
}

// createNewConnection creates a new connection
func (p *Pool) createNewConnection(ctx context.Context) (Connection, error) {
	conn, err := p.createConn()
	if err != nil {
		return nil, fmt.Errorf("failed to create connection: %w", err)
	}
	
	p.mu.Lock()
	p.activeCount++
	p.mu.Unlock()
	
	p.logger.Info("Created new connection",
		zap.Int("active_count", p.activeCount),
		zap.Int("max_size", p.maxSize),
	)
	
	return conn, nil
}

// Close closes all connections in the pool
func (p *Pool) Close() error {
	p.mu.Lock()
	defer p.mu.Unlock()

	close(p.connections)
	
	for conn := range p.connections {
		if err := conn.Close(); err != nil {
			p.logger.Error("Error closing connection", zap.Error(err))
		}
	}
	
	p.activeCount = 0
	return nil
}

// GetStats returns pool statistics
func (p *Pool) GetStats() (active, available int) {
	p.mu.RLock()
	defer p.mu.RUnlock()
	
	active = p.activeCount
	available = len(p.connections)
	return
}

