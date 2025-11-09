package avash.oronno.campaignmanagementservice.service.impl;

import avash.oronno.campaignmanagementservice.dto.CampaignResponse;
import avash.oronno.campaignmanagementservice.dto.CreateCampaignRequest;
import avash.oronno.campaignmanagementservice.repository.CampaignRepository;
import avash.oronno.campaignmanagementservice.service.CampaignService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignServiceImpl(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    @Override
    public CampaignResponse create(CreateCampaignRequest request) {
        log.info("Creating campaign - Name: {}, Channel: {}", request.getName(), request.getChannel());
        UUID id = UUID.randomUUID();
        Instant scheduledAt = request.getScheduledAt();
        CampaignResponse resp = new CampaignResponse(
                id,
                request.getName(),
                request.getDescription(),
                request.getChannel(),
                request.getTemplateConfig(),
                scheduledAt,
                "SCHEDULED"
        );
        CampaignResponse saved = campaignRepository.save(resp);
        log.info("Created campaign {} scheduled at {}", id, scheduledAt);
        return saved;
    }

    @Override
    public List<CampaignResponse> list() {
        log.debug("Retrieving all campaigns");
        return campaignRepository.findAll();
    }

    @Override
    public Optional<CampaignResponse> get(UUID id) {
        log.debug("Retrieving campaign with id: {}", id);
        return campaignRepository.findById(id);
    }
}
