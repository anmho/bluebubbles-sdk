# BlueBubbles TypeScript SDK

A clean, production-ready TypeScript SDK for the BlueBubbles Server REST API.

## Features
- **Modern & Typed**: Fully typed request/response interfaces generated from the latest OpenAPI spec.
- **Resource Grouped**: Intuitive API structure (chats, messages, handles, attachments).
- **Authentication**: Automatic query parameter injection for `password`/`guid`.
- **Lightweight**: Minimal dependencies, uses native `fetch`.
- **Tree-shakable**: Import only what you need.
- **Universal**: Works in Node.js, Browsers, and React Native.

## Installation

```bash
npm install bluebubbles-sdk
```

## Quick Start

```typescript
import { BlueBubblesClient } from 'bluebubbles-sdk';

const client = new BlueBubblesClient({
    baseUrl: 'https://your-server-address',
    password: 'your-server-password'
});

// Fetch a chat
const chat = await client.chats.get({ chatGuid: 'iMessage;+;1234567890' });

// List recent messages in a chat
const messages = await client.chats.listMessages({ chatGuid: 'iMessage;+;1234567890' });

// Send a text message
await client.messages.sendText({
    requestBody: {
        chatGuid: 'iMessage;+;1234567890',
        text: 'Hello from the SDK!'
    }
});
```

## API Overview

### Chats
- `client.chats.get({ chatGuid })`: Get chat details.
- `client.chats.list({ requestBody? })`: Query chats.
- `client.chats.listMessages({ chatGuid })`: Get messages for a chat.
- `client.chats.create({ requestBody })`: Create a new chat.
- `client.chats.markRead({ chatGuid })`: Mark chat as read.

### Messages
- `client.messages.get({ guid })`: Get message by GUID.
- `client.messages.list({ requestBody? })`: Query messages.
- `client.messages.sendText({ requestBody })`: Send a text message.
- `client.messages.sendAttachment({ requestBody })`: Send an attachment.

### Handles
- `client.handles.get({ handleAddress })`: Get handle details.
- `client.handles.list({ requestBody? })`: Query handles.

### Attachments
- `client.attachments.get({ guid })`: Get attachment details.
- `client.attachments.download({ guid })`: Download an attachment.

### Raw API
If you need access to endpoints not covered by the grouped helpers, you can use the raw underlying services:
```typescript
const serverInfo = await client.raw.server.getServerInfo();
```

## Development

### Building
The SDK is generated from a Postman collection. To update and build:

```bash
npm run build
```

This will:
1. Download the latest Postman collection.
2. Convert it to OpenAPI 3.0.
3. Patch the spec for better TypeScript ergonomics.
4. Generate the SDK source.
5. Compile to JavaScript.

## License
ISC
