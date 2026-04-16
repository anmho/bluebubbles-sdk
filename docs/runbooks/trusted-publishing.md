# Trusted Publishing Runbook

This is the target-state runbook for publishing `@anmho/bluebubbles-sdk` to npm using GitHub OIDC trusted publishing.
No long-lived npm token is required in GitHub secrets in this model.

Temporary current-state unblock with `NPM_TOKEN` lives in `docs/runbooks/npm-token-publish-unblock.md`.

## Target Architecture

- GitHub Actions release workflow: `.github/workflows/release.yml`
- Release orchestrator: `changesets/action`
- Publish command: `npm run release:publish`
- Auth model: GitHub OIDC token exchange with npm trusted publisher configuration

## npm Trusted Publisher Setup

In npm package settings for `@anmho/bluebubbles-sdk`, configure a trusted publisher with these exact values:

- Provider: GitHub Actions
- Owner: `anmho`
- Repository: `bluebubbles-sdk`
- Workflow file: `release.yml`
- Branch: `main`

Notes:

- Values are exact and case-sensitive.
- If workflow file or branch changes, update npm trusted publisher settings.

## CI Requirements (Trusted Publishing Mode)

- Workflow must include `permissions.id-token: write`.
- Workflow must run npm `>= 11.5.1`.
- Workflow must not depend on `NPM_TOKEN` for publish.

## Release Flow

1. Merge feature PRs containing `.changeset/*.md` files.
2. Release workflow opens/updates release PR: `chore(release): version package`.
3. Merge the release PR.
4. Release workflow runs `npm run release:publish` and publishes to npm.
5. Changesets creates GitHub release notes.

## Verification

Run after release workflow completes:

```bash
npm view @anmho/bluebubbles-sdk version
npm view @anmho/bluebubbles-sdk dist-tags --json
```

Expected:

- Latest version equals the merged release PR version.
- `latest` dist-tag points to that version.

## Troubleshooting

### `npm 11.5.1+ is required for npm trusted publishing`

- Update workflow runtime/npm version in `.github/workflows/release.yml`.

### `E404 Not Found - PUT https://registry.npmjs.org/@anmho%2fbluebubbles-sdk`

- Trusted publisher mapping is missing or mismatched.
- Re-check owner/repo/workflow/branch values in npm package settings.
- Confirm package scope ownership in npm org/account.

### No release PR appears

- No changesets were merged to `main`.
- Ensure at least one `.changeset/*.md` file exists in merged feature PRs.

### Release PR merged but publish did not happen

- Inspect release workflow logs for trusted publishing/auth mismatch.
- Confirm workflow filename is still `release.yml` on `main`.

## Emergency Recovery

1. Fix trusted publisher config in npm.
2. Re-run the failed release workflow run.
3. Re-verify npm version and dist-tags.
4. If release PR was already merged and version is still unpublished, rerun workflow on `main` after auth fix.
