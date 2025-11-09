package avash.oronno.dnclistservice.controller;

import avash.oronno.dnclistservice.dto.DNCCheckRequest;
import avash.oronno.dnclistservice.dto.DNCCheckResponse;
import avash.oronno.dnclistservice.service.DNCListService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/dnc")
@RequiredArgsConstructor
public class DNCListController {

    private final DNCListService dncListService;

    @PostMapping("/check")
    public ResponseEntity<DNCCheckResponse> checkDNC(@Valid @RequestBody DNCCheckRequest request) {
        log.info("Received DNC check request for phone number: {}", request.getPhoneNumber());
        DNCCheckResponse response = dncListService.checkDNC(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addToDNC(
            @RequestParam String phoneNumber,
            @RequestParam(defaultValue = "CUSTOM") String source) {
        log.info("Adding phone number to DNC list: {}, Source: {}", phoneNumber, source);
        dncListService.addToDNC(phoneNumber, source);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFromDNC(@RequestParam String phoneNumber) {
        log.info("Removing phone number from DNC list: {}", phoneNumber);
        dncListService.removeFromDNC(phoneNumber);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check/{phoneNumber}")
    public ResponseEntity<Boolean> isDNC(@PathVariable String phoneNumber) {
        log.debug("Checking DNC status for phone number: {}", phoneNumber);
        return ResponseEntity.ok(dncListService.isDNC(phoneNumber));
    }

    @GetMapping("/all")
    public ResponseEntity<List<String>> getAllDNC() {
        log.debug("Retrieving all DNC phone numbers");
        return ResponseEntity.ok(dncListService.getAllDNC());
    }

    @PostMapping("/sync/national")
    public ResponseEntity<Void> syncNationalDNC() {
        log.info("Syncing national DNC list");
        dncListService.syncNationalDNC();
        return ResponseEntity.ok().build();
    }
}

