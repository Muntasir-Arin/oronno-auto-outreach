package avash.oronno.usermanagementservice.service;

import avash.oronno.config.service.CrudService;
import avash.oronno.datamodel.response.AuthUserResponse;
import avash.oronno.datamodel.response.RoleResponse;
import avash.oronno.datamodel.response.UserResponse;
import avash.oronno.persistent.entity.User;

import java.util.Set;

public interface UserService extends CrudService<User, Long> {
    UserResponse convertToUserResponse(User user);
    AuthUserResponse convertToAuthUserResponse(User user);
    Set<RoleResponse> getUserRoles(Long userId);
    void assignRolesToUser(Long userId, Set<Long> roleIds);
    void adminChangePassword(Long userId, String newPassword);
    User findByEmail(String email);
    User createFirebaseUser(String email, String firstName, String lastName);
}

