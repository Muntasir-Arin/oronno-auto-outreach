package avash.oronno.usermanagementservice.controller;

import avash.oronno.config.response.ApiResponse;
import avash.oronno.datamodel.request.ChangePasswordRequest;
import avash.oronno.datamodel.request.FirebaseTokenRequest;
import avash.oronno.datamodel.request.LoginRequest;
import avash.oronno.datamodel.request.RefreshTokenRequest;
import avash.oronno.datamodel.request.UserProfileUpdateRequest;
import avash.oronno.datamodel.request.UserRegistrationRequest;
import avash.oronno.datamodel.response.AuthResponse;
import avash.oronno.datamodel.response.AuthUserResponse;
import avash.oronno.usermanagementservice.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "User Management Service");
        health.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(ApiResponse.success("User Management Service is healthy", health));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest loginRequest,
            HttpServletResponse response) {
        log.info("Received login request for user: {}", loginRequest.getUsername());
        AuthResponse authResponse = authService.login(loginRequest, response);
        log.info("Login successful for user: {}", loginRequest.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthUserResponse>> register(
            @Valid @RequestBody UserRegistrationRequest registrationRequest) {
        log.info("Received registration request for user: {}, email: {}", 
                 registrationRequest.getUsername(), registrationRequest.getEmail());
        AuthUserResponse userResponse = authService.register(registrationRequest);
        log.info("Registration successful for user: {}", registrationRequest.getUsername());
        return ResponseEntity.ok(ApiResponse.success("User registered successfully", userResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response) {
        log.info("Received logout request");
        authService.logout(response);
        log.info("Logout successful");
        return ResponseEntity.ok(ApiResponse.success("Logout successful", null));
    }

    @PostMapping("/firebase")
    public ResponseEntity<ApiResponse<AuthResponse>> firebaseSignIn(
            @Valid @RequestBody FirebaseTokenRequest tokenRequest,
            HttpServletResponse response) {
        log.info("Received Firebase sign in request");
        AuthResponse authResponse = authService.firebaseSignIn(tokenRequest, response);
        log.info("Firebase sign in successful");
        return ResponseEntity.ok(ApiResponse.success("Firebase sign in successful", authResponse));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
            @Valid @RequestBody RefreshTokenRequest refreshTokenRequest,
            HttpServletResponse response) {
        log.debug("Received token refresh request");
        AuthResponse authResponse = authService.refreshToken(refreshTokenRequest, response);
        log.info("Token refresh successful");
        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", authResponse));
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        log.info("Received change password request");
        authService.changePassword(changePasswordRequest);
        log.info("Password change successful");
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully", null));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<AuthUserResponse>> updateProfile(
            @Valid @RequestBody UserProfileUpdateRequest profileRequest) {
        log.info("Received profile update request for user: {}", profileRequest.getUsername());
        AuthUserResponse userResponse = authService.updateProfile(profileRequest);
        log.info("Profile update successful for user: {}", profileRequest.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", userResponse));
    }
}

