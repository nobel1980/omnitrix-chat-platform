import { env } from './env.config';

export const appConfig = {
  name: 'chatbot-service',
  version: '1.0.0',
  apiPrefix: '/api',
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
};
