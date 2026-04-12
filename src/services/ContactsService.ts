/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ContactsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Contacts
     * <p>Fetch contacts from your macOS device</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getContacts(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/contact',
        });
    }
    /**
     * Query Contacts
     * <p>Query your contacts from your macOS device.</p>
     * <h4 id="request-body">Request Body</h4>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * // (Optional) A list of one or more addresses to return data for
         * "addresses": []
         * }
         * </code></pre>
         *
         * @returns any Successful response
         * @throws ApiError
         */
        public queryContacts({
            requestBody,
        }: {
            requestBody?: Record<string, any>,
        }): CancelablePromise<any> {
            return this.httpRequest.request({
                method: 'POST',
                url: '/api/v1/contact/query',
                body: requestBody,
                mediaType: 'application/json',
            });
        }
    }
