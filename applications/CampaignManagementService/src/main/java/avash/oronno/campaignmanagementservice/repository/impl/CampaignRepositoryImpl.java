package avash.oronno.campaignmanagementservice.repository.impl;

import avash.oronno.campaignmanagementservice.dto.CampaignResponse;
import avash.oronno.campaignmanagementservice.repository.CampaignRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
public class CampaignRepositoryImpl implements CampaignRepository {
    
    private final Map<UUID, CampaignResponse> store = new ConcurrentHashMap<>();

    @Override
    public CampaignResponse save(CampaignResponse campaign) {
        store.put(campaign.id(), campaign);
        log.debug("Saved campaign with id: {}", campaign.id());
        return campaign;
    }

    @Override
    public Optional<CampaignResponse> findById(UUID id) {
        CampaignResponse campaign = store.get(id);
        if (campaign != null) {
            log.debug("Found campaign with id: {}", id);
        } else {
            log.debug("Campaign not found with id: {}", id);
        }
        return Optional.ofNullable(campaign);
    }

    @Override
    public List<CampaignResponse> findAll() {
        log.debug("Finding all campaigns, count: {}", store.size());
        return new ArrayList<>(store.values());
    }

    @Override
    public void deleteById(UUID id) {
        CampaignResponse removed = store.remove(id);
        if (removed != null) {
            log.debug("Deleted campaign with id: {}", id);
        } else {
            log.debug("Campaign not found for deletion with id: {}", id);
        }
    }
}

