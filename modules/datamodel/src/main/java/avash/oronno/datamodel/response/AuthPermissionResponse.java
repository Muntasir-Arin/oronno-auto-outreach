package avash.oronno.datamodel.response;

public class AuthPermissionResponse {
    
    private Long id;
    private String code;

    public AuthPermissionResponse() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

