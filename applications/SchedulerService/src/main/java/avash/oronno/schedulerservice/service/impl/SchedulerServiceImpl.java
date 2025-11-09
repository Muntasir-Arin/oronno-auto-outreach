package avash.oronno.schedulerservice.service.impl;

import avash.oronno.schedulerservice.dto.ScheduleRequest;
import avash.oronno.schedulerservice.dto.ScheduleResponse;
import avash.oronno.schedulerservice.repository.ScheduleRepository;
import avash.oronno.schedulerservice.service.SchedulerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class SchedulerServiceImpl implements SchedulerService {
    
    private final ScheduleRepository scheduleRepository;

    public SchedulerServiceImpl(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public ScheduleResponse scheduleJob(ScheduleRequest request) {
        log.info("Scheduling job - Type: {}, TargetId: {}, ScheduledAt: {}", 
                 request.getJobType(), request.getTargetId(), request.getScheduledAt());
        
        // TODO: Implement actual scheduling logic (e.g., using Quartz)
        ScheduleResponse response = new ScheduleResponse();
        response.setScheduleId(UUID.randomUUID().toString());
        response.setJobType(request.getJobType());
        response.setTargetId(request.getTargetId());
        response.setScheduledAt(request.getScheduledAt());
        response.setStatus("SCHEDULED");
        response.setTimezone(request.getTimezone());
        response.setCronExpression(request.getCronExpression());
        
        ScheduleResponse saved = scheduleRepository.save(response);
        log.info("Job scheduled with id: {}", saved.getScheduleId());
        return saved;
    }

    @Override
    public Optional<ScheduleResponse> getSchedule(String scheduleId) {
        log.debug("Retrieving schedule with id: {}", scheduleId);
        return scheduleRepository.findById(scheduleId);
    }

    @Override
    public List<ScheduleResponse> getSchedulesByJobType(String jobType) {
        log.debug("Retrieving schedules for jobType: {}", jobType);
        return scheduleRepository.findByJobType(jobType);
    }

    @Override
    public List<ScheduleResponse> getSchedulesByTarget(String targetId) {
        log.debug("Retrieving schedules for targetId: {}", targetId);
        return scheduleRepository.findByTargetId(targetId);
    }

    @Override
    public void cancelSchedule(String scheduleId) {
        log.info("Cancelling schedule with id: {}", scheduleId);
        Optional<ScheduleResponse> scheduleOpt = scheduleRepository.findById(scheduleId);
        if (scheduleOpt.isEmpty()) {
            log.warn("Schedule not found with id: {}", scheduleId);
            throw new RuntimeException("Schedule not found");
        }
        
        ScheduleResponse schedule = scheduleOpt.get();
        schedule.setStatus("CANCELLED");
        scheduleRepository.save(schedule);
        log.info("Schedule cancelled with id: {}", scheduleId);
    }

    @Override
    public ScheduleResponse updateScheduleStatus(String scheduleId, String status) {
        log.info("Updating schedule status for scheduleId: {} to status: {}", scheduleId, status);
        Optional<ScheduleResponse> scheduleOpt = scheduleRepository.findById(scheduleId);
        if (scheduleOpt.isEmpty()) {
            log.warn("Schedule not found with id: {}", scheduleId);
            throw new RuntimeException("Schedule not found");
        }
        
        ScheduleResponse schedule = scheduleOpt.get();
        schedule.setStatus(status);
        if ("COMPLETED".equals(status) || "RUNNING".equals(status)) {
            schedule.setExecutedAt(LocalDateTime.now());
        }
        return scheduleRepository.save(schedule);
    }
}

