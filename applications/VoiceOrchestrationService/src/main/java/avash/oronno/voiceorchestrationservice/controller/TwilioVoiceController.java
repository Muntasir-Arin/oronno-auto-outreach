package avash.oronno.voiceorchestrationservice.controller;

import avash.oronno.voiceorchestrationservice.service.VoiceOrchestrationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.Map;

/**
 * REST controller for handling Twilio voice calls.
 * Receives audio from Twilio and orchestrates the flow to Gemini Live API.
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/voice/twilio")
public class TwilioVoiceController {
    
    private final VoiceOrchestrationService voiceOrchestrationService;

    public TwilioVoiceController(VoiceOrchestrationService voiceOrchestrationService) {
        this.voiceOrchestrationService = voiceOrchestrationService;
    }

    /**
     * Webhook endpoint for Twilio to send audio stream.
     * POST /api/v1/voice/twilio/call
     * 
     * @param callId Twilio Call SID
     * @param phoneNumber Customer phone number
     * @param audioStream Audio stream from Twilio (8kHz μ-law)
     * @return Audio stream to send back to Twilio (8kHz μ-law)
     */
    @PostMapping(value = "/call", consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public Flux<ResponseEntity<byte[]>> handleTwilioCall(
            @RequestParam("CallSid") String callId,
            @RequestParam("From") String phoneNumber,
            @RequestBody Flux<byte[]> audioStream) {
        
        log.info("Received Twilio call - Call SID: {}, From: {}", callId, phoneNumber);
        
        Flux<byte[]> responseAudio = voiceOrchestrationService.handleVoiceCall(callId, phoneNumber, audioStream);
        
        return responseAudio
                .map(audio -> ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(audio))
                .doOnError(error -> log.error("Error handling Twilio call: {}", callId, error));
    }

    /**
     * Health check endpoint.
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Voice Orchestration Service"));
    }
}

