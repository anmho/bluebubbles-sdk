import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

const SPEC_PATH = resolve(process.cwd(), 'spec/openapi.yaml');
const OUTPUT_PATH = resolve(process.cwd(), 'src/manifest.gen.ts');

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'];

const RESOURCE_MAP = {
  attachment: 'attachments',
  backup: 'backups',
  chat: 'chats',
  contact: 'contacts',
  fcm: 'fcm',
  handle: 'handles',
  icloud: 'icloud',
  mac: 'macos',
  message: 'messages',
  ping: 'server',
  server: 'server',
  web: 'web',
};

const METHOD_OVERRIDES = {
  'GET /': 'landingPage',

  'GET /api/v1/attachment/<GUID>': 'get',
  'GET /api/v1/attachment/<GUID>/blurhash': 'blurhash',
  'GET /api/v1/attachment/<GUID>/download': 'download',
  'GET /api/v1/attachment/<GUID>/download/force': 'downloadForce',
  'GET /api/v1/attachment/<GUID>/live': 'livePhoto',
  'GET /api/v1/attachment/count': 'count',
  'POST /api/v1/attachment/upload': 'upload',

  'GET /api/v1/backup/settings': 'getSettings',
  'POST /api/v1/backup/settings': 'saveSettings',
  'DELETE /api/v1/backup/settings': 'deleteSettings',
  'GET /api/v1/backup/theme': 'listThemes',
  'POST /api/v1/backup/theme': 'saveTheme',
  'DELETE /api/v1/backup/theme': 'deleteTheme',

  'GET /api/v1/chat/<Chat GUID>': 'get',
  'PUT /api/v1/chat/<Chat GUID>': 'update',
  'DELETE /api/v1/chat/<Chat GUID>': 'delete',
  'POST /api/v1/chat/<Chat GUID>/icon': 'setIcon',
  'DELETE /api/v1/chat/<Chat GUID>/icon': 'removeIcon',
  'POST /api/v1/chat/<Chat GUID>/leave': 'leave',
  'GET /api/v1/chat/<Chat GUID>/message': 'listMessages',
  'POST /api/v1/chat/<Chat GUID>/participant': 'addParticipant',
  'DELETE /api/v1/chat/<Chat GUID>/participant': 'removeParticipant',
  'POST /api/v1/chat/<Chat GUID>/read': 'read',
  'POST /api/v1/chat/<Chat GUID>/share/contact': 'shareContact',
  'GET /api/v1/chat/<Chat GUID>/share/contact/status': 'contactShareStatus',
  'POST /api/v1/chat/<Chat GUID>/typing': 'typingStart',
  'DELETE /api/v1/chat/<Chat GUID>/typing': 'typingStop',
  'POST /api/v1/chat/<Chat GUID>/unread': 'unread',
  'GET /api/v1/chat/count': 'count',
  'POST /api/v1/chat/new': 'create',
  'POST /api/v1/chat/query': 'query',

  'GET /api/v1/contact': 'list',
  'POST /api/v1/contact/query': 'query',

  'GET /api/v1/fcm/client': 'clientConfig',
  'POST /api/v1/fcm/device': 'registerDevice',

  'GET /api/v1/handle/<Handle Address>': 'get',
  'GET /api/v1/handle/<address>/focus': 'focusStatus',
  'GET /api/v1/handle/availability/facetime': 'faceTimeAvailability',
  'GET /api/v1/handle/availability/imessage': 'iMessageAvailability',
  'GET /api/v1/handle/count': 'count',
  'POST /api/v1/handle/query': 'query',

  'POST /ap/v1/icloud/account/alias': 'updateAlias',
  'GET /api/v1/icloud/account': 'accountInfo',
  'GET /api/v1/icloud/contact': 'contactCard',
  'GET /api/v1/icloud/findmy/devices': 'listDevices',
  'POST /api/v1/icloud/findmy/devices/refresh': 'refreshDevices',
  'GET /api/v1/icloud/findmy/friends': 'listFriends',
  'POST /api/v1/icloud/findmy/friends/refresh': 'refreshFriends',

  'POST /api/v1/mac/lock': 'lock',

  'GET /api/v1/message/<GUID>': 'get',
  'POST /api/v1/message/<GUID>/edit': 'edit',
  'GET /api/v1/message/<GUID>/embedded-media': 'embeddedMedia',
  'POST /api/v1/message/<GUID>/notify': 'notify',
  'POST /api/v1/message/<GUID>/unsend': 'unsend',
  'POST /api/v1/message/attachment': 'sendAttachment',
  'GET /api/v1/message/count': 'count',
  'GET /api/v1/message/count/me': 'countMe',
  'POST /api/v1/message/multipart': 'sendMultipart',
  'POST /api/v1/message/query': 'query',
  'POST /api/v1/message/react': 'react',
  'GET /api/v1/message/schedule': 'listScheduled',
  'POST /api/v1/message/schedule': 'createScheduled',
  'GET /api/v1/message/schedule/<ID>': 'getScheduled',
  'PUT /api/v1/message/schedule/<ID>': 'updateScheduled',
  'DELETE /api/v1/message/schedule/<ID>': 'deleteScheduled',
  'POST /api/v1/message/text': 'sendText',

  'GET /api/v1/ping': 'ping',
  'GET /api/v1/server/alert': 'listAlerts',
  'POST /api/v1/server/alert/read': 'readAlerts',
  'GET /api/v1/server/info': 'info',
  'GET /api/v1/server/logs': 'logs',
  'GET /api/v1/server/restart/hard': 'restartApp',
  'GET /api/v1/server/restart/soft': 'restartServices',
  'GET /api/v1/server/statistics/media': 'mediaTotals',
  'GET /api/v1/server/statistics/media/chat': 'mediaTotalsByChat',
  'GET /api/v1/server/statistics/totals': 'totals',
  'GET /api/v1/server/update/check': 'checkUpdate',
  'POST /api/v1/server/update/install': 'installUpdate',
};

