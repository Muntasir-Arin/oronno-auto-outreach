package avash.oronno.emailorchestrationservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

/**
 * Template rendering service for email templates.
 * Uses Thymeleaf for template processing.
 */
@Slf4j
@Service
public class TemplateRenderingService {
    
    private final TemplateEngine templateEngine;

    public TemplateRenderingService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    /**
     * Renders an email template with the provided variables.
     * 
     * @param templateName Template name (without .html extension)
     * @param variables Template variables
     * @return Rendered HTML content
     */
    public String renderTemplate(String templateName, Map<String, Object> variables) {
        log.debug("Rendering template: {} with {} variables", templateName, variables.size());
        
        Context context = new Context();
        variables.forEach(context::setVariable);
        
        String rendered = templateEngine.process("emails/" + templateName, context);
        
        log.debug("Template rendered successfully");
        return rendered;
    }

    /**
     * Renders a simple text template (for plain text emails).
     * 
     * @param templateContent Template content as string
     * @param variables Template variables
     * @return Rendered text content
     */
    public String renderTextTemplate(String templateContent, Map<String, Object> variables) {
        log.debug("Rendering text template with {} variables", variables.size());
        
        String rendered = templateContent;
        for (Map.Entry<String, Object> entry : variables.entrySet()) {
            String variable = "{{" + entry.getKey() + "}}";
            String value = entry.getValue() != null ? entry.getValue().toString() : "";
            rendered = rendered.replace(variable, value);
        }
        
        return rendered;
    }
}

