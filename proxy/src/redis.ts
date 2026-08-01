import type { Env } from '@repo/config';
import { Redis } from 'ioredis';

export interface RedisLike {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ...args: unknown[]): Promise<unknown>;
  del(key: string): Promise<unknown>;
}

export function createRedis(env: Env): RedisLike | null {
  if (env.SESSION_STORE !== 'redis' || !env.REDIS_URL) return null;
  return new Redis(env.REDIS_URL, { lazyConnect: true }) as unknown as RedisLike;
}
