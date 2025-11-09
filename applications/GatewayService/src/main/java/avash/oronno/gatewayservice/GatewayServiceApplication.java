package avash.oronno.gatewayservice;

import avash.oronno.gatewayservice.config.GatewayRouteProperties;
import avash.oronno.gatewayservice.config.RoutePermissionProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({GatewayRouteProperties.class, RoutePermissionProperties.class})
public class GatewayServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayServiceApplication.class, args);
    }
}

