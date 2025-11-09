package avash.oronno.feedbackprocessingservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Map;

@Data
public class FeedbackRequest {
    @NotBlank
    private String feedbackText;
    private String customerId;
    private String campaignId;
    private String source; // VOICE, EMAIL, SURVEY, etc.
    private Map<String, Object> metadata;
}

