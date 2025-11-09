package avash.oronno.auditcomplianceservice.controller;

import avash.oronno.auditcomplianceservice.dto.AuditLogRequest;
import avash.oronno.auditcomplianceservice.dto.AuditLogResponse;
import avash.oronno.auditcomplianceservice.service.AuditComplianceService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/audit")
@RequiredArgsConstructor
public class AuditComplianceController {

    private final AuditComplianceService auditComplianceService;

    @PostMapping("/log")
    public ResponseEntity<AuditLogResponse> logActivity(@Valid @RequestBody AuditLogRequest request) {
        log.info("Received audit log request - Action: {}, ResourceType: {}", request.getAction(), request.getResourceType());
        AuditLogResponse response = auditComplianceService.logActivity(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logs/{auditLogId}")
    public ResponseEntity<AuditLogResponse> getAuditLog(@PathVariable String auditLogId) {
        log.debug("Retrieving audit log with id: {}", auditLogId);
        Optional<AuditLogResponse> auditLog = auditComplianceService.getAuditLog(auditLogId);
        return auditLog.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/users/{userId}/logs")
    public ResponseEntity<List<AuditLogResponse>> getAuditLogsByUser(@PathVariable String userId) {
        log.debug("Retrieving audit logs for userId: {}", userId);
        return ResponseEntity.ok(auditComplianceService.getAuditLogsByUser(userId));
    }

    @GetMapping("/resources/{resourceType}/{resourceId}/logs")
    public ResponseEntity<List<AuditLogResponse>> getAuditLogsByResource(
            @PathVariable String resourceType,
            @PathVariable String resourceId) {
        log.debug("Retrieving audit logs for resourceType: {}, resourceId: {}", resourceType, resourceId);
        return ResponseEntity.ok(auditComplianceService.getAuditLogsByResource(resourceType, resourceId));
    }

    @GetMapping("/logs")
    public ResponseEntity<List<AuditLogResponse>> getAuditLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        log.debug("Retrieving audit logs between {} and {}", startDate, endDate);
        return ResponseEntity.ok(auditComplianceService.getAuditLogsByDateRange(startDate, endDate));
    }

    @PostMapping("/compliance/check")
    public ResponseEntity<Boolean> checkCompliance(
            @RequestParam String resourceType,
            @RequestParam String resourceId) {
        log.info("Checking compliance for resourceType: {}, resourceId: {}", resourceType, resourceId);
        boolean compliant = auditComplianceService.checkCompliance(resourceType, resourceId);
        return ResponseEntity.ok(compliant);
    }

    @PostMapping("/retention/enforce")
    public ResponseEntity<Void> enforceDataRetention() {
        log.info("Enforcing data retention policies");
        auditComplianceService.enforceDataRetention();
        return ResponseEntity.ok().build();
    }
}

