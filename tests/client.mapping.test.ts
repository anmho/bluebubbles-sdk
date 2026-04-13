import assert from 'node:assert/strict';
import test from 'node:test';

import { BlueBubblesClient } from '~/client';

type FetchCall = {
  input: RequestInfo | URL;
  init?: RequestInit;
};

const createJsonResponse = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });

const getCallDetails = (call: FetchCall): { method: string; url: URL } => {
  if (call.input instanceof Request) {
    return {
      method: call.input.method,
      url: new URL(call.input.url),
    };
  }

  return {
    method: call.init?.method ?? 'GET',
    url: new URL(String(call.input)),
  };
};

test('server.ping maps to the expected endpoint and injects password query', async () => {
  const calls: FetchCall[] = [];
  const fetchMock = async (input, init) => {
    calls.push({ input, init });
    return createJsonResponse({ ok: true });
  };

  const client = new BlueBubblesClient({
    baseUrl: 'http://localhost:1234',
    password: 'secret',
    fetch: fetchMock,
  });

  await client.server.ping();
  assert.equal(calls.length, 1);
  const request = getCallDetails(calls[0]);
  assert.equal(request.method, 'GET');

  const url = request.url;
  assert.equal(url.pathname, '/api/v1/ping');
  assert.equal(url.searchParams.get('password'), 'secret');
});

test('chats.query supports optional input (list/query ergonomics)', async () => {
  const calls: FetchCall[] = [];
  const fetchMock = async (input, init) => {
    calls.push({ input, init });
    return createJsonResponse({ data: [] });
  };

  const client = new BlueBubblesClient({
    baseUrl: 'http://localhost:1234',
    password: 'secret',
    fetch: fetchMock,
  });

  await client.chats.query();
  assert.equal(calls.length, 1);
  const request = getCallDetails(calls[0]);
  assert.equal(request.method, 'POST');

  const url = request.url;
  assert.equal(url.pathname, '/api/v1/chat/query');
  assert.equal(url.searchParams.get('password'), 'secret');
});

test('chats.get maps path parameters to the generated primitive input', async () => {
  const calls: FetchCall[] = [];
  const fetchMock = async (input, init) => {
    calls.push({ input, init });
    return createJsonResponse({ data: { guid: 'abc' } });
  };

  const client = new BlueBubblesClient({
    baseUrl: 'http://localhost:1234',
    password: 'secret',
    fetch: fetchMock,
  });

  await client.chats.get({ path: { chatGuid: 'abc' } });
  assert.equal(calls.length, 1);
  const request = getCallDetails(calls[0]);
  assert.equal(request.method, 'GET');

  const url = request.url;
  assert.equal(url.pathname, '/api/v1/chat/abc');
  assert.equal(url.searchParams.get('password'), 'secret');
});
