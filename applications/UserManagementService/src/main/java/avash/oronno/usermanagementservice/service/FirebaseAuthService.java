package avash.oronno.usermanagementservice.service;

import avash.oronno.datamodel.response.FirebaseUserInfo;

public interface FirebaseAuthService {
    FirebaseUserInfo verifyFirebaseToken(String firebaseToken);
}

