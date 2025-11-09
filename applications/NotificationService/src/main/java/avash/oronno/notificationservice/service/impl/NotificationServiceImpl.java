package avash.oronno.notificationservice.service.impl;

import avash.oronno.notificationservice.dto.NotificationRequest;
import avash.oronno.notificationservice.dto.NotificationResponse;
import avash.oronno.notificationservice.repository.NotificationRepository;
import avash.oronno.notificationservice.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {
    
    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public NotificationResponse sendNotification(NotificationRequest request) {
        log.info("Sending notification - Channel: {}, Recipient: {}", request.getChannel(), request.getRecipient());
        
        // TODO: Implement actual notification sending logic based on channel
        NotificationResponse response = new NotificationResponse();
        response.setNotificationId(UUID.randomUUID().toString());
        response.setChannel(request.getChannel());
        response.setRecipient(request.getRecipient());
        response.setStatus("SENT");
        response.setMessageId(UUID.randomUUID().toString());
        response.setSentAt(LocalDateTime.now());
        
        NotificationResponse saved = notificationRepository.save(response);
        log.info("Notification sent with id: {}", saved.getNotificationId());
        return saved;
    }

    @Override
    public Optional<NotificationResponse> getNotificationStatus(String notificationId) {
        log.debug("Retrieving notification status with id: {}", notificationId);
        return notificationRepository.findById(notificationId);
    }

    @Override
    public List<NotificationResponse> getNotificationsByRecipient(String recipient) {
        log.debug("Retrieving notifications for recipient: {}", recipient);
        return notificationRepository.findByRecipient(recipient);
    }

    @Override
    public NotificationResponse updateDeliveryStatus(String notificationId, String status) {
        log.info("Updating delivery status for notificationId: {} to status: {}", notificationId, status);
        Optional<NotificationResponse> notificationOpt = notificationRepository.findById(notificationId);
        if (notificationOpt.isEmpty()) {
            log.warn("Notification not found with id: {}", notificationId);
            throw new RuntimeException("Notification not found");
        }
        
        NotificationResponse notification = notificationOpt.get();
        notification.setStatus(status);
        if ("DELIVERED".equals(status)) {
            notification.setDeliveredAt(LocalDateTime.now());
        }
        return notificationRepository.save(notification);
    }
}

