package avash.oronno.datamodel.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    
    private String token;
    private String refreshToken;
    private String tokenType;
    private Long expiresIn;
    private AuthUserResponse userResponse;

    public AuthResponse(String token, String refreshToken, AuthUserResponse userResponse) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.userResponse = userResponse;
        this.tokenType = "Bearer";
        this.expiresIn = 86400000L; // 24 hours in milliseconds
    }
}

