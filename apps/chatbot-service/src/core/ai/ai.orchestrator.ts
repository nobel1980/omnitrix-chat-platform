import { AIProvider } from './ai.gateway';
import { PromptBuilder } from './prompt.builder';
import { IntentEngine } from './intent.engine';
import { MemoryEngine } from './memory.engine';
import { ResponseProcessor } from './response.processor';
import { AIResponse, ChatContext } from './types';
import { logger } from '../../infrastructure/logger/logger';

export class AIOrchestrator {
  private provider = new AIProvider();
  private promptBuilder = new PromptBuilder();
  private intentEngine = new IntentEngine();
  private memoryEngine = new MemoryEngine();

  public async orchestrate(ctx: ChatContext): Promise<AIResponse> {
    logger.info(`Orchestrating response for session ${ctx.sessionId}`);

    // 1. Detect Intent
    const { intent, confidence } = await this.intentEngine.detect(ctx.message);
    logger.info(`Detected intent: ${intent} with confidence: ${confidence}`);

    // 2. Load and build Memory
    const history = ctx.history || (await this.memoryEngine.load(ctx.sessionId));

    // 3. Assemble Prompt using instantiated builder
    const prompt = this.promptBuilder.build(intent, history, ctx.message);

    // 4. Generate AI completion
    const systemMessage = 'You are a professional HR and customer service assistant.';
    const rawReply = await this.provider.chat(systemMessage, prompt);
    const reply = ResponseProcessor.sanitize(rawReply);

    // 5. Evaluate Escalation Rules
    const shouldEscalate = intent === 'ESCALATE' || ctx.message.toLowerCase().includes('agent');

    return {
      reply,
      intent,
      confidence,
      sentiment: 'neutral', // default placeholder
      entities: {},
      shouldEscalate,
    };
  }
}
