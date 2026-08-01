import { CACHE_TTL_SECONDS } from '@repo/config';
import type { Env } from '@repo/config';
import { createRedis } from './redis.ts';
import type { RedisLike } from './redis.ts';

export interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
}

export class MemoryCache implements Cache {
  private readonly entries = new Map<string, { value: string; expiresAt: number }>();

  async get(key: string): Promise<string | null> {
    const entry = this.entries.get(key);
    if (!entry) return null;
    if (entry.expiresAt < Date.now()) {
      this.entries.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds = CACHE_TTL_SECONDS): Promise<void> {
    this.entries.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  }
}

export class RedisCache implements Cache {
  private readonly redis: RedisLike;

  constructor(redis: RedisLike) {
    this.redis = redis;
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(`cache:${key}`);
  }

  async set(key: string, value: string, ttlSeconds = CACHE_TTL_SECONDS): Promise<void> {
    await this.redis.set(`cache:${key}`, value, 'EX', ttlSeconds);
  }
}

export function createCache(env: Env): Cache {
  const redis = createRedis(env);
  return redis ? new RedisCache(redis) : new MemoryCache();
}
