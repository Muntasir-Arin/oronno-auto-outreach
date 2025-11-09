package avash.oronno.analyticsservice.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class MetricsRequest {
    private String campaignId;
    private String customerId;
    private String metricType; // CAMPAIGN_PERFORMANCE, CUSTOMER_BEHAVIOR, etc.
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Map<String, Object> filters;
}

