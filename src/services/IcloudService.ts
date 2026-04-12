/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class IcloudService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Modify Active Alias
     * <p><strong>Private API Only</strong></p>
     * <p>Change which iCloud address you send iMessages from. If you have multiple aliases for your iCloud account setup, you can choose one specifically to send messages from. By default, it's your original Apple ID.</p>
     * <p>If the alias you provide is not a vetted (approved) alias, this call will throw an error.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public modifyActiveAlias({
        requestBody,
    }: {
        requestBody?: Record<string, any>,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/ap/v1/icloud/account/alias',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Account Info
     * <p>Fetches your iCloud Account info. Details include your iCloud aliases, SMS forwarding, and more. See the sample response below</p>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * "status": 200,
         * "message": "Successfully fetched account info!",
         * "data": {
             * "account_name": "John Doe",
             * "vetted_aliases": [
                 * {
                     * "Alias": "john.doe@icloud.com",
                     * "Status": 3,
                     * "IsUserVisible": true
                     * },
                     * {
                         * "Alias": "jdoe@gmail.com",
                         * "Status": 3,
                         * "IsUserVisible": true
                         * }
                         * ],
                         * "aliases": [
                             * {
                                 * "Alias": "john.doe2@icloud.com",
                                 * "Status": 3,
                                 * "IsUserVisible": true
                                 * },
                                 * {
                                     * "Alias": "jdoe@gmail.com",
                                     * "Status": 3,
                                     * "IsUserVisible": true
                                     * }
                                     * ],
                                     * "sms_forwarding_enabled": false,
                                     * "apple_id": "john.doe@icloud.com",
                                     * "sms_forwarding_capable": false,
                                     * "login_status_message": "Connected"
                                     * }
                                     * }
                                     *
                                     * </code></pre>
                                     *
                                     * @returns any Successful response
                                     * @throws ApiError
                                     */
                                    public getAccountInfo(): CancelablePromise<any> {
                                        return this.httpRequest.request({
                                            method: 'GET',
                                            url: '/api/v1/icloud/account',
                                        });
                                    }
                                    /**
                                     * Get Contact Card
                                     * <p>Get your own contact information or the contact information for someone who has shared their contact card with you.</p>
                                     * <p>**The <code>address</code> URL parameter is optional. If you don't support the parameter, the API will return your own contact information. If you provide an address, it will return the contact information of the address (if they've shared it).</p>
                                     * <p>Sample Response:</p>
                                     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                                         * "status": 200,
                                         * "message": "Successfully fetched contact card!",
                                         * "data": {
                                             * "name": "John Doe",
                                             * "avatar": "...base64 bytes..."
                                             * }
                                             * }
                                             *
                                             * </code></pre>
                                             *
                                             * @returns any Successful response
                                             * @throws ApiError
                                             */
                                            public getContactCard(): CancelablePromise<any> {
                                                return this.httpRequest.request({
                                                    method: 'GET',
                                                    url: '/api/v1/icloud/contact',
                                                });
                                            }
                                            /**
                                             * Get FindMy Devices Locations
                                             * <p>Fetch your FindMy Devices locations. If your macOS version doesn't support it, or you've never opened the FindMy app, this endpoint may <em>not</em> return <code>data</code>.</p>
                                             *
                                             * @returns any Successful response
                                             * @throws ApiError
                                             */
                                            public getFindmyDevicesLocations(): CancelablePromise<any> {
                                                return this.httpRequest.request({
                                                    method: 'GET',
                                                    url: '/api/v1/icloud/findmy/devices',
                                                });
                                            }
                                            /**
                                             * Refresh FindMy Devices
                                             * <p>Refresh your FindMy Devices locations by using Accessibility to open the FindMy app. This endpoint returns the location data after the locations update.</p>
                                             *
                                             * @returns any Successful response
                                             * @throws ApiError
                                             */
                                            public refreshFindmyDevices({
                                                requestBody,
                                            }: {
                                                requestBody?: any,
                                            }): CancelablePromise<any> {
                                                return this.httpRequest.request({
                                                    method: 'POST',
                                                    url: '/api/v1/icloud/findmy/devices/refresh',
                                                    body: requestBody,
                                                });
                                            }
                                            /**
                                             * Get FindMy Friends Locations
                                             * <p>Fetch your FindMy Friends locations. If your macOS version doesn't support it, or you've never opened the FindMy app, this endpoint may <em>not</em> return <code>data</code>.</p>
                                             *
                                             * @returns any Successful response
                                             * @throws ApiError
                                             */
                                            public getFindmyFriendsLocations(): CancelablePromise<any> {
                                                return this.httpRequest.request({
                                                    method: 'GET',
                                                    url: '/api/v1/icloud/findmy/friends',
                                                });
                                            }
                                            /**
                                             * Refresh FindMy Friends
                                             * <p>Refresh your FindMy Friends locations by using Accessibility to open the FindMy app. This endpoint returns the location data after the locations update.</p>
                                             *
                                             * @returns any Successful response
                                             * @throws ApiError
                                             */
                                            public refreshFindmyFriends({
                                                requestBody,
                                            }: {
                                                requestBody?: any,
                                            }): CancelablePromise<any> {
                                                return this.httpRequest.request({
                                                    method: 'POST',
                                                    url: '/api/v1/icloud/findmy/friends/refresh',
                                                    body: requestBody,
                                                });
                                            }
                                        }
