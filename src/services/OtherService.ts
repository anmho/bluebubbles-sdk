/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OtherService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Ping
     * <p>Send a quick ping to your BlueBubbles Server to make sure it's online and responding to requests</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public ping(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/ping',
        });
    }
}
