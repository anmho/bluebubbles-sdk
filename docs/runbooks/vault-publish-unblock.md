# Vault-Backed Publish Unblock Runbook

This runbook documents the temporary unblock path for publishing `@anmho/bluebubbles-sdk` from GitHub Actions using an npm token stored in HashiCorp Vault.

Use this while npm trusted publishing is being finalized.

## Current Architecture

- Release workflow: `.github/workflows/release.yml`
- Release orchestrator: `changesets/action`
- Publish command: `npm run release:publish`
- Auth model: GitHub OIDC -> Vault JWT auth -> Vault secret -> `NODE_AUTH_TOKEN`

## GitHub Repo Variables Required

Set these repository variables:

- `VAULT_ADDR`: Vault URL (example: `https://vault.example.com`)
- `VAULT_NAMESPACE`: Vault namespace (empty if not using namespaces)
- `VAULT_AUTH_PATH`: Vault JWT auth mount path (example: `jwt` or `auth/jwt`)
- `VAULT_GITHUB_ROLE`: Vault role bound to this GitHub repo/workflow
- `VAULT_NPM_TOKEN_SECRET_PATH`: Vault secret path containing npm token
- `VAULT_NPM_TOKEN_SECRET_KEY`: Key name in the secret data that stores the token

## Vault Setup Requirements

1. Enable JWT auth in Vault and trust GitHub OIDC tokens.
2. Create a role for this repo/workflow with strict `bound_claims`:
   - repo: `anmho/bluebubbles-sdk`
   - workflow: `release.yml`
   - ref/branch: `refs/heads/main` (or your allowed pattern)
3. Store publish token in Vault KV:
   - path: matches `VAULT_NPM_TOKEN_SECRET_PATH`
   - key: matches `VAULT_NPM_TOKEN_SECRET_KEY`

## Release Flow

1. Merge feature PRs containing `.changeset/*.md` files into `main`.
2. Release workflow opens/updates release PR `chore(release): version package`.
3. Merge the release PR.
4. Release workflow fetches token from Vault and publishes to npm + GitHub Release.

## Verification

After successful release workflow:

```bash
npm view @anmho/bluebubbles-sdk version
npm view @anmho/bluebubbles-sdk dist-tags --json
```

## Troubleshooting

### `NODE_AUTH_TOKEN is empty`

- Vault auth succeeded but secret mapping failed.
- Check `VAULT_NPM_TOKEN_SECRET_PATH` and `VAULT_NPM_TOKEN_SECRET_KEY`.

### Vault auth failure

- Check `VAULT_ADDR`, `VAULT_AUTH_PATH`, `VAULT_GITHUB_ROLE`.
- Verify role claim bindings match repo/workflow/branch exactly.

### npm publish `E401`

- Token in Vault is invalid/expired/missing publish access.
- Rotate token in Vault and rerun workflow.

### npm publish `E404`

- npm account/org for token does not own `@anmho/bluebubbles-sdk`.
- Confirm ownership with:

```bash
npm owner ls @anmho/bluebubbles-sdk
```

## Security Notes

- Do not store raw npm publish token in GitHub secrets in this mode.
- Keep Vault role bound tightly to this repo/workflow/branch.
- Rotate npm token in Vault periodically.

## Exit Criteria Back to Trusted Publishing

When npm trusted publishing is working:

1. Remove Vault token retrieval step from release workflow.
2. Keep `permissions.id-token: write`.
3. Use trusted publisher mapping only.
4. Follow `docs/runbooks/trusted-publishing.md`.
