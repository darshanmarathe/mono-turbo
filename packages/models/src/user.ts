import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string(),
  email: z.string().email(),
  displayName: z.string(),
  roles: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;
