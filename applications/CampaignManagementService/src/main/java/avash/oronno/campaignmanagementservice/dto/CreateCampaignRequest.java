package avash.oronno.campaignmanagementservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;
import java.util.Map;

@Data
public class CreateCampaignRequest {
    @NotBlank
    private String name;
    private String description;
    @NotBlank
    private String channel; // voice/email
    private Map<String, Object> templateConfig;
    @NotNull
    private Instant scheduledAt;
}

