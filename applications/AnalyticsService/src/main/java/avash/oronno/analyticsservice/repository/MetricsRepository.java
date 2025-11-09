package avash.oronno.analyticsservice.repository;

import avash.oronno.analyticsservice.dto.MetricsResponse;

import java.util.List;
import java.util.Optional;

public interface MetricsRepository {
    MetricsResponse save(MetricsResponse metrics);
    Optional<MetricsResponse> findById(String metricsId);
    List<MetricsResponse> findByCampaignId(String campaignId);
    List<MetricsResponse> findAll();
}

