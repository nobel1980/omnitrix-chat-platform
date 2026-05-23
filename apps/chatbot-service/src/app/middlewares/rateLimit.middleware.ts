import { rateLimit } from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  message: 'Too many requests, please try again later.',
});
