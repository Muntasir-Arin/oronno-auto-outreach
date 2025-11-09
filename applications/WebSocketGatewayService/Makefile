.PHONY: build run test clean deps

# Build the application
build:
	@echo "Building WebSocket Gateway Service..."
	@mkdir -p bin
	@go build -o bin/server ./cmd/server
	@echo "Build complete: bin/server"

# Run the application
run: build
	@echo "Running WebSocket Gateway Service..."
	@./bin/server

# Run tests
test:
	@echo "Running tests..."
	@go test -v ./...

# Clean build artifacts
clean:
	@echo "Cleaning..."
	@rm -rf bin/
	@go clean
	@echo "Clean complete"

# Download dependencies
deps:
	@echo "Downloading dependencies..."
	@go mod download
	@go mod tidy
	@echo "Dependencies updated"

# Format code
fmt:
	@echo "Formatting code..."
	@go fmt ./...
	@echo "Format complete"

# Lint code
lint:
	@echo "Linting code..."
	@golangci-lint run ./...

# Install dependencies for development
install-deps:
	@go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

