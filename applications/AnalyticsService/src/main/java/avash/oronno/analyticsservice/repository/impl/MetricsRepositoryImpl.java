package avash.oronno.analyticsservice.repository.impl;

import avash.oronno.analyticsservice.dto.MetricsResponse;
import avash.oronno.analyticsservice.repository.MetricsRepository;
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
public class MetricsRepositoryImpl implements MetricsRepository {
    
    private final Map<String, MetricsResponse> store = new ConcurrentHashMap<>();

    @Override
    public MetricsResponse save(MetricsResponse metrics) {
        if (metrics.getMetricsId() == null) {
            metrics.setMetricsId(UUID.randomUUID().toString());
        }
        store.put(metrics.getMetricsId(), metrics);
        log.debug("Saved metrics with id: {}", metrics.getMetricsId());
        return metrics;
    }

    @Override
    public Optional<MetricsResponse> findById(String metricsId) {
        MetricsResponse metrics = store.get(metricsId);
        if (metrics != null) {
            log.debug("Found metrics with id: {}", metricsId);
        } else {
            log.debug("Metrics not found with id: {}", metricsId);
        }
        return Optional.ofNullable(metrics);
    }

    @Override
    public List<MetricsResponse> findByCampaignId(String campaignId) {
        log.debug("Finding metrics for campaignId: {}", campaignId);
        return store.values().stream()
                .filter(m -> campaignId.equals(m.getCampaignId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<MetricsResponse> findAll() {
        log.debug("Finding all metrics, count: {}", store.size());
        return new ArrayList<>(store.values());
    }
}

