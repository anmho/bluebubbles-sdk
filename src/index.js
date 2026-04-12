import { BlueBubblesApi } from './generated/BlueBubblesApi.js';
import { FetchHttpRequest } from './generated/core/FetchHttpRequest.js';
/**
 * Custom HTTP request class to inject BlueBubbles authentication into every request.
 */
class BlueBubblesHttpRequest extends FetchHttpRequest {
    constructor(config) {
        super(config);
    }
    request(options) {
        const password = this.config.PASSWORD;
        if (password) {
            options.query = {
                ...options.query,
                password: password,
            };
        }
        return super.request(options);
    }
}
export class BlueBubblesClient {
    api;
    constructor(config) {
        this.api = new BlueBubblesApi({
            BASE: config.baseUrl.replace(/\/$/, ''),
            PASSWORD: config.password || config.token,
        }, BlueBubblesHttpRequest);
    }
    /**
     * Chat-related operations
     */
    get chats() {
        return {
            /**
             * Get a chat by its GUID
             */
            get: (params) => this.api.chat.getChatIconByGuid(params),
            /**
             * List all chats (with query options)
             */
            list: (params) => this.api.chat.queryChats(params || {}),
            /**
             * Get messages for a specific chat
             */
            listMessages: (params) => this.api.chat.getChatMessages(params),
            /**
             * Create a new chat
             */
            create: (params) => this.api.chat.createNewChat(params),
            /**
             * Mark a chat as read
             */
            markRead: (params) => this.api.chat.markChatAsRead(params),
        };
    }
    /**
     * Message-related operations
     */
    get messages() {
        return {
            /**
             * Send a text message
             */
            sendText: (params) => this.api.message.sendTextMessage(params),
            /**
             * Send an attachment
             */
            sendAttachment: (params) => this.api.message.sendAttachment(params),
            /**
             * Get a message by its GUID
             */
            get: (params) => this.api.message.getMessageByGuid(params),
        };
    }
    /**
     * Handle-related operations
     */
    get handles() {
        return {
            /**
             * List handles
             */
            list: () => this.api.handle.getHandles(),
            /**
             * Get a handle by its address
             */
            get: (params) => this.api.handle.getHandleByAddress(params),
        };
    }
    /**
     * Attachment-related operations
     */
    get attachments() {
        return {
            /**
             * Get an attachment by its GUID
             */
            get: (params) => this.api.attachment.getAttachmentByGuid(params),
            /**
             * Download an attachment
             */
            download: (params) => this.api.attachment.downloadAttachment(params),
        };
    }
    /**
     * Access to the raw underlying API services
     */
    get raw() {
        return this.api;
    }
}
export * from './generated/index.js';
//# sourceMappingURL=index.js.map