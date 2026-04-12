/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MessageSchedulingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Scheduled Messages
     * <p>Gets the messages you currently have scheduled, or have been scheduled in the past.</p>
     * <p><strong>Minimum BlueBubbles Server Version:</strong> 1.4.0</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getScheduledMessages(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/message/schedule',
        });
    }
    /**
     * Schedule a Message
     * <p>Schedules a message to be sent at a future time.</p>
     * <p>You can also schedule messages to be sent on a recurring schedule.</p>
     * <p><strong>Minimum BlueBubbles Server Version:</strong> 1.4.0</p>
     * <p><strong>Payload:</strong> This dictionary contains metadata used to send a message. It mimics the same parameters as the <code>Send Text</code> API endpoint.</p>
     * <p><strong>Action Types:</strong></p>
     * <ul>
     * <li>send-message</li>
     * </ul>
     * <p><strong>Schedule Types:</strong></p>
     * <ul>
     * <li>once</li>
     * <li>recurring</li>
     * </ul>
     * <p><strong>Schedule Interval Types:</strong></p>
     * <ul>
     * <li>hourly</li>
     * <li>daily</li>
     * <li>weekly</li>
     * <li>monthly</li>
     * <li>yearly</li>
     * </ul>
     * <h4 id="request-body-one-time">Request Body (One-time):</h4>
     * <p><strong>Note:</strong> If a one-time message is missed -- for instance, if the server went down during the time it was supposed to send -- the message will <em>not</em> be sent.</p>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * "type": "send-message",
         * // The message data to send at the scheduled time.
         * // This mimics the "Send Text" API endpoint.
         * "payload": {
             * "chatGuid": "iMessage;-;XXXXXXXXXX",
             * "message": "Good morning!",
             * "method": "private-api"
             * },
             * // This is a milliseconds-since-epoch timestamp.
             * // This represents the time the message should be sent at.
             * // This must be sometime in the future.
             *
             * "scheduledFor": 1668413100000,
             * // The scheduling configuration.
             * // For a one-time message, this is all that is required.
             *
             * "schedule": {
                 * "type": "once"
                 * }
                 * }
                 *
                 * </code></pre>
                 * <h4 id="request-body-recurring">Request Body (Recurring):</h4>
                 * <p><strong>Note:</strong> When the first <code>scheduledFor</code> time is reached, the next scheduled for time will be calculated before the message is sent. This is to ensure that recurring messages are sent at a consistent time.</p>
                 * <p><strong>Note:</strong> If a recurring message is missed -- for instance if the server was offline when the message was scheduled to be sent -- it will not send, and will be rescheduled for the next time the recurring interval occurs. This will also ensure that recurring messages are sent at a consistent time.</p>
                 * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                     * "type": "send-message",
                     * // The message data to send at the scheduled time.
                     * // This mimics the "Send Text" API endpoint.
                     * "payload": {
                         * "chatGuid": "iMessage;-;XXXXXXXXXX",
                         * "message": "Good morning!",
                         * "method": "private-api"
                         * },
                         * // This is a milliseconds-since-epoch timestamp.
                         * // This represents the time the message should be sent at.
                         * // This must be sometime in the future.
                         *
                         * "scheduledFor": 1668413100000,
                         * // The scheduling configuration.
                         * // For a one-time message, this is all that is required.
                         *
                         * "schedule": {
                             * "type": "recurring",
                             * "intervalType": "daily",
                             * "interval": 1
                             *
                             * }
                             * }
                             *
                             * </code></pre>
                             *
                             * @returns any Successful response
                             * @throws ApiError
                             */
                            public scheduleAMessage({
                                requestBody,
                            }: {
                                requestBody?: Record<string, any>,
                            }): CancelablePromise<any> {
                                return this.httpRequest.request({
                                    method: 'POST',
                                    url: '/api/v1/message/schedule',
                                    body: requestBody,
                                    mediaType: 'application/json',
                                });
                            }
                            /**
                             * Delete Scheduled Message by ID
                             * <p>Delets a scheduled message by its' ID</p>
                             * <p><strong>Minimum BlueBubbles Server Version:</strong> 1.4.0</p>
                             *
                             * @returns any Successful response
                             * @throws ApiError
                             */
                            public deleteScheduledMessageById({
                                id,
                            }: {
                                id: string,
                            }): CancelablePromise<any> {
                                return this.httpRequest.request({
                                    method: 'DELETE',
                                    url: '/api/v1/message/schedule/{id}',
                                    path: {
                                        'id': id,
                                    },
                                });
                            }
                            /**
                             * Get Scheduled Message by ID
                             * <p>Gets a single scheduled message by its' ID.</p>
                             * <p><strong>Minimum BlueBubbles Server Version:</strong> 1.4.0</p>
                             *
                             * @returns any Successful response
                             * @throws ApiError
                             */
                            public getScheduledMessageById({
                                id,
                            }: {
                                id: string,
                            }): CancelablePromise<any> {
                                return this.httpRequest.request({
                                    method: 'GET',
                                    url: '/api/v1/message/schedule/{id}',
                                    path: {
                                        'id': id,
                                    },
                                });
                            }
                            /**
                             * Update a Scheduled Message by ID
                             * <p>Updates a scheduled message by ID</p>
                             * <p><strong>Payload:</strong> This dictionary contains metadata used to send a message. It mimics the same parameters as the <code>Send Text</code> API endpoint.</p>
                             * <p><strong>Action Types:</strong></p>
                             * <ul>
                             * <li>send-message</li>
                             * </ul>
                             * <p><strong>Schedule Types:</strong></p>
                             * <ul>
                             * <li>once</li>
                             * <li>recurring</li>
                             * </ul>
                             * <p><strong>Schedule Interval Types:</strong></p>
                             * <ul>
                             * <li>hourly</li>
                             * <li>daily</li>
                             * <li>weekly</li>
                             * <li>monthly</li>
                             * <li>yearly</li>
                             * </ul>
                             * <h4 id="request-body-one-time">Request Body (One-time):</h4>
                             * <p><strong>Note:</strong> If a one-time message is missed -- for instance, if the server went down during the time it was supposed to send -- the message will <em>not</em> be sent.</p>
                             * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                                 * "type": "send-message",
                                 * // The message data to send at the scheduled time.
                                 * // This mimics the "Send Text" API endpoint.
                                 * "payload": {
                                     * "chatGuid": "iMessage;-;XXXXXXXXXX",
                                     * "message": "Good morning!",
                                     * "method": "private-api"
                                     * },
                                     * // This is a milliseconds-since-epoch timestamp.
                                     * // This represents the time the message should be sent at.
                                     * // This must be sometime in the future.
                                     * "scheduledFor": 1668413100000,
                                     * // The scheduling configuration.
                                     * // For a one-time message, this is all that is required.
                                     * "schedule": {
                                         * "type": "once"
                                         * }
                                         * }
                                         *
                                         * </code></pre>
                                         * <h4 id="request-body-recurring">Request Body (Recurring):</h4>
                                         * <p><strong>Note:</strong> When the first <code>scheduledFor</code> time is reached, the next scheduled for time will be calculated before the message is sent. This is to ensure that recurring messages are sent at a consistent time.</p>
                                         * <p><strong>Note:</strong> If a recurring message is missed -- for instance if the server was offline when the message was scheduled to be sent -- it will not send, and will be rescheduled for the next time the recurring interval occurs. This will also ensure that recurring messages are sent at a consistent time.</p>
                                         * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                                             * "type": "send-message",
                                             * // The message data to send at the scheduled time.
                                             * // This mimics the "Send Text" API endpoint.
                                             * "payload": {
                                                 * "chatGuid": "iMessage;-;XXXXXXXXXX",
                                                 * "message": "Good morning!",
                                                 * "method": "private-api"
                                                 * },
                                                 * // This is a milliseconds-since-epoch timestamp.
                                                 * // This represents the time the message should be sent at.
                                                 * // This must be sometime in the future.
                                                 * "scheduledFor": 1668413100000,
                                                 * // The scheduling configuration.
                                                 * // For a one-time message, this is all that is required.
                                                 * "schedule": {
                                                     * "type": "recurring",
                                                     * "intervalType": "daily",
                                                     * "interval": 1
                                                     * }
                                                     * }
                                                     *
                                                     * </code></pre>
                                                     *
                                                     * @returns any Successful response
                                                     * @throws ApiError
                                                     */
                                                    public updateAScheduledMessageById({
                                                        id,
                                                        requestBody,
                                                    }: {
                                                        id: string,
                                                        requestBody?: Record<string, any>,
                                                    }): CancelablePromise<any> {
                                                        return this.httpRequest.request({
                                                            method: 'PUT',
                                                            url: '/api/v1/message/schedule/{id}',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                }
