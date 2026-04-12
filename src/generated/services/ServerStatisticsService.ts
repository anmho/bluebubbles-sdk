/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ServerStatisticsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Media Totals
     * <p>Fetches different types of media totals for all chats (i.e. videos &amp; images).</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getMediaTotals(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/statistics/media',
        });
    }
    /**
     * Get Media Totals Per Chat
     * <p>Fetches different types of media totals per chat (i.e. videos &amp; images).</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getMediaTotalsPerChat(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/statistics/media/chat',
        });
    }
    /**
     * Get iMessage Entity Totals
     * <p>Fetches the database totals for the iMessage entities (i.e. handles, messages, chats, etc.)</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getImessageEntityTotals(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/statistics/totals',
        });
    }
}
