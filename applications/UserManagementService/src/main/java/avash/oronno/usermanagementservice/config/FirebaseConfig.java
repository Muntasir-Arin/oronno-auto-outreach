package avash.oronno.usermanagementservice.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Configuration
public class FirebaseConfig {

    @Value("${firebase.service-account.path:serviceAccountKey.json}")
    private String serviceAccountPath;

    @Value("${firebase.project-id:}")
    private String projectId;

    @PostConstruct
    public void initializeFirebase() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                Resource resource = new ClassPathResource(serviceAccountPath);
                
                if (!resource.exists()) {
                    log.error("Firebase service account file not found: {}", serviceAccountPath);
                    throw new RuntimeException("Firebase service account configuration not found");
                }

                try (InputStream serviceAccount = resource.getInputStream()) {
                    FirebaseOptions options = FirebaseOptions.builder()
                            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                            .setProjectId(projectId)
                            .build();

                    FirebaseApp.initializeApp(options);
                    
                    log.info("Firebase Admin SDK initialized successfully for project: {}", 
                              options.getProjectId() != null ? options.getProjectId() : "default");
                }
            } else {
                log.info("Firebase Admin SDK already initialized");
            }
        } catch (IOException e) {
            log.error("Failed to initialize Firebase Admin SDK", e);
            throw new RuntimeException("Firebase initialization failed", e);
        } catch (Exception e) {
            log.error("Unexpected error during Firebase initialization", e);
            throw new RuntimeException("Firebase initialization failed", e);
        }
    }
}

