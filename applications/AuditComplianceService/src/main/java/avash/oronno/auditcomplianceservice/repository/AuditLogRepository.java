package avash.oronno.auditcomplianceservice.repository;

import avash.oronno.auditcomplianceservice.dto.AuditLogResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AuditLogRepository {
    AuditLogResponse save(AuditLogResponse auditLog);
    Optional<AuditLogResponse> findById(String auditLogId);
    List<AuditLogResponse> findByUserId(String userId);
    List<AuditLogResponse> findByResourceType(String resourceType);
    List<AuditLogResponse> findByResourceId(String resourceId);
    List<AuditLogResponse> findByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    List<AuditLogResponse> findAll();
}

