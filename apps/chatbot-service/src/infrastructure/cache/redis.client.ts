import Redis from 'ioredis';
import { env } from '../../config/env.config';
import { logger } from '../logger/logger';

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  lazyConnect: true,
});

redis.on('connect', () => {
  logger.info('Connected to Redis server.');
});

redis.on('error', (err) => {
  logger.error('Redis Client Error', { error: err });
});
