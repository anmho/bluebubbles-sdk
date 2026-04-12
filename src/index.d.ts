import { BlueBubblesApi } from './generated/BlueBubblesApi.js';
export interface BlueBubblesClientConfig {
    baseUrl: string;
    password?: string;
    token?: string;
}
export declare class BlueBubblesClient {
    private readonly api;
    constructor(config: BlueBubblesClientConfig);
    /**
     * Chat-related operations
     */
    get chats(): {
        /**
         * Get a chat by its GUID
         */
        get: (params: {
            chatGuid: string;
        }) => any;
        /**
         * List all chats (with query options)
         */
        list: (params?: {
            requestBody?: any;
        }) => any;
        /**
         * Get messages for a specific chat
         */
        listMessages: (params: {
            chatGuid: string;
        }) => any;
        /**
         * Create a new chat
         */
        create: (params: {
            requestBody: any;
        }) => any;
        /**
         * Mark a chat as read
         */
        markRead: (params: {
            chatGuid: string;
            requestBody?: any;
        }) => any;
    };
    /**
     * Message-related operations
     */
    get messages(): {
        /**
         * Send a text message
         */
        sendText: (params: {
            requestBody: any;
        }) => any;
        /**
         * Send an attachment
         */
        sendAttachment: (params: {
            requestBody: any;
        }) => any;
        /**
         * Get a message by its GUID
         */
        get: (params: {
            guid: string;
        }) => any;
    };
    /**
     * Handle-related operations
     */
    get handles(): {
        /**
         * List handles
         */
        list: () => any;
        /**
         * Get a handle by its address
         */
        get: (params: {
            handleAddress: string;
        }) => any;
    };
    /**
     * Attachment-related operations
     */
    get attachments(): {
        /**
         * Get an attachment by its GUID
         */
        get: (params: {
            guid: string;
        }) => any;
        /**
         * Download an attachment
         */
        download: (params: {
            guid: string;
        }) => any;
    };
    /**
     * Access to the raw underlying API services
     */
    get raw(): BlueBubblesApi;
}
export * from './generated/index.js';
//# sourceMappingURL=index.d.ts.map