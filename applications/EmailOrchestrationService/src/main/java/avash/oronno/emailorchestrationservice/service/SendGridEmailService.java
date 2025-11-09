package avash.oronno.emailorchestrationservice.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * SendGrid email service for sending emails via SendGrid API.
 */
@Slf4j
@Service
public class SendGridEmailService {
    
    private final SendGrid sendGrid;
    
    @Value("${sendgrid.from.email:noreply@oronno.com}")
    private String fromEmail;
    
    @Value("${sendgrid.from.name:Oronno}")
    private String fromName;

    @Autowired
    public SendGridEmailService(SendGrid sendGrid) {
        this.sendGrid = sendGrid;
    }

    /**
     * Sends an email via SendGrid.
     * 
     * @param toEmail Recipient email address
     * @param toName Recipient name
     * @param subject Email subject
     * @param htmlContent HTML content
     * @param textContent Plain text content (optional)
     * @param customArgs Custom arguments for tracking
     * @return SendGrid response status code
     */
    public int sendEmail(String toEmail, String toName, String subject, 
                        String htmlContent, String textContent, Map<String, String> customArgs) {
        try {
            log.info("Sending email to: {} ({})", toEmail, toName);
            
            Email from = new Email(fromEmail, fromName);
            Email to = new Email(toEmail, toName);
            
            Content content = new Content("text/html", htmlContent);
            Mail mail = new Mail(from, subject, to, content);
            
            // Add plain text content if provided
            if (textContent != null && !textContent.isEmpty()) {
                Content text = new Content("text/plain", textContent);
                mail.addContent(text);
            }
            
            // Add custom arguments for tracking
            if (customArgs != null) {
                Personalization personalization = new Personalization();
                personalization.addTo(to);
                customArgs.forEach(personalization::addCustomArg);
                mail.addPersonalization(personalization);
            }
            
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            
            Response response = sendGrid.api(request);
            
            log.info("Email sent successfully. Status: {}, Response: {}", 
                       response.getStatusCode(), response.getBody());
            
            return response.getStatusCode();
            
        } catch (IOException e) {
            log.error("Error sending email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Schedules an email to be sent at a specific time.
     * 
     * @param toEmail Recipient email
     * @param toName Recipient name
     * @param subject Email subject
     * @param htmlContent HTML content
     * @param textContent Plain text content
     * @param sendAt Scheduled send time
     * @param customArgs Custom arguments for tracking
     * @return SendGrid response status code
     */
    public int scheduleEmail(String toEmail, String toName, String subject,
                            String htmlContent, String textContent, 
                            LocalDateTime sendAt, Map<String, String> customArgs) {
        try {
            log.info("Scheduling email to: {} for: {}", toEmail, sendAt);
            
            Email from = new Email(fromEmail, fromName);
            Email to = new Email(toEmail, toName);
            
            Content content = new Content("text/html", htmlContent);
            Mail mail = new Mail(from, subject, to, content);
            
            if (textContent != null && !textContent.isEmpty()) {
                Content text = new Content("text/plain", textContent);
                mail.addContent(text);
            }
            
            // Set send at time (Unix timestamp)
            long sendAtTimestamp = sendAt.atZone(java.time.ZoneId.systemDefault())
                    .toEpochSecond();
            mail.setSendAt(sendAtTimestamp);
            
            // Add custom arguments
            if (customArgs != null) {
                Personalization personalization = new Personalization();
                personalization.addTo(to);
                customArgs.forEach(personalization::addCustomArg);
                mail.addPersonalization(personalization);
            }
            
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            
            Response response = sendGrid.api(request);
            
            log.info("Email scheduled successfully. Status: {}", response.getStatusCode());
            
            return response.getStatusCode();
            
        } catch (IOException e) {
            log.error("Error scheduling email to: {}", toEmail, e);
            throw new RuntimeException("Failed to schedule email", e);
        }
    }
}

