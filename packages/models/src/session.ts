import { z } from 'zod';

export const SessionSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  userId: z.string(),
  roles: z.array(z.string()),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
});

export type Session = z.infer<typeof SessionSchema>;
