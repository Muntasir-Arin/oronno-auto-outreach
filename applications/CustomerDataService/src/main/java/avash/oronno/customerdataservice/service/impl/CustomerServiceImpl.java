package avash.oronno.customerdataservice.service.impl;

import avash.oronno.customerdataservice.dto.CreateCustomerRequest;
import avash.oronno.customerdataservice.dto.CustomerResponse;
import avash.oronno.customerdataservice.dto.UpdateCustomerRequest;
import avash.oronno.customerdataservice.repository.CustomerRepository;
import avash.oronno.customerdataservice.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public CustomerResponse create(CreateCustomerRequest request) {
        log.info("Creating customer - Name: {}, Email: {}", request.getName(), request.getEmail());
        UUID id = UUID.randomUUID();
        CustomerResponse resp = new CustomerResponse(id, request.getName(), request.getEmail(), request.getPhone());
        CustomerResponse saved = customerRepository.save(resp);
        log.info("Created customer {} ({})", id, request.getEmail());
        return saved;
    }

    @Override
    public List<CustomerResponse> list() {
        log.debug("Retrieving all customers");
        return customerRepository.findAll();
    }

    @Override
    public Optional<CustomerResponse> get(UUID id) {
        log.debug("Retrieving customer with id: {}", id);
        return customerRepository.findById(id);
    }

    @Override
    public Optional<CustomerResponse> update(UUID id, UpdateCustomerRequest request) {
        log.info("Updating customer with id: {}", id);
        Optional<CustomerResponse> existingOpt = customerRepository.findById(id);
        if (existingOpt.isEmpty()) {
            log.warn("Customer not found for update with id: {}", id);
            return Optional.empty();
        }
        CustomerResponse existing = existingOpt.get();
        String name = request.getName() != null ? request.getName() : existing.name();
        String email = request.getEmail() != null ? request.getEmail() : existing.email();
        String phone = request.getPhone() != null ? request.getPhone() : existing.phone();
        CustomerResponse updated = new CustomerResponse(id, name, email, phone);
        CustomerResponse saved = customerRepository.save(updated);
        log.info("Updated customer with id: {}", id);
        return Optional.of(saved);
    }

    @Override
    public boolean delete(UUID id) {
        log.info("Deleting customer with id: {}", id);
        Optional<CustomerResponse> existing = customerRepository.findById(id);
        if (existing.isPresent()) {
            customerRepository.deleteById(id);
            log.info("Deleted customer with id: {}", id);
            return true;
        } else {
            log.warn("Customer not found for deletion with id: {}", id);
            return false;
        }
    }
}
