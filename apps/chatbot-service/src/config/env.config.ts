import dotenv from 'dotenv';
import { z } from 'zod';

// Load environmental variables
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(8),
  OPENAI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default('gpt-4o'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Configuration errors in environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
export type EnvType = z.infer<typeof envSchema>;
