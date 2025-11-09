package avash.oronno.emailorchestrationservice.config;

import com.sendgrid.SendGrid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * SendGrid configuration for email sending.
 */
@Slf4j
@Configuration
public class SendGridConfig {

    @Value("${sendgrid.api.key:}")
    private String sendGridApiKey;

    @Bean
    public SendGrid sendGrid() {
        if (sendGridApiKey == null || sendGridApiKey.isEmpty()) {
            log.warn("SendGrid API key is not configured. Email sending will fail.");
        } else {
            log.info("SendGrid configured with API key (length: {})", sendGridApiKey.length());
        }
        return new SendGrid(sendGridApiKey);
    }
}

