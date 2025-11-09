package avash.oronno.feedbackprocessingservice.service.impl;

import avash.oronno.feedbackprocessingservice.dto.FeedbackRequest;
import avash.oronno.feedbackprocessingservice.dto.FeedbackResponse;
import avash.oronno.feedbackprocessingservice.repository.FeedbackRepository;
import avash.oronno.feedbackprocessingservice.service.FeedbackProcessingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
public class FeedbackProcessingServiceImpl implements FeedbackProcessingService {
    
    private final FeedbackRepository feedbackRepository;

    public FeedbackProcessingServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public FeedbackResponse processFeedback(FeedbackRequest request) {
        log.info("Processing feedback for customerId: {}, campaignId: {}", 
                 request.getCustomerId(), request.getCampaignId());
        
        FeedbackResponse response = new FeedbackResponse();
        response.setFeedbackId(UUID.randomUUID().toString());
        response.setCustomerId(request.getCustomerId());
        response.setCampaignId(request.getCampaignId());
        response.setFeedbackText(request.getFeedbackText());
        response.setTimestamp(LocalDateTime.now());
        
        // Perform analysis
        response.setCategory(categorizeFeedbackInternal(request.getFeedbackText()));
        SentimentAnalysis sentiment = analyzeSentimentInternal(request.getFeedbackText());
        response.setSentiment(sentiment.getOverallSentiment());
        response.setSentimentScore(sentiment.getScore());
        response.setDetectedIssues(detectIssuesInternal(request.getFeedbackText()));
        
        Map<String, Object> analysis = new HashMap<>();
        analysis.put("wordCount", request.getFeedbackText().split("\\s+").length);
        analysis.put("processedAt", LocalDateTime.now());
        response.setAnalysis(analysis);
        
        FeedbackResponse saved = feedbackRepository.save(response);
        log.info("Feedback processed with id: {}", saved.getFeedbackId());
        return saved;
    }

    @Override
    public Optional<FeedbackResponse> getFeedback(String feedbackId) {
        log.debug("Retrieving feedback with id: {}", feedbackId);
        return feedbackRepository.findById(feedbackId);
    }

    @Override
    public List<FeedbackResponse> getFeedbackByCampaign(String campaignId) {
        log.debug("Retrieving feedback for campaignId: {}", campaignId);
        return feedbackRepository.findByCampaignId(campaignId);
    }

    @Override
    public List<FeedbackResponse> getFeedbackByCustomer(String customerId) {
        log.debug("Retrieving feedback for customerId: {}", customerId);
        return feedbackRepository.findByCustomerId(customerId);
    }

    @Override
    public FeedbackResponse categorizeFeedback(String feedbackId) {
        log.info("Categorizing feedback with id: {}", feedbackId);
        Optional<FeedbackResponse> feedbackOpt = feedbackRepository.findById(feedbackId);
        if (feedbackOpt.isEmpty()) {
            log.warn("Feedback not found with id: {}", feedbackId);
            throw new RuntimeException("Feedback not found");
        }
        
        FeedbackResponse feedback = feedbackOpt.get();
        feedback.setCategory(categorizeFeedbackInternal(feedback.getFeedbackText()));
        return feedbackRepository.save(feedback);
    }

    @Override
    public FeedbackResponse analyzeSentiment(String feedbackId) {
        log.info("Analyzing sentiment for feedbackId: {}", feedbackId);
        Optional<FeedbackResponse> feedbackOpt = feedbackRepository.findById(feedbackId);
        if (feedbackOpt.isEmpty()) {
            log.warn("Feedback not found with id: {}", feedbackId);
            throw new RuntimeException("Feedback not found");
        }
        
        FeedbackResponse feedback = feedbackOpt.get();
        SentimentAnalysis sentiment = analyzeSentimentInternal(feedback.getFeedbackText());
        feedback.setSentiment(sentiment.getOverallSentiment());
        feedback.setSentimentScore(sentiment.getScore());
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<String> detectIssues(String feedbackId) {
        log.info("Detecting issues for feedbackId: {}", feedbackId);
        Optional<FeedbackResponse> feedbackOpt = feedbackRepository.findById(feedbackId);
        if (feedbackOpt.isEmpty()) {
            log.warn("Feedback not found with id: {}", feedbackId);
            throw new RuntimeException("Feedback not found");
        }
        
        FeedbackResponse feedback = feedbackOpt.get();
        List<String> issues = detectIssuesInternal(feedback.getFeedbackText());
        feedback.setDetectedIssues(issues);
        feedbackRepository.save(feedback);
        return issues;
    }

    private String categorizeFeedbackInternal(String feedbackText) {
        // TODO: Implement actual categorization logic (e.g., using ML models or NLP)
        if (feedbackText.toLowerCase().contains("complaint") || feedbackText.toLowerCase().contains("issue")) {
            return "COMPLAINT";
        } else if (feedbackText.toLowerCase().contains("praise") || feedbackText.toLowerCase().contains("great")) {
            return "PRAISE";
        } else if (feedbackText.toLowerCase().contains("suggestion")) {
            return "SUGGESTION";
        }
        return "GENERAL";
    }

    private FeedbackResponse.SentimentAnalysis analyzeSentimentInternal(String feedbackText) {
        // TODO: Implement actual sentiment analysis
        FeedbackResponse.SentimentAnalysis sentiment = new FeedbackResponse.SentimentAnalysis();
        sentiment.setOverallSentiment("NEUTRAL");
        sentiment.setScore(0.5);
        return sentiment;
    }

    private List<String> detectIssuesInternal(String feedbackText) {
        // TODO: Implement actual issue detection
        List<String> issues = new ArrayList<>();
        if (feedbackText.toLowerCase().contains("error")) {
            issues.add("Technical Error");
        }
        if (feedbackText.toLowerCase().contains("slow")) {
            issues.add("Performance Issue");
        }
        return issues;
    }

    // Inner class for sentiment analysis
    public static class SentimentAnalysis {
        private String overallSentiment;
        private Double score;

        public String getOverallSentiment() { return overallSentiment; }
        public void setOverallSentiment(String overallSentiment) { this.overallSentiment = overallSentiment; }
        public Double getScore() { return score; }
        public void setScore(Double score) { this.score = score; }
    }
}

