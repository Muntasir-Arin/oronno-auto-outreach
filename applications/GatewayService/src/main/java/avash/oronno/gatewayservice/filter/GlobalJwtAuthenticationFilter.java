package avash.oronno.gatewayservice.filter;

import avash.oronno.gatewayservice.config.RoutePermissionProperties;
import avash.oronno.gatewayservice.security.UserContext;
import avash.oronno.gatewayservice.security.ReactiveJwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@Component
public class GlobalJwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final ReactiveJwtUtils jwtUtils;
    private final RoutePermissionProperties routePermissionProperties;

    private static final List<String> EXCLUDED_PATHS = Arrays.asList(
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/firebase",
        "/api/auth/health",
        "/api/auth/refresh",
        "/api/auth/validate",
        "/api/auth/logout",
        "/health"
    );

    public GlobalJwtAuthenticationFilter(ReactiveJwtUtils jwtUtils, RoutePermissionProperties routePermissionProperties) {
        this.jwtUtils = jwtUtils;
        this.routePermissionProperties = routePermissionProperties;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        
        if (isExcludedPath(path)) {
            return chain.filter(exchange);
        }

        return authenticateAndProcess(exchange, chain, path);
    }

    private Mono<Void> authenticateAndProcess(ServerWebExchange exchange, GatewayFilterChain chain, String path) {
        String token = jwtUtils.getJwtFromRequest(exchange.getRequest());
        
        if (token == null) {
            log.warn("No JWT token found in request for path: {}", path);
            return handleUnauthorized(exchange);
        }

        return Mono.fromCallable(() -> jwtUtils.validateToken(token))
            .flatMap(isValid -> {
                if (!isValid) {
                    log.warn("JWT token validation failed for path: {}", path);
                    return handleUnauthorized(exchange);
                }
                
                try {
                    UserContext userContext = extractUserContextFromToken(token);
                    
                    // Check permission for this route
                    String requiredPermission = getRequiredPermission(path);
                    if (requiredPermission != null && !userContext.hasPermission(requiredPermission)) {
                        log.warn("User {} does not have required permission: {} for path: {}", 
                                 userContext.getUsername(), requiredPermission, path);
                        return handleForbidden(exchange);
                    }
                    
                    ServerWebExchange modifiedExchange = addUserContextHeaders(exchange, userContext);
                    log.debug("JWT authentication successful for user: {} on path: {}", 
                             userContext.getUsername(), path);
                    return chain.filter(modifiedExchange);
                } catch (Exception e) {
                    log.error("Error extracting user context: {}", e.getMessage(), e);
                    return handleUnauthorized(exchange);
                }
            })
            .onErrorResume(throwable -> {
                log.error("Error during JWT processing: {}", throwable.getMessage(), throwable);
                return handleUnauthorized(exchange);
            });
    }

    private String getRequiredPermission(String path) {
        // Match path to route and get required permission
        for (Map.Entry<String, String> entry : routePermissionProperties.getRoutePermissions().entrySet()) {
            String routePattern = entry.getKey();
            if (pathMatches(path, routePattern)) {
                return entry.getValue();
            }
        }
        return null; // No permission required
    }

    private boolean pathMatches(String path, String pattern) {
        // Simple pattern matching - can be enhanced with regex
        if (pattern.endsWith("/**")) {
            String prefix = pattern.substring(0, pattern.length() - 3);
            return path.startsWith(prefix);
        }
        return path.equals(pattern);
    }

    private Mono<Void> handleUnauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }

    private Mono<Void> handleForbidden(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
        return exchange.getResponse().setComplete();
    }

    private boolean isExcludedPath(String path) {
        return EXCLUDED_PATHS.stream().anyMatch(path::startsWith);
    }

    private UserContext extractUserContextFromToken(String token) {
        String username = jwtUtils.extractUsername(token);
        Long userId = jwtUtils.extractUserId(token);
        String email = jwtUtils.extractEmail(token);
        Set<String> roles = jwtUtils.extractRoles(token);
        Set<String> permissions = jwtUtils.extractPermissions(token);

        return new UserContext(userId, username, email, null, null, roles, permissions);
    }

    private ServerWebExchange addUserContextHeaders(ServerWebExchange exchange, UserContext userContext) {
        MDC.put("username", userContext.getUsername());
        MDC.put("permissions", userContext.getPermissions() != null ? String.join(",", userContext.getPermissions()) : "");
        
        ServerHttpRequest originalRequest = exchange.getRequest();
        ServerHttpRequest.Builder requestBuilder = originalRequest.mutate()
            .header("X-User-Id", String.valueOf(userContext.getUserId()))
            .header("X-User-Username", userContext.getUsername())
            .header("X-User-Email", userContext.getEmail() != null ? userContext.getEmail() : "")
            .header("X-User-Roles", userContext.getRoles() != null ? String.join(",", userContext.getRoles()) : "")
            .header("X-User-Permissions", userContext.getPermissions() != null ? String.join(",", userContext.getPermissions()) : "")
            .header("X-Gateway-Source", "gateway-service");
        
        ServerHttpRequest modifiedRequest = requestBuilder.build();
        
        return exchange.mutate().request(modifiedRequest).build();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}

