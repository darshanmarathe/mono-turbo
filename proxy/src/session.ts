import { randomUUID } from 'node:crypto';
import type { Env } from '@repo/config';
import type { Session, User } from '@repo/models';
import { createRedis } from './redis.ts';
import type { RedisLike } from './redis.ts';

export interface SessionStore {
  get(id: string): Promise<Session | null>;
  set(session: Session): Promise<void>;
  destroy(id: string): Promise<void>;
}

const SESSION_TTL_SECONDS = 60 * 60;

export class MemorySessionStore implements SessionStore {
  private readonly sessions = new Map<string, Session>();

  async get(id: string): Promise<Session | null> {
    return this.sessions.get(id) ?? null;
  }

  async set(session: Session): Promise<void> {
    this.sessions.set(session.id, session);
  }

  async destroy(id: string): Promise<void> {
    this.sessions.delete(id);
  }
}

export class RedisSessionStore implements SessionStore {
  private readonly redis: RedisLike;

  constructor(redis: RedisLike) {
    this.redis = redis;
  }

  async get(id: string): Promise<Session | null> {
    const raw = await this.redis.get(`session:${id}`);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  }

  async set(session: Session): Promise<void> {
    await this.redis.set(`session:${session.id}`, JSON.stringify(session), 'EX', SESSION_TTL_SECONDS);
  }

  async destroy(id: string): Promise<void> {
    await this.redis.del(`session:${id}`);
  }
}

export function createSession(user: User): Session {
  const now = new Date();
  return {
    id: randomUUID(),
    tenantId: user.tenantId,
    userId: user.id,
    roles: user.roles,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + SESSION_TTL_SECONDS * 1000).toISOString(),
  };
}

export function createStore(env: Env): SessionStore {
  const redis = createRedis(env);
  return redis ? new RedisSessionStore(redis) : new MemorySessionStore();
}
