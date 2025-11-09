package avash.oronno.usermanagementservice.service;

import avash.oronno.datamodel.request.ChangePasswordRequest;
import avash.oronno.datamodel.request.FirebaseTokenRequest;
import avash.oronno.datamodel.request.LoginRequest;
import avash.oronno.datamodel.request.RefreshTokenRequest;
import avash.oronno.datamodel.request.UserProfileUpdateRequest;
import avash.oronno.datamodel.request.UserRegistrationRequest;
import avash.oronno.datamodel.response.AuthResponse;
import avash.oronno.datamodel.response.AuthUserResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest, HttpServletResponse response);
    AuthUserResponse register(UserRegistrationRequest registrationRequest);
    void logout(HttpServletResponse response);
    AuthResponse firebaseSignIn(FirebaseTokenRequest tokenRequest, HttpServletResponse response);
    void changePassword(ChangePasswordRequest changePasswordRequest);
    AuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest, HttpServletResponse response);
    AuthUserResponse updateProfile(UserProfileUpdateRequest profileRequest);
}

