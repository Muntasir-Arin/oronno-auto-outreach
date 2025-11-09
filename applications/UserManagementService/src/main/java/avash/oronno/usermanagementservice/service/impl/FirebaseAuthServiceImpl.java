package avash.oronno.usermanagementservice.service.impl;

import avash.oronno.datamodel.response.FirebaseUserInfo;
import avash.oronno.usermanagementservice.service.FirebaseAuthService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class FirebaseAuthServiceImpl implements FirebaseAuthService {

    @Override
    public FirebaseUserInfo verifyFirebaseToken(String firebaseToken) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance()
                    .verifyIdToken(firebaseToken, true);

            FirebaseUserInfo userInfo = new FirebaseUserInfo();

            userInfo.setUid(decodedToken.getUid());
            userInfo.setEmail(decodedToken.getEmail());
            userInfo.setEmailVerified(decodedToken.isEmailVerified());
            userInfo.setDisplayName(decodedToken.getName());

            Map<String, Object> claims = decodedToken.getClaims();

            Object providerObj = claims.get("firebase");
            if (providerObj instanceof Map<?, ?> firebaseInfo) {
                Object signInProvider = firebaseInfo.get("sign_in_provider");
                if (signInProvider instanceof String) {
                    userInfo.setProviderId((String) signInProvider);
                }
            }

            Object authTimeObj = claims.get("auth_time");
            if (authTimeObj instanceof Number) {
                userInfo.setLastSignInTime(((Number) authTimeObj).longValue());
            }

            Object issuedAtObj = claims.get("iat");
            if (issuedAtObj instanceof Number) {
                userInfo.setCreationTime(((Number) issuedAtObj).longValue());
            }

            Object pictureObj = claims.get("picture");
            if (pictureObj instanceof String) {
                userInfo.setPhotoUrl((String) pictureObj);
            }

            Object phoneObj = claims.get("phone_number");
            if (phoneObj instanceof String) {
                userInfo.setPhoneNumber((String) phoneObj);
            }

            Object firstNameObj = claims.get("given_name");
            if (firstNameObj instanceof String) {
                userInfo.setFirstName((String) firstNameObj);
            }

            Object lastNameObj = claims.get("family_name");
            if (lastNameObj instanceof String) {
                userInfo.setLastName((String) lastNameObj);
            }

            if (userInfo.getDisplayName() == null || userInfo.getDisplayName().trim().isEmpty()) {
                String firstName = userInfo.getFirstName();
                String lastName = userInfo.getLastName();

                if (firstName != null || lastName != null) {
                    StringBuilder displayName = new StringBuilder();
                    if (firstName != null) {
                        displayName.append(firstName);
                    }
                    if (lastName != null) {
                        if (!displayName.isEmpty()) {
                            displayName.append(" ");
                        }
                        displayName.append(lastName);
                    }
                    userInfo.setDisplayName(displayName.toString());
                }
            }

            if ((userInfo.getFirstName() == null || userInfo.getLastName() == null) &&
                    userInfo.getDisplayName() != null && !userInfo.getDisplayName().trim().isEmpty()) {

                String[] nameParts = userInfo.getDisplayName().split("\\s+", 2);
                if (userInfo.getFirstName() == null && nameParts.length >= 1) {
                    userInfo.setFirstName(nameParts[0]);
                }
                if (userInfo.getLastName() == null && nameParts.length >= 2) {
                    userInfo.setLastName(nameParts[1]);
                }
            }

            log.debug("Firebase token verified successfully for user: {}",
                    userInfo.getEmail() != null ? userInfo.getEmail() : userInfo.getUid());
            return userInfo;

        } catch (Exception e) {
            log.error("Failed to verify Firebase token: {}", e.getMessage());
            throw new RuntimeException("Invalid Firebase token: " + e.getMessage(), e);
        }
    }
}

