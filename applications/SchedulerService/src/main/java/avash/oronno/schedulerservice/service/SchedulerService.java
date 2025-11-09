package avash.oronno.schedulerservice.service;

import avash.oronno.schedulerservice.dto.ScheduleRequest;
import avash.oronno.schedulerservice.dto.ScheduleResponse;

import java.util.List;
import java.util.Optional;

public interface SchedulerService {
    ScheduleResponse scheduleJob(ScheduleRequest request);
    Optional<ScheduleResponse> getSchedule(String scheduleId);
    List<ScheduleResponse> getSchedulesByJobType(String jobType);
    List<ScheduleResponse> getSchedulesByTarget(String targetId);
    void cancelSchedule(String scheduleId);
    ScheduleResponse updateScheduleStatus(String scheduleId, String status);
}

