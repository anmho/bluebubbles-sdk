import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const POSTMAN_PATH = resolve(process.cwd(), 'spec/bluebubbles.postman.json');

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
