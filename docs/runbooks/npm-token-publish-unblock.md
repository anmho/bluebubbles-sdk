# npm Token Publish Unblock Runbook

This runbook documents the temporary unblock path for publishing `@anmho/bluebubbles-sdk` from GitHub Actions using `NPM_TOKEN`.

Use this while npm trusted publishing is being fixed.

## Current Architecture

- Release workflow: `.github/workflows/release.yml`
- Release orchestrator: `changesets/action`
- Publish command: `npm run release:publish`
- Auth model: npm token from GitHub Actions secret `NPM_TOKEN`

## One-Time Setup

1. In npm, create a publish-capable token for the account/org that owns `@anmho/bluebubbles-sdk`.
2. In GitHub repo settings, add secret `NPM_TOKEN` with that token value.
3. Confirm release workflow references `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`.

## Release Flow

1. Merge feature PRs containing `.changeset/*.md` files into `main`.
2. Release workflow opens/updates release PR `chore(release): version package`.
3. Merge the release PR.
4. Release workflow publishes to npm and creates a GitHub Release.

## Verification

Run after the publish workflow succeeds:

```bash
npm view @anmho/bluebubbles-sdk version
npm view @anmho/bluebubbles-sdk dist-tags --json
```

Expected:

- Published version matches the merged release PR version.
- `latest` points to that version.

## Troubleshooting

### `npm ERR! code E404` on publish

- The package name/scope may not be owned by the token's npm account/org.
- Check package access in npm:

```bash
npm owner ls @anmho/bluebubbles-sdk
```

### `npm ERR! code E401` or auth errors

- `NPM_TOKEN` is missing/invalid/expired.
- Re-create token and update GitHub secret.

### No release PR appears

- No changeset file was merged.
- Ensure at least one `.changeset/*.md` file exists on `main`.

## Security Notes (Temporary Mode)

- Keep token scope minimal and publish-only.
- Store token only in GitHub repo secrets, not in code.
- Rotate token regularly or immediately after any exposure.

## Exit Criteria Back to Trusted Publishing

Move back when npm trusted publisher mapping is fixed. At that point:

1. Remove `NODE_AUTH_TOKEN` from workflow.
2. Add back `permissions.id-token: write`.
3. Remove/revoke `NPM_TOKEN` from GitHub secrets.
4. Follow `docs/runbooks/trusted-publishing.md`.
