package avash.oronno.campaignmanagementservice.controller;

import avash.oronno.campaignmanagementservice.dto.CampaignResponse;
import avash.oronno.campaignmanagementservice.dto.CreateCampaignRequest;
import avash.oronno.campaignmanagementservice.service.CampaignService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    @PostMapping
    public ResponseEntity<CampaignResponse> create(@Valid @RequestBody CreateCampaignRequest req) {
        log.info("Received create campaign request - Name: {}, Channel: {}", req.getName(), req.getChannel());
        CampaignResponse created = campaignService.create(req);
        log.info("Created campaign with id: {}", created.id());
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<CampaignResponse>> list() {
        log.debug("Retrieving all campaigns");
        return ResponseEntity.ok(campaignService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignResponse> get(@PathVariable UUID id) {
        log.debug("Retrieving campaign with id: {}", id);
        return campaignService.get(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
