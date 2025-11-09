package avash.oronno.emailorchestrationservice.controller;

import avash.oronno.emailorchestrationservice.service.EmailDeliveryTrackingService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

/**
 * Webhook controller for receiving SendGrid event notifications.
 * Handles delivery, open, click, bounce, and other email events.
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/email/webhooks/sendgrid")
public class SendGridWebhookController {
    
    private final EmailDeliveryTrackingService deliveryTrackingService;
    private final ObjectMapper objectMapper;

    public SendGridWebhookController(EmailDeliveryTrackingService deliveryTrackingService) {
        this.deliveryTrackingService = deliveryTrackingService;
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Receives SendGrid webhook events.
     * POST /api/v1/email/webhooks/sendgrid
     */
    @PostMapping
    public ResponseEntity<String> handleSendGridWebhook(@RequestBody List<JsonNode> events) {
        log.info("Received SendGrid webhook with {} events", events.size());
        
        for (JsonNode event : events) {
            try {
                processEvent(event);
            } catch (Exception e) {
                log.error("Error processing SendGrid event", e);
            }
        }
        
        return ResponseEntity.ok("OK");
    }

    private void processEvent(JsonNode event) {
        String eventType = event.get("event").asText();
        String emailId = event.has("custom_args") && event.get("custom_args").has("email_id") 
                ? event.get("custom_args").get("email_id").asText() 
                : null;
        
        if (emailId == null) {
            log.warn("Event missing email_id: {}", event);
            return;
        }
        
        long timestamp = event.has("timestamp") 
                ? event.get("timestamp").asLong() 
                : System.currentTimeMillis() / 1000;
        LocalDateTime eventTime = LocalDateTime.ofInstant(
                Instant.ofEpochSecond(timestamp), ZoneId.systemDefault());
        
        switch (eventType) {
            case "delivered":
                deliveryTrackingService.trackEmailDelivered(emailId, eventTime);
                break;
            case "open":
                deliveryTrackingService.trackEmailOpened(emailId, eventTime);
                break;
            case "click":
                deliveryTrackingService.trackEmailClicked(emailId, eventTime);
                break;
            case "bounce":
            case "dropped":
                String reason = event.has("reason") ? event.get("reason").asText() : "Unknown";
                deliveryTrackingService.trackEmailBounced(emailId, reason, eventTime);
                break;
            default:
                log.debug("Unhandled event type: {} for email: {}", eventType, emailId);
        }
    }
}

