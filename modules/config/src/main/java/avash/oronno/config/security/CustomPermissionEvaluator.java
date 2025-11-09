package avash.oronno.config.security;

import avash.oronno.config.exception.InsufficientPermissionException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Slf4j
@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        return checkPermission(permission);
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        return checkPermission(permission);
    }

    private boolean checkPermission(Object permission) {
        try {
            log.debug("Checking permission: {}", permission);
            
            if (permission == null || permission.toString().trim().isEmpty()) {
                log.debug("Permission is null or empty, returning false");
                return false;
            }

            String username = MDC.get("username");
            String userPermissions = MDC.get("permissions");
            
            log.debug("MDC values - username: {}, permissions: {}", username, userPermissions);
            
            if (username == null || username.trim().isEmpty()) {
                InsufficientPermissionException ex = new InsufficientPermissionException(permission.toString(), 
                    "User not authenticated or username not found in context");
                log.error("User not authenticated - throwing exception: {}", ex.getMessage());
                throw ex;
            }

            if (userPermissions == null || userPermissions.trim().isEmpty()) {
                InsufficientPermissionException ex = new InsufficientPermissionException(permission.toString(), 
                    "User has no permissions assigned");
                log.error("User has no permissions - throwing exception: {}", ex.getMessage());
                throw ex;
            }

            String[] permissions = userPermissions.split(",");
            for (String userPermission : permissions) {
                if (userPermission.trim().equals(permission.toString().trim())) {
                    log.debug("Permission {} found in user permissions", permission);
                    return true;
                }
            }
            
            InsufficientPermissionException ex = new InsufficientPermissionException(permission.toString(), 
                "Required permission '" + permission.toString() + "' not found in user's permissions");
            log.error("Permission {} not found in user permissions - throwing exception: {}", permission, ex.getMessage());
            throw ex;
            
        } catch (Exception e) {
            log.error("Unexpected error during permission check for {}: {}", permission, e.getMessage(), e);
            throw e;
        }
    }
}

