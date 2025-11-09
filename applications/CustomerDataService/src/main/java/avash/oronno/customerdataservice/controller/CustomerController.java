package avash.oronno.customerdataservice.controller;

import avash.oronno.customerdataservice.dto.CreateCustomerRequest;
import avash.oronno.customerdataservice.dto.CustomerResponse;
import avash.oronno.customerdataservice.dto.UpdateCustomerRequest;
import avash.oronno.customerdataservice.service.CustomerService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<CustomerResponse> create(@Valid @RequestBody CreateCustomerRequest req) {
        log.info("Received create customer request - Name: {}, Email: {}", req.getName(), req.getEmail());
        CustomerResponse created = customerService.create(req);
        log.info("Created customer with id: {}", created.id());
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponse>> list() {
        log.debug("Retrieving all customers");
        return ResponseEntity.ok(customerService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> get(@PathVariable UUID id) {
        log.debug("Retrieving customer with id: {}", id);
        Optional<CustomerResponse> resp = customerService.get(id);
        return resp.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> update(@PathVariable UUID id, @Valid @RequestBody UpdateCustomerRequest req) {
        log.info("Received update customer request - Id: {}", id);
        return customerService.update(id, req)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        log.info("Received delete customer request - Id: {}", id);
        boolean deleted = customerService.delete(id);
        if (deleted) {
            log.info("Deleted customer with id: {}", id);
        } else {
            log.warn("Customer not found for deletion with id: {}", id);
        }
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
