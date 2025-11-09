package avash.oronno.analyticsservice.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class MetricsResponse {
    private String metricsId;
    private String campaignId;
    private String metricType;
    private Map<String, Object> metrics;
    private LocalDateTime timestamp;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}

