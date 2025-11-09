package avash.oronno.auditcomplianceservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Map;

@Data
public class AuditLogRequest {
    @NotBlank
    private String action; // CREATE, UPDATE, DELETE, READ, etc.
    @NotBlank
    private String resourceType; // USER, CAMPAIGN, CUSTOMER, etc.
    private String resourceId;
    private String userId;
    private String ipAddress;
    private Map<String, Object> details;
    private Map<String, Object> metadata;
}

