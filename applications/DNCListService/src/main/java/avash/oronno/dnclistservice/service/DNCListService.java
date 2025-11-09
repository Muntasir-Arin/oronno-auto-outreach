package avash.oronno.dnclistservice.service;

import avash.oronno.dnclistservice.dto.DNCCheckRequest;
import avash.oronno.dnclistservice.dto.DNCCheckResponse;

import java.util.List;
import java.util.Optional;

public interface DNCListService {
    DNCCheckResponse checkDNC(DNCCheckRequest request);
    void addToDNC(String phoneNumber, String source);
    void removeFromDNC(String phoneNumber);
    boolean isDNC(String phoneNumber);
    List<String> getAllDNC();
    void syncNationalDNC();
}

