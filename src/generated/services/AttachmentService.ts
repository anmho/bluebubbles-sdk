/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AttachmentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Attachment Count
     * <p>Fetch the total number of attachments for your iMessage account (on the device)</p>
     *
     * @returns any Successful response
     * @throws ApiError
     */
    public getAttachmentCount(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/attachment/count',
        });
    }
    /**
     * Upload Attachment
     * <p>Upload an attachment to the server's iMessage attachments directory.</p>
     * <p>This is a pre-requisite and <em>must</em> be done before sending an attachment as part of a <em>multipart</em> message. This is <strong>not</strong> required when sending a normal attachment.</p>
     * <p>The response of this endpoint will be a unique identifier that you can use when sending a <em>multipart</em> message.</p>
     * <h4 id="example-response">Example Response</h4>
     * <pre class="click-to-expand-wrapper is-snippet-wrapper"><code class="language-json">{
         * "status": 200,
         * "message": "Success",
         * "data": {
             * "hash": "a04a23a0833b33db8a63ee0816948786"
             * }
             * }
             *
             * </code></pre>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public uploadAttachment({
                requestBody,
            }: {
                requestBody?: any,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'POST',
                    url: '/api/v1/attachment/upload',
                    body: requestBody,
                });
            }
            /**
             * Get Attachment by GUID
             * <p>Fetch an Attachment's database information by ID</p>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public getAttachmentByGuid({
                guid,
            }: {
                guid: string,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/attachment/{guid}',
                    path: {
                        'guid': guid,
                    },
                });
            }
            /**
             * Get Attachment Blurhash
             * <p>Generates a BlurHash string based on the given Attachment (by ID). You may optionally resize the image before the BlurHash is generated.</p>
             * <p><strong>Note</strong>: Calculating a BlurHash is fairly intensive. Resizing the image to smaller size by specifying and/or height will reduce the time it takes to generate the hash string.</p>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public getAttachmentBlurhash({
                guid,
            }: {
                guid: string,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/attachment/{guid}/blurhash',
                    path: {
                        'guid': guid,
                    },
                });
            }
            /**
             * Download Attachment
             * <p>Download an iMessage Attachment by ID. You may optionally specify height/width parameters to resize the image.</p>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public downloadAttachment({
                guid,
            }: {
                guid: string,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/attachment/{guid}/download',
                    path: {
                        'guid': guid,
                    },
                });
            }
            /**
             * Force Download Attachment
             * <p><strong>Private API Required</strong></p>
             * <p>Force download an iMessage Attachment by ID. You may optionally specify height/width parameters to resize the image.</p>
             * <p>This is different from the regular download endpoint as this will force the attachment to download if it's not already downloaded on the Mac. If an image isn't already downloaded on the Mac, and you use the regular download endpoint, you'll receive a 404 not found.</p>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public forceDownloadAttachment({
                guid,
            }: {
                guid: string,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/attachment/{guid}/download/force',
                    path: {
                        'guid': guid,
                    },
                });
            }
            /**
             * Get Attachment Live Photo
             * <p>Get's an attachment's "live photo" (if available).</p>
             * <p>If an attachment is not an image or does not have a live version, this endpoint will return an error indicating that a live photo does not exist for the attachment.</p>
             *
             * @returns any Successful response
             * @throws ApiError
             */
            public getAttachmentLivePhoto({
                guid,
            }: {
                guid: string,
            }): CancelablePromise<any> {
                return this.httpRequest.request({
                    method: 'GET',
                    url: '/api/v1/attachment/{guid}/live',
                    path: {
                        'guid': guid,
                    },
                });
            }
        }
