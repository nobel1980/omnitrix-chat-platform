import { AIProvider } from './ai.gateway';
import { prisma } from '../../infrastructure/prisma/prisma.client';
import { MessageDirection } from '@prisma/client';
import { logger } from '../../infrastructure/logger/logger';

export class MemoryEngine {
  private provider = new AIProvider();

  public async load(sessionId: string): Promise<string> {
    try {
      const messages = await prisma.message.findMany({
        where: { conversationId: sessionId },
        orderBy: { createdAt: 'asc' },
        take: 10,
      });

      if (!messages.length) {
        return 'No previous history.';
      }

      return messages
        .map((m) => `${m.direction === MessageDirection.INBOUND ? 'User' : 'Bot'}: ${m.content || ''}`)
        .join('\n');
    } catch (error) {
      logger.error('Error in MemoryEngine loading messages:', { error, sessionId });
      return '';
    }
  }

  public async summarize(history: string): Promise<string> {
    if (!history || history === 'No previous history.') return '';
    try {
      const systemPrompt = 'Summarize the core facts of the conversation so far in 3 brief bullet points.';
      return await this.provider.chat(systemPrompt, history);
    } catch (error) {
      logger.error('Error in MemoryEngine summarization:', { error });
      return history;
    }
  }
}
