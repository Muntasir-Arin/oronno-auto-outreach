package avash.oronno.emailorchestrationservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Email Orchestration Service - Main service for managing email campaigns.
 * Coordinates email personalization, template rendering, send time optimization, and delivery tracking.
 */
@Slf4j
@Service
public class EmailOrchestrationService {
    
    private final EmailPersonalizationService personalizationService;
    private final TemplateRenderingService templateRenderingService;
    private final SendTimeOptimizationService sendTimeOptimizationService;
    private final SendGridEmailService sendGridEmailService;
    private final EmailDeliveryTrackingService deliveryTrackingService;

    public EmailOrchestrationService(
            EmailPersonalizationService personalizationService,
            TemplateRenderingService templateRenderingService,
            SendTimeOptimizationService sendTimeOptimizationService,
            SendGridEmailService sendGridEmailService,
            EmailDeliveryTrackingService deliveryTrackingService) {
        this.personalizationService = personalizationService;
        this.templateRenderingService = templateRenderingService;
        this.sendTimeOptimizationService = sendTimeOptimizationService;
        this.sendGridEmailService = sendGridEmailService;
        this.deliveryTrackingService = deliveryTrackingService;
    }

    /**
     * Sends a personalized email to a customer.
     * 
     * @param campaignId Campaign ID
     * @param customerEmail Customer email address
     * @param customerData Customer data for personalization
     * @param templateName Email template name
     * @param subjectTemplate Subject template
     * @return Email ID
     */
    public String sendEmail(String campaignId, String customerEmail, 
                           Map<String, Object> customerData, 
                           String templateName, String subjectTemplate) {
        log.info("Sending email - Campaign: {}, To: {}", campaignId, customerEmail);
        
        // Generate email ID
        String emailId = UUID.randomUUID().toString();
        
        // Step 1: Render template
        String htmlContent = templateRenderingService.renderTemplate(templateName, customerData);
        String textContent = templateRenderingService.renderTextTemplate(
                extractTextFromHtml(htmlContent), customerData);
        
        // Step 2: Personalize content
        String personalizedHtml = personalizationService.personalizeContent(htmlContent, customerData);
        String personalizedText = personalizationService.personalizeContent(textContent, customerData);
        String personalizedSubject = personalizationService.personalizeSubject(subjectTemplate, customerData);
        
        // Step 3: Calculate optimal send time
        LocalDateTime optimalSendTime = sendTimeOptimizationService.calculateOptimalSendTime(customerData);
        
        // Step 4: Prepare tracking data
        Map<String, String> customArgs = new HashMap<>();
        customArgs.put("email_id", emailId);
        customArgs.put("campaign_id", campaignId);
        customArgs.put("customer_email", customerEmail);
        
        // Step 5: Send email (immediately or schedule)
        String customerName = getCustomerName(customerData);
        int statusCode;
        
        if (sendTimeOptimizationService.isOptimalSendTime(customerData)) {
            // Send immediately
            statusCode = sendGridEmailService.sendEmail(
                    customerEmail, customerName, personalizedSubject,
                    personalizedHtml, personalizedText, customArgs);
        } else {
            // Schedule for optimal time
            statusCode = sendGridEmailService.scheduleEmail(
                    customerEmail, customerName, personalizedSubject,
                    personalizedHtml, personalizedText, optimalSendTime, customArgs);
        }
        
        // Step 6: Track email delivery
        deliveryTrackingService.trackEmailSent(emailId, campaignId, customerEmail, 
                                              personalizedSubject, statusCode);
        
        log.info("Email orchestration complete - Email ID: {}, Status: {}", emailId, statusCode);
        return emailId;
    }

    private String getCustomerName(Map<String, Object> customerData) {
        String firstName = (String) customerData.getOrDefault("firstName", "");
        String lastName = (String) customerData.getOrDefault("lastName", "");
        
        if (!firstName.isEmpty() && !lastName.isEmpty()) {
            return firstName + " " + lastName;
        } else if (!firstName.isEmpty()) {
            return firstName;
        } else if (!lastName.isEmpty()) {
            return lastName;
        }
        return "Customer";
    }

    private String extractTextFromHtml(String html) {
        // Simple text extraction (remove HTML tags)
        return html.replaceAll("<[^>]+>", "").trim();
    }
}

