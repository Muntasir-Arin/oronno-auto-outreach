package avash.oronno.bulkimportservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Map;

@Data
public class ImportOptions {
    private boolean validateOnly;
    @NotBlank(message = "source is required")
    private String source; // e.g., csv_upload, s3, gdrive
    private Map<String, Object> metadata;
}

