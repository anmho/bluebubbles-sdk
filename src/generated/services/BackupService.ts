/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class BackupService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Delete Settings
     * <p>Deletes a settings backup by name.</p>
     * <h4 id="request-body">Request Body</h4>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * // The name of your settings
         * "name": "SettingsBackup - 2021/10/11"
         * }
         *
         * </code></pre>
         *
         * @returns any Successful response
         * @throws ApiError
         */
        public deleteSettings(): CancelablePromise<any> {
            return this.httpRequest.request({
                method: 'DELETE',
                url: '/api/v1/backup/settings',
            });
        }
        /**
         * Get Settings
         * <p>Fetches settings saved to your BlueBubbles Server.</p>
         *
         * @returns any Successful response
         * @throws ApiError
         */
        public getSettings(): CancelablePromise<any> {
            return this.httpRequest.request({
                method: 'GET',
                url: '/api/v1/backup/settings',
            });
        }
        /**
         * Save Settings
         * <p>Save a Settings configuration to your BlueBubbles Server App. This request has 2 required fields, <code>name</code> and <code>data</code>. Otherwise, the actual configuration data is up to the client. The only caveat is that clients that are pulling settings from the server need to be able to understand the format.</p>
         * <h4 id="request-body">Request Body</h4>
         * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
             * // The name of your settings
             * "name": "SettingsBackup - 2021/10/11",
             * // The configuration data for your settings
             * "data": {}
             * }
             *
             * </code></pre>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public saveSettings({
                requestBody,
            }: {
                requestBody?: Record<string, any>,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'POST',
                    url: '/api/v1/backup/settings',
                    body: requestBody,
                    mediaType: 'application/json',
                });
            }
            /**
             * Delete Theme
             * <p>Deletes a theme backup by name.</p>
             * <h4 id="request-body">Request Body</h4>
             * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                 * // The name of your theme
                 * "name": "SettingsBackup - 2021/10/11"
                 * }
                 *
                 * </code></pre>
                 *
                 * @returns any Successful response
                 * @throws ApiError
                 */
                public deleteTheme(): CancelablePromise<any> {
                    return this.httpRequest.request({
                        method: 'DELETE',
                        url: '/api/v1/backup/theme',
                    });
                }
                /**
                 * Get Themes
                 * <p>Fetches themes saved to your BlueBubbles Server.</p>
                 *
                 * @returns any Successful response
                 * @throws ApiError
                 */
                public getThemes(): CancelablePromise<any> {
                    return this.httpRequest.request({
                        method: 'GET',
                        url: '/api/v1/backup/theme',
                    });
                }
                /**
                 * Save Theme
                 * <p>Save a Theme to your BlueBubbles Server App. This request has 2 required fields, <code>name</code> and <code>data</code>. Otherwise, the actual configuration data is up to the client. The only caveat is that clients that are pulling themes from the server need to be able to understand the format.</p>
                 * <h4 id="request-body">Request Body</h4>
                 * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
                     * // The name of your theme
                     * "name": "OLED Dark",
                     *
                     * // The configuration data for your theme
                     * "data": {}
                     * }
                     * </code></pre>
                     *
                     * @returns any Successful response
                     * @throws ApiError
                     */
                    public saveTheme({
                        requestBody,
                    }: {
                        requestBody?: Record<string, any>,
                    }): CancelablePromise<any> {
                        return this.httpRequest.request({
                            method: 'POST',
                            url: '/api/v1/backup/theme',
                            body: requestBody,
                            mediaType: 'application/json',
                        });
                    }
                }
