import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(8080),
  API_TARGET: z.string().url().default('http://127.0.0.1:9999'),
  REDIS_URL: z.string().optional(),
  SESSION_STORE: z.enum(['memory', 'redis']).default('memory'),
  SESSION_SECRET: z.string().min(16).default('dev-secret-change-me-please-123'),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(source: Record<string, string | undefined> = {}): Env {
  return envSchema.parse(source);
}
