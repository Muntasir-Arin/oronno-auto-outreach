package avash.oronno.dnclistservice.repository;

import avash.oronno.dnclistservice.dto.DNCCheckResponse;

import java.util.List;
import java.util.Optional;

public interface DNCRepository {
    void addToDNC(String phoneNumber, String source);
    boolean isDNC(String phoneNumber);
    Optional<DNCCheckResponse> checkDNC(String phoneNumber);
    void removeFromDNC(String phoneNumber);
    List<String> getAllDNC();
}

