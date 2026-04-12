import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

const generatedPath = resolve(process.cwd(), 'spec/openapi.yaml');
const upstreamPath = resolve(
  process.cwd(),
  process.env.UPSTREAM_SPEC_PATH ?? '../../bluebubbles-sdk-source/openapi.yaml',
);

if (!existsSync(generatedPath)) {
  console.error(`Missing generated OpenAPI spec: ${generatedPath}`);
  process.exit(1);
}

if (!existsSync(upstreamPath)) {
  console.error(`Missing upstream OpenAPI spec: ${upstreamPath}`);
  console.error('Set UPSTREAM_SPEC_PATH to the local Jish2/bluebubbles-sdk openapi.yaml path.');
  process.exit(1);
}

const sortDeep = (value) => {
  if (Array.isArray(value)) {
    return value.map(sortDeep);
  }

  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortDeep(value[key]);
        return acc;
      }, {});
  }

  return value;
};

const generatedDoc = yaml.load(readFileSync(generatedPath, 'utf8'));
const upstreamDoc = yaml.load(readFileSync(upstreamPath, 'utf8'));

const generatedCanonical = JSON.stringify(sortDeep(generatedDoc));
const upstreamCanonical = JSON.stringify(sortDeep(upstreamDoc));

const digest = (input) => createHash('sha256').update(input).digest('hex');
const generatedHash = digest(generatedCanonical);
const upstreamHash = digest(upstreamCanonical);

if (generatedHash !== upstreamHash) {
  console.error('OpenAPI mismatch detected against upstream Jish2/bluebubbles-sdk spec.');
  console.error(`Generated: ${generatedPath}`);
  console.error(`Upstream:  ${upstreamPath}`);
  console.error(`Generated semantic SHA256: ${generatedHash}`);
  console.error(`Upstream semantic SHA256:  ${upstreamHash}`);
  process.exit(1);
}

console.log(`OpenAPI spec verified (semantic SHA256 ${generatedHash}).`);
