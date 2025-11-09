package avash.oronno.conversationintelligenceservice.service;

import avash.oronno.conversationintelligenceservice.dto.TranscriptionRequest;
import avash.oronno.conversationintelligenceservice.dto.TranscriptionResponse;

import java.util.List;
import java.util.Optional;

public interface ConversationIntelligenceService {
    TranscriptionResponse transcribe(TranscriptionRequest request);
    Optional<TranscriptionResponse> getTranscription(String transcriptionId);
    List<TranscriptionResponse> getTranscriptionsBySession(String sessionId);
    TranscriptionResponse analyzeSentiment(String transcriptionId);
    TranscriptionResponse detectIntent(String transcriptionId);
    List<String> extractKeyPhrases(String transcriptionId);
}

