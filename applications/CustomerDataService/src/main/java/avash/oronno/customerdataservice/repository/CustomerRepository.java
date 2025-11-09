package avash.oronno.customerdataservice.repository;

import avash.oronno.customerdataservice.dto.CustomerResponse;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CustomerRepository {
    CustomerResponse save(CustomerResponse customer);
    Optional<CustomerResponse> findById(UUID id);
    List<CustomerResponse> findAll();
    void deleteById(UUID id);
}

