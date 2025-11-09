package avash.oronno.campaignmanagementservice.repository;

import avash.oronno.campaignmanagementservice.dto.CampaignResponse;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CampaignRepository {
    CampaignResponse save(CampaignResponse campaign);
    Optional<CampaignResponse> findById(UUID id);
    List<CampaignResponse> findAll();
    void deleteById(UUID id);
}

