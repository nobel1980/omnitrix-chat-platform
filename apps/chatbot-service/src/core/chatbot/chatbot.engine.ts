import { MessageContext, EngineResult } from './chatbot.types';
import { AiGateway } from '../ai/ai.gateway';
import { IntentDetector } from '../intent/intent.detector';
import { SentimentService } from '../sentiment/sentiment.service';
import { ModerationService } from '../moderation/moderation.service';

export class ChatbotEngine {
  private aiGateway = new AiGateway();
  private intentDetector = new IntentDetector();
  private sentimentService = new SentimentService();
  private moderationService = new ModerationService();

  public async process(ctx: MessageContext): Promise<EngineResult> {
    // 1. Moderate message
    const isSafe = await this.moderationService.isSafe(ctx.rawText);
    if (!isSafe) {
      return {
        reply: 'I cannot respond to this input as it violates our safety standards.',
        escalate: false,
      };
    }

    // 2. Perform NLU tasks
    const intent = await this.intentDetector.detect(ctx.rawText);
    const sentiment = await this.sentimentService.analyze(ctx.rawText);

    // 3. Check if escalates to human agent
    const isEscalation = intent === 'escalate_agent' || sentiment === 'very_angry';

    if (isEscalation) {
      return {
        reply: 'I am routing you to a live support representative who can assist further.',
        intent,
        sentiment,
        escalate: true,
      };
    }

    // 4. Fallback to LLM response
    const reply = await this.aiGateway.generate(ctx.rawText);

    return {
      reply,
      intent,
      sentiment,
      escalate: false,
    };
  }
}
