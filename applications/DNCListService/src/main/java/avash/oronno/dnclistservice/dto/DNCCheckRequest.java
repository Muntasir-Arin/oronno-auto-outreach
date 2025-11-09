package avash.oronno.dnclistservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DNCCheckRequest {
    @NotBlank
    private String phoneNumber;
    private String countryCode;
}

