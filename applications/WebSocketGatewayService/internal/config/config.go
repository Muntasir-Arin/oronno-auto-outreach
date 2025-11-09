package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

type Config struct {
	ServerPort         string
	GeminiAPIKey       string
	GeminiAPIEndpoint  string
	MaxConnections     int
	ConnectionPoolSize int
	AudioBufferSize    int
	LogLevel           string
}

func LoadConfig() (*Config, error) {
	// Load .env file if it exists
	_ = godotenv.Load()

	config := &Config{
		ServerPort:         getEnv("SERVER_PORT", "8080"),
		GeminiAPIKey:       getEnv("GEMINI_API_KEY", ""),
		GeminiAPIEndpoint:  getEnv("GEMINI_API_ENDPOINT", "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:streamGenerateContent"),
		MaxConnections:     getEnvAsInt("MAX_CONNECTIONS", 1000),
		ConnectionPoolSize: getEnvAsInt("CONNECTION_POOL_SIZE", 10),
		AudioBufferSize:    getEnvAsInt("AUDIO_BUFFER_SIZE", 8192),
		LogLevel:           getEnv("LOG_LEVEL", "info"),
	}

	logger, _ := zap.NewProduction()
	defer logger.Sync()
	logger.Info("Configuration loaded",
		zap.String("server_port", config.ServerPort),
		zap.Int("max_connections", config.MaxConnections),
		zap.Int("pool_size", config.ConnectionPoolSize),
	)

	return config, nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

