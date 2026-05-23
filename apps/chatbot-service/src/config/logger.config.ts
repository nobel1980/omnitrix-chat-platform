import { env } from './env.config';

export const loggerConfig = {
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  silent: env.NODE_ENV === 'test',
  format: env.NODE_ENV === 'production' ? 'json' : 'text',
};
