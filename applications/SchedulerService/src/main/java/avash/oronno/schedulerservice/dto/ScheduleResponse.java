package avash.oronno.schedulerservice.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ScheduleResponse {
    private String scheduleId;
    private String jobType;
    private String targetId;
    private String status; // SCHEDULED, RUNNING, COMPLETED, FAILED
    private LocalDateTime scheduledAt;
    private LocalDateTime executedAt;
    private String timezone;
    private String cronExpression;
}

