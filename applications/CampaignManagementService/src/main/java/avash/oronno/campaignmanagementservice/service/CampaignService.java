package avash.oronno.campaignmanagementservice.service;

import avash.oronno.campaignmanagementservice.dto.CampaignResponse;
import avash.oronno.campaignmanagementservice.dto.CreateCampaignRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CampaignService {
    CampaignResponse create(CreateCampaignRequest request);
    List<CampaignResponse> list();
    Optional<CampaignResponse> get(UUID id);
}
