package avash.oronno.feedbackprocessingservice.repository.impl;

import avash.oronno.feedbackprocessingservice.dto.FeedbackResponse;
import avash.oronno.feedbackprocessingservice.repository.FeedbackRepository;
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
public class FeedbackRepositoryImpl implements FeedbackRepository {
    
    private final Map<String, FeedbackResponse> store = new ConcurrentHashMap<>();

    @Override
    public FeedbackResponse save(FeedbackResponse feedback) {
        if (feedback.getFeedbackId() == null) {
            feedback.setFeedbackId(UUID.randomUUID().toString());
        }
        store.put(feedback.getFeedbackId(), feedback);
        log.debug("Saved feedback with id: {}", feedback.getFeedbackId());
        return feedback;
    }

    @Override
    public Optional<FeedbackResponse> findById(String feedbackId) {
        FeedbackResponse feedback = store.get(feedbackId);
        if (feedback != null) {
            log.debug("Found feedback with id: {}", feedbackId);
        } else {
            log.debug("Feedback not found with id: {}", feedbackId);
        }
        return Optional.ofNullable(feedback);
    }

    @Override
    public List<FeedbackResponse> findByCampaignId(String campaignId) {
        log.debug("Finding feedback for campaignId: {}", campaignId);
        return store.values().stream()
                .filter(f -> campaignId.equals(f.getCampaignId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<FeedbackResponse> findByCustomerId(String customerId) {
        log.debug("Finding feedback for customerId: {}", customerId);
        return store.values().stream()
                .filter(f -> customerId.equals(f.getCustomerId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<FeedbackResponse> findAll() {
        log.debug("Finding all feedback, count: {}", store.size());
        return new ArrayList<>(store.values());
    }
}

