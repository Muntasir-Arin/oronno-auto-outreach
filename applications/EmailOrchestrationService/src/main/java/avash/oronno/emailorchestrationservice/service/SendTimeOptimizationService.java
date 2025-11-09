package avash.oronno.emailorchestrationservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Map;

/**
 * Send time optimization service for determining the best time to send emails.
 */
@Slf4j
@Service
public class SendTimeOptimizationService {

    // Default optimal send times (in hours, 24-hour format)
    private static final int DEFAULT_OPTIMAL_HOUR = 10; // 10 AM
    private static final int DEFAULT_OPTIMAL_HOUR_END = 14; // 2 PM

    /**
     * Calculates the optimal send time for an email based on customer timezone and preferences.
     * 
     * @param customerData Customer data including timezone and preferences
     * @return Optimal send time as LocalDateTime
     */
    public LocalDateTime calculateOptimalSendTime(Map<String, Object> customerData) {
        log.debug("Calculating optimal send time for customer");
        
        // Get customer timezone (default to UTC if not specified)
        String timezone = getStringValue(customerData, "timezone", "UTC");
        ZoneId zoneId = ZoneId.of(timezone);
        
        // Get preferred send time from customer preferences (if available)
        Integer preferredHour = getPreferredHour(customerData);
        
        // Calculate optimal time
        ZonedDateTime now = ZonedDateTime.now(zoneId);
        ZonedDateTime optimalTime;
        
        if (preferredHour != null) {
            // Use customer's preferred hour
            optimalTime = now.withHour(preferredHour).withMinute(0).withSecond(0).withNano(0);
            
            // If preferred time has passed today, schedule for tomorrow
            if (optimalTime.isBefore(now)) {
                optimalTime = optimalTime.plusDays(1);
            }
        } else {
            // Use default optimal time (10 AM in customer's timezone)
            optimalTime = now.withHour(DEFAULT_OPTIMAL_HOUR).withMinute(0).withSecond(0).withNano(0);
            
            // If default time has passed today, schedule for tomorrow
            if (optimalTime.isBefore(now)) {
                optimalTime = optimalTime.plusDays(1);
            }
        }
        
        log.debug("Optimal send time calculated: {} ({})", optimalTime, timezone);
        return optimalTime.toLocalDateTime();
    }

    /**
     * Checks if the current time is within optimal send window.
     * 
     * @param customerData Customer data
     * @return true if current time is optimal for sending
     */
    public boolean isOptimalSendTime(Map<String, Object> customerData) {
        LocalDateTime optimalTime = calculateOptimalSendTime(customerData);
        LocalDateTime now = LocalDateTime.now();
        
        // Check if we're within 1 hour of optimal time
        return Math.abs(java.time.Duration.between(now, optimalTime).toHours()) <= 1;
    }

    private String getStringValue(Map<String, Object> data, String key, String defaultValue) {
        Object value = data.get(key);
        return value != null ? value.toString() : defaultValue;
    }

    private Integer getPreferredHour(Map<String, Object> customerData) {
        Object preferredHour = customerData.get("preferredSendHour");
        if (preferredHour instanceof Integer) {
            return (Integer) preferredHour;
        } else if (preferredHour instanceof String) {
            try {
                return Integer.parseInt((String) preferredHour);
            } catch (NumberFormatException e) {
                log.warn("Invalid preferred send hour: {}", preferredHour);
            }
        }
        return null;
    }
}

