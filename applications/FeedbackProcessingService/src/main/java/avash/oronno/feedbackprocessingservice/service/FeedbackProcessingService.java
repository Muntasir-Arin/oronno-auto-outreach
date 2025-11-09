package avash.oronno.feedbackprocessingservice.service;

import avash.oronno.feedbackprocessingservice.dto.FeedbackRequest;
import avash.oronno.feedbackprocessingservice.dto.FeedbackResponse;

import java.util.List;
import java.util.Optional;

public interface FeedbackProcessingService {
    FeedbackResponse processFeedback(FeedbackRequest request);
    Optional<FeedbackResponse> getFeedback(String feedbackId);
    List<FeedbackResponse> getFeedbackByCampaign(String campaignId);
    List<FeedbackResponse> getFeedbackByCustomer(String customerId);
    FeedbackResponse categorizeFeedback(String feedbackId);
    FeedbackResponse analyzeSentiment(String feedbackId);
    List<String> detectIssues(String feedbackId);
}

