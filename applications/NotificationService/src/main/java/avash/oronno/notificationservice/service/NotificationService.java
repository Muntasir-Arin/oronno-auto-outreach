package avash.oronno.notificationservice.service;

import avash.oronno.notificationservice.dto.NotificationRequest;
import avash.oronno.notificationservice.dto.NotificationResponse;

import java.util.List;
import java.util.Optional;

public interface NotificationService {
    NotificationResponse sendNotification(NotificationRequest request);
    Optional<NotificationResponse> getNotificationStatus(String notificationId);
    List<NotificationResponse> getNotificationsByRecipient(String recipient);
    NotificationResponse updateDeliveryStatus(String notificationId, String status);
}

