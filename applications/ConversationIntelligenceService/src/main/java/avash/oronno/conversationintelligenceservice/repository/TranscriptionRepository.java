package avash.oronno.conversationintelligenceservice.repository;

import avash.oronno.conversationintelligenceservice.dto.TranscriptionResponse;

import java.util.List;
import java.util.Optional;

public interface TranscriptionRepository {
    TranscriptionResponse save(TranscriptionResponse transcription);
    Optional<TranscriptionResponse> findById(String transcriptionId);
    List<TranscriptionResponse> findBySessionId(String sessionId);
    List<TranscriptionResponse> findAll();
}

