export class ApiError extends Error {
  readonly status: number;
  readonly method: string;
  readonly url: string;
  readonly payload: unknown;

  constructor(params: {
    status: number;
    method: string;
    url: string;
    payload: unknown;
    message?: string;
  }) {
    super(params.message ?? `${params.method} ${params.url} failed with status ${params.status}`);
    this.name = 'ApiError';
    this.status = params.status;
    this.method = params.method;
    this.url = params.url;
    this.payload = params.payload;
  }
}
