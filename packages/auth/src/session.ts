import { SESSION_COOKIE } from '@repo/config';

export function getSessionToken(): string | null {
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  if (!match) return null;
  return match.slice(SESSION_COOKIE.length + 1);
}
