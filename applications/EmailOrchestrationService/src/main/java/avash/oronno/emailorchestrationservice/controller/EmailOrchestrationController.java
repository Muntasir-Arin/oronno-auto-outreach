package avash.oronno.emailorchestrationservice.controller;

import avash.oronno.config.response.ApiResponse;
import avash.oronno.emailorchestrationservice.dto.SendEmailRequest;
import avash.oronno.emailorchestrationservice.service.EmailOrchestrationService;
import avash.oronno.emailorchestrationservice.service.EmailDeliveryTrackingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

/**
 * REST controller for email orchestration operations.
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/email")
public class EmailOrchestrationController {
    
    private final EmailOrchestrationService emailOrchestrationService;
    private final EmailDeliveryTrackingService deliveryTrackingService;

    public EmailOrchestrationController(
            EmailOrchestrationService emailOrchestrationService,
            EmailDeliveryTrackingService deliveryTrackingService) {
        this.emailOrchestrationService = emailOrchestrationService;
        this.deliveryTrackingService = deliveryTrackingService;
    }

    /**
     * Sends a personalized email.
     * POST /api/v1/email/send
     */
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Map<String, String>>> sendEmail(
            @Valid @RequestBody SendEmailRequest request) {
        
        log.info("Received email send request - Campaign: {}, To: {}", 
                   request.getCampaignId(), request.getCustomerEmail());
        
        String emailId = emailOrchestrationService.sendEmail(
                request.getCampaignId(),
                request.getCustomerEmail(),
                request.getCustomerData(),
                request.getTemplateName(),
                request.getSubjectTemplate()
        );
        
        return ResponseEntity.ok(ApiResponse.success(
                "Email sent successfully",
                Map.of("emailId", emailId)
        ));
    }

    /**
     * Gets email delivery status.
     * GET /api/v1/email/status/{emailId}
     */
    @GetMapping("/status/{emailId}")
    public ResponseEntity<ApiResponse<EmailDeliveryTrackingService.EmailDeliveryStatus>> getEmailStatus(
            @PathVariable String emailId) {
        
        log.debug("Retrieving email status for emailId: {}", emailId);
        EmailDeliveryTrackingService.EmailDeliveryStatus status = 
                deliveryTrackingService.getEmailStatus(emailId);
        
        if (status == null) {
            log.warn("Email status not found for emailId: {}", emailId);
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(ApiResponse.success("Email status retrieved", status));
    }

    /**
     * Health check endpoint.
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, String>>> health() {
        return ResponseEntity.ok(ApiResponse.success(
                "Email Orchestration Service is healthy",
                Map.of("status", "UP", "service", "Email Orchestration Service")
        ));
    }
}

