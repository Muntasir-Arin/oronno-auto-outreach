package avash.oronno.dnclistservice.service.impl;

import avash.oronno.dnclistservice.dto.DNCCheckRequest;
import avash.oronno.dnclistservice.dto.DNCCheckResponse;
import avash.oronno.dnclistservice.repository.DNCRepository;
import avash.oronno.dnclistservice.service.DNCListService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class DNCListServiceImpl implements DNCListService {
    
    private final DNCRepository dncRepository;

    public DNCListServiceImpl(DNCRepository dncRepository) {
        this.dncRepository = dncRepository;
    }

    @Override
    public DNCCheckResponse checkDNC(DNCCheckRequest request) {
        log.info("Checking DNC status for phone number: {}", request.getPhoneNumber());
        Optional<DNCCheckResponse> response = dncRepository.checkDNC(request.getPhoneNumber());
        return response.orElseGet(() -> {
            DNCCheckResponse newResponse = new DNCCheckResponse();
            newResponse.setPhoneNumber(request.getPhoneNumber());
            newResponse.setIsDNC(false);
            return newResponse;
        });
    }

    @Override
    public void addToDNC(String phoneNumber, String source) {
        log.info("Adding phone number to DNC list: {}, Source: {}", phoneNumber, source);
        dncRepository.addToDNC(phoneNumber, source);
    }

    @Override
    public void removeFromDNC(String phoneNumber) {
        log.info("Removing phone number from DNC list: {}", phoneNumber);
        dncRepository.removeFromDNC(phoneNumber);
    }

    @Override
    public boolean isDNC(String phoneNumber) {
        log.debug("Checking if phone number is DNC: {}", phoneNumber);
        return dncRepository.isDNC(phoneNumber);
    }

    @Override
    public List<String> getAllDNC() {
        log.debug("Retrieving all DNC phone numbers");
        return dncRepository.getAllDNC();
    }

    @Override
    public void syncNationalDNC() {
        log.info("Syncing national DNC list");
        // TODO: Implement actual national DNC list synchronization from external APIs
        log.info("National DNC list sync completed");
    }
}

