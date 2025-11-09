package avash.oronno.feedbackprocessingservice.repository;

import avash.oronno.feedbackprocessingservice.dto.FeedbackResponse;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository {
    FeedbackResponse save(FeedbackResponse feedback);
    Optional<FeedbackResponse> findById(String feedbackId);
    List<FeedbackResponse> findByCampaignId(String campaignId);
    List<FeedbackResponse> findByCustomerId(String customerId);
    List<FeedbackResponse> findAll();
}

