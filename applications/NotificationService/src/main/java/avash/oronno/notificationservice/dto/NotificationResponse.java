package avash.oronno.notificationservice.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationResponse {
    private String notificationId;
    private String channel;
    private String recipient;
    private String status; // PENDING, SENT, DELIVERED, FAILED
    private String messageId;
    private LocalDateTime sentAt;
    private LocalDateTime deliveredAt;
    private String errorMessage;
}

