package audio

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"go.uber.org/zap"
)

// AudioProcessor handles audio packet processing with low latency
type AudioProcessor struct {
	logger *zap.Logger
}

// NewAudioProcessor creates a new audio processor
func NewAudioProcessor(logger *zap.Logger) *AudioProcessor {
	return &AudioProcessor{
		logger: logger,
	}
}

// ProcessAudioPacket processes incoming audio packet
// Converts from WebSocket format to format expected by Gemini Live API
func (ap *AudioProcessor) ProcessAudioPacket(data []byte) ([]byte, error) {
	if len(data) == 0 {
		return nil, fmt.Errorf("empty audio packet")
	}

	// TODO: Implement actual audio format conversion
	// For now, we'll just pass through the data
	// In production, this would handle:
	// - Format conversion (μ-law to PCM, sample rate conversion, etc.)
	// - Audio normalization
	// - Chunking for optimal packet size

	ap.logger.Debug("Processing audio packet",
		zap.Int("size", len(data)),
	)

	return data, nil
}

// ChunkAudio splits audio data into optimal chunks for streaming
func (ap *AudioProcessor) ChunkAudio(data []byte, chunkSize int) [][]byte {
	if chunkSize <= 0 {
		chunkSize = 4096 // Default chunk size
	}

	var chunks [][]byte
	for i := 0; i < len(data); i += chunkSize {
		end := i + chunkSize
		if end > len(data) {
			end = len(data)
		}
		chunks = append(chunks, data[i:end])
	}

	ap.logger.Debug("Chunked audio data",
		zap.Int("total_size", len(data)),
		zap.Int("chunk_size", chunkSize),
		zap.Int("num_chunks", len(chunks)),
	)

	return chunks
}

// ConvertMuLawToPCM converts μ-law encoded audio to PCM
func (ap *AudioProcessor) ConvertMuLawToPCM(mulawData []byte) ([]byte, error) {
	pcmData := make([]int16, len(mulawData))
	
	for i, b := range mulawData {
		// μ-law to linear conversion
		b = ^b
		sign := (b & 0x80) >> 7
		exponent := (b & 0x70) >> 4
		mantissa := b & 0x0F
		
		linear := int16(mantissa<<(exponent+3)) | 0x84
		if sign == 0 {
			linear = -linear
		}
		
		pcmData[i] = linear
	}

	// Convert to byte array
	buf := new(bytes.Buffer)
	err := binary.Write(buf, binary.LittleEndian, pcmData)
	if err != nil {
		return nil, fmt.Errorf("failed to convert PCM to bytes: %w", err)
	}

	ap.logger.Debug("Converted μ-law to PCM",
		zap.Int("input_size", len(mulawData)),
		zap.Int("output_size", buf.Len()),
	)

	return buf.Bytes(), nil
}

// ConvertPCMToMuLaw converts PCM audio to μ-law encoding
func (ap *AudioProcessor) ConvertPCMToMuLaw(pcmData []byte) ([]byte, error) {
	// Convert byte array to int16 array
	if len(pcmData)%2 != 0 {
		return nil, fmt.Errorf("PCM data must be even length")
	}

	pcmSamples := make([]int16, len(pcmData)/2)
	err := binary.Read(bytes.NewReader(pcmData), binary.LittleEndian, pcmSamples)
	if err != nil {
		return nil, fmt.Errorf("failed to read PCM samples: %w", err)
	}

	mulawData := make([]byte, len(pcmSamples))
	
	for i, sample := range pcmSamples {
		// Linear to μ-law conversion
		sign := byte(0)
		if sample < 0 {
			sign = 0x80
			sample = -sample
		}
		
		// Find exponent
		exponent := byte(0)
		temp := int16(sample)
		for temp > 0x1F {
			exponent++
			temp >>= 1
		}
		
		// Find mantissa
		mantissa := byte((sample >> (exponent + 3)) & 0x0F)
		
		// Combine
		mulawData[i] = ^(sign | (exponent << 4) | mantissa)
	}

	ap.logger.Debug("Converted PCM to μ-law",
		zap.Int("input_size", len(pcmData)),
		zap.Int("output_size", len(mulawData)),
	)

	return mulawData, nil
}

