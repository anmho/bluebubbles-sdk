import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AttachmentService } from './services/AttachmentService';
import { BackupService } from './services/BackupService';
import { ChatService } from './services/ChatService';
import { ChatGroupSpecificService } from './services/ChatGroupSpecificService';
import { ContactService } from './services/ContactService';
import { FcmService } from './services/FcmService';
import { HandleService } from './services/HandleService';
import { ICloudService } from './services/ICloudService';
import { MacOsService } from './services/MacOsService';
import { MessageService } from './services/MessageService';
import { MessageSchedulingService } from './services/MessageSchedulingService';
import { OtherService } from './services/OtherService';
import { ServerService } from './services/ServerService';
import { ServerStatisticsService } from './services/ServerStatisticsService';
import { WebService } from './services/WebService';
export class BlueBubblesApi {
    attachment;
    backup;
    chat;
    chatGroupSpecific;
    contact;
    fcm;
    handle;
    iCloud;
    macOs;
    message;
    messageScheduling;
    other;
    server;
    serverStatistics;
    web;
    request;
    constructor(config, HttpRequest = FetchHttpRequest) {
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
        this.attachment = new AttachmentService(this.request);
        this.backup = new BackupService(this.request);
        this.chat = new ChatService(this.request);
        this.chatGroupSpecific = new ChatGroupSpecificService(this.request);
        this.contact = new ContactService(this.request);
        this.fcm = new FcmService(this.request);
        this.handle = new HandleService(this.request);
        this.iCloud = new ICloudService(this.request);
        this.macOs = new MacOsService(this.request);
        this.message = new MessageService(this.request);
        this.messageScheduling = new MessageSchedulingService(this.request);
        this.other = new OtherService(this.request);
        this.server = new ServerService(this.request);
        this.serverStatistics = new ServerStatisticsService(this.request);
        this.web = new WebService(this.request);
    }
}
//# sourceMappingURL=BlueBubblesApi.js.map