package avash.oronno.bulkimportservice.dto;

import java.util.UUID;

public record JobStatusResponse(UUID jobId, String status, String message, int processed, int total) {}

