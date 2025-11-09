package avash.oronno.emailorchestrationservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Email personalization engine for customizing email content based on customer data.
 */
@Slf4j
@Service
public class EmailPersonalizationService {

    /**
     * Personalizes email content by replacing template variables with customer data.
     * 
     * @param template Email template content
     * @param customerData Customer data for personalization
     * @return Personalized email content
     */
    public String personalizeContent(String template, Map<String, Object> customerData) {
        log.debug("Personalizing email content with {} variables", customerData.size());
        
        String personalized = template;
        
        // Replace common variables
        personalized = replaceVariable(personalized, "{{firstName}}", 
                getStringValue(customerData, "firstName", "Customer"));
        personalized = replaceVariable(personalized, "{{lastName}}", 
                getStringValue(customerData, "lastName", ""));
        personalized = replaceVariable(personalized, "{{fullName}}", 
                getFullName(customerData));
        personalized = replaceVariable(personalized, "{{email}}", 
                getStringValue(customerData, "email", ""));
        personalized = replaceVariable(personalized, "{{phoneNumber}}", 
                getStringValue(customerData, "phoneNumber", ""));
        
        // Replace custom variables from customerData
        for (Map.Entry<String, Object> entry : customerData.entrySet()) {
            String variable = "{{" + entry.getKey() + "}}";
            String value = entry.getValue() != null ? entry.getValue().toString() : "";
            personalized = replaceVariable(personalized, variable, value);
        }
        
        log.debug("Email personalization complete");
        return personalized;
    }

    /**
     * Generates personalized subject line.
     * 
     * @param subjectTemplate Subject template
     * @param customerData Customer data
     * @return Personalized subject
     */
    public String personalizeSubject(String subjectTemplate, Map<String, Object> customerData) {
        return personalizeContent(subjectTemplate, customerData);
    }

    private String replaceVariable(String template, String variable, String value) {
        return template.replace(variable, value);
    }

    private String getStringValue(Map<String, Object> data, String key, String defaultValue) {
        Object value = data.get(key);
        return value != null ? value.toString() : defaultValue;
    }

    private String getFullName(Map<String, Object> customerData) {
        String firstName = getStringValue(customerData, "firstName", "");
        String lastName = getStringValue(customerData, "lastName", "");
        
        if (!firstName.isEmpty() && !lastName.isEmpty()) {
            return firstName + " " + lastName;
        } else if (!firstName.isEmpty()) {
            return firstName;
        } else if (!lastName.isEmpty()) {
            return lastName;
        }
        return "Customer";
    }
}

