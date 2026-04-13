import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Optional spec-refresh helper for `npm run spec:download`.
 *
 * Normal SDK generation uses `spec/openapi.yaml` as the source of truth.
 * This script is only used when refreshing that spec from the upstream
 * Postman collection so conversion remains reproducible.
 */
const inputPath = process.argv[2] ?? '/tmp/bluebubbles.postman.json';
const POSTMAN_PATH = resolve(process.cwd(), inputPath);

const replacers = [
  ['{{scheme}}://{{host}}', 'http://localhost'],
  ['{{host}}', 'localhost'],
  ['{{scheme}}', 'http'],
  ['{{password}}', 'password'],
  ['"localhost/', '"http://localhost/'],
  ['<Chat GUID>', '{chatGuid}'],
  ['<GUID>', '{guid}'],
  ['<Handle Address>', '{handleAddress}'],
  ['<address>', '{address}'],
  ['<ID>', '{id}'],
  ['<Uploaded Attachment UUID>', '{attachmentUuid}'],
];

let content = readFileSync(POSTMAN_PATH, 'utf8');
for (const [from, to] of replacers) {
  content = content.split(from).join(to);
}
writeFileSync(POSTMAN_PATH, content);

console.log(`Prepared Postman collection: ${POSTMAN_PATH}`);
