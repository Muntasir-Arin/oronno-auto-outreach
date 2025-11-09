package avash.oronno.usermanagementservice.service.impl;

import avash.oronno.config.exception.InvalidCredentialsException;
import avash.oronno.config.exception.UserAlreadyExistsException;
import avash.oronno.config.security.JwtUtils;
import avash.oronno.datamodel.request.ChangePasswordRequest;
import avash.oronno.datamodel.request.FirebaseTokenRequest;
import avash.oronno.datamodel.request.LoginRequest;
import avash.oronno.datamodel.request.RefreshTokenRequest;
import avash.oronno.datamodel.request.UserProfileUpdateRequest;
import avash.oronno.datamodel.request.UserRegistrationRequest;
import avash.oronno.datamodel.response.AuthResponse;
import avash.oronno.datamodel.response.AuthUserResponse;
import avash.oronno.datamodel.response.FirebaseUserInfo;
import avash.oronno.persistent.entity.Permission;
import avash.oronno.persistent.entity.Role;
import avash.oronno.persistent.entity.User;
import avash.oronno.persistent.repository.RoleRepository;
import avash.oronno.persistent.repository.UserRepository;
import avash.oronno.usermanagementservice.security.CustomUserDetails;
import avash.oronno.usermanagementservice.service.AuthService;
import avash.oronno.usermanagementservice.service.FirebaseAuthService;
import avash.oronno.usermanagementservice.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final FirebaseAuthService firebaseAuthService;
    private final RoleRepository roleRepository;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, UserService userService, FirebaseAuthService firebaseAuthService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
        this.firebaseAuthService = firebaseAuthService;
        this.roleRepository = roleRepository;
    }

    @Override
    public AuthResponse login(LoginRequest loginRequest, HttpServletResponse response) {
        log.info("Attempting login for user: {}", loginRequest.getUsername());
        User user = userRepository.findByEmail(loginRequest.getUsername())
                .orElseThrow(() -> {
                    log.warn("Login failed - User not found: {}", loginRequest.getUsername());
                    return new InvalidCredentialsException();
                });

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            log.warn("Login failed - Invalid password for user: {}", loginRequest.getUsername());
            throw new InvalidCredentialsException();
        }

        if (!user.getEnabled()) {
            log.warn("Login failed - Account disabled for user: {}", loginRequest.getUsername());
            throw new InvalidCredentialsException("Account is disabled");
        }

        User userWithRoles = userRepository.findByUsernameWithRolesAndPermissions(user.getUsername())
                .orElse(user);

        userWithRoles.setLastActiveAt(LocalDateTime.now());
        
        userRepository.save(userWithRoles);
        
        log.info("Login successful for user: {}", loginRequest.getUsername());

        return getAuthResponse(response, userWithRoles);
    }

    @Override
    public AuthUserResponse register(UserRegistrationRequest registrationRequest) {
        log.info("Attempting registration for user: {}, email: {}", 
                 registrationRequest.getUsername(), registrationRequest.getEmail());
        
        if (userRepository.existsByUsername(registrationRequest.getUsername())) {
            log.warn("Registration failed - Username already exists: {}", registrationRequest.getUsername());
            throw new UserAlreadyExistsException("username", registrationRequest.getUsername());
        }

        if (userRepository.existsByEmail(registrationRequest.getEmail())) {
            log.warn("Registration failed - Email already exists: {}", registrationRequest.getEmail());
            throw new UserAlreadyExistsException("email", registrationRequest.getEmail());
        }

        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setEnabled(true);
        user.setEmailVerified(false);

        Role defaultRole = roleRepository.findByCode("BASIC_USER_ROLE")
                .orElseThrow(() -> {
                    log.error("Default role not found: BASIC_USER_ROLE");
                    return new RuntimeException("Default role not found");
                });
        
        Set<Role> roles = new HashSet<>();
        roles.add(defaultRole);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        log.info("User registered successfully - Username: {}, Email: {}", 
                 savedUser.getUsername(), savedUser.getEmail());
        return userService.convertToAuthUserResponse(savedUser);
    }

    @Override
    public void logout(HttpServletResponse response) {
        log.info("User logout requested");
        jwtUtils.clearJwtCookie(response);
        jwtUtils.clearRefreshTokenCookie(response);
        log.info("User logged out successfully");
    }

    @Override
    public AuthResponse firebaseSignIn(FirebaseTokenRequest tokenRequest, HttpServletResponse response) {
        log.info("Attempting Firebase sign in");
        try {
            FirebaseUserInfo firebaseUserInfo = firebaseAuthService.verifyFirebaseToken(tokenRequest.getFirebaseToken());
            log.debug("Firebase token verified for email: {}", firebaseUserInfo.getEmail());
            
            User user;
            try {
                user = userService.findByEmail(firebaseUserInfo.getEmail());
                log.debug("Found existing user for Firebase email: {}", firebaseUserInfo.getEmail());
            } catch (Exception e) {
                log.info("Creating new Firebase user for email: {}", firebaseUserInfo.getEmail());
                user = userService.createFirebaseUser(
                    firebaseUserInfo.getEmail(),
                    firebaseUserInfo.getFirstName(),
                    firebaseUserInfo.getLastName()
                );
            }

            user.setLastActiveAt(LocalDateTime.now());
            
            userRepository.save(user);
            
            log.info("Firebase sign in successful for user: {}", user.getUsername());

            return getAuthResponse(response, user);

        } catch (Exception e) {
            log.error("Firebase authentication failed: {}", e.getMessage());
            throw new InvalidCredentialsException("Firebase authentication failed: " + e.getMessage());
        }
    }

    private AuthResponse getAuthResponse(HttpServletResponse response, User user) {
        CustomUserDetails userDetails = new CustomUserDetails(user);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("email", user.getEmail());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());

        Set<String> roleNames = user.getRoles() != null ? 
            user.getRoles().stream()
                .map(Role::getCode)
                .collect(Collectors.toSet()) : 
            new HashSet<>();
        claims.put("roles", roleNames);

        Set<String> permissions = user.getRoles() != null ? 
            user.getRoles().stream()
                .flatMap(role -> role.getPermissions() != null ? role.getPermissions().stream() : Stream.empty())
                .map(Permission::getCode)
                .collect(Collectors.toSet()) : 
            new HashSet<>();
        claims.put("permissions", permissions);

        String token = jwtUtils.generateToken(userDetails.getUsername(), claims);
        String refreshToken = jwtUtils.generateRefreshToken(userDetails.getUsername());

        jwtUtils.addJwtCookie(response, token);
        jwtUtils.addRefreshTokenCookie(response, refreshToken);

        AuthUserResponse userResponse = userService.convertToAuthUserResponse(user);
        return new AuthResponse(token, refreshToken, userResponse);
    }

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest, HttpServletResponse response) {
        log.debug("Attempting token refresh");
        String refreshToken = refreshTokenRequest.getRefreshToken();
        
        if (!jwtUtils.validateToken(refreshToken)) {
            log.warn("Token refresh failed - Invalid refresh token");
            throw new InvalidCredentialsException("Invalid refresh token");
        }
        
        if (!jwtUtils.isRefreshToken(refreshToken)) {
            log.warn("Token refresh failed - Token is not a refresh token");
            throw new InvalidCredentialsException("Token is not a refresh token");
        }
        
        String username = jwtUtils.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.warn("Token refresh failed - User not found: {}", username);
                    return new InvalidCredentialsException("User not found");
                });
        
        if (!user.getEnabled()) {
            log.warn("Token refresh failed - Account disabled for user: {}", username);
            throw new InvalidCredentialsException("Account is disabled");
        }

        User userWithRoles = userRepository.findByUsernameWithRolesAndPermissions(username)
                .orElse(user);
        
        userWithRoles.setLastActiveAt(LocalDateTime.now());
        userRepository.save(userWithRoles);
        
        log.info("Token refreshed successfully for user: {}", username);
        
        return getAuthResponse(response, userWithRoles);
    }

    @Override
    public void changePassword(ChangePasswordRequest changePasswordRequest) {
        String username = org.slf4j.MDC.get("username");
        if (username == null || username.trim().isEmpty()) {
            log.warn("Change password failed - User not authenticated");
            throw new InvalidCredentialsException("User not authenticated");
        }

        log.info("Attempting password change for user: {}", username);
        User user = userRepository.findByUsernameWithRolesAndPermissions(username)
                .orElseThrow(() -> {
                    log.warn("Change password failed - User not found: {}", username);
                    return new InvalidCredentialsException("User not found");
                });

        if (!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())) {
            log.warn("Change password failed - Current password incorrect for user: {}", username);
            throw new InvalidCredentialsException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(user);
        log.info("Password changed successfully for user: {}", username);
    }

    @Override
    public AuthUserResponse updateProfile(UserProfileUpdateRequest profileRequest) {
        String username = org.slf4j.MDC.get("username");
        if (username == null || username.trim().isEmpty()) {
            log.warn("Update profile failed - User not authenticated");
            throw new InvalidCredentialsException("User not authenticated");
        }

        log.info("Attempting profile update for user: {}", username);
        User user = userRepository.findByUsernameWithRolesAndPermissions(username)
                .orElseThrow(() -> {
                    log.warn("Update profile failed - User not found: {}", username);
                    return new InvalidCredentialsException("User not found");
                });

        if (!profileRequest.getUsername().equals(username) && 
            userRepository.existsByUsername(profileRequest.getUsername())) {
            log.warn("Update profile failed - Username already exists: {}", profileRequest.getUsername());
            throw new UserAlreadyExistsException("username", profileRequest.getUsername());
        }

        if (!profileRequest.getEmail().equals(user.getEmail()) && 
            userRepository.existsByEmail(profileRequest.getEmail())) {
            log.warn("Update profile failed - Email already exists: {}", profileRequest.getEmail());
            throw new UserAlreadyExistsException("email", profileRequest.getEmail());
        }

        user.setUsername(profileRequest.getUsername());
        user.setEmail(profileRequest.getEmail());
        user.setFirstName(profileRequest.getFirstName());
        user.setLastName(profileRequest.getLastName());

        User updatedUser = userRepository.save(user);
        log.info("Profile updated successfully for user: {}", username);
        return userService.convertToAuthUserResponse(updatedUser);
    }
}

