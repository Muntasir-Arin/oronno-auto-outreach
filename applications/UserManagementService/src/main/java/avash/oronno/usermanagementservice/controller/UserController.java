package avash.oronno.usermanagementservice.controller;

import avash.oronno.config.response.ApiResponse;
import avash.oronno.datamodel.request.AssignRolesRequest;
import avash.oronno.datamodel.response.RoleResponse;
import avash.oronno.datamodel.response.UserResponse;
import avash.oronno.usermanagementservice.service.UserService;
import avash.oronno.persistent.entity.User;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        log.debug("Retrieving all users");
        List<User> users = userService.findAll();
        List<UserResponse> userResponses = users.stream()
                .map(userService::convertToUserResponse)
                .collect(Collectors.toList());
        log.info("Retrieved {} users", userResponses.size());
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", userResponses));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        log.debug("Retrieving user with id: {}", id);
        User user = userService.findById(id);
        UserResponse userResponse = userService.convertToUserResponse(user);
        log.info("Retrieved user with id: {}", id);
        return ResponseEntity.ok(ApiResponse.success("User retrieved successfully", userResponse));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@Valid @RequestBody User user) {
        log.info("Received create user request - Username: {}, Email: {}", user.getUsername(), user.getEmail());
        User createdUser = userService.create(user);
        UserResponse userResponse = userService.convertToUserResponse(createdUser);
        log.info("User created successfully with id: {}", createdUser.getId());
        return ResponseEntity.ok(ApiResponse.success("User created successfully", userResponse));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        log.info("Received update user request - Id: {}", id);
        User updatedUser = userService.update(id, user);
        UserResponse userResponse = userService.convertToUserResponse(updatedUser);
        log.info("User updated successfully with id: {}", id);
        return ResponseEntity.ok(ApiResponse.success("User updated successfully", userResponse));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        log.info("Received delete user request - Id: {}", id);
        userService.delete(id);
        log.info("User deleted successfully with id: {}", id);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully", null));
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<ApiResponse<Void>> assignRolesToUser(
            @PathVariable Long id,
            @Valid @RequestBody AssignRolesRequest request) {
        
        log.info("Received assign roles request - UserId: {}, RoleIds: {}", id, request.getRoleIds());
        userService.assignRolesToUser(id, new HashSet<>(request.getRoleIds()));
        log.info("Roles assigned successfully to user with id: {}", id);
        return ResponseEntity.ok(ApiResponse.success("Roles assigned successfully", null));
    }

    @GetMapping("/{id}/roles")
    public ResponseEntity<ApiResponse<Set<RoleResponse>>> getUserRoles(
            @PathVariable Long id) {
        
        log.debug("Retrieving roles for user with id: {}", id);
        Set<RoleResponse> roles = userService.getUserRoles(id);
        log.info("Retrieved {} roles for user with id: {}", roles.size(), id);
        return ResponseEntity.ok(ApiResponse.success("User roles retrieved successfully", roles));
    }
}

