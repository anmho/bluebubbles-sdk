# @anmho/bluebubbles-sdk

Resource-grouped TypeScript SDK for BlueBubbles, generated from the official Postman collection with a thin custom facade.

## Install

```bash
npm install @anmho/bluebubbles-sdk
```

## Usage

```ts
import { BlueBubblesClient } from '@anmho/bluebubbles-sdk';

const client = new BlueBubblesClient({
  baseUrl: 'http://localhost:1234',
  password: 'your-server-password',
});

const chat = await client.chats.get({ chatGuid: 'iMessage;+;12345' });
await client.messages.sendText({
  body: {
    chatGuid: 'iMessage;+;12345',
    message: 'hello from sdk',
  },
});

const attachment = await client.attachments.download({ guid: 'ATTACHMENT_GUID' });

// Create an isolated derived client with updated config
const stagingClient = client.withConfig({
  baseUrl: 'https://staging.example.com',
});

// Read-only config snapshot
console.log(stagingClient.config.baseUrl);
```

All resource methods use a single named params object:

- path params as top-level fields (`{ chatGuid }`, `{ guid }`, `{ id }`, etc.)
- optional `query` object
- optional `body`
- optional `headers`

## Resources

`client.attachments`, `client.backups`, `client.chats`, `client.contacts`, `client.fcm`, `client.handles`, `client.icloud`, `client.macos`, `client.messages`, `client.server`, `client.web`.

## Build Pipeline

```bash
npm run build
```

`build` runs:

1. download Postman collection
2. prepare unresolved Postman placeholders for conversion
3. convert Postman -> OpenAPI (`spec/openapi.yaml`)
4. verify semantic parity against local `Jish2/bluebubbles-sdk` spec mirror
5. generate Hey API types (`src/generated`) and endpoint manifest (`src/manifest.gen.ts`)
6. compile TypeScript

If parity checking is temporarily too strict while upstream and Postman drift, use:

```bash
npm run build:skip-verify
```

## Scripts

- `spec:download`
- `spec:prepare`
- `spec:convert`
- `spec:verify`
- `generate` (runs `generate:raw` + `generate:manifest`)
- `build`
- `build:skip-verify`
- `check`

## Notes

- No hand-editing of generated files in `src/generated` or `src/manifest.gen.ts`.
- Facade runtime is intentionally thin and resource-grouped; it does not rewrite the upstream spec.
