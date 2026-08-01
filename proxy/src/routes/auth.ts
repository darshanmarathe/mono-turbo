import type { FastifyInstance } from 'fastify';
import { SESSION_COOKIE } from '@repo/config';
import type { User } from '@repo/models';
import { clearAccessTokenCache, signAccessToken } from '../auth.ts';
import { authenticate } from '../identity.ts';
import { createSession } from '../session.ts';
import type { SessionStore } from '../session.ts';

interface LoginBody {
  email?: string;
  password?: string;
}

export async function registerAuthRoutes(app: FastifyInstance, store: SessionStore): Promise<void> {
  app.post('/api/auth/login', async (request, reply) => {
    const body = (request.body ?? {}) as LoginBody;
    const email = body.email ?? '';
    const password = body.password ?? '';

    const identity = authenticate(email, password);
    if (!identity) {
      return reply.code(401).send({
        code: 'invalid_credentials',
        message: 'Invalid email or password',
      });
    }

    const user: User = {
      id: identity.id,
      tenantId: identity.tenantId,
      email: identity.email,
      displayName: identity.displayName,
      roles: identity.roles,
    };

    const session = createSession(user);
    await store.set(session);

    reply.setCookie(SESSION_COOKIE, session.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: request.protocol === 'https',
      maxAge: 60 * 60,
    });

    return { user, accessToken: await signAccessToken(session) };
  });

  app.post('/api/auth/logout', async (request, reply) => {
    const sessionId = request.cookies[SESSION_COOKIE];
    if (sessionId) {
      await store.destroy(sessionId);
      clearAccessTokenCache(sessionId);
    }
    reply.clearCookie(SESSION_COOKIE, { path: '/' });
    return { ok: true };
  });
}
