package avash.oronno.auditcomplianceservice.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class AuditLogResponse {
    private String auditLogId;
    private String action;
    private String resourceType;
    private String resourceId;
    private String userId;
    private String ipAddress;
    private Map<String, Object> details;
    private Map<String, Object> metadata;
    private LocalDateTime timestamp;
    private String complianceStatus; // COMPLIANT, NON_COMPLIANT, PENDING
}

