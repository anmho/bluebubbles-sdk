/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChatService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Chat Count
     * <p>Get the total number of chats for your iMessage account (on the device)</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getChatCount(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/chat/count',
        });
    }
    /**
     * Create New Chat
     * <p>Create a new iMessage chat</p>
     * <p><strong>Minimum BlueBubbles Server Version</strong>: 0.3.0</p>
     * <p><strong>Requires:</strong> Private API</p>
     * <h4 id="request-body">Request Body</h4>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * // A list of participants for the chat
         * "addresses": [],
         * // (Optional) A message to send in the new chat
         * "message": "An optional message to send"
         * }
         * </code></pre>
         *
         * @returns any Successful response
         * @throws ApiError
         */
        public createNewChat({
            requestBody,
        }: {
            requestBody?: Record<string, any>,
        }): CancelablePromise<any> {
            return this.httpRequest.request({
                method: 'POST',
                url: '/api/v1/chat/new',
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * Query Chats
         * <p>Query for Chats from the database</p>
         * <h4 id="request-body">Request Body</h4>
         * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
             * // (Optional) A number representing the offset for the database query.
             * // This is useful for paging through data from the database to make database calls return as quick as possible.
             * // (Default: 0)
             * "limit": 1000,
             * //( Optional) A number representing the offset for the database query.
             * // This is useful for paging through data from the database to make database calls return as quick as possible.
             * // (Default: 0)
             * "offset": 0,
             * // (Optional) What related information do you want returned with the messages?
             * // Must be one of: `participants`, `lastmessage`, `sms`, `archived`, `message.attributed-body`, `message.message-info-summary`, `message.payload-data`
             * "with": [
                 * "lastMessage",
                 * "participants",
                 * "sms",
                 * "archived"
                 * ],
                 * // (Optional) How the returned data should be sorted.
                 * // In order to sort, `lastmessage` must be included in the `with` parameter.
                 * // Must be: `lastmessage`
                 * "sort": "lastmessage"
                 * }
                 *
                 * </code></pre>
                 *
                 * @returns any Successful response
                 * @throws ApiError
                 */
                public queryChats({
                    requestBody,
                }: {
                    requestBody?: Record<string, any>,
                }): CancelablePromise<any> {
                    return this.httpRequest.request({
                        method: 'POST',
                        url: '/api/v1/chat/query',
                        body: requestBody,
                        mediaType: 'application/json',
                    });
                }
                /**
                 * Delete Chat
                 * <p>Deletes a chat from the iMessage client on the macOS server. This will only apply to the macOS server's iMessage client, and no other Apple devices.</p>
                 * <p><strong>Minimum BlueBubbles Server Version</strong>: 1.3.0</p>
                 * <p><strong>Requires:</strong> Private API</p>
                 * <h4 id="request-body">Request Body</h4>
                 * <p>N/A</p>
                 *
                 * @returns any Successful response
                 * @throws ApiError
                 */
                public deleteChat({
                    chatGuid,
                }: {
                    chatGuid: string,
                }): CancelablePromise<any> {
                    return this.httpRequest.request({
                        method: 'DELETE',
                        url: '/api/v1/chat/{chatGuid}',
                        path: {
                            'chatGuid': chatGuid,
                        },
                    });
                }
                /**
                 * Get Chat Icon by GUID
                 * <p>Fetches a group chat's Icon. This will only return an icon if the group has one set, and if they have set it at somepoint <em>after</em> the inception of the macOS host.</p>
                 *
                 * @returns any Successful response
                 * @throws ApiError
                 */
                public getChatIconByGuid({
                    chatGuid,
                }: {
                    chatGuid: string,
                }): CancelablePromise<any> {
                    return this.httpRequest.request({
                        method: 'GET',
                        url: '/api/v1/chat/{chatGuid}',
                        path: {
                            'chatGuid': chatGuid,
                        },
                    });
                }
                /**
                 * Update a Chat
                 * <p>Updates an existing chat</p>
                 * <p><strong>Minimum BlueBubbles Server Version</strong>: 0.3.0</p>
                 * <p><strong>Requires:</strong> Private API</p>
                 * <h4 id="request-body">Request Body</h4>
                 * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                     * // (Optional) A new name for a group chat
                     * "displayName": ""
                     * }
                     * </code></pre>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public updateAChat({
                        chatGuid,
                        requestBody,
                    }: {
                        chatGuid: string,
                        requestBody?: Record<string, any>,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'PUT',
                            url: '/api/v1/chat/{chatGuid}',
                            path: {
                                'chatGuid': chatGuid,
                            },
                            body: requestBody,
                            mediaType: 'application/json',
                        });
                    }
                    /**
                     * Get Chat Messages
                     * <p>Fetch messages associated with a specified chat</p>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public getChatMessages({
                        chatGuid,
                    }: {
                        chatGuid: string,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'GET',
                            url: '/api/v1/chat/{chatGuid}/message',
                            path: {
                                'chatGuid': chatGuid,
                            },
                        });
                    }
                    /**
                     * Mark Chat as Read
                     * <p>Marks a chat as read. This will also dispatch an event to other BlueBubbles clients indicating the chat should be marked read.</p>
                     * <p><strong>Minimum BlueBubbles Server Version</strong>: 1.1.0</p>
                     * <p><strong>Requires:</strong> Private API</p>
                     * <h4 id="request-body">Request Body</h4>
                     * <p>N/A</p>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public markChatAsRead({
                        chatGuid,
                        requestBody,
                    }: {
                        chatGuid: string,
                        requestBody?: Record<string, any>,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'POST',
                            url: '/api/v1/chat/{chatGuid}/read',
                            path: {
                                'chatGuid': chatGuid,
                            },
                            body: requestBody,
                            mediaType: 'application/json',
                        });
                    }
                    /**
                     * Share Contact Info
                     * <p>Allows you to share your own iCloud Contact Card with another chat.</p>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public shareContactInfo({
                        chatGuid,
                        requestBody,
                    }: {
                        chatGuid: string,
                        requestBody?: Record<string, any>,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'POST',
                            url: '/api/v1/chat/{chatGuid}/share/contact',
                            path: {
                                'chatGuid': chatGuid,
                            },
                            body: requestBody,
                            mediaType: 'application/json',
                        });
                    }
                    /**
                     * Get Contact Share Status
                     * <p>Fetch messages associated with a specified chat</p>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public getContactShareStatus({
                        chatGuid,
                    }: {
                        chatGuid: string,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'GET',
                            url: '/api/v1/chat/{chatGuid}/share/contact/status',
                            path: {
                                'chatGuid': chatGuid,
                            },
                        });
                    }
                    /**
                     * Stop Send Typing Indicator
                     * <p>Allows you to stop sending typing indicators to a chat</p>
                     * <p><strong>Requires:</strong> Private API</p>
                     * <p><strong>Note:</strong> Typing indicators will automatically stop when you send a message to the specified chat.</p>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public stopSendTypingIndicator({
                        chatGuid,
                    }: {
                        chatGuid: string,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'DELETE',
                            url: '/api/v1/chat/{chatGuid}/typing',
                            path: {
                                'chatGuid': chatGuid,
                            },
                        });
                    }
                    /**
                     * Start Send Typing Indicator
                     * <p>Allows you to start sending typing indicators to a chat</p>
                     * <p><strong>Requires:</strong> Private API</p>
                     * <p><strong>Note:</strong> Typing indicators will automatically stop when you send a message to the specified chat.</p>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public startSendTypingIndicator({
                        chatGuid,
                        requestBody,
                    }: {
                        chatGuid: string,
                        requestBody?: any,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'POST',
                            url: '/api/v1/chat/{chatGuid}/typing',
                            path: {
                                'chatGuid': chatGuid,
                            },
                            body: requestBody,
                        });
                    }
                    /**
                     * Mark Chat as Unread
                     * <p>Marks a chat as unread. This will also dispatch an event to other BlueBubbles clients indicating the chat should be marked unread.</p>
                     * <p>If you are not running macOS Ventura and send this API request, the event will still be dispatched to other BlueBubbles clients. However, it will not be marked as unread "officially" for other iOS devices.</p>
                     * <p><strong>Minimum BlueBubbles Server Version</strong>: 1.4.0</p>
                     * <p><strong>Requires:</strong></p>
                     * <ul>
                     * <li>Private API</li>
                     * <li>macOS Ventura</li>
                     * </ul>
                     * <h4 id="request-body">Request Body</h4>
                     * <p>N/A</p>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public markChatAsUnread({
                        chatGuid,
                        requestBody,
                    }: {
                        chatGuid: string,
                        requestBody?: Record<string, any>,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'POST',
                            url: '/api/v1/chat/{chatGuid}/unread',
                            path: {
                                'chatGuid': chatGuid,
                            },
                            body: requestBody,
                            mediaType: 'application/json',
                        });
                    }
                }
