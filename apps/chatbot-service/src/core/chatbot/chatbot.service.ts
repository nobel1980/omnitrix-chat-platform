import { ChatbotEngine } from './chatbot.engine';
import { prisma } from '../../infrastructure/prisma/prisma.client';
import { ConversationStatus, MessageDirection, ChannelType, SentimentType } from '@prisma/client';

export class ChatbotService {
  private engine = new ChatbotEngine();

  public async handleMessage(sessionId: string, text: string) {
    const session = await prisma.conversation.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.status === ConversationStatus.CLOSED) {
      throw new Error('Session not found or already completed');
    }

    // Save User message
    await prisma.message.create({
      data: {
        conversationId: sessionId,
        direction: MessageDirection.INBOUND,
        content: text,
      },
    });

    // Process using Engine
    const result = await this.engine.process({
      sessionId,
      customerId: session.externalUserId,
      rawText: text,
      timestamp: new Date(),
    });

    // Map sentiment string to SentimentType enum
    let sentimentVal: SentimentType | null = null;
    if (result.sentiment) {
      const lowerSentiment = result.sentiment.toLowerCase();
      if (lowerSentiment.includes('angry') || lowerSentiment.includes('negative')) {
        sentimentVal = SentimentType.NEGATIVE;
      } else if (lowerSentiment.includes('positive')) {
        sentimentVal = SentimentType.POSITIVE;
      } else if (lowerSentiment.includes('neutral')) {
        sentimentVal = SentimentType.NEUTRAL;
      }
    }

    // Save Bot message
    await prisma.message.create({
      data: {
        conversationId: sessionId,
        direction: MessageDirection.OUTBOUND,
        content: result.reply,
        intent: result.intent,
        sentiment: sentimentVal,
      },
    });

    if (result.escalate) {
      await prisma.conversation.update({
        where: { id: sessionId },
        data: { status: ConversationStatus.ESCALATED },
      });
    }

    return result;
  }

  public async createSession(customerId: string) {
    return prisma.conversation.create({
      data: {
        externalUserId: customerId,
        channel: ChannelType.WEB,
        status: ConversationStatus.ACTIVE,
      },
    });
  }

  public async terminateSession(sessionId: string) {
    return prisma.conversation.update({
      where: { id: sessionId },
      data: {
        status: ConversationStatus.CLOSED,
        endedAt: new Date(),
      },
    });
  }
}
