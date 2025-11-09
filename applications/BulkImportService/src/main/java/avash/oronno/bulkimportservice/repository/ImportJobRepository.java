package avash.oronno.bulkimportservice.repository;

import avash.oronno.bulkimportservice.dto.JobStatusResponse;

import java.util.Optional;
import java.util.UUID;

public interface ImportJobRepository {
    void saveJobStatus(UUID jobId, JobStatusResponse status);
    Optional<JobStatusResponse> findJobStatus(UUID jobId);
}

