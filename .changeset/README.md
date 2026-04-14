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
Publishing also requires a valid `NPM_TOKEN` repository secret.
