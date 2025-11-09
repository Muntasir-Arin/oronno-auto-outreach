package avash.oronno.feedbackprocessingservice.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class FeedbackResponse {
    private String feedbackId;
    private String customerId;
    private String campaignId;
    private String feedbackText;
    private String category;
    private String sentiment; // POSITIVE, NEGATIVE, NEUTRAL
    private Double sentimentScore;
    private List<String> detectedIssues;
    private Map<String, Object> analysis;
    private LocalDateTime timestamp;
}

