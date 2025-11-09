package avash.oronno.bulkimportservice.controller;

import avash.oronno.bulkimportservice.dto.ImportOptions;
import avash.oronno.bulkimportservice.dto.JobResponse;
import avash.oronno.bulkimportservice.dto.JobStatusResponse;
import avash.oronno.bulkimportservice.service.ImportService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/import")
@RequiredArgsConstructor
public class ImportController {

    private final ImportService importService;

    @PostMapping(value = "/customers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<JobResponse> importCustomers(
            @RequestPart("file") MultipartFile file,
            @RequestPart(value = "options", required = false) @Valid ImportOptions options) {
        log.info("Received import request - File: {}, Options: {}", file.getOriginalFilename(), options);
        JobResponse job = importService.startCustomerImport(file, options);
        return ResponseEntity.accepted().body(job);
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<JobStatusResponse> getJobStatus(@PathVariable UUID jobId) {
        log.debug("Retrieving job status for jobId: {}", jobId);
        Optional<JobStatusResponse> status = importService.getJobStatus(jobId);
        return status.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
