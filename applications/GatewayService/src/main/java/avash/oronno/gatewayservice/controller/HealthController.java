package avash.oronno.gatewayservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Mono<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "gateway-service");
        health.put("timestamp", System.currentTimeMillis());
        return Mono.just(health);
    }

    @GetMapping("/info")
    public Mono<Map<String, Object>> info() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", "Gateway Service");
        info.put("version", "1.0.0");
        info.put("description", "Central gateway for all microservices");
        info.put("features", new String[]{
            "JWT Authentication",
            "Service Routing",
            "Rate Limiting",
            "CORS Support",
            "Permission Checking",
            "MDC Context"
        });
        return Mono.just(info);
    }
}

