package avash.oronno.conversationintelligenceservice.controller;

import avash.oronno.conversationintelligenceservice.dto.TranscriptionRequest;
import avash.oronno.conversationintelligenceservice.dto.TranscriptionResponse;
import avash.oronno.conversationintelligenceservice.service.ConversationIntelligenceService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/conversation-intelligence")
@RequiredArgsConstructor
public class ConversationIntelligenceController {

    private final ConversationIntelligenceService conversationIntelligenceService;

    @PostMapping("/transcribe")
    public ResponseEntity<TranscriptionResponse> transcribe(@Valid @RequestBody TranscriptionRequest request) {
        log.info("Received transcription request for sessionId: {}", request.getSessionId());
        TranscriptionResponse response = conversationIntelligenceService.transcribe(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/transcriptions/{transcriptionId}")
    public ResponseEntity<TranscriptionResponse> getTranscription(@PathVariable String transcriptionId) {
        log.debug("Retrieving transcription with id: {}", transcriptionId);
        Optional<TranscriptionResponse> transcription = conversationIntelligenceService.getTranscription(transcriptionId);
        return transcription.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sessions/{sessionId}/transcriptions")
    public ResponseEntity<List<TranscriptionResponse>> getTranscriptionsBySession(@PathVariable String sessionId) {
        log.debug("Retrieving transcriptions for sessionId: {}", sessionId);
        return ResponseEntity.ok(conversationIntelligenceService.getTranscriptionsBySession(sessionId));
    }

    @PostMapping("/transcriptions/{transcriptionId}/sentiment")
    public ResponseEntity<TranscriptionResponse> analyzeSentiment(@PathVariable String transcriptionId) {
        log.info("Analyzing sentiment for transcriptionId: {}", transcriptionId);
        TranscriptionResponse response = conversationIntelligenceService.analyzeSentiment(transcriptionId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/transcriptions/{transcriptionId}/intent")
    public ResponseEntity<TranscriptionResponse> detectIntent(@PathVariable String transcriptionId) {
        log.info("Detecting intent for transcriptionId: {}", transcriptionId);
        TranscriptionResponse response = conversationIntelligenceService.detectIntent(transcriptionId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/transcriptions/{transcriptionId}/key-phrases")
    public ResponseEntity<List<String>> extractKeyPhrases(@PathVariable String transcriptionId) {
        log.info("Extracting key phrases for transcriptionId: {}", transcriptionId);
        List<String> keyPhrases = conversationIntelligenceService.extractKeyPhrases(transcriptionId);
        return ResponseEntity.ok(keyPhrases);
    }
}

