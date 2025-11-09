package avash.oronno.analyticsservice.service;

import avash.oronno.analyticsservice.dto.MetricsRequest;
import avash.oronno.analyticsservice.dto.MetricsResponse;

import java.util.List;
import java.util.Optional;

public interface AnalyticsService {
    MetricsResponse aggregateMetrics(MetricsRequest request);
    Optional<MetricsResponse> getMetrics(String metricsId);
    List<MetricsResponse> getCampaignMetrics(String campaignId);
    MetricsResponse trackCampaignPerformance(String campaignId);
    MetricsResponse analyzeCustomerBehavior(String customerId);
}

