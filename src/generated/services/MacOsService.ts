/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MacOsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Lock Mac
     * <p>Lock your macOS device directly via the API. This endpoint can be useful if you believe your macOS device has been compromised. Locking it will prevent the adversary from accessing your account. This will not log you out, but will lock your account.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public lockMac({
        requestBody,
    }: {
        requestBody?: any,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/mac/lock',
            body: requestBody,
        });
    }
}
