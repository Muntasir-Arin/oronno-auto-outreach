package avash.oronno.schedulerservice.controller;

import avash.oronno.schedulerservice.dto.ScheduleRequest;
import avash.oronno.schedulerservice.dto.ScheduleResponse;
import avash.oronno.schedulerservice.service.SchedulerService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/scheduler")
@RequiredArgsConstructor
public class SchedulerController {

    private final SchedulerService schedulerService;

    @PostMapping("/schedule")
    public ResponseEntity<ScheduleResponse> scheduleJob(@Valid @RequestBody ScheduleRequest request) {
        log.info("Received schedule job request - Type: {}, TargetId: {}", request.getJobType(), request.getTargetId());
        ScheduleResponse response = schedulerService.scheduleJob(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/schedules/{scheduleId}")
    public ResponseEntity<ScheduleResponse> getSchedule(@PathVariable String scheduleId) {
        log.debug("Retrieving schedule with id: {}", scheduleId);
        Optional<ScheduleResponse> schedule = schedulerService.getSchedule(scheduleId);
        return schedule.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/jobs/{jobType}")
    public ResponseEntity<List<ScheduleResponse>> getSchedulesByJobType(@PathVariable String jobType) {
        log.debug("Retrieving schedules for jobType: {}", jobType);
        return ResponseEntity.ok(schedulerService.getSchedulesByJobType(jobType));
    }

    @GetMapping("/targets/{targetId}")
    public ResponseEntity<List<ScheduleResponse>> getSchedulesByTarget(@PathVariable String targetId) {
        log.debug("Retrieving schedules for targetId: {}", targetId);
        return ResponseEntity.ok(schedulerService.getSchedulesByTarget(targetId));
    }

    @DeleteMapping("/schedules/{scheduleId}")
    public ResponseEntity<Void> cancelSchedule(@PathVariable String scheduleId) {
        log.info("Cancelling schedule with id: {}", scheduleId);
        schedulerService.cancelSchedule(scheduleId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/schedules/{scheduleId}/status")
    public ResponseEntity<ScheduleResponse> updateScheduleStatus(
            @PathVariable String scheduleId,
            @RequestParam String status) {
        log.info("Updating schedule status for scheduleId: {} to status: {}", scheduleId, status);
        ScheduleResponse response = schedulerService.updateScheduleStatus(scheduleId, status);
        return ResponseEntity.ok(response);
    }
}

