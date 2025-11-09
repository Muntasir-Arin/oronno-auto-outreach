package avash.oronno.gatewayservice.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import reactor.core.publisher.Mono;

@Configuration
public class RateLimitConfig {

    @Bean
    @Primary
    public KeyResolver userKeyResolver() {
        return exchange -> {
            String userId = exchange.getRequest().getHeaders().getFirst("X-User-Id");
            if (userId != null && !userId.trim().isEmpty()) {
                return Mono.just("user:" + userId);
            }
            
            String ipAddress = exchange.getRequest().getRemoteAddress() != null ? 
                             exchange.getRequest().getRemoteAddress().getAddress().getHostAddress() : 
                             "unknown";
            return Mono.just("ip:" + ipAddress);
        };
    }

    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> {
            String ipAddress = exchange.getRequest().getRemoteAddress() != null ? 
                             exchange.getRequest().getRemoteAddress().getAddress().getHostAddress() : 
                             "unknown";
            return Mono.just("ip:" + ipAddress);
        };
    }
}

