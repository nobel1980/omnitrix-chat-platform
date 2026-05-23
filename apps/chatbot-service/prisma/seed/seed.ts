import { PrismaClient, ConversationStatus, MessageDirection, ChannelType, SentimentType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding chatbot database...');

  // Create a sample completed conversation
  const completedConversation = await prisma.conversation.create({
    data: {
      externalUserId: 'cust_12345',
      channel: ChannelType.WEB,
      status: ConversationStatus.CLOSED,
      startedAt: new Date(Date.now() - 3600000), // 1 hour ago
      endedAt: new Date(Date.now() - 1800000),   // 30 mins ago
      messages: {
        create: [
          {
            direction: MessageDirection.INBOUND,
            content: 'Hello, what are your business hours?',
            intent: 'inquire_hours',
            sentiment: SentimentType.NEUTRAL
          },
          {
            direction: MessageDirection.OUTBOUND,
            content: 'Hello! We are open Monday to Friday from 9 AM to 6 PM.',
            intent: 'respond_hours',
            sentiment: SentimentType.POSITIVE
          },
          {
            direction: MessageDirection.INBOUND,
            content: 'Thank you!',
            intent: 'express_thanks',
            sentiment: SentimentType.POSITIVE
          }
        ]
      }
    }
  });

  // Create an active conversation
  const activeConversation = await prisma.conversation.create({
    data: {
      externalUserId: 'cust_67890',
      channel: ChannelType.WEB,
      status: ConversationStatus.ACTIVE,
      messages: {
        create: [
          {
            direction: MessageDirection.INBOUND,
            content: 'I have a problem with my order #999',
            intent: 'order_issue',
            sentiment: SentimentType.NEGATIVE
          }
        ]
      }
    }
  });

  console.log('Seeding completed successfully!');
  console.log(`Created conversations: ${completedConversation.id} (CLOSED) and ${activeConversation.id} (ACTIVE)`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

