package avash.oronno.bulkimportservice.service;

import avash.oronno.bulkimportservice.dto.ImportOptions;
import avash.oronno.bulkimportservice.dto.JobResponse;
import avash.oronno.bulkimportservice.dto.JobStatusResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

public interface ImportService {
    JobResponse startCustomerImport(MultipartFile file, ImportOptions options);
    Optional<JobStatusResponse> getJobStatus(UUID jobId);
}
