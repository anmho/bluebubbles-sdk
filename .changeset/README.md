# Changesets

Create one markdown file in this folder for each releasable change.

Example:

```md
---
"@anmho/bluebubbles-sdk": patch
---

Describe what changed.
```

On merge to `main`, the release workflow will open or update a version PR.
When that PR is merged, the workflow will publish to npm and create a GitHub Release.

If no changeset files exist on `main`, the workflow will not publish.
Current temporary publish setup is in `docs/runbooks/npm-token-publish-unblock.md`.
Trusted publishing target-state setup is in `docs/runbooks/trusted-publishing.md`.
