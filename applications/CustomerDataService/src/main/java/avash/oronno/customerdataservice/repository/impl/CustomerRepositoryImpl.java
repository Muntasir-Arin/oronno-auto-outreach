package avash.oronno.customerdataservice.repository.impl;

import avash.oronno.customerdataservice.dto.CustomerResponse;
import avash.oronno.customerdataservice.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
public class CustomerRepositoryImpl implements CustomerRepository {
    
    private final Map<UUID, CustomerResponse> store = new ConcurrentHashMap<>();

    @Override
    public CustomerResponse save(CustomerResponse customer) {
        store.put(customer.id(), customer);
        log.debug("Saved customer with id: {}", customer.id());
        return customer;
    }

    @Override
    public Optional<CustomerResponse> findById(UUID id) {
        CustomerResponse customer = store.get(id);
        if (customer != null) {
            log.debug("Found customer with id: {}", id);
        } else {
            log.debug("Customer not found with id: {}", id);
        }
        return Optional.ofNullable(customer);
    }

    @Override
    public List<CustomerResponse> findAll() {
        log.debug("Finding all customers, count: {}", store.size());
        return new ArrayList<>(store.values());
    }

    @Override
    public void deleteById(UUID id) {
        CustomerResponse removed = store.remove(id);
        if (removed != null) {
            log.debug("Deleted customer with id: {}", id);
        } else {
            log.debug("Customer not found for deletion with id: {}", id);
        }
    }
}

