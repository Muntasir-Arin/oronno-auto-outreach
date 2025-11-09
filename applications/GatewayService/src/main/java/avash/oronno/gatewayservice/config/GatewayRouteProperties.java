package avash.oronno.gatewayservice.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.gateway.route.RouteDefinition;

import java.util.Map;

@Getter
@ConfigurationProperties("gateway.cloud.gateway")
public class GatewayRouteProperties {

    @Setter
    private Map<String, RouteDefinition> routes;

}

