import type { Session } from '@repo/models';
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    session: Session | null;
  }
}
