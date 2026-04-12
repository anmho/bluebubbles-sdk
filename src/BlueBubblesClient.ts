/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AttachmentsService } from './services/AttachmentsService';
import { BackupsService } from './services/BackupsService';
import { ChatsService } from './services/ChatsService';
import { ContactsService } from './services/ContactsService';
import { FcmService } from './services/FcmService';
import { HandlesService } from './services/HandlesService';
import { IcloudService } from './services/IcloudService';
import { MacosService } from './services/MacosService';
import { MessagesService } from './services/MessagesService';
import { OtherService } from './services/OtherService';
import { ServerService } from './services/ServerService';
import { WebService } from './services/WebService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class BlueBubblesClient {
    public readonly attachments: AttachmentsService;
    public readonly backups: BackupsService;
    public readonly chats: ChatsService;
    public readonly contacts: ContactsService;
    public readonly fcm: FcmService;
    public readonly handles: HandlesService;
    public readonly icloud: IcloudService;
    public readonly macos: MacosService;
    public readonly messages: MessagesService;
    public readonly other: OtherService;
    public readonly server: ServerService;
    public readonly web: WebService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://localhost',
            VERSION: config?.VERSION ?? '1.0.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.attachments = new AttachmentsService(this.request);
        this.backups = new BackupsService(this.request);
        this.chats = new ChatsService(this.request);
        this.contacts = new ContactsService(this.request);
        this.fcm = new FcmService(this.request);
        this.handles = new HandlesService(this.request);
        this.icloud = new IcloudService(this.request);
        this.macos = new MacosService(this.request);
        this.messages = new MessagesService(this.request);
        this.other = new OtherService(this.request);
        this.server = new ServerService(this.request);
        this.web = new WebService(this.request);
    }
}

