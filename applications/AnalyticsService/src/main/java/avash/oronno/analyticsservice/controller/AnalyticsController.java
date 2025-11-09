package avash.oronno.analyticsservice.controller;

import avash.oronno.analyticsservice.dto.MetricsRequest;
import avash.oronno.analyticsservice.dto.MetricsResponse;
import avash.oronno.analyticsservice.service.AnalyticsService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @PostMapping("/metrics")
    public ResponseEntity<MetricsResponse> aggregateMetrics(@Valid @RequestBody MetricsRequest request) {
        log.info("Received metrics aggregation request - Type: {}", request.getMetricType());
        MetricsResponse response = analyticsService.aggregateMetrics(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/metrics/{metricsId}")
    public ResponseEntity<MetricsResponse> getMetrics(@PathVariable String metricsId) {
        log.debug("Retrieving metrics with id: {}", metricsId);
        Optional<MetricsResponse> metrics = analyticsService.getMetrics(metricsId);
        return metrics.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/campaigns/{campaignId}/metrics")
    public ResponseEntity<List<MetricsResponse>> getCampaignMetrics(@PathVariable String campaignId) {
        log.debug("Retrieving metrics for campaignId: {}", campaignId);
        return ResponseEntity.ok(analyticsService.getCampaignMetrics(campaignId));
    }

    @PostMapping("/campaigns/{campaignId}/performance")
    public ResponseEntity<MetricsResponse> trackCampaignPerformance(@PathVariable String campaignId) {
        log.info("Tracking campaign performance for campaignId: {}", campaignId);
        MetricsResponse response = analyticsService.trackCampaignPerformance(campaignId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/customers/{customerId}/behavior")
    public ResponseEntity<MetricsResponse> analyzeCustomerBehavior(@PathVariable String customerId) {
        log.info("Analyzing customer behavior for customerId: {}", customerId);
        MetricsResponse response = analyticsService.analyzeCustomerBehavior(customerId);
        return ResponseEntity.ok(response);
    }
}

