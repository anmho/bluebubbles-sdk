import { BlueBubblesApi } from './generated/BlueBubblesApi';
import { FetchHttpRequest } from './generated/core/FetchHttpRequest';
import type { OpenAPIConfig } from './generated/core/OpenAPI';
import type { ApiRequestOptions } from './generated/core/ApiRequestOptions';
import type { CancelablePromise } from './generated/core/CancelablePromise';

/**
 * Thin wrapper to handle BlueBubbles authentication automatically.
 * This is the ONLY bridge code, everything else is direct from the generator.
 */
class BlueBubblesHttpRequest extends FetchHttpRequest {
    public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
        const password = (this as any).config.PASSWORD;
        if (password) {
            options = {
                ...options,
                query: { ...options.query, password }
            };
        }
        return super.request(options);
    }
}

export interface BlueBubblesClientConfig {
    baseUrl: string;
    password?: string;
    token?: string;
}

/**
 * The BlueBubbles SDK Client.
 * 
 * Usage:
 * ```ts
 * const client = new BlueBubblesClient({ baseUrl: '...', password: '...' });
 * const chat = await client.chats.get({ chatGuid: '...' });
 * ```
 */
export class BlueBubblesClient extends BlueBubblesApi {
    constructor(config: BlueBubblesClientConfig) {
        super(
            {
                BASE: config.baseUrl.replace(/\/$/, ''),
                PASSWORD: config.password || config.token,
            },
            BlueBubblesHttpRequest as any
        );
    }
}

export * from './generated/index';
export { ApiError } from './generated/core/ApiError';
export { CancelError } from './generated/core/CancelablePromise';
