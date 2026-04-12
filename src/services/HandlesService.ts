/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class HandlesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Handle's Focus Status
     * <p>Get the handle's focus mode status.</p>
     * <p>Return values include:</p>
     * <ul>
     * <li>unknown</li>
     * <li>silenced</li>
     * <li>none</li>
     * </ul>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getHandleSFocusStatus(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/handle/<address>/focus',
        });
    }
    /**
     * Get FaceTimeAvailability
     * <p>Checks if a given address has FaceTime enabled for it.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getFacetimeavailability(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/handle/availability/facetime',
        });
    }
    /**
     * Get iMessage Availability
     * <p>Checks if a given address has iMessage enabled for it.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getImessageAvailability(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/handle/availability/imessage',
        });
    }
    /**
     * Get Handle Count
     * <p>Get the total number of handles for your iMessage account (on the device)</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getHandleCount(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/handle/count',
        });
    }
    /**
     * Query Handles
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
         * // Must be one of: `participants`, `lastmessage`, `sms`, `archived`
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
             * </code></pre>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public queryHandles({
                requestBody,
            }: {
                requestBody?: Record<string, any>,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'POST',
                    url: '/api/v1/handle/query',
                    body: requestBody,
                    mediaType: 'application/json',
                });
            }
            /**
             * Get Handle by Address
             * <p>Fetch a Handle's database information by Address (email or phone number)</p>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public get({
                handleAddress,
            }: {
                handleAddress: string,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/handle/{handleAddress}',
                    path: {
                        'handleAddress': handleAddress,
                    },
                });
            }
        }
