package avash.oronno.usermanagementservice.service.impl;

import avash.oronno.config.exception.ResourceNotFoundException;
import avash.oronno.datamodel.response.AuthPermissionResponse;
import avash.oronno.datamodel.response.AuthRoleResponse;
import avash.oronno.datamodel.response.AuthUserResponse;
import avash.oronno.datamodel.response.PermissionResponse;
import avash.oronno.datamodel.response.RoleResponse;
import avash.oronno.datamodel.response.UserResponse;
import avash.oronno.persistent.entity.Permission;
import avash.oronno.persistent.entity.Role;
import avash.oronno.persistent.entity.User;
import avash.oronno.persistent.repository.RoleRepository;
import avash.oronno.persistent.repository.UserRepository;
import avash.oronno.usermanagementservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User create(User user) {
        log.info("Creating user - Username: {}, Email: {}", user.getUsername(), user.getEmail());
        User saved = userRepository.save(user);
        log.info("User created successfully with id: {}", saved.getId());
        return saved;
    }

    @Override
    public User findById(Long id) {
        log.debug("Finding user by id: {}", id);
        return userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("User not found with id: {}", id);
                    return new ResourceNotFoundException("User", "id", id);
                });
    }

    @Override
    public List<User> findAll() {
        log.debug("Finding all users");
        return userRepository.findAll();
    }

    @Override
    public User update(Long id, User user) {
        log.info("Updating user with id: {}", id);
        User existingUser = findById(id);
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEnabled(user.getEnabled());
        User updated = userRepository.save(existingUser);
        log.info("User updated successfully with id: {}", id);
        return updated;
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting user with id: {}", id);
        User user = findById(id);
        userRepository.delete(user);
        log.info("User deleted successfully with id: {}", id);
    }

    @Override
    public UserResponse convertToUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEnabled(user.getEnabled());
        response.setEmailVerified(user.getEmailVerified());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        
        if (user.getRoles() != null) {
            List<RoleResponse> roleResponses = user.getRoles().stream()
                    .map(this::convertToRoleResponse)
                    .collect(Collectors.toList());
            response.setRoles(roleResponses);
        }
        
        return response;
    }

    @Override
    public Set<RoleResponse> getUserRoles(Long userId) {
        User user = findById(userId);
        return user.getRoles().stream()
                .map(this::convertToRoleResponse)
                .collect(Collectors.toSet());
    }

    @Override
    public void assignRolesToUser(Long userId, Set<Long> roleIds) {
        log.info("Assigning roles to user - UserId: {}, RoleIds: {}", userId, roleIds);
        User user = findById(userId);
        Set<Role> roles = new HashSet<>();
        
        for (Long roleId : roleIds) {
            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> {
                        log.warn("Role not found with id: {}", roleId);
                        return new ResourceNotFoundException("Role", "id", roleId);
                    });
            roles.add(role);
        }
        
        user.setRoles(roles);
        userRepository.save(user);
        log.info("Roles assigned successfully to user with id: {}", userId);
    }

    @Override
    public void adminChangePassword(Long userId, String newPassword) {
        log.info("Admin changing password for user with id: {}", userId);
        User user = findById(userId);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        log.info("Password changed successfully by admin for user with id: {}", userId);
    }

    @Override
    public User findByEmail(String email) {
        log.debug("Finding user by email: {}", email);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("User not found with email: {}", email);
                    return new ResourceNotFoundException("User", "email", email);
                });
    }

    @Override
    public User createFirebaseUser(String email, String firstName, String lastName) {
        log.info("Creating Firebase user - Email: {}, FirstName: {}, LastName: {}", email, firstName, lastName);
        if (userRepository.existsByEmail(email)) {
            log.warn("Firebase user creation failed - Email already exists: {}", email);
            throw new RuntimeException("User with email already exists: " + email);
        }

        String username = generateUniqueUsername(email);
        log.debug("Generated unique username for Firebase user: {}", username);

        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setFirstName(firstName != null ? firstName : "Firebase");
        user.setLastName(lastName != null ? lastName : "User");
        user.setPassword(passwordEncoder.encode("firebase-auth-user-" + System.currentTimeMillis()));
        user.setEnabled(true);
        user.setEmailVerified(true);

        Role defaultRole = roleRepository.findByCode("BASIC_USER_ROLE")
                .orElseThrow(() -> {
                    log.error("Default role not found: BASIC_USER_ROLE");
                    return new RuntimeException("Default role not found");
                });
        
        Set<Role> roles = new HashSet<>();
        roles.add(defaultRole);
        user.setRoles(roles);

        User saved = userRepository.save(user);
        log.info("Firebase user created successfully - Username: {}, Email: {}", saved.getUsername(), saved.getEmail());
        return saved;
    }

    private String generateUniqueUsername(String email) {
        String baseUsername = email.split("@")[0];
        String username = baseUsername;
        int counter = 1;
        
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + counter;
            counter++;
        }
        
        return username;
    }

    private RoleResponse convertToRoleResponse(Role role) {
        RoleResponse response = new RoleResponse();
        response.setId(role.getId());
        response.setName(role.getName());
        response.setDescription(role.getDescription());
        response.setCreatedAt(role.getCreatedAt());
        response.setUpdatedAt(role.getUpdatedAt());
        
        if (role.getPermissions() != null) {
            List<PermissionResponse> permissionResponses = role.getPermissions().stream()
                    .map(this::convertToPermissionResponse)
                    .collect(Collectors.toList());
            response.setPermissions(permissionResponses);
        }
        
        return response;
    }

    private PermissionResponse convertToPermissionResponse(Permission permission) {
        PermissionResponse response = new PermissionResponse();
        response.setId(permission.getId());
        response.setName(permission.getName());
        response.setCode(permission.getCode());
        response.setDescription(permission.getDescription());
        response.setCreatedAt(permission.getCreatedAt());
        response.setUpdatedAt(permission.getUpdatedAt());
        
        return response;
    }

    @Override
    public AuthUserResponse convertToAuthUserResponse(User user) {
        AuthUserResponse response = new AuthUserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEnabled(user.getEnabled());
        response.setEmailVerified(user.getEmailVerified());
        response.setFirstTimeLogin(user.getFirstTimeLogin());
        
        if (user.getRoles() != null) {
            List<AuthRoleResponse> roleResponses = user.getRoles().stream()
                    .map(this::convertToAuthRoleResponse)
                    .collect(Collectors.toList());
            response.setRoles(roleResponses);
        }
        
        return response;
    }

    private AuthRoleResponse convertToAuthRoleResponse(Role role) {
        AuthRoleResponse response = new AuthRoleResponse();
        response.setId(role.getId());
        response.setName(role.getName());
        response.setDescription(role.getDescription());
        
        if (role.getPermissions() != null) {
            List<AuthPermissionResponse> permissionResponses = role.getPermissions().stream()
                    .map(this::convertToAuthPermissionResponse)
                    .collect(Collectors.toList());
            response.setPermissions(permissionResponses);
        }
        
        return response;
    }

    private AuthPermissionResponse convertToAuthPermissionResponse(Permission permission) {
        AuthPermissionResponse response = new AuthPermissionResponse();
        response.setId(permission.getId());
        response.setCode(permission.getCode());
        return response;
    }
}

