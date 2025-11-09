package avash.oronno.conversationintelligenceservice.repository.impl;

import avash.oronno.conversationintelligenceservice.dto.TranscriptionResponse;
import avash.oronno.conversationintelligenceservice.repository.TranscriptionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Repository
public class TranscriptionRepositoryImpl implements TranscriptionRepository {
    
    private final Map<String, TranscriptionResponse> store = new ConcurrentHashMap<>();

    @Override
    public TranscriptionResponse save(TranscriptionResponse transcription) {
        if (transcription.getTranscriptionId() == null) {
            transcription.setTranscriptionId(UUID.randomUUID().toString());
        }
        store.put(transcription.getTranscriptionId(), transcription);
        log.debug("Saved transcription with id: {}", transcription.getTranscriptionId());
        return transcription;
    }

    @Override
    public Optional<TranscriptionResponse> findById(String transcriptionId) {
        TranscriptionResponse transcription = store.get(transcriptionId);
        if (transcription != null) {
            log.debug("Found transcription with id: {}", transcriptionId);
        } else {
            log.debug("Transcription not found with id: {}", transcriptionId);
        }
        return Optional.ofNullable(transcription);
    }

    @Override
    public List<TranscriptionResponse> findBySessionId(String sessionId) {
        log.debug("Finding transcriptions for sessionId: {}", sessionId);
        return store.values().stream()
                .filter(t -> sessionId.equals(t.getSessionId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<TranscriptionResponse> findAll() {
        log.debug("Finding all transcriptions, count: {}", store.size());
        return new ArrayList<>(store.values());
    }
}

