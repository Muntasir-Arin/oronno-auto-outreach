package avash.oronno.schedulerservice.repository;

import avash.oronno.schedulerservice.dto.ScheduleResponse;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository {
    ScheduleResponse save(ScheduleResponse schedule);
    Optional<ScheduleResponse> findById(String scheduleId);
    List<ScheduleResponse> findByJobType(String jobType);
    List<ScheduleResponse> findByTargetId(String targetId);
    List<ScheduleResponse> findAll();
}

