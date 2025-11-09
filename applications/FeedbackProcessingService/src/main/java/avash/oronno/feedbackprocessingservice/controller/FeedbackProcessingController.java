package avash.oronno.feedbackprocessingservice.controller;

import avash.oronno.feedbackprocessingservice.dto.FeedbackRequest;
import avash.oronno.feedbackprocessingservice.dto.FeedbackResponse;
import avash.oronno.feedbackprocessingservice.service.FeedbackProcessingService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/feedback")
@RequiredArgsConstructor
public class FeedbackProcessingController {

    private final FeedbackProcessingService feedbackProcessingService;

    @PostMapping
    public ResponseEntity<FeedbackResponse> processFeedback(@Valid @RequestBody FeedbackRequest request) {
        log.info("Received feedback processing request - CustomerId: {}, CampaignId: {}", 
                 request.getCustomerId(), request.getCampaignId());
        FeedbackResponse response = feedbackProcessingService.processFeedback(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{feedbackId}")
    public ResponseEntity<FeedbackResponse> getFeedback(@PathVariable String feedbackId) {
        log.debug("Retrieving feedback with id: {}", feedbackId);
        Optional<FeedbackResponse> feedback = feedbackProcessingService.getFeedback(feedbackId);
        return feedback.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/campaigns/{campaignId}")
    public ResponseEntity<List<FeedbackResponse>> getFeedbackByCampaign(@PathVariable String campaignId) {
        log.debug("Retrieving feedback for campaignId: {}", campaignId);
        return ResponseEntity.ok(feedbackProcessingService.getFeedbackByCampaign(campaignId));
    }

    @GetMapping("/customers/{customerId}")
    public ResponseEntity<List<FeedbackResponse>> getFeedbackByCustomer(@PathVariable String customerId) {
        log.debug("Retrieving feedback for customerId: {}", customerId);
        return ResponseEntity.ok(feedbackProcessingService.getFeedbackByCustomer(customerId));
    }

    @PostMapping("/{feedbackId}/categorize")
    public ResponseEntity<FeedbackResponse> categorizeFeedback(@PathVariable String feedbackId) {
        log.info("Categorizing feedback with id: {}", feedbackId);
        FeedbackResponse response = feedbackProcessingService.categorizeFeedback(feedbackId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{feedbackId}/sentiment")
    public ResponseEntity<FeedbackResponse> analyzeSentiment(@PathVariable String feedbackId) {
        log.info("Analyzing sentiment for feedbackId: {}", feedbackId);
        FeedbackResponse response = feedbackProcessingService.analyzeSentiment(feedbackId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{feedbackId}/issues")
    public ResponseEntity<List<String>> detectIssues(@PathVariable String feedbackId) {
        log.info("Detecting issues for feedbackId: {}", feedbackId);
        List<String> issues = feedbackProcessingService.detectIssues(feedbackId);
        return ResponseEntity.ok(issues);
    }
}

