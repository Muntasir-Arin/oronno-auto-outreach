package avash.oronno.bulkimportservice.repository.impl;

import avash.oronno.bulkimportservice.dto.JobStatusResponse;
import avash.oronno.bulkimportservice.repository.ImportJobRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
public class ImportJobRepositoryImpl implements ImportJobRepository {
    
    private final Map<UUID, JobStatusResponse> jobStore = new ConcurrentHashMap<>();

    @Override
    public void saveJobStatus(UUID jobId, JobStatusResponse status) {
        jobStore.put(jobId, status);
        log.debug("Saved job status for jobId: {}", jobId);
    }

    @Override
    public Optional<JobStatusResponse> findJobStatus(UUID jobId) {
        JobStatusResponse status = jobStore.get(jobId);
        if (status != null) {
            log.debug("Found job status for jobId: {}", jobId);
        } else {
            log.debug("Job status not found for jobId: {}", jobId);
        }
        return Optional.ofNullable(status);
    }
}

