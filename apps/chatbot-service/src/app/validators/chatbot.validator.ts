import { z } from 'zod';

export const processMessageSchema = z.object({
  body: z.object({
    sessionId: z.string().uuid('Invalid session UUID format'),
    text: z.string().min(1, 'Message text cannot be empty'),
  }),
});
