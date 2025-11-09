package avash.oronno.emailorchestrationservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Email delivery tracking service for tracking email status and events.
 * In production, this would integrate with a database (Cassandra) for persistence.
 */
@Slf4j
@Service
public class EmailDeliveryTrackingService {
    
    // In-memory storage (replace with database in production)
    private final Map<String, EmailDeliveryStatus> emailStatusMap = new ConcurrentHashMap<>();

    /**
     * Tracks when an email is sent.
     */
    public void trackEmailSent(String emailId, String campaignId, String recipientEmail,
                               String subject, int statusCode) {
        log.info("Tracking email sent - Email ID: {}, Campaign: {}, To: {}", 
                   emailId, campaignId, recipientEmail);
        
        EmailDeliveryStatus status = new EmailDeliveryStatus();
        status.setEmailId(emailId);
        status.setCampaignId(campaignId);
        status.setRecipientEmail(recipientEmail);
        status.setSubject(subject);
        status.setStatus("sent");
        status.setStatusCode(statusCode);
        status.setSentAt(LocalDateTime.now());
        
        emailStatusMap.put(emailId, status);
    }

    /**
     * Tracks when an email is delivered.
     */
    public void trackEmailDelivered(String emailId, LocalDateTime deliveredAt) {
        log.info("Tracking email delivered - Email ID: {}", emailId);
        
        EmailDeliveryStatus status = emailStatusMap.get(emailId);
        if (status != null) {
            status.setStatus("delivered");
            status.setDeliveredAt(deliveredAt);
        }
    }

    /**
     * Tracks when an email is opened.
     */
    public void trackEmailOpened(String emailId, LocalDateTime openedAt) {
        log.info("Tracking email opened - Email ID: {}", emailId);
        
        EmailDeliveryStatus status = emailStatusMap.get(emailId);
        if (status != null) {
            status.setStatus("opened");
            status.setOpenedAt(openedAt);
        }
    }

    /**
     * Tracks when an email link is clicked.
     */
    public void trackEmailClicked(String emailId, LocalDateTime clickedAt) {
        log.info("Tracking email clicked - Email ID: {}", emailId);
        
        EmailDeliveryStatus status = emailStatusMap.get(emailId);
        if (status != null) {
            status.setStatus("clicked");
            status.setClickedAt(clickedAt);
        }
    }

    /**
     * Tracks when an email bounces.
     */
    public void trackEmailBounced(String emailId, String bounceReason, LocalDateTime bouncedAt) {
        log.warn("Tracking email bounced - Email ID: {}, Reason: {}", emailId, bounceReason);
        
        EmailDeliveryStatus status = emailStatusMap.get(emailId);
        if (status != null) {
            status.setStatus("bounced");
            status.setBounceReason(bounceReason);
            status.setBouncedAt(bouncedAt);
        }
    }

    /**
     * Gets email delivery status.
     */
    public EmailDeliveryStatus getEmailStatus(String emailId) {
        return emailStatusMap.get(emailId);
    }

    /**
     * Email delivery status data class.
     */
    public static class EmailDeliveryStatus {
        private String emailId;
        private String campaignId;
        private String recipientEmail;
        private String subject;
        private String status;
        private int statusCode;
        private LocalDateTime sentAt;
        private LocalDateTime deliveredAt;
        private LocalDateTime openedAt;
        private LocalDateTime clickedAt;
        private LocalDateTime bouncedAt;
        private String bounceReason;

        // Getters and setters
        public String getEmailId() { return emailId; }
        public void setEmailId(String emailId) { this.emailId = emailId; }
        
        public String getCampaignId() { return campaignId; }
        public void setCampaignId(String campaignId) { this.campaignId = campaignId; }
        
        public String getRecipientEmail() { return recipientEmail; }
        public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }
        
        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public int getStatusCode() { return statusCode; }
        public void setStatusCode(int statusCode) { this.statusCode = statusCode; }
        
        public LocalDateTime getSentAt() { return sentAt; }
        public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }
        
        public LocalDateTime getDeliveredAt() { return deliveredAt; }
        public void setDeliveredAt(LocalDateTime deliveredAt) { this.deliveredAt = deliveredAt; }
        
        public LocalDateTime getOpenedAt() { return openedAt; }
        public void setOpenedAt(LocalDateTime openedAt) { this.openedAt = openedAt; }
        
        public LocalDateTime getClickedAt() { return clickedAt; }
        public void setClickedAt(LocalDateTime clickedAt) { this.clickedAt = clickedAt; }
        
        public LocalDateTime getBouncedAt() { return bouncedAt; }
        public void setBouncedAt(LocalDateTime bouncedAt) { this.bouncedAt = bouncedAt; }
        
        public String getBounceReason() { return bounceReason; }
        public void setBounceReason(String bounceReason) { this.bounceReason = bounceReason; }
    }
}

