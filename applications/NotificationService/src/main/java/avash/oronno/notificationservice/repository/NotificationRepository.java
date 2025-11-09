package avash.oronno.notificationservice.repository;

import avash.oronno.notificationservice.dto.NotificationResponse;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository {
    NotificationResponse save(NotificationResponse notification);
    Optional<NotificationResponse> findById(String notificationId);
    List<NotificationResponse> findByRecipient(String recipient);
    List<NotificationResponse> findAll();
}

