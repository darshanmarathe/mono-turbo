import type { User } from '@repo/models';
import { jsonRequest } from './http.ts';

export function fetchUsers(tenantId: string, accessToken: string): Promise<User[]> {
  return jsonRequest<User[]>('GET', '/api/users', undefined, { tenantId, accessToken });
}
