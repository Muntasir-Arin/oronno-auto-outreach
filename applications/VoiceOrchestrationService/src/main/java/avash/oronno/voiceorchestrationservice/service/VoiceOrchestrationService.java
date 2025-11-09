package avash.oronno.voiceorchestrationservice.service;

import avash.oronno.audioconversion.AudioConverter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Map;

/**
 * Voice Orchestration Service - Main service for managing voice calls from Twilio to Gemini Live API.
 * 
 * Flow:
 * 1. Receives audio stream from Twilio (8kHz μ-law)
 * 2. Converts to 16kHz PCM using Audio Conversion Service
 * 3. Sends to Gemini Live API
 * 4. Receives response from Gemini (24kHz PCM)
 * 5. Converts to 8kHz μ-law using Audio Conversion Service
 * 6. Sends back to Twilio
 */
@Slf4j
@Service
public class VoiceOrchestrationService {
    
    private final GeminiLiveClient geminiLiveClient;

    public VoiceOrchestrationService(GeminiLiveClient geminiLiveClient) {
        this.geminiLiveClient = geminiLiveClient;
    }

    /**
     * Processes incoming audio stream from Twilio and sends to Gemini.
     * 
     * @param twilioAudioStream Audio stream from Twilio (8kHz μ-law)
     * @param context Customer context for personalization
     * @return Audio stream to send back to Twilio (8kHz μ-law)
     */
    public Flux<byte[]> processVoiceCall(Flux<byte[]> twilioAudioStream, Map<String, Object> context) {
        log.info("Processing voice call with context: {}", context);
        
        // Step 1: Initialize Gemini session
        Mono<String> sessionMono = geminiLiveClient.initializeSession(context);
        
        return sessionMono
                .flatMapMany(sessionId -> {
                    log.info("Session initialized: {}", sessionId);
                    
                    // Step 2: Convert incoming audio (8kHz μ-law → 16kHz PCM) and stream to Gemini
                    Flux<byte[]> geminiAudioStream = twilioAudioStream
                            .map(mulawAudio -> {
                                try {
                                    log.debug("Converting μ-law to PCM: {} bytes", mulawAudio.length);
                                    return AudioConverter.convertMulawToPcm(mulawAudio);
                                } catch (IOException e) {
                                    log.error("Error converting μ-law to PCM", e);
                                    throw new RuntimeException("Audio conversion failed", e);
                                }
                            })
                            .flatMapMany(pcmAudio -> {
                                log.debug("Sending PCM audio to Gemini: {} bytes", pcmAudio.length);
                                return geminiLiveClient.sendAudioStream(sessionId, Flux.just(pcmAudio));
                            });
                    
                    // Step 3: Convert outgoing audio (24kHz PCM → 8kHz μ-law) for Twilio
                    return geminiAudioStream
                            .map(pcmAudio -> {
                                try {
                                    log.debug("Converting PCM to μ-law: {} bytes", pcmAudio.length);
                                    return AudioConverter.convertPcmToMulaw(pcmAudio);
                                } catch (IOException e) {
                                    log.error("Error converting PCM to μ-law", e);
                                    throw new RuntimeException("Audio conversion failed", e);
                                }
                            })
                            .doOnComplete(() -> {
                                log.info("Voice call processing completed for session: {}", sessionId);
                                geminiLiveClient.closeSession(sessionId).subscribe();
                            })
                            .doOnError(error -> {
                                log.error("Error processing voice call for session: {}", sessionId, error);
                                geminiLiveClient.closeSession(sessionId).subscribe();
                            });
                });
    }

    /**
     * Handles a complete voice call session.
     * 
     * @param callId Call identifier
     * @param phoneNumber Customer phone number
     * @param twilioAudioStream Audio stream from Twilio
     * @return Audio stream to send back to Twilio
     */
    public Flux<byte[]> handleVoiceCall(String callId, String phoneNumber, Flux<byte[]> twilioAudioStream) {
        log.info("Handling voice call - Call ID: {}, Phone: {}", callId, phoneNumber);
        
        // Build context for Gemini
        Map<String, Object> context = Map.of(
                "callId", callId,
                "phoneNumber", phoneNumber
        );
        
        return processVoiceCall(twilioAudioStream, context);
    }
}

