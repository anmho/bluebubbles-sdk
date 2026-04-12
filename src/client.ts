import { ApiError } from './errors.js';
import { ENDPOINTS, RESOURCE_KEYS, type EndpointDescriptor, type ResourceKey } from './manifest.gen.js';

export type QueryPrimitive = string | number | boolean | null | undefined;
export type QueryValue = QueryPrimitive | readonly QueryPrimitive[];

export interface RequestInput {
  body?: unknown;
  headers?: HeadersInit;
  query?: Record<string, QueryValue>;
  [key: string]: unknown;
}

export type ResourceMethod = (input?: RequestInput) => Promise<unknown>;
export type ResourceClient = Record<string, ResourceMethod>;
export type ResourceMap = Record<ResourceKey, ResourceClient>;

export interface BlueBubblesClientOptions {
  baseUrl: string;
  password: string;
  fetch?: typeof fetch;
  headers?: HeadersInit;
}

export interface BlueBubblesClientConfigUpdate {
  baseUrl?: string;
  password?: string;
  fetch?: typeof fetch;
  headers?: HeadersInit;
}

const JSON_CONTENT_TYPE = 'application/json';

const isResponseLike = (value: unknown): value is Response => {
  return typeof Response !== 'undefined' && value instanceof Response;
};

const isStreamBody = (value: unknown): value is BodyInit => {
  return (
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof Blob ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value)
  );
};

const normalizeBaseUrl = (baseUrl: string): string => {
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
};

const addQuery = (url: URL, query: Record<string, QueryValue>): void => {
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === undefined || item === null) continue;
        url.searchParams.append(key, String(item));
      }
      continue;
    }

    url.searchParams.set(key, String(value));
  }
};

const parseResponsePayload = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes(JSON_CONTENT_TYPE)) {
    return response.json();
  }

  if (contentType.startsWith('text/')) {
    return response.text();
  }

  return response;
};

export class BlueBubblesClient {
  private readonly baseUrl: string;
  private readonly password: string;
  private readonly fetchImpl: typeof fetch;
  private readonly defaultHeaders?: HeadersInit;

  readonly resources: ResourceMap;

  constructor(options: BlueBubblesClientOptions) {
    this.baseUrl = normalizeBaseUrl(options.baseUrl);
    this.password = options.password;
    this.fetchImpl = options.fetch ?? fetch;
    this.defaultHeaders = options.headers;
    this.resources = this.buildResourceMap();
  }

  get config(): Readonly<BlueBubblesClientOptions> {
    return {
      baseUrl: this.baseUrl,
      password: this.password,
      fetch: this.fetchImpl,
      headers: this.defaultHeaders,
    };
  }

  withConfig(update: BlueBubblesClientConfigUpdate): BlueBubblesClient {
    return new BlueBubblesClient({
      baseUrl: update.baseUrl ?? this.baseUrl,
      password: update.password ?? this.password,
      fetch: update.fetch ?? this.fetchImpl,
      headers: update.headers ?? this.defaultHeaders,
    });
  }

  get attachments(): ResourceClient {
    return this.resources.attachments;
  }

  get backups(): ResourceClient {
    return this.resources.backups;
  }

  get chats(): ResourceClient {
    return this.resources.chats;
  }

  get contacts(): ResourceClient {
    return this.resources.contacts;
  }

  get fcm(): ResourceClient {
    return this.resources.fcm;
  }

  get handles(): ResourceClient {
    return this.resources.handles;
  }

  get icloud(): ResourceClient {
    return this.resources.icloud;
  }

  get macos(): ResourceClient {
    return this.resources.macos;
  }

  get messages(): ResourceClient {
    return this.resources.messages;
  }

  get server(): ResourceClient {
    return this.resources.server;
  }

  get web(): ResourceClient {
    return this.resources.web;
  }

  get other(): ResourceClient {
    return (this.resources as Record<string, ResourceClient>).other ?? {};
  }

  async request(endpoint: EndpointDescriptor, input: RequestInput = {}): Promise<unknown> {
    const { body, query = {}, headers, ...rest } = input;

    const resolvedPath = this.resolvePath(endpoint, rest);
    const url = new URL(resolvedPath.replace(/^\//, ''), this.baseUrl);
    addQuery(url, {
      password: this.password,
      ...query,
    });

    const requestHeaders = new Headers(this.defaultHeaders);
    if (headers) {
      new Headers(headers).forEach((value, key) => {
        requestHeaders.set(key, value);
      });
    }

    const requestInit: RequestInit = {
      method: endpoint.httpMethod,
      headers: requestHeaders,
    };

    if (body !== undefined && endpoint.httpMethod !== 'GET') {
      if (isStreamBody(body)) {
        requestInit.body = body;
      } else {
        if (!requestHeaders.has('content-type')) {
          requestHeaders.set('content-type', JSON_CONTENT_TYPE);
        }
        requestInit.body = JSON.stringify(body);
      }
    }

    const response = await this.fetchImpl(url, requestInit);
    const payload = await parseResponsePayload(response);

    if (!response.ok) {
      throw new ApiError({
        status: response.status,
        method: endpoint.httpMethod,
        url: url.toString(),
        payload,
        message: this.extractErrorMessage(payload) ?? undefined,
      });
    }

    return payload;
  }

  private buildResourceMap(): ResourceMap {
    const resources = Object.fromEntries(
      RESOURCE_KEYS.map((resource) => [resource, {} as ResourceClient]),
    ) as ResourceMap;

    for (const endpoint of ENDPOINTS) {
      const resource = endpoint.resource as ResourceKey;
      resources[resource][endpoint.methodName] = (input?: RequestInput) => this.request(endpoint, input);
    }

    return resources;
  }

  private resolvePath(endpoint: EndpointDescriptor, input: Record<string, unknown>): string {
    let path = endpoint.path;

    for (const param of endpoint.pathParams) {
      const value = input[param.paramName];
      if (value === undefined || value === null) {
        throw new Error(
          `Missing required path param \"${param.paramName}\" for ${endpoint.httpMethod} ${endpoint.path}`,
        );
      }

      path = path.replace(param.token, encodeURIComponent(String(value)));
    }

    return path;
  }

  private extractErrorMessage(payload: unknown): string | null {
    if (!payload) return null;
    if (typeof payload === 'string') return payload;

    if (typeof payload === 'object') {
      const message = (payload as { message?: unknown }).message;
      if (typeof message === 'string' && message.trim().length > 0) {
        return message;
      }
    }

    return null;
  }
}

export type ApiResponse = unknown;
export type DownloadResponse = Response;

export const isDownloadResponse = isResponseLike;
