package avash.oronno.config.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@Order(1)
public class UserContextFilter extends OncePerRequestFilter {

    private static final String USER_ID_HEADER = "X-User-Id";
    private static final String USERNAME_HEADER = "X-User-Username";
    private static final String USER_EMAIL_HEADER = "X-User-Email";
    private static final String USER_ROLES_HEADER = "X-User-Roles";
    private static final String USER_PERMISSIONS_HEADER = "X-User-Permissions";
    private static final String GATEWAY_SOURCE_HEADER = "X-Gateway-Source";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        try {
            String gatewaySource = request.getHeader(GATEWAY_SOURCE_HEADER);
            
            if ("gateway-service".equals(gatewaySource)) {
                String userId = request.getHeader(USER_ID_HEADER);
                String username = request.getHeader(USERNAME_HEADER);
                String email = request.getHeader(USER_EMAIL_HEADER);
                String roles = request.getHeader(USER_ROLES_HEADER);
                String permissions = request.getHeader(USER_PERMISSIONS_HEADER);

                if (username != null && !username.trim().isEmpty()) {
                    MDC.put("userId", userId != null ? userId : "");
                    MDC.put("username", username);
                    MDC.put("email", email != null ? email : "");
                    MDC.put("roles", roles != null ? roles : "");
                    MDC.put("permissions", permissions != null ? permissions : "");

                    log.debug("User context populated from gateway headers: userId={}, username={}, permissions={}", 
                               userId, username, permissions);
                } else {
                    log.debug("No user context found in gateway headers for request: {}", request.getRequestURI());
                }
            } else {
                log.debug("Request not from gateway service, skipping user context extraction");
            }

            filterChain.doFilter(request, response);
            
        } finally {
            MDC.clear();
        }
    }
}

