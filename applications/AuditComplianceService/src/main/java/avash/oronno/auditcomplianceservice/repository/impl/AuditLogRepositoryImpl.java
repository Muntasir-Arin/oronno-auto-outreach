package avash.oronno.auditcomplianceservice.repository.impl;

import avash.oronno.auditcomplianceservice.dto.AuditLogResponse;
import avash.oronno.auditcomplianceservice.repository.AuditLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Repository
public class AuditLogRepositoryImpl implements AuditLogRepository {
    
    private final Map<String, AuditLogResponse> store = new ConcurrentHashMap<>();

    @Override
    public AuditLogResponse save(AuditLogResponse auditLog) {
        if (auditLog.getAuditLogId() == null) {
            auditLog.setAuditLogId(UUID.randomUUID().toString());
        }
        store.put(auditLog.getAuditLogId(), auditLog);
        log.debug("Saved audit log with id: {}", auditLog.getAuditLogId());
        return auditLog;
    }

    @Override
    public Optional<AuditLogResponse> findById(String auditLogId) {
        AuditLogResponse auditLog = store.get(auditLogId);
        if (auditLog != null) {
            log.debug("Found audit log with id: {}", auditLogId);
        } else {
            log.debug("Audit log not found with id: {}", auditLogId);
        }
        return Optional.ofNullable(auditLog);
    }

    @Override
    public List<AuditLogResponse> findByUserId(String userId) {
        log.debug("Finding audit logs for userId: {}", userId);
        return store.values().stream()
                .filter(a -> userId.equals(a.getUserId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogResponse> findByResourceType(String resourceType) {
        log.debug("Finding audit logs for resourceType: {}", resourceType);
        return store.values().stream()
                .filter(a -> resourceType.equals(a.getResourceType()))
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogResponse> findByResourceId(String resourceId) {
        log.debug("Finding audit logs for resourceId: {}", resourceId);
        return store.values().stream()
                .filter(a -> resourceId.equals(a.getResourceId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogResponse> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        log.debug("Finding audit logs between {} and {}", startDate, endDate);
        return store.values().stream()
                .filter(a -> a.getTimestamp().isAfter(startDate) && a.getTimestamp().isBefore(endDate))
                .collect(Collectors.toList());
    }

    @Override
    public List<AuditLogResponse> findAll() {
        log.debug("Finding all audit logs, count: {}", store.size());
        return new ArrayList<>(store.values());
    }
}

