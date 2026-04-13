import { createClient, createConfig } from '~/generated/client/index';
import { Sdk as GeneratedSdk } from '~/generated/sdk.gen';

type OperationFn = (...args: any[]) => any;
type OperationOptions = {
  body?: unknown;
  client?: unknown;
  headers?: HeadersInit;
  path?: Record<string, unknown>;
  query?: Record<string, unknown>;
  url?: string;
  [key: string]: unknown;
};

const generatedSdk = new GeneratedSdk();
const primitives: Record<string, OperationFn> = new Proxy<Record<string, OperationFn>>(
  {},
  {
    get(_target, property) {
      const fn = (generatedSdk as unknown as Record<string, unknown>)[String(property)];
      if (typeof fn !== 'function') {
        throw new Error(`Generated SDK method not found: ${String(property)}`);
      }
      return (fn as OperationFn).bind(generatedSdk);
    },
  },
);

const normalizeBaseUrl = (baseUrl: string): string => {
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
};

export interface BlueBubblesClientOptions {
  baseUrl: string;
  password: string;
  fetch?: typeof fetch;
  headers?: HeadersInit;
}

export interface BlueBubblesClientConfigUpdate {
  baseUrl?: string;
  password?: string;
  fetch?: typeof fetch;
  headers?: HeadersInit;
}

export type ApiResponse = unknown;
export type DownloadResponse = Response;

const isResponseLike = (value: unknown): value is Response => {
  return typeof Response !== 'undefined' && value instanceof Response;
};

export const isDownloadResponse = isResponseLike;

export class BlueBubblesClient {
  private readonly baseUrl: string;
  private readonly password: string;
  private readonly fetchImpl: typeof fetch;
  private readonly defaultHeaders?: HeadersInit;
  private readonly httpClient: ReturnType<typeof createClient>;

  readonly attachments: ReturnType<BlueBubblesClient['createAttachments']>;
  readonly backups: ReturnType<BlueBubblesClient['createBackups']>;
  readonly chats: ReturnType<BlueBubblesClient['createChats']>;
  readonly contacts: ReturnType<BlueBubblesClient['createContacts']>;
  readonly fcm: ReturnType<BlueBubblesClient['createFcm']>;
  readonly handles: ReturnType<BlueBubblesClient['createHandles']>;
  readonly icloud: ReturnType<BlueBubblesClient['createIcloud']>;
  readonly macos: ReturnType<BlueBubblesClient['createMacos']>;
  readonly messages: ReturnType<BlueBubblesClient['createMessages']>;
  readonly server: ReturnType<BlueBubblesClient['createServer']>;
  readonly web: ReturnType<BlueBubblesClient['createWeb']>;

  constructor(options: BlueBubblesClientOptions) {
    this.baseUrl = normalizeBaseUrl(options.baseUrl);
    this.password = options.password;
    this.fetchImpl = options.fetch ?? fetch;
    this.defaultHeaders = options.headers;
    this.httpClient = createClient(
      createConfig({
        baseUrl: this.baseUrl,
        fetch: this.fetchImpl,
      }),
    );

    this.attachments = this.createAttachments();
    this.backups = this.createBackups();
    this.chats = this.createChats();
    this.contacts = this.createContacts();
    this.fcm = this.createFcm();
    this.handles = this.createHandles();
    this.icloud = this.createIcloud();
    this.macos = this.createMacos();
    this.messages = this.createMessages();
    this.server = this.createServer();
    this.web = this.createWeb();
  }

  get config(): Readonly<BlueBubblesClientOptions> {
    return {
      baseUrl: this.baseUrl,
      password: this.password,
      fetch: this.fetchImpl,
      headers: this.defaultHeaders,
    };
  }

  withConfig(update: BlueBubblesClientConfigUpdate): BlueBubblesClient {
    return new BlueBubblesClient({
      baseUrl: update.baseUrl ?? this.baseUrl,
      password: update.password ?? this.password,
      fetch: update.fetch ?? this.fetchImpl,
      headers: update.headers ?? this.defaultHeaders,
    });
  }

