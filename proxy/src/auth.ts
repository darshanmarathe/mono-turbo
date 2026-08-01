import { SignJWT, jwtVerify } from 'jose';
import type { Session } from '@repo/models';

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? 'dev-secret-change-me-please-123',
);

const TOKEN_TTL_MS = 15 * 60 * 1000;
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

export interface AccessTokenClaims {
  sub: string;
  tenantId: string;
  roles: string[];
}

export async function signAccessToken(session: Session): Promise<string> {
  const cached = tokenCache.get(session.id);
  if (cached && cached.expiresAt > Date.now()) return cached.token;

  const token = await new SignJWT({ tenantId: session.tenantId, roles: session.roles })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(session.userId)
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);

  tokenCache.set(session.id, { token, expiresAt: Date.now() + TOKEN_TTL_MS });
  return token;
}

export function clearAccessTokenCache(sessionId: string): void {
  tokenCache.delete(sessionId);
}

export async function verifyAccessToken(token: string): Promise<AccessTokenClaims> {
  const { payload } = await jwtVerify(token, secret);
  return {
    sub: String(payload.sub ?? ''),
    tenantId: String(payload.tenantId ?? ''),
    roles: Array.isArray(payload.roles) ? (payload.roles as string[]) : [],
  };
}
