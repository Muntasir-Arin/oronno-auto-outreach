package avash.oronno.customerdataservice.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UpdateCustomerRequest {
    private String name;
    @Email
    private String email;
    private String phone;
}

