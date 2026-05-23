import app from './app';
import { env } from './config/env.config';
import { logger } from './infrastructure/logger/logger';
import { prisma } from './infrastructure/prisma/prisma.client';

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  logger.info(`Chatbot Service running in ${env.NODE_ENV} mode on port ${PORT}`);
});

const handleShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  
  server.close(async () => {
    logger.info('HTTP server closed.');
    
    try {
      await prisma.$disconnect();
      logger.info('Database client disconnected.');
      process.exit(0);
    } catch (err) {
      logger.error('Error during database disconnection', { error: err });
      process.exit(1);
    }
  });

  // Force close after 10s
  setTimeout(() => {
    logger.error('Forceful shutdown due to timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Promise Rejection', { reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error });
  process.exit(1);
});
