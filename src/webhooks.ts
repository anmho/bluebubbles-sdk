export const WEBHOOK_EVENT_TYPES = {
  ALL: '*',
  NEW_MESSAGE: 'new-message',
  UPDATED_MESSAGE: 'updated-message',
  MESSAGE_SEND_ERROR: 'message-send-error',
  GROUP_NAME_CHANGE: 'group-name-change',
  GROUP_ICON_CHANGED: 'group-icon-changed',
  GROUP_ICON_REMOVED: 'group-icon-removed',
  PARTICIPANT_REMOVED: 'participant-removed',
  PARTICIPANT_ADDED: 'participant-added',
  PARTICIPANT_LEFT: 'participant-left',
  CHAT_READ_STATUS_CHANGED: 'chat-read-status-changed',
  TYPING_INDICATOR: 'typing-indicator',
  SCHEDULED_MESSAGE_ERROR: 'scheduled-message-error',
  SERVER_UPDATE: 'server-update',
  NEW_SERVER: 'new-server',
  NEW_FINDMY_LOCATION: 'new-findmy-location',
  HELLO_WORLD: 'hello-world',
  INCOMING_FACETIME: 'incoming-facetime',
  FT_CALL_STATUS_CHANGED: 'ft-call-status-changed',
  IMESSAGE_ALIAS_REMOVED: 'imessage-alias-removed',
  THEME_BACKUP_CREATED: 'theme-backup-created',
  THEME_BACKUP_UPDATED: 'theme-backup-updated',
  THEME_BACKUP_DELETED: 'theme-backup-deleted',
  SETTINGS_BACKUP_CREATED: 'settings-backup-created',
  SETTINGS_BACKUP_UPDATED: 'settings-backup-updated',
  SETTINGS_BACKUP_DELETED: 'settings-backup-deleted',
} as const;

export type WebhookEventType = (typeof WEBHOOK_EVENT_TYPES)[keyof typeof WEBHOOK_EVENT_TYPES];
export type IncomingWebhookEventType = Exclude<WebhookEventType, typeof WEBHOOK_EVENT_TYPES.ALL>;

export interface WebhookCreateParams {
  events: WebhookEventType[];
  url: string;
}

export interface IncomingWebhookEvent<TType extends IncomingWebhookEventType = IncomingWebhookEventType> {
  data: unknown;
  type: TType;
}

export class WebhookEventParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebhookEventParseError';
  }
}

const incomingWebhookEventTypes = new Set<IncomingWebhookEventType>(
  Object.values(WEBHOOK_EVENT_TYPES).filter((value) => value !== WEBHOOK_EVENT_TYPES.ALL),
);

export const isWebhookEventType = (value: unknown): value is IncomingWebhookEventType => {
  return typeof value === 'string' && incomingWebhookEventTypes.has(value as IncomingWebhookEventType);
};

export const isIncomingWebhookEvent = (value: unknown): value is IncomingWebhookEvent => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<IncomingWebhookEvent>;
  return isWebhookEventType(candidate.type) && 'data' in candidate;
};

export const isIncomingWebhookEventOfType = <TType extends IncomingWebhookEventType>(
  value: unknown,
  type: TType,
): value is IncomingWebhookEvent<TType> => {
  return isIncomingWebhookEvent(value) && value.type === type;
};

const textDecoder = new TextDecoder();

export const constructWebhookEvent = (
  payload: IncomingWebhookEvent | string | Uint8Array,
): IncomingWebhookEvent => {
  let parsed: unknown = payload;

  if (typeof payload === 'string') {
    try {
      parsed = JSON.parse(payload);
    } catch (error) {
      throw new WebhookEventParseError(
        `Invalid webhook JSON payload: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  } else if (payload instanceof Uint8Array) {
    const decodedPayload = textDecoder.decode(payload);
    try {
      parsed = JSON.parse(decodedPayload);
    } catch (error) {
      throw new WebhookEventParseError(
        `Invalid webhook JSON payload: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  if (!isIncomingWebhookEvent(parsed)) {
    throw new WebhookEventParseError(
      'Invalid webhook event payload: expected an object with known event `type` and `data`.',
    );
  }

  return parsed;
};
