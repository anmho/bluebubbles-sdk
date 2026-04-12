/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MessageService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Send Attachment
     * <p>Send an attachment via iMessage.</p>
     * <p><strong>Minimum BlueBubbles Server Version</strong>: 0.3.0</p>
     * <p><em><strong>Note</strong>__: the</em> <em><code>partIndex</code></em> <em>parameter is only supported on macOS BIg Sur and newer, and requires BlueBubbles Server v1.4.0</em></p>
     * <p><em><strong>Note</strong>__: This endpoint conditionally uses the Private API if certain parameters are present. Here are the parameters that will use the Private API:</em></p>
     * <ul>
     * <li><em>method: private-api</em></li>
     * <li><em>subject</em></li>
     * <li><em>effectId</em></li>
     * <li><em>selectedMessageGuid</em></li>
     * </ul>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public sendAttachment({
        requestBody,
    }: {
        requestBody?: any,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/message/attachment',
            body: requestBody,
        });
    }
    /**
     * Get Updated Message Count
     * <p>Get the total number of messages for your iMessage account (on the device)</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getUpdatedMessageCount(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/message/count',
        });
    }
    /**
     * Get My Sent Message Count
     * <p>Get the total number of messages that you have sent, for your iMessage account (on the device)</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getMySentMessageCount(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/message/count/me',
        });
    }
    /**
     * Send Multipart Message
     * <p>Send a multipart message</p>
     * <h4 id="request-body">Request Body</h4>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * // The GUID for the Chat you want this message to be sent to
         * "chatGuid": "iMessage;+;xxxxxxxxxxxx",
         * // (Optional) Send a subject with the message.
         * "subject": "",
         * // (Optional) Send a message using an effect.
         * "effectId": "",
         * // (Optional) Reply to another message by GUID.
         * "selectedMessageGuid": "",
         * // (Optional) The part of the message to reply to.
         * // This is only used when replying to a specific part of a message
         * // Defaults to 0. Must be an integer (min: 0)
         * "partIndex": 0,
         * // The list parts of the multipart message.
         * // 1. Each part must be a dictionary
         * // 2. Each part must have a partIndex
         * // 3. Each part must have either a text or attachment
         * // 4. Each attachment part must have a name
         * // 5. Each attachment must have been uploaded prior using the /attachment/upload endpoint
         * // 6. Each mention must have text
         * "parts": [
             * {
                 * "partIndex": 0,
                 * "text": "Hey, "
                 * },
                 * {
                     * "partIndex": 1,
                     * "text": "Tim Apple",
                     * "mention": "tim@apple.com"
                     * },
                     * {
                         * "partIndex": 2,
                         * "text": " check out these photos!"
                         * },
                         * {
                             * "partIndex": 3,
                             * "attachment": "&lt;Uploaded Attachment UUID&gt;",
                             * "name": "apple.jpg"
                             * },
                             * {
                                 * "partIndex": 4,
                                 * "attachment": "&lt;Uploaded Attachment UUID&gt;",
                                 * "name": "macbook.png"
                                 * }
                                 * ]
                                 * }
                                 *
                                 * </code></pre>
                                 *
                                 * @returns any Successful response
                                 * @throws ApiError
                                 */
                                public sendMultipartMessage({
                                    requestBody,
                                }: {
                                    requestBody?: Record<string, any>,
                                }): CancelablePromise<any> {
                                    return this.httpRequest.request({
                                        method: 'POST',
                                        url: '/api/v1/message/multipart',
                                        body: requestBody,
                                        mediaType: 'application/json',
                                    });
                                }
                                /**
                                 * Query Messages
                                 * <p>Query for Messages from the database</p>
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
                                     * // Must be one of: `chat`, `chat.participants`, `attachment`, `handle`, `sms`, `attributed-body`, `message-info-summary`, `payload-data`
                                     * "with": [
                                         * "chat",
                                         * "attachment",
                                         * "handle"
                                         * ],
                                         * // (Optional) Database WHERE clauses allowing you to granularly filter down or search for messages.
                                         * // This should follow TypeORM's WHERE expression query builder.
                                         * // Reference: https://typeorm.io/#/select-query-builder/adding-where-expression
                                         * "where": [
                                             * {
                                                 * "statement": "message.text = :text",
                                                 * "args": {
                                                     * "text": "Hello World!"
                                                     * }
                                                     * }
                                                     * ],
                                                     * // (Optional) Fetches messages after a specified date, represented in seconds since EPOCH
                                                     * "after": 0,
                                                     * // (Optional) Fetches messages before a specified date, represented in seconds since EPOCH
                                                     * "before": 1633965221,
                                                     * // (Optional) How the returned data should be sorted.
                                                     * // Must be one of: `ASC`, `DESC
                                                     * "sort": "DESC"
                                                     * }
                                                     *
                                                     * </code></pre>
                                                     *
                                                     * @returns any Successful response
                                                     * @throws ApiError
                                                     */
                                                    public queryMessages({
                                                        requestBody,
                                                    }: {
                                                        requestBody?: Record<string, any>,
                                                    }): CancelablePromise<any> {
                                                        return this.httpRequest.request({
                                                            method: 'POST',
                                                            url: '/api/v1/message/query',
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                    /**
                                                     * Send Reaction
                                                     * <p>Send a text message via iMessage</p>
                                                     * <p><strong>Minimum BlueBubbles Server Version</strong>: 0.3.0</p>
                                                     * <p><em>Note: the</em> <em><code>partIndex</code></em> <em>parameter is only supported on macOS BIg Sur and newer, and requires BlueBubbles Server v1.4.0</em></p>
                                                     * <p><strong>Requires</strong>: Private API</p>
                                                     * <h4 id="request-body">Request Body</h4>
                                                     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                                                         * // The GUID for the Chat you want this message to be sent to
                                                         * "chatGuid": "iMessage;+;xxxxxxxxxxxx",
                                                         * // The message GUID to react to
                                                         * "selectedMessageGuid": "",
                                                         * // The reaction to send.
                                                         * // Must be one of: `love`, `like`, `dislike`, `laugh`, `emphasize`, `question`, or `-love`, `-like`, `-dislike`, `-laugh`, `-emphasize`, `-question`
                                                         * "reaction": "",
                                                         * // The part of the message to react to.
                                                         * // This is typically used for messages with multiple parts.
                                                         * // For example, if the message has multiple images &amp; text.
                                                         * // macOS Big Sur and newer.
                                                         * // Optional, defaults to 0.
                                                         * // Must be an integer (min: 0)
                                                         * "partIndex": 0
                                                         * }
                                                         *
                                                         * </code></pre>
                                                         *
                                                         * @returns any Successful response
                                                         * @throws ApiError
                                                         */
                                                        public sendReaction({
                                                            requestBody,
                                                        }: {
                                                            requestBody?: Record<string, any>,
                                                        }): CancelablePromise<any> {
                                                            return this.httpRequest.request({
                                                                method: 'POST',
                                                                url: '/api/v1/message/react',
                                                                body: requestBody,
                                                                mediaType: 'application/json',
                                                            });
                                                        }
                                                        /**
                                                         * Send Text
                                                         * <p>Send a text message via iMessage</p>
                                                         * <p><strong>Minimum BlueBubbles Server Version</strong>: 0.3.0</p>
                                                         * <p><em><strong>Note</strong>__: the</em> <em><code>partIndex</code></em> <em>parameter is only supported on macOS BIg Sur and newer, and requires BlueBubbles Server v1.4.0</em></p>
                                                         * <p><em><strong>Note</strong>__: This endpoint conditionally uses the Private API if certain parameters are present. Here are the parameters that will use the Private API:</em></p>
                                                         * <ul>
                                                         * <li><em>method: private-api</em></li>
                                                         * <li><em>subject</em></li>
                                                         * <li><em>effectId</em></li>
                                                         * <li><em>selectedMessageGuid</em></li>
                                                         * </ul>
                                                         * <h4 id="request-body">Request Body</h4>
                                                         * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                                                             * // The GUID for the Chat you want this message to be sent to
                                                             * "chatGuid": "iMessage;+;xxxxxxxxxxxx",
                                                             * // A unique identifier for the message.
                                                             * // This is to prevent duplicate messages from being sent.
                                                             * "tempGuid": "",
                                                             * // The text message to send
                                                             * "message": "Hello World!",
                                                             * // (Optional) Method to send the message using. Must be one of: `apple-script`, `private-api`. Default: `apple-script`.
                                                             * "method": "apple-script",
                                                             * // (Optional) Send a subject with the message.
                                                             * // Setting this will force the method to be `private-api`, so you must have the Private API setup.
                                                             * "subject": "",
                                                             * // (Optional) Send a message using an effect.
                                                             * // Setting this will force the method to be `private-api`, so you must have the Private API setup.
                                                             * "effectId": "",
                                                             * // (Optional) Reply to another message by GUID.
                                                             * // Setting this will force the method to be `private-api`, so you must have the Private API setup.
                                                             * "selectedMessageGuid": "",
                                                             * // The part of the message to reply to.
                                                             * // This is only used for replies.
                                                             * // macOS Big Sur and newer.
                                                             * // Optional, defaults to 0.
                                                             * // Must be an integer (min: 0)
                                                             * "partIndex": 0
                                                             * }
                                                             *
                                                             * </code></pre>
                                                             *
                                                             * @returns any Successful response
                                                             * @throws ApiError
                                                             */
                                                            public sendText({
                                                                requestBody,
                                                            }: {
                                                                requestBody?: Record<string, any>,
                                                            }): CancelablePromise<any> {
                                                                return this.httpRequest.request({
                                                                    method: 'POST',
                                                                    url: '/api/v1/message/text',
                                                                    body: requestBody,
                                                                    mediaType: 'application/json',
                                                                });
                                                            }
                                                            /**
                                                             * Get Message by GUID
                                                             * <p>Fetch a Message's database information by ID</p>
                                                             *
                                                             * @returns any Successful response
                                                             * @throws ApiError
                                                             */
                                                            public getMessageByGuid({
                                                                guid,
                                                            }: {
                                                                guid: string,
                                                            }): CancelablePromise<any> {
                                                                return this.httpRequest.request({
                                                                    method: 'GET',
                                                                    url: '/api/v1/message/{guid}',
                                                                    path: {
                                                                        'guid': guid,
                                                                    },
                                                                });
                                                            }
                                                            /**
                                                             * Edit Message
                                                             * <p>Edit a message you've sent.</p>
                                                             * <p><strong>Minimum BlueBubbles Server Version</strong>: 1.4.0</p>
                                                             * <p><em>Note: the</em> <em><code>partIndex</code></em> <em>parameter is only supported on macOS BIg Sur and newer, and requires BlueBubbles Server v1.4.0</em></p>
                                                             * <p><strong>Requires</strong>:</p>
                                                             * <ul>
                                                             * <li>Private API</li>
                                                             * <li>macOS Ventura</li>
                                                             * </ul>
                                                             * <h4 id="request-body">Request Body</h4>
                                                             * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                                                                 * // The message you want to edit the selected message to
                                                                 * "editedMessage": "This is the new message",
                                                                 * // The message to send to older iOS/macOS users
                                                                 * "backwardsCompatibilityMessage": "Edited to “This is the new message”",
                                                                 * // The part of the message to edit.
                                                                 * // macOS Big Sur and newer.
                                                                 * // Optional, defaults to 0.
                                                                 * // Must be an integer (min: 0)
                                                                 * "partIndex": 0
                                                                 * }
                                                                 *
                                                                 * </code></pre>
                                                                 *
                                                                 * @returns any Successful response
                                                                 * @throws ApiError
                                                                 */
                                                                public editMessage({
                                                                    guid,
                                                                    requestBody,
                                                                }: {
                                                                    guid: string,
                                                                    requestBody?: Record<string, any>,
                                                                }): CancelablePromise<any> {
                                                                    return this.httpRequest.request({
                                                                        method: 'POST',
                                                                        url: '/api/v1/message/{guid}/edit',
                                                                        path: {
                                                                            'guid': guid,
                                                                        },
                                                                        body: requestBody,
                                                                        mediaType: 'application/json',
                                                                    });
                                                                }
                                                                /**
                                                                 * Get Message's Embedded Media
                                                                 * <p>Gets a message's embedded media such as a digital touch message's <code>.mov</code> or a handwritten message</p>
                                                                 *
                                                                 * @returns any Successful response
                                                                 * @throws ApiError
                                                                 */
                                                                public getMessageSEmbeddedMedia({
                                                                    guid,
                                                                }: {
                                                                    guid: string,
                                                                }): CancelablePromise<any> {
                                                                    return this.httpRequest.request({
                                                                        method: 'GET',
                                                                        url: '/api/v1/message/{guid}/embedded-media',
                                                                        path: {
                                                                            'guid': guid,
                                                                        },
                                                                    });
                                                                }
                                                                /**
                                                                 * Notify for Silenced Message
                                                                 * <p>Notify for a sent message that has been silenced by the recipient's focus mode status</p>
                                                                 * <p><strong>Requires</strong>:</p>
                                                                 * <ul>
                                                                 * <li>Private API</li>
                                                                 * <li>macOS Monterey</li>
                                                                 * </ul>
                                                                 *
                                                                 * @returns any Successful response
                                                                 * @throws ApiError
                                                                 */
                                                                public notifyForSilencedMessage({
                                                                    guid,
                                                                    requestBody,
                                                                }: {
                                                                    guid: string,
                                                                    requestBody?: any,
                                                                }): CancelablePromise<any> {
                                                                    return this.httpRequest.request({
                                                                        method: 'POST',
                                                                        url: '/api/v1/message/{guid}/notify',
                                                                        path: {
                                                                            'guid': guid,
                                                                        },
                                                                        body: requestBody,
                                                                    });
                                                                }
                                                                /**
                                                                 * Unsend Message
                                                                 * <p>Unsend a message that you've sent.</p>
                                                                 * <p><strong>Minimum BlueBubbles Server Version</strong>: 1.4.0</p>
                                                                 * <p><em>Note: the</em> <em><code>partIndex</code></em> <em>parameter is only supported on macOS BIg Sur and newer, and requires BlueBubbles Server v1.4.0</em></p>
                                                                 * <p><strong>Requires</strong>:</p>
                                                                 * <ul>
                                                                 * <li>Private API</li>
                                                                 * <li>macOS Ventura</li>
                                                                 * </ul>
                                                                 * <h4 id="request-body">Request Body</h4>
                                                                 * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                                                                     * // The part of the message to unsend.
                                                                     * // macOS Big Sur and newer.
                                                                     * // Optional, defaults to 0.
                                                                     * // Must be an integer (min: 0)
                                                                     * "partIndex": 0
                                                                     * }
                                                                     *
                                                                     * </code></pre>
                                                                     *
                                                                     * @returns any Successful response
                                                                     * @throws ApiError
                                                                     */
                                                                    public unsendMessage({
                                                                        guid,
                                                                        requestBody,
                                                                    }: {
                                                                        guid: string,
                                                                        requestBody?: Record<string, any>,
                                                                    }): CancelablePromise<any> {
                                                                        return this.httpRequest.request({
                                                                            method: 'POST',
                                                                            url: '/api/v1/message/{guid}/unsend',
                                                                            path: {
                                                                                'guid': guid,
                                                                            },
                                                                            body: requestBody,
                                                                            mediaType: 'application/json',
                                                                        });
                                                                    }
                                                                }
