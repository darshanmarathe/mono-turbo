import 'dotenv/config';
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { parseEnv, SESSION_COOKIE } from '@repo/config';
import { createCache } from './cache.ts';
import { createStore } from './session.ts';
import { registerAuthRoutes } from './routes/auth.ts';
import { registerHealth } from './routes/health.ts';
import { registerPassthrough } from './routes/passthrough.ts';
import { registerSessionRoutes } from './routes/session.ts';

const env = parseEnv();
const app = Fastify({ logger: true });

await app.register(cors, { origin: true, credentials: true });
await app.register(cookie);

const store = createStore(env);
const cache = createCache(env);

app.addHook('preHandler', async (request) => {
  const sessionId = request.cookies[SESSION_COOKIE];
  request.session = sessionId ? await store.get(sessionId) : null;
});

await registerHealth(app);
await registerAuthRoutes(app, store);
await registerSessionRoutes(app);
await registerPassthrough(app, env, cache);

await app.listen({ port: env.PORT, host: '0.0.0.0' });
