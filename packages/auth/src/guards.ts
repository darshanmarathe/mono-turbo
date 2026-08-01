import { getSessionToken } from './session.ts';

export function isAuthenticated(): boolean {
  return getSessionToken() !== null;
}

export function assertAuthenticated(): string {
  const token = getSessionToken();
  if (!token) throw new Error('No active session');
  return token;
}
