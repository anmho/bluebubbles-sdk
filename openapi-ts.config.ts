import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './spec/openapi.yaml',
  output: {
    path: 'src/generated',
    clean: true,
  },
  postProcess: ['prettier'],
  client: '@hey-api/client-fetch',
  plugins: [
    {
      name: '@hey-api/typescript',
      identifierCase: 'PascalCase',
    },
    {
      name: '@hey-api/sdk',
      operations: {
        strategy: 'single',
      },
    },
  ],
});
