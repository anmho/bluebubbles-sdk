/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class WebService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Landing Page
     * <p>Get the server's landing page (index.html)</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getLandingPage(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
}
