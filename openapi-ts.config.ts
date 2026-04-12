import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'spec/openapi.yaml',
  output: {
    path: 'src/generated',
    clean: true,
  },
  experimentalParser: true,
  client: false,
  plugins: [
    {
      name: '@hey-api/typescript',
      identifierCase: 'PascalCase',
    },
  ],
});
