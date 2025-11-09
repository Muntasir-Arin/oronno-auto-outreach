package avash.oronno.gatewayservice.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.route.RouteDefinitionWriter;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;


@Configuration
@Slf4j
public class GatewayRouteConfig {

    private final RouteDefinitionWriter writer;
    private final GatewayRouteProperties properties;

    public GatewayRouteConfig(RouteDefinitionWriter writer, GatewayRouteProperties properties) {
        this.writer = writer;
        this.properties = properties;
    }

    @PostConstruct
    public void init() {
        if (this.properties.getRoutes() != null) {
            this.properties.getRoutes().forEach((key, routeDef) -> {
                this.writer.save(Mono.just(routeDef).map(route -> {
                    route.setId(key);
                    log.info("Saving route: {}", route.getId());
                    return route;
                })).subscribe();
            });
        }
    }
}

