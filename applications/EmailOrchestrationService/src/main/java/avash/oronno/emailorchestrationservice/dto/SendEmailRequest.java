package avash.oronno.emailorchestrationservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Map;

@Data
public class SendEmailRequest {
    @NotBlank
    private String campaignId;
    
    @NotBlank
    @Email
    private String customerEmail;
    
    @NotBlank
    private String templateName;
    
    @NotBlank
    private String subjectTemplate;
    
    private Map<String, Object> customerData;
}

