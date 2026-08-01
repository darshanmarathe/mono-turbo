import type { FastifyInstance } from 'fastify';

export async function registerSessionRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/session', async (request, reply) => {
    const session = request.session;
    if (!session) {
      return reply.code(401).send({ code: 'unauthenticated', message: 'No active session' });
    }
    return { session };
  });
}
