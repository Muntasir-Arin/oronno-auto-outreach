package avash.oronno.dnclistservice.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DNCCheckResponse {
    private String phoneNumber;
    private boolean isDNC;
    private String source; // NATIONAL, CUSTOM, etc.
    private LocalDateTime checkedAt;
    private String listVersion;
}

