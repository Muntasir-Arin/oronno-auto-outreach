package avash.oronno.notificationservice.controller;

import avash.oronno.notificationservice.dto.NotificationRequest;
import avash.oronno.notificationservice.dto.NotificationResponse;
import avash.oronno.notificationservice.service.NotificationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationResponse> sendNotification(@Valid @RequestBody NotificationRequest request) {
        log.info("Received notification request - Channel: {}, Recipient: {}", request.getChannel(), request.getRecipient());
        NotificationResponse response = notificationService.sendNotification(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{notificationId}")
    public ResponseEntity<NotificationResponse> getNotificationStatus(@PathVariable String notificationId) {
        log.debug("Retrieving notification status with id: {}", notificationId);
        Optional<NotificationResponse> notification = notificationService.getNotificationStatus(notificationId);
        return notification.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/recipients/{recipient}")
    public ResponseEntity<List<NotificationResponse>> getNotificationsByRecipient(@PathVariable String recipient) {
        log.debug("Retrieving notifications for recipient: {}", recipient);
        return ResponseEntity.ok(notificationService.getNotificationsByRecipient(recipient));
    }

    @PutMapping("/{notificationId}/status")
    public ResponseEntity<NotificationResponse> updateDeliveryStatus(
            @PathVariable String notificationId,
            @RequestParam String status) {
        log.info("Updating delivery status for notificationId: {} to status: {}", notificationId, status);
        NotificationResponse response = notificationService.updateDeliveryStatus(notificationId, status);
        return ResponseEntity.ok(response);
    }
}

