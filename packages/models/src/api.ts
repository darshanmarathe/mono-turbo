export interface ApiEnvelope<T> {
  data: T;
  meta: {
    requestId: string;
    tenantId: string;
  };
}

export interface ApiErrorBody {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
