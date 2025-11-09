package avash.oronno.bulkimportservice.dto;

import java.util.UUID;

public record JobResponse(UUID jobId, String type, String status) {}

