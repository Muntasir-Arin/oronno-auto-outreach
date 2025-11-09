package avash.oronno.notificationservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Map;

@Data
public class NotificationRequest {
    @NotBlank
    private String channel; // EMAIL, SMS, WEBHOOK
    @NotBlank
    private String recipient;
    @NotBlank
    private String subject;
    @NotBlank
    private String message;
    private String templateId;
    private Map<String, Object> templateVariables;
    private Map<String, Object> metadata;
}

