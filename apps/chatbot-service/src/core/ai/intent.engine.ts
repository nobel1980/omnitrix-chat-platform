import { AIProvider } from './ai.gateway';
import { logger } from '../../infrastructure/logger/logger';

export class IntentEngine {
  private provider = new AIProvider();

  public async detect(message: string): Promise<{ intent: string; confidence: number }> {
    try {
      const systemPrompt = `
You are an expert NLU system. Classify the user's message into one of these intents:
- HR_INQUIRY (questions about salary, leave, HR policies)
- TECH_SUPPORT (technical issues, password reset)
- BILLING_SUPPORT (invoices, payments, refunds)
- ESCALATE (explicit requests to talk to a human, or expressions of severe frustration)
- GENERAL (greetings, simple small talk)

Return ONLY a valid JSON object matching this schema:
{
  "intent": "INTENT_NAME",
  "confidence": 0.0 to 1.0
}
`;
      const response = await this.provider.chat(systemPrompt, `Message: "${message}"`);
      const cleaned = response.trim().replace(/^```json\s*/i, '').replace(/```$/, '').trim();
      const result = JSON.parse(cleaned);

      return {
        intent: result.intent || 'GENERAL',
        confidence: typeof result.confidence === 'number' ? result.confidence : 0.8,
      };
    } catch (error) {
      logger.error('Error in IntentEngine parsing response:', { error, message });
      // Simple regex fallback if AI does not return correct JSON format
      const lower = message.toLowerCase();
      if (lower.includes('agent') || lower.includes('human') || lower.includes('support')) {
        return { intent: 'ESCALATE', confidence: 0.9 };
      }
      if (lower.includes('hr') || lower.includes('leave') || lower.includes('pay')) {
        return { intent: 'HR_INQUIRY', confidence: 0.8 };
      }
      if (lower.includes('leave')) return { intent: "HR_LEAVE", confidence: 0.8 };
      if (lower.includes('salary')) return { intent: "HR_SALARY", confidence: 0.8 };
      if (lower.includes('attendance')) return { intent: "HR_ATTENDANCE", confidence: 0.8 };
      if (lower.includes('hello')) return { intent: "GREETING", confidence: 0.8 };
      if (lower.includes('help')) return { intent: "SUPPORT", confidence: 0.8 };
      return { intent: 'GENERAL', confidence: 0.5 };
    }
  }
}
