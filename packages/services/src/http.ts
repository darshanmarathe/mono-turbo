import { TENANT_HEADER } from '@repo/config';
import type { ApiErrorBody } from '@repo/models';
import { ApiError } from '@repo/utils';

export interface RequestOptions extends RequestInit {
  tenantId?: string;
  accessToken?: string;
}

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body !== undefined) headers.set('Content-Type', 'application/json');
  if (options.tenantId) headers.set(TENANT_HEADER, options.tenantId);
  if (options.accessToken) headers.set('Authorization', `Bearer ${options.accessToken}`);

  const response = await fetch(path, { ...options, headers });

  if (!response.ok) {
    let body: ApiErrorBody | undefined;
    try {
      body = (await response.json()) as ApiErrorBody;
    } catch {
      body = undefined;
    }
    throw new ApiError(
      response.status,
      body?.code ?? 'http_error',
      body?.message ?? response.statusText,
      body?.details,
    );
  }

  return (await response.json()) as T;
}

export function jsonRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  return http<T>(path, {
    ...options,
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
