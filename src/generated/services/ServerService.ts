/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ServerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Server Alerts
     * <p>Fetch Alerts from the BlueBubbles Server</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getServerAlerts(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/alert',
        });
    }
    /**
     * Mark Alerts As Read
     * <p>Mark alerts as read on your BlueBubbles Server. This requires the IDs of the alerts (found by using the Get Server Alerts request) because of race cases making a "catch-all" endpoint to mark all alerts as read.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public markAlertsAsRead({
        requestBody,
    }: {
        requestBody?: Record<string, any>,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/server/alert/read',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Server Metadata
     * <p>Fetch metadata about your BlueBubbles Server &amp; Operating System</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getServerMetadata(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/info',
        });
    }
    /**
     * Get Server Logs
     * <p>Fetch logs from your BlueBubbles Server.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getServerLogs(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/logs',
        });
    }
    /**
     * Restart Server
     * <p>Completely restarts the server. Meaning the server closes itself and reopens itself. The Mac will not restart.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public restartServer(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/restart/hard',
        });
    }
    /**
     * Restart Services
     * <p>Restarts the services on the BlueBubbles server. Services such as the HTTP service, the FCM service, and the Private API service.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public restartServices(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/restart/soft',
        });
    }
    /**
     * Check for Server Update
     * <p>Check to see if the BlueBubbles Server App has an update available. If an update is available, the update metadata will be returned.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public checkForServerUpdate(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/server/update/check',
        });
    }
    /**
     * Install Server Update
     * <p>Installs an update if one is available.</p>
     * <p>You may pass a <code>wait=true</code> URL parameter to have the endpoint wait until the update is complete to return. Otherwise, it will not by default.</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public installServerUpdate({
        requestBody,
    }: {
        requestBody?: any,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/server/update/install',
            body: requestBody,
        });
    }
}
