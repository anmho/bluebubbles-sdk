import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
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
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export declare class BlueBubblesApi {
    readonly attachment: AttachmentService;
    readonly backup: BackupService;
    readonly chat: ChatService;
    readonly chatGroupSpecific: ChatGroupSpecificService;
    readonly contact: ContactService;
    readonly fcm: FcmService;
    readonly handle: HandleService;
    readonly iCloud: ICloudService;
    readonly macOs: MacOsService;
    readonly message: MessageService;
    readonly messageScheduling: MessageSchedulingService;
    readonly other: OtherService;
    readonly server: ServerService;
    readonly serverStatistics: ServerStatisticsService;
    readonly web: WebService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}
export {};
//# sourceMappingURL=BlueBubblesApi.d.ts.map