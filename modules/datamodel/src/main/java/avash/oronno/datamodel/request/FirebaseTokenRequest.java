package avash.oronno.datamodel.request;

import jakarta.validation.constraints.NotBlank;

public class FirebaseTokenRequest {
    
    @NotBlank(message = "Firebase ID token is required")
    private String firebaseToken;

    public FirebaseTokenRequest() {}

    public FirebaseTokenRequest(String firebaseToken) {
        this.firebaseToken = firebaseToken;
    }

    public String getFirebaseToken() {
        return firebaseToken;
    }

    public void setFirebaseToken(String firebaseToken) {
        this.firebaseToken = firebaseToken;
    }
}

