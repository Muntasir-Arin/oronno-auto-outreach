package avash.oronno.audioconversion;

import lombok.extern.slf4j.Slf4j;

import javax.sound.sampled.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Audio conversion utility for converting between Twilio/Phone and Gemini Live API formats.
 * 
 * Input Flow: Twilio/Phone → 8kHz μ-law → Conversion → 16kHz PCM → Gemini Live API
 * Output Flow: Gemini Live API → 24kHz PCM → Conversion → 8kHz μ-law → Twilio/Phone
 */
@Slf4j
public class AudioConverter {

    // Input conversion: 8kHz μ-law → 16kHz PCM
    private static final int INPUT_SAMPLE_RATE_TWILIO = 8000;
    private static final int INPUT_SAMPLE_RATE_GEMINI = 16000;
    
    // Output conversion: 24kHz PCM → 8kHz μ-law
    private static final int OUTPUT_SAMPLE_RATE_GEMINI = 24000;
    private static final int OUTPUT_SAMPLE_RATE_TWILIO = 8000;

    /**
     * Converts 8kHz μ-law audio from Twilio/Phone to 16kHz PCM for Gemini Live API.
     * 
     * @param mulawAudio μ-law encoded audio bytes at 8kHz
     * @return PCM audio bytes at 16kHz
     * @throws IOException if conversion fails
     */
    public static byte[] convertMulawToPcm(byte[] mulawAudio) throws IOException {
        log.debug("Converting μ-law to PCM: {} bytes at {}Hz → {}Hz", 
                     mulawAudio.length, INPUT_SAMPLE_RATE_TWILIO, INPUT_SAMPLE_RATE_GEMINI);

        // Step 1: Decode μ-law to PCM at 8kHz
        AudioFormat mulawFormat = new AudioFormat(
            AudioFormat.Encoding.ULAW,
            INPUT_SAMPLE_RATE_TWILIO,
            8,  // sample size in bits
            1,  // channels (mono)
            1,  // frame size
            INPUT_SAMPLE_RATE_TWILIO,
            false // little-endian
        );

        byte[] pcm8k = decodeMulaw(mulawAudio, mulawFormat);

        // Step 2: Resample from 8kHz to 16kHz
        byte[] pcm16k = resampleAudio(pcm8k, INPUT_SAMPLE_RATE_TWILIO, INPUT_SAMPLE_RATE_GEMINI, 1);

        log.debug("Conversion complete: {} bytes output", pcm16k.length);
        return pcm16k;
    }

    /**
     * Converts 24kHz PCM audio from Gemini Live API to 8kHz μ-law for Twilio/Phone.
     * 
     * @param pcmAudio PCM audio bytes at 24kHz
     * @return μ-law encoded audio bytes at 8kHz
     * @throws IOException if conversion fails
     */
    public static byte[] convertPcmToMulaw(byte[] pcmAudio) throws IOException {
        log.debug("Converting PCM to μ-law: {} bytes at {}Hz → {}Hz", 
                     pcmAudio.length, OUTPUT_SAMPLE_RATE_GEMINI, OUTPUT_SAMPLE_RATE_TWILIO);

        // Step 1: Resample from 24kHz to 8kHz
        byte[] pcm8k = resampleAudio(pcmAudio, OUTPUT_SAMPLE_RATE_GEMINI, OUTPUT_SAMPLE_RATE_TWILIO, 2);

        // Step 2: Encode PCM to μ-law at 8kHz
        byte[] mulawAudio = encodeMulaw(pcm8k);

        log.debug("Conversion complete: {} bytes output", mulawAudio.length);
        return mulawAudio;
    }

