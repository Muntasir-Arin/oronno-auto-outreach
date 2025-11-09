package avash.oronno.notificationservice.repository.impl;

import avash.oronno.notificationservice.dto.NotificationResponse;
import avash.oronno.notificationservice.repository.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Repository
public class NotificationRepositoryImpl implements NotificationRepository {
    
    private final Map<String, NotificationResponse> store = new ConcurrentHashMap<>();

    @Override
    public NotificationResponse save(NotificationResponse notification) {
        if (notification.getNotificationId() == null) {
            notification.setNotificationId(UUID.randomUUID().toString());
        }
        store.put(notification.getNotificationId(), notification);
        log.debug("Saved notification with id: {}", notification.getNotificationId());
        return notification;
    }

    @Override
    public Optional<NotificationResponse> findById(String notificationId) {
        NotificationResponse notification = store.get(notificationId);
        if (notification != null) {
            log.debug("Found notification with id: {}", notificationId);
        } else {
            log.debug("Notification not found with id: {}", notificationId);
        }
        return Optional.ofNullable(notification);
    }

    @Override
    public List<NotificationResponse> findByRecipient(String recipient) {
        log.debug("Finding notifications for recipient: {}", recipient);
        return store.values().stream()
                .filter(n -> recipient.equals(n.getRecipient()))
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationResponse> findAll() {
        log.debug("Finding all notifications, count: {}", store.size());
        return new ArrayList<>(store.values());
    }
}

