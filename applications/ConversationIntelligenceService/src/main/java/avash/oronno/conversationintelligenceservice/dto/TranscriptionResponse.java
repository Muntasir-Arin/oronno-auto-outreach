package avash.oronno.conversationintelligenceservice.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class TranscriptionResponse {
    private String transcriptionId;
    private String sessionId;
    private String transcript;
    private String language;
    private Double confidence;
    private SentimentAnalysis sentiment;
    private IntentAnalysis intent;
    private List<String> keyPhrases;
    private LocalDateTime timestamp;
    
    @Data
    public static class SentimentAnalysis {
        private String overallSentiment; // POSITIVE, NEGATIVE, NEUTRAL
        private Double positiveScore;
        private Double negativeScore;
        private Double neutralScore;
    }
    
    @Data
    public static class IntentAnalysis {
        private String primaryIntent;
        private Map<String, Double> intentConfidence;
    }
}