const toCamel = (value) => {
  const words = value
    .replace(/['`]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());

  if (!words.length) return '';

  return words
    .map((word, index) => (index === 0 ? word : `${word[0].toUpperCase()}${word.slice(1)}`))
    .join('');
};

const toIdentifier = (value, fallback = 'operation') => {
  const camel = toCamel(value);
  const safe = camel.replace(/[^a-zA-Z0-9_$]/g, '');

  if (!safe) return fallback;
  if (/^[0-9]/.test(safe)) return `_${safe}`;
  return safe;
};

const toResource = (pathName) => {
  if (pathName === '/') return 'web';

  const parts = pathName.split('/').filter(Boolean);

  let key = parts[0] ?? 'other';
  if ((key === 'api' || key === 'ap') && parts[1] === 'v1') {
    key = parts[2] ?? 'other';
  }

  if (RESOURCE_MAP[key]) {
    return RESOURCE_MAP[key];
  }

  if (key.endsWith('s')) {
    return key;
  }

  return `${key}s`;
};

const extractPathParams = (pathName) => {
  const tokens = [];
  const regex = /<([^>]+)>|\{([^}]+)\}/g;
  let match = regex.exec(pathName);

  while (match) {
    const [rawToken, angleToken, braceToken] = match;
    const tokenValue = angleToken ?? braceToken;
    const paramName = toIdentifier(tokenValue, 'id');

    tokens.push({
      paramName,
      token: rawToken,
    });

    match = regex.exec(pathName);
  }

  return tokens;
};

const resolveMethodName = ({ operation, method, pathName }) => {
  const overrideKey = `${method.toUpperCase()} ${pathName}`;
  if (METHOD_OVERRIDES[overrideKey]) {
    return METHOD_OVERRIDES[overrideKey];
  }

  if (operation.summary) {
    return toIdentifier(operation.summary, `${method}Operation`);
  }

  if (operation.operationId) {
    return toIdentifier(operation.operationId, `${method}Operation`);
  }

  const parts = pathName
    .split('/')
    .filter(Boolean)
    .map((part) => part.replace(/[{}<>]/g, ''))
    .join(' ');

  return toIdentifier(`${method} ${parts}`, `${method}Operation`);
};

const spec = yaml.load(readFileSync(SPEC_PATH, 'utf8'));
const paths = spec?.paths ?? {};

const entries = [];

for (const pathName of Object.keys(paths).sort()) {
  const pathItem = paths[pathName] ?? {};

  for (const method of HTTP_METHODS) {
    const operation = pathItem[method];
    if (!operation) continue;

    entries.push({
      resource: toResource(pathName),
      methodName: resolveMethodName({ operation, method, pathName }),
      httpMethod: method.toUpperCase(),
      path: pathName,
      pathParams: extractPathParams(pathName),
      summary: operation.summary ?? '',
    });
  }
}

const byResource = new Map();
for (const entry of entries) {
  if (!byResource.has(entry.resource)) {
    byResource.set(entry.resource, []);
  }
  byResource.get(entry.resource).push(entry);
}

for (const [resource, resourceEntries] of byResource.entries()) {
  const counts = new Map();

  for (const entry of resourceEntries) {
    const key = entry.methodName;
    const count = (counts.get(key) ?? 0) + 1;
    counts.set(key, count);

    if (count > 1) {
      const suffix = `${entry.httpMethod.toLowerCase()}${toIdentifier(entry.path, 'Path')[0].toUpperCase()}${toIdentifier(entry.path, 'Path').slice(1)}`;
      entry.methodName = `${entry.methodName}${suffix}`;
    }
  }

  byResource.set(resource, resourceEntries);
}

const resources = [...byResource.keys()].sort();
const flat = resources.flatMap((resource) => byResource.get(resource));

const output = `/* eslint-disable */\n// This file is auto-generated by scripts/generate_manifest.mjs\n\nexport type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';\n\nexport interface EndpointPathParam {\n  paramName: string;\n  token: string;\n}\n\nexport interface EndpointDescriptor {\n  resource: string;\n  methodName: string;\n  httpMethod: HttpMethod;\n  path: string;\n  pathParams: EndpointPathParam[];\n  summary: string;\n}\n\nexport const RESOURCE_KEYS = ${JSON.stringify(resources, null, 2)} as const;\nexport type ResourceKey = (typeof RESOURCE_KEYS)[number];\n\nexport const ENDPOINTS: readonly EndpointDescriptor[] = ${JSON.stringify(flat, null, 2)} as const;\n`;

writeFileSync(OUTPUT_PATH, output);
console.log(`Generated endpoint manifest: ${OUTPUT_PATH}`);
