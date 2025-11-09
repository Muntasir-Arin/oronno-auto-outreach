package avash.oronno.conversationintelligenceservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TranscriptionRequest {
    @NotBlank
    private String audioData; // Base64 encoded audio or audio URL
    private String language;
    private String sessionId;
}

