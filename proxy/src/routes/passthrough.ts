import type { FastifyInstance } from 'fastify';
import type { Env } from '@repo/config';
import { signAccessToken } from '../auth.ts';
import type { Cache } from '../cache.ts';

const SKIPPED_HEADERS = new Set(['host', 'content-length', 'connection', 'origin', 'cookie']);

export async function registerPassthrough(app: FastifyInstance, env: Env, cache: Cache): Promise<void> {
  app.all('/api/*', async (request, reply) => {
    const session = request.session;
    const upstream = new URL(request.url, env.API_TARGET);

    if (request.method === 'GET') {
      const cached = await cache.get(upstream.href);
      if (cached !== null) {
        return reply.type('application/json').send(JSON.parse(cached) as unknown);
      }
    }

    const token = session ? await signAccessToken(session) : null;
    const headers = new Headers();
    for (const [key, value] of Object.entries(request.headers)) {
      if (value === undefined || SKIPPED_HEADERS.has(key)) continue;
      if (Array.isArray(value)) {
        for (const item of value) headers.append(key, item);
      } else {
        headers.append(key, value);
      }
    }
    headers.set('x-tenant-id', session?.tenantId ?? '');
    if (token) headers.set('authorization', `Bearer ${token}`);
    if (request.body !== undefined) headers.set('content-type', 'application/json');

    let response: Response;
    try {
      response = await fetch(upstream, {
        method: request.method,
        headers,
        body:
          request.method === 'GET' || request.method === 'HEAD'
            ? undefined
            : JSON.stringify(request.body),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upstream unreachable';
      return reply.code(502).send({ code: 'upstream_unreachable', message });
    }

    const text = await response.text();

    if (request.method === 'GET' && response.status >= 200 && response.status < 300) {
      await cache.set(upstream.href, text);
    }

    return reply.code(response.status).type('application/json').send(text || null);
  });
}
