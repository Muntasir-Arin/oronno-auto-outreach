package avash.oronno.gatewayservice.utils;

import java.util.UUID;

public final class UuidUtils {

    public static String randomString() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static String randomString(int length) {
        String uuid = randomString();
        return length > uuid.length() ? uuid : uuid.substring(0, length);
    }
}

