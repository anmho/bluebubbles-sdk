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

## Incident Notes (Observed Failures + Fixes)

### 2026-04-16: Publish failing with `E404` to npm registry

- Symptom: release workflow reached publish step but failed with `E404 Not Found` on `@anmho/bluebubbles-sdk`.
- Root cause: npm-side auth/ownership/trusted-publisher mapping was not ready for the package.
- Fix applied: switched CI to temporary token mode (`NODE_AUTH_TOKEN` from repo secret `NPM_TOKEN`) to unblock publish.

### 2026-04-16: PR merge failing with `403 Resource not accessible by integration`

- Symptom: merge API call failed for `anmho/terraform` PR with 403.
- Root cause: repository-level GitHub Actions token policy was too restrictive (`default_workflow_permissions=read` and approvals disabled).
- Fix applied: set repo workflow permissions to write and enabled review approvals for workflows.
- Resolution command used:

```bash
gh api --method PUT repos/anmho/terraform/actions/permissions/workflow \
  -F default_workflow_permissions=write \
  -F can_approve_pull_request_reviews=true
```

Note:

- This specific 403 was a repo configuration issue, not a confirmed GitHub App installation permission issue.
- If 403 persists after rerunning with updated repo settings, then check app installation scopes (`contents: write`, `pull requests: write`).

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