  private bind<T extends OperationFn>(operation: T): (...args: Parameters<T>) => ReturnType<T> {
    return ((...args: Parameters<T>) =>
      this.call(operation, ...args)) as (...args: Parameters<T>) => ReturnType<T>;
  }

  private call<T extends OperationFn>(operation: T, ...args: Parameters<T>): ReturnType<T> {
    const [options] = args;
    const resolved = this.withDefaults(options as OperationOptions | undefined);
    return operation(resolved as Parameters<T>[0]) as ReturnType<T>;
  }

  private withDefaults(options?: OperationOptions): OperationOptions {
    const resolved: OperationOptions = { ...(options ?? {}) };
    resolved.client = this.httpClient;
    resolved.query = {
      ...(resolved.query ?? {}),
      password: this.password,
    };

    const headers = new Headers(this.defaultHeaders);
    if (resolved.headers) {
      new Headers(resolved.headers).forEach((value, key) => {
        headers.set(key, value);
      });
    }

    if ([...headers.keys()].length > 0) {
      resolved.headers = headers;
    }

    return resolved;
  }

  private createWeb() {
    return {
      landingPage: this.bind(primitives.get),
    };
  }

  private createMacos() {
    return {
      lock: this.bind(primitives.postApiV1MacLock),
    };
  }

  private createIcloud() {
    return {
      accountInfo: this.bind(primitives.getApiV1IcloudAccount),
      contactCard: this.bind(primitives.getApiV1IcloudContact),
      listDevices: this.bind(primitives.getApiV1IcloudFindmyDevices),
      listFriends: this.bind(primitives.getApiV1IcloudFindmyFriends),
      refreshDevices: this.bind(primitives.postApiV1IcloudFindmyDevicesRefresh),
      refreshFriends: this.bind(primitives.postApiV1IcloudFindmyFriendsRefresh),
      updateAlias: this.bind(primitives.postApV1IcloudAccountAlias),
    };
  }

  private createServer() {
    return {
      checkUpdate: this.bind(primitives.getApiV1ServerUpdateCheck),
      info: this.bind(primitives.getApiV1ServerInfo),
      installUpdate: this.bind(primitives.postApiV1ServerUpdateInstall),
      listAlerts: this.bind(primitives.getApiV1ServerAlert),
      logs: this.bind(primitives.getApiV1ServerLogs),
      mediaTotals: this.bind(primitives.getApiV1ServerStatisticsMedia),
      mediaTotalsByChat: this.bind(primitives.getApiV1ServerStatisticsMediaChat),
      ping: this.bind(primitives.getApiV1Ping),
      readAlerts: this.bind(primitives.postApiV1ServerAlertRead),
      restartApp: this.bind(primitives.getApiV1ServerRestartHard),
      restartServices: this.bind(primitives.getApiV1ServerRestartSoft),
      totals: this.bind(primitives.getApiV1ServerStatisticsTotals),
    };
  }

  private createFcm() {
    return {
      clientConfig: this.bind(primitives.getApiV1FcmClient),
      registerDevice: this.bind(primitives.postApiV1FcmDevice),
    };
  }

