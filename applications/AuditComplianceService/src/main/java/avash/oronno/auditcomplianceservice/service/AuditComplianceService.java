package avash.oronno.auditcomplianceservice.service;

import avash.oronno.auditcomplianceservice.dto.AuditLogRequest;
import avash.oronno.auditcomplianceservice.dto.AuditLogResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AuditComplianceService {
    AuditLogResponse logActivity(AuditLogRequest request);
    Optional<AuditLogResponse> getAuditLog(String auditLogId);
    List<AuditLogResponse> getAuditLogsByUser(String userId);
    List<AuditLogResponse> getAuditLogsByResource(String resourceType, String resourceId);
    List<AuditLogResponse> getAuditLogsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    boolean checkCompliance(String resourceType, String resourceId);
    void enforceDataRetention();
}