    /**
     * Decodes μ-law encoded audio to PCM.
     */
    private static byte[] decodeMulaw(byte[] mulawData, AudioFormat mulawFormat) throws IOException {
        try (ByteArrayInputStream bais = new ByteArrayInputStream(mulawData);
             AudioInputStream mulawStream = new AudioInputStream(bais, mulawFormat, mulawData.length)) {

            // Create PCM format (16-bit, signed, little-endian)
            AudioFormat pcmFormat = new AudioFormat(
                AudioFormat.Encoding.PCM_SIGNED,
                mulawFormat.getSampleRate(),
                16,  // 16-bit
                1,   // mono
                2,   // 2 bytes per frame
                mulawFormat.getSampleRate(),
                false // little-endian
            );

            try (AudioInputStream pcmStream = AudioSystem.getAudioInputStream(pcmFormat, mulawStream);
                 ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = pcmStream.read(buffer)) != -1) {
                    baos.write(buffer, 0, bytesRead);
                }

                return baos.toByteArray();
            }
        }
    }

    /**
     * Encodes PCM audio to μ-law.
     */
    private static byte[] encodeMulaw(byte[] pcmData) throws IOException {
        // Create PCM format (16-bit, signed, little-endian, 8kHz)
        AudioFormat pcmFormat = new AudioFormat(
            AudioFormat.Encoding.PCM_SIGNED,
            OUTPUT_SAMPLE_RATE_TWILIO,
            16,  // 16-bit
            1,   // mono
            2,   // 2 bytes per frame
            OUTPUT_SAMPLE_RATE_TWILIO,
            false // little-endian
        );

        try (ByteArrayInputStream bais = new ByteArrayInputStream(pcmData);
             AudioInputStream pcmStream = new AudioInputStream(bais, pcmFormat, pcmData.length / 2)) {

            // Create μ-law format
            AudioFormat mulawFormat = new AudioFormat(
                AudioFormat.Encoding.ULAW,
                OUTPUT_SAMPLE_RATE_TWILIO,
                8,   // 8-bit
                1,   // mono
                1,   // 1 byte per frame
                OUTPUT_SAMPLE_RATE_TWILIO,
                false
            );

            try (AudioInputStream mulawStream = AudioSystem.getAudioInputStream(mulawFormat, pcmStream);
                 ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = mulawStream.read(buffer)) != -1) {
                    baos.write(buffer, 0, bytesRead);
                }

                return baos.toByteArray();
            }
        }
    }

    /**
     * Resamples audio from one sample rate to another using linear interpolation.
     * 
     * @param audioData Original audio data
     * @param sourceRate Source sample rate
     * @param targetRate Target sample rate
     * @param bytesPerSample Bytes per sample (2 for 16-bit PCM)
     * @return Resampled audio data
     */
    private static byte[] resampleAudio(byte[] audioData, float sourceRate, float targetRate, int bytesPerSample) {
        if (sourceRate == targetRate) {
            return audioData;
        }

        int sourceSamples = audioData.length / bytesPerSample;
        int targetSamples = Math.round(sourceSamples * (targetRate / sourceRate));
        byte[] resampled = new byte[targetSamples * bytesPerSample];

        double ratio = sourceRate / targetRate;

        for (int i = 0; i < targetSamples; i++) {
            double sourceIndex = i * ratio;
            int sourceIndexInt = (int) sourceIndex;
            double fraction = sourceIndex - sourceIndexInt;

            if (sourceIndexInt + 1 < sourceSamples) {
                // Linear interpolation for 16-bit PCM (little-endian, signed)
                if (bytesPerSample == 2) {
                    int idx1 = sourceIndexInt * 2;
                    int idx2 = (sourceIndexInt + 1) * 2;
                    
                    // Read 16-bit samples (little-endian, signed)
                    short sample1 = (short) ((audioData[idx1] & 0xFF) | ((audioData[idx1 + 1] & 0xFF) << 8));
                    short sample2 = (short) ((audioData[idx2] & 0xFF) | ((audioData[idx2 + 1] & 0xFF) << 8));
                    
                    // Interpolate (convert to int for calculation, then back to short)
                    int interpolated = (int) (sample1 + (sample2 - sample1) * fraction);
                    
                    // Clamp to short range
                    if (interpolated > Short.MAX_VALUE) interpolated = Short.MAX_VALUE;
                    if (interpolated < Short.MIN_VALUE) interpolated = Short.MIN_VALUE;
                    
                    // Write 16-bit sample (little-endian)
                    int outIdx = i * 2;
                    resampled[outIdx] = (byte) (interpolated & 0xFF);
                    resampled[outIdx + 1] = (byte) ((interpolated >> 8) & 0xFF);
                } else {
                    // Handle other sample sizes (8-bit, etc.)
                    for (int b = 0; b < bytesPerSample; b++) {
                        int byteIndex = sourceIndexInt * bytesPerSample + b;
                        int nextByteIndex = (sourceIndexInt + 1) * bytesPerSample + b;
                        
                        int sample1 = audioData[byteIndex] & 0xFF;
                        int sample2 = audioData[nextByteIndex] & 0xFF;
                        int interpolated = (int) (sample1 + (sample2 - sample1) * fraction);
                        resampled[i * bytesPerSample + b] = (byte) interpolated;
                    }
                }
            } else {
                // Copy last sample
                System.arraycopy(audioData, sourceIndexInt * bytesPerSample, 
                               resampled, i * bytesPerSample, bytesPerSample);
            }
        }

        return resampled;
    }
}

