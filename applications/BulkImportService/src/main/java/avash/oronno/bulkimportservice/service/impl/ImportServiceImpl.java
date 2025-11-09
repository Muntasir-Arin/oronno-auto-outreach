package avash.oronno.bulkimportservice.service.impl;

import avash.oronno.bulkimportservice.dto.ImportOptions;
import avash.oronno.bulkimportservice.dto.JobResponse;
import avash.oronno.bulkimportservice.dto.JobStatusResponse;
import avash.oronno.bulkimportservice.repository.ImportJobRepository;
import avash.oronno.bulkimportservice.service.ImportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class ImportServiceImpl implements ImportService {
    
    private final ImportJobRepository importJobRepository;

    public ImportServiceImpl(ImportJobRepository importJobRepository) {
        this.importJobRepository = importJobRepository;
    }

    @Override
    public JobResponse startCustomerImport(MultipartFile file, ImportOptions options) {
        log.info("Starting customer import - File: {}, Source: {}, ValidateOnly: {}", 
                 file.getOriginalFilename(), options.getSource(), options.isValidateOnly());
        
        UUID jobId = UUID.randomUUID();
        JobResponse jobResponse = new JobResponse(jobId, "CUSTOMER_IMPORT", "PENDING");
        
        // Initialize job status
        JobStatusResponse initialStatus = new JobStatusResponse(
            jobId, "PENDING", "Import job created", 0, 0
        );
        importJobRepository.saveJobStatus(jobId, initialStatus);
        
        log.info("Created import job with ID: {}", jobId);
        
        // TODO: Implement actual import logic (async processing)
        
        return jobResponse;
    }

    @Override
    public Optional<JobStatusResponse> getJobStatus(UUID jobId) {
        log.debug("Retrieving job status for jobId: {}", jobId);
        return importJobRepository.findJobStatus(jobId);
    }
}

