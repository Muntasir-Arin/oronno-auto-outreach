package avash.oronno.config.exception;

public class InsufficientPermissionException extends RuntimeException {
    
    private final String requiredPermission;
    
    public InsufficientPermissionException(String requiredPermission) {
        super("Insufficient permission: " + requiredPermission + " is required");
        this.requiredPermission = requiredPermission;
    }
    
    public InsufficientPermissionException(String requiredPermission, String message) {
        super(message);
        this.requiredPermission = requiredPermission;
    }
    
    public String getRequiredPermission() {
        return requiredPermission;
    }
}

