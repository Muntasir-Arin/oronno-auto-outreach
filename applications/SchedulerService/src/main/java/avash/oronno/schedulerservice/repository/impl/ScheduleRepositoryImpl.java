package avash.oronno.schedulerservice.repository.impl;

import avash.oronno.schedulerservice.dto.ScheduleResponse;
import avash.oronno.schedulerservice.repository.ScheduleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Repository
public class ScheduleRepositoryImpl implements ScheduleRepository {
    
    private final Map<String, ScheduleResponse> store = new ConcurrentHashMap<>();

    @Override
    public ScheduleResponse save(ScheduleResponse schedule) {
        if (schedule.getScheduleId() == null) {
            schedule.setScheduleId(UUID.randomUUID().toString());
        }
        store.put(schedule.getScheduleId(), schedule);
        log.debug("Saved schedule with id: {}", schedule.getScheduleId());
        return schedule;
    }

    @Override
    public Optional<ScheduleResponse> findById(String scheduleId) {
        ScheduleResponse schedule = store.get(scheduleId);
        if (schedule != null) {
            log.debug("Found schedule with id: {}", scheduleId);
        } else {
            log.debug("Schedule not found with id: {}", scheduleId);
        }
        return Optional.ofNullable(schedule);
    }

    @Override
    public List<ScheduleResponse> findByJobType(String jobType) {
        log.debug("Finding schedules for jobType: {}", jobType);
        return store.values().stream()
                .filter(s -> jobType.equals(s.getJobType()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleResponse> findByTargetId(String targetId) {
        log.debug("Finding schedules for targetId: {}", targetId);
        return store.values().stream()
                .filter(s -> targetId.equals(s.getTargetId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleResponse> findAll() {
        log.debug("Finding all schedules, count: {}", store.size());
        return new ArrayList<>(store.values());
    }
}

