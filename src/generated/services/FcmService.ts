/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FcmService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get FCM Client Config
     * <p>Fetches your Server's FCM Client Configuration so you can register your device with Google Firebase.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getFcmClientConfig(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/fcm/client',
        });
    }
    /**
     * Register Device
     * <p>Registers a device for Google FCM Notifications</p>
     * <h4 id="request-body">Request Body</h4>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * // A name for the device you are registering
         * "name": "pixel5a",
         * // A unique identifier string that Google FCM will use to send notifications to your device.
         * // This is typically generated when you authenticate with Google FCM.
         * "identifier": ""
         * }
         * </code></pre>
         *
         * @returns any Successful response
         * @throws ApiError
         */
        public registerDevice({
            requestBody,
        }: {
            requestBody?: Record<string, any>,
        }): CancelablePromise<any> {
            return this.httpRequest.request({
                method: 'POST',
                url: '/api/v1/fcm/device',
                body: requestBody,
                mediaType: 'application/json',
            });
        }
    }
