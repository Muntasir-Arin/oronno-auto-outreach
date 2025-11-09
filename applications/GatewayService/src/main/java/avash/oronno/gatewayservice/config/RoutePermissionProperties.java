package avash.oronno.gatewayservice.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableConfigurationProperties
@Getter
@Setter
@ConfigurationProperties("gateway.routes.permissions")
public class RoutePermissionProperties {
    
    private Map<String, String> routePermissions = new HashMap<>();
}

