import { BlueBubblesApi } from './generated/BlueBubblesApi';
import { FetchHttpRequest } from './generated/core/FetchHttpRequest';
import type { OpenAPIConfig } from './generated/core/OpenAPI';
import type { ApiRequestOptions } from './generated/core/ApiRequestOptions';
import type { CancelablePromise } from './generated/core/CancelablePromise';

/**
 * Custom HTTP request class to inject BlueBubbles authentication into every request.
 */
class BlueBubblesHttpRequest extends FetchHttpRequest {
    constructor(config: OpenAPIConfig) {
        super(config);
    }

    public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
        // Accessing protected config property
        const password = (this as any).config.PASSWORD;
        if (password) {
            // Options.query might be read-only in some versions of the generator,
            // or the object itself is meant to be immutable. 
            // We create a new options object to be safe.
            options = {
                ...options,
                query: {
                    ...options.query,
                    password: password,
                }
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

export class BlueBubblesClient {
    private readonly api: BlueBubblesApi;

    constructor(config: BlueBubblesClientConfig) {
        this.api = new BlueBubblesApi(
            {
                BASE: config.baseUrl.replace(/\/$/, ''),
                PASSWORD: config.password || config.token,
            },
            BlueBubblesHttpRequest as any
        );
    }

    /**
     * Chat-related operations
     */
    public get chats() {
        return {
            /**
             * Get a chat's icon or basic info by its GUID
             */
            get: (params: { chatGuid: string }) => this.api.chat.getChatIconByGuid(params),
            /**
             * List all chats (with query options)
             */
            list: (params?: { requestBody?: any }) => this.api.chat.queryChats(params || {}),
            /**
             * Get messages for a specific chat
             */
            listMessages: (params: { chatGuid: string }) => this.api.chat.getChatMessages(params),
            /**
             * Create a new chat
             */
            create: (params: { requestBody: any }) => this.api.chat.createNewChat(params),
            /**
             * Mark a chat as read
             */
            markRead: (params: { chatGuid: string; requestBody?: any }) => this.api.chat.markChatAsRead(params),
        };
    }

    /**
     * Message-related operations
     */
    public get messages() {
        return {
            /**
             * Send a text message
             */
            sendText: (params: { requestBody: any }) => this.api.message.sendText(params),
            /**
             * Send an attachment
             */
            sendAttachment: (params: { requestBody: any }) => this.api.message.sendAttachment(params),
            /**
             * Get a message by its GUID
             */
            get: (params: { guid: string }) => this.api.message.getMessageByGuid(params),
            /**
             * Query messages
             */
            list: (params?: { requestBody?: any }) => this.api.message.queryMessages(params || {}),
        };
    }

    /**
     * Handle-related operations
     */
    public get handles() {
        return {
            /**
             * Query handles
             */
            list: (params?: { requestBody?: any }) => this.api.handle.queryHandles(params || {}),
            /**
             * Get a handle by its address
             */
            get: (params: { handleAddress: string }) => this.api.handle.getHandleByAddress(params),
        };
    }

    /**
     * Attachment-related operations
     */
    public get attachments() {
        return {
            /**
             * Get an attachment by its GUID
             */
            get: (params: { guid: string }) => this.api.attachment.getAttachmentByGuid(params),
            /**
             * Download an attachment
             */
            download: (params: { guid: string }) => this.api.attachment.downloadAttachment(params),
        };
    }

    /**
     * Access to the raw underlying API services
     */
    public get raw() {
        return this.api;
    }
}

export * from './generated/index';
export { ApiError } from './generated/core/ApiError';
export { CancelError } from './generated/core/CancelablePromise';
