# WebSocket Gateway Service

A high-performance Golang service for real-time voice streaming with low-latency audio packet handling and connection pooling for Gemini Live API.

## Features

- **Real-time WebSocket Communication**: Handles WebSocket connections for low-latency voice streaming
- **Connection Pooling**: Efficient connection pooling for Gemini Live API to minimize latency
- **Audio Processing**: Low-latency audio packet processing with format conversion (μ-law ↔ PCM)
- **Health Monitoring**: Health check and statistics endpoints
- **Graceful Shutdown**: Proper cleanup of connections and resources

## Architecture

```
WebSocket Client
    ↓
WebSocket Gateway Service
    ↓
Audio Processor (μ-law ↔ PCM conversion)
    ↓
Connection Pool
    ↓
Gemini Live API
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Key configuration options:
- `SERVER_PORT`: Port for the WebSocket server (default: 8080)
- `GEMINI_API_KEY`: Your Gemini API key
- `GEMINI_API_ENDPOINT`: Gemini Live API endpoint
- `CONNECTION_POOL_SIZE`: Number of connections in the pool
- `MAX_CONNECTIONS`: Maximum concurrent WebSocket connections
- `AUDIO_BUFFER_SIZE`: Audio buffer size in bytes

## Running the Service

### Prerequisites

- Go 1.21 or higher
- Gemini API key

### Build

```bash
go mod download
go build -o bin/server ./cmd/server
```

### Run

```bash
./bin/server
```

Or with environment variables:

```bash
GEMINI_API_KEY=your-key-here ./bin/server
```

## API Endpoints

### WebSocket Connection

```
ws://localhost:8080/ws
```

Connects to the WebSocket gateway for real-time voice streaming.

### Health Check

```
GET /health
```

Returns service health status.

### Statistics

```
GET /stats
```

Returns connection pool statistics:
```json
{
  "active_connections": 5,
  "available_connections": 5
}
```

## Audio Format

The service handles:
- **Input**: μ-law encoded audio (8kHz) from WebSocket clients
- **Processing**: Converts to PCM for Gemini Live API
- **Output**: PCM audio (24kHz) from Gemini, converted back to μ-law for clients

## Connection Pooling

The connection pool manages reusable connections to Gemini Live API:
- Reduces connection overhead
- Improves latency
- Handles connection health checks
- Automatic connection recovery

## Development

### Project Structure

```
.
├── cmd/
│   └── server/          # Main application entry point
├── internal/
│   ├── audio/          # Audio processing logic
│   ├── config/         # Configuration management
│   ├── handler/        # WebSocket handlers
│   └── pool/           # Connection pool implementation
├── configs/            # Configuration files
└── go.mod              # Go module definition
```

### Testing

```bash
go test ./...
```

## Production Considerations

1. **Security**: Implement proper origin checking in WebSocket upgrader
2. **Rate Limiting**: Add rate limiting for WebSocket connections
3. **Monitoring**: Add metrics and tracing (Prometheus, OpenTelemetry)
4. **Load Balancing**: Use load balancer for multiple instances
5. **TLS**: Enable TLS for WebSocket connections (wss://)
6. **Error Handling**: Enhance error handling and retry logic
7. **Streaming**: Implement proper streaming for Gemini Live API responses

## License

MIT

