import { PrismaClient } from '@prisma/client';
import { appConfig } from '../../config/app.config';
import { logger } from '../logger/logger';

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaClient ||
  new PrismaClient({
    log: appConfig.isDev ? ['query', 'info', 'warn', 'error'] : ['error'],
  });

if (appConfig.isDev) {
  // Bind query log event to Winston in dev
  (prisma as any).$on('query' as any, (e: any) => {
    logger.debug(`Prisma Query: ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`);
  });
}

if (!appConfig.isProd) {
  globalThis.prismaClient = prisma;
}
