package avash.oronno.campaignmanagementservice.dto;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

public record CampaignResponse(UUID id, String name, String description, String channel, 
                                Map<String, Object> templateConfig, Instant scheduledAt, String status) {}

