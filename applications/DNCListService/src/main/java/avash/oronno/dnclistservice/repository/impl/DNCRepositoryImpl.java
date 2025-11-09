package avash.oronno.dnclistservice.repository.impl;

import avash.oronno.dnclistservice.dto.DNCCheckResponse;
import avash.oronno.dnclistservice.repository.DNCRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
public class DNCRepositoryImpl implements DNCRepository {
    
    private final Map<String, DNCCheckResponse> store = new ConcurrentHashMap<>();

    @Override
    public void addToDNC(String phoneNumber, String source) {
        DNCCheckResponse response = new DNCCheckResponse();
        response.setPhoneNumber(phoneNumber);
        response.setIsDNC(true);
        response.setSource(source);
        response.setCheckedAt(LocalDateTime.now());
        store.put(phoneNumber, response);
        log.debug("Added phone number to DNC list: {}", phoneNumber);
    }

    @Override
    public boolean isDNC(String phoneNumber) {
        DNCCheckResponse response = store.get(phoneNumber);
        boolean isDNC = response != null && response.isIsDNC();
        log.debug("Checked DNC status for phone number: {} - Result: {}", phoneNumber, isDNC);
        return isDNC;
    }

    @Override
    public Optional<DNCCheckResponse> checkDNC(String phoneNumber) {
        DNCCheckResponse response = store.get(phoneNumber);
        if (response == null) {
            response = new DNCCheckResponse();
            response.setPhoneNumber(phoneNumber);
            response.setIsDNC(false);
            response.setCheckedAt(LocalDateTime.now());
        }
        log.debug("Checked DNC for phone number: {}", phoneNumber);
        return Optional.of(response);
    }

    @Override
    public void removeFromDNC(String phoneNumber) {
        store.remove(phoneNumber);
        log.debug("Removed phone number from DNC list: {}", phoneNumber);
    }

    @Override
    public List<String> getAllDNC() {
        log.debug("Retrieving all DNC phone numbers, count: {}", store.size());
        return new ArrayList<>(store.keySet());
    }
}