  private createChats() {
    return {
      addParticipant: this.bind(primitives.postApiV1ChatByChatGuidParticipant),
      contactShareStatus: this.bind(primitives.getApiV1ChatByChatGuidShareContactStatus),
      count: this.bind(primitives.getApiV1ChatCount),
      create: this.bind(primitives.postApiV1ChatNew),
      delete: this.bind(primitives.deleteApiV1ChatByChatGuid),
      get: this.bind(primitives.getApiV1ChatByChatGuid),
      leave: this.bind(primitives.postApiV1ChatByChatGuidLeave),
      listMessages: this.bind(primitives.getApiV1ChatByChatGuidMessage),
      query: this.bind(primitives.postApiV1ChatQuery),
      read: this.bind(primitives.postApiV1ChatByChatGuidRead),
      removeIcon: this.bind(primitives.deleteApiV1ChatByChatGuidIcon),
      removeParticipant: this.bind(primitives.deleteApiV1ChatByChatGuidParticipant),
      setIcon: this.bind(primitives.postApiV1ChatByChatGuidIcon),
      shareContact: this.bind(primitives.postApiV1ChatByChatGuidShareContact),
      typingStart: this.bind(primitives.postApiV1ChatByChatGuidTyping),
      typingStop: this.bind(primitives.deleteApiV1ChatByChatGuidTyping),
      unread: this.bind(primitives.postApiV1ChatByChatGuidUnread),
      update: this.bind(primitives.putApiV1ChatByChatGuid),
    };
  }

  private createHandles() {
    return {
      count: this.bind(primitives.getApiV1HandleCount),
      faceTimeAvailability: this.bind(primitives.getApiV1HandleAvailabilityFacetime),
      focusStatus: this.bind(primitives.getApiV1HandleByAddressFocus),
      get: this.bind(primitives.getApiV1HandleByHandleAddress),
      iMessageAvailability: this.bind(primitives.getApiV1HandleAvailabilityImessage),
      query: this.bind(primitives.postApiV1HandleQuery),
    };
  }

  private createMessages() {
    return {
      count: this.bind(primitives.getApiV1MessageCount),
      countMe: this.bind(primitives.getApiV1MessageCountMe),
      createScheduled: this.bind(primitives.postApiV1MessageSchedule),
      deleteScheduled: this.bind(primitives.deleteApiV1MessageScheduleById),
      edit: this.bind(primitives.postApiV1MessageByGuidEdit),
      embeddedMedia: this.bind(primitives.getApiV1MessageByGuidEmbeddedMedia),
      get: this.bind(primitives.getApiV1MessageByGuid),
      getScheduled: this.bind(primitives.getApiV1MessageScheduleById),
      listScheduled: this.bind(primitives.getApiV1MessageSchedule),
      notify: this.bind(primitives.postApiV1MessageByGuidNotify),
      query: this.bind(primitives.postApiV1MessageQuery),
      react: this.bind(primitives.postApiV1MessageReact),
      sendAttachment: this.bind(primitives.postApiV1MessageAttachment),
      sendMultipart: this.bind(primitives.postApiV1MessageMultipart),
      sendText: this.bind(primitives.postApiV1MessageText),
      unsend: this.bind(primitives.postApiV1MessageByGuidUnsend),
      updateScheduled: this.bind(primitives.putApiV1MessageScheduleById),
    };
  }

  private createAttachments() {
    return {
      blurhash: this.bind(primitives.getApiV1AttachmentByGuidBlurhash),
      count: this.bind(primitives.getApiV1AttachmentCount),
      download: this.bind(primitives.getApiV1AttachmentByGuidDownload),
      downloadForce: this.bind(primitives.getApiV1AttachmentByGuidDownloadForce),
      get: this.bind(primitives.getApiV1AttachmentByGuid),
      livePhoto: this.bind(primitives.getApiV1AttachmentByGuidLive),
      upload: this.bind(primitives.postApiV1AttachmentUpload),
    };
  }

  private createContacts() {
    return {
      list: this.bind(primitives.getApiV1Contact),
      query: this.bind(primitives.postApiV1ContactQuery),
    };
  }

  private createBackups() {
    return {
      deleteSettings: this.bind(primitives.deleteApiV1BackupSettings),
      deleteTheme: this.bind(primitives.deleteApiV1BackupTheme),
      getSettings: this.bind(primitives.getApiV1BackupSettings),
      listThemes: this.bind(primitives.getApiV1BackupTheme),
      saveSettings: this.bind(primitives.postApiV1BackupSettings),
      saveTheme: this.bind(primitives.postApiV1BackupTheme),
    };
  }
}
