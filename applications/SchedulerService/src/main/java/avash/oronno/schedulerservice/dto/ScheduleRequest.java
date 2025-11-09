package avash.oronno.schedulerservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ScheduleRequest {
    @NotBlank
    private String jobType; // CAMPAIGN, RETRY, DNC_SYNC, etc.
    @NotBlank
    private String targetId; // Campaign ID, etc.
    @NotBlank
    private LocalDateTime scheduledAt;
    private String timezone;
    private String cronExpression;
    private Map<String, Object> jobData;
}

