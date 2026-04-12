/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChatGroupSpecificService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Remove Group Icon
     * <p>Removes/Unsets a group chat's icon/photo.</p>
     * <p><strong>Requires:</strong> Private API</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public removeGroupIcon({
        chatGuid,
    }: {
        chatGuid: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/chat/{chatGuid}/icon',
            path: {
                'chatGuid': chatGuid,
            },
        });
    }
    /**
     * Set Group Icon
     * <p>Set a group chat's icon/photo.</p>
     * <p><strong>Requires:</strong> Private API</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public setGroupIcon({
        chatGuid,
        requestBody,
    }: {
        chatGuid: string,
        requestBody?: any,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/chat/{chatGuid}/icon',
            path: {
                'chatGuid': chatGuid,
            },
            body: requestBody,
        });
    }
    /**
     * Leave Chat
     * <p>Allows you to leave a group chat that you are in.</p>
     * <p>An error will be thrown if the chat you are trying to leave is not a group chat.</p>
     * <p><strong>Requires:</strong> Private API</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public leaveChat({
        chatGuid,
        requestBody,
    }: {
        chatGuid: string,
        requestBody?: Record<string, any>,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/chat/{chatGuid}/leave',
            path: {
                'chatGuid': chatGuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove Participant from Chat
     * <p>Removes a participant from an existing chat</p>
     * <p><strong>Minimum BlueBubbles Server Version</strong>: 0.3.0</p>
     * <p><strong>Requires:</strong> Private API</p>
     * <h4 id="request-body">Request Body</h4>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * // The participant address to remove
         * "address": ""
         * }
         * </code></pre>
         *
         * @returns any Successful response
         * @throws ApiError
         */
        public removeParticipantFromChat({
            chatGuid,
        }: {
            chatGuid: string,
        }): CancelablePromise<any> {
            return this.httpRequest.request({
                method: 'DELETE',
                url: '/api/v1/chat/{chatGuid}/participant',
                path: {
                    'chatGuid': chatGuid,
                },
            });
        }
        /**
         * Add Participant to Chat
         * <p>Adds a participant to an existing chat.</p>
         * <p>Include the country code (if possible). For instance, the country code for the United States is <code>+1</code>, so include a <code>1</code> at the start of the phone number from the US.</p>
         * <p><strong>Minimum BlueBubbles Server Version</strong>: 0.3.0</p>
         * <p><strong>Requires:</strong> Private API</p>
         * <h4 id="request-body">Request Body</h4>
         * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
             * // The participant address to add
             * "address": ""
             * }
             *
             * </code></pre>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public addParticipantToChat({
                chatGuid,
                requestBody,
            }: {
                chatGuid: string,
                requestBody?: Record<string, any>,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'POST',
                    url: '/api/v1/chat/{chatGuid}/participant',
                    path: {
                        'chatGuid': chatGuid,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
                });
            }
        }
