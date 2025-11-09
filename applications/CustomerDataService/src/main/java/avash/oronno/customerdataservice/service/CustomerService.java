package avash.oronno.customerdataservice.service;

import avash.oronno.customerdataservice.dto.CreateCustomerRequest;
import avash.oronno.customerdataservice.dto.CustomerResponse;
import avash.oronno.customerdataservice.dto.UpdateCustomerRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CustomerService {
    CustomerResponse create(CreateCustomerRequest request);
    List<CustomerResponse> list();
    Optional<CustomerResponse> get(UUID id);
    Optional<CustomerResponse> update(UUID id, UpdateCustomerRequest request);
    boolean delete(UUID id);
}
