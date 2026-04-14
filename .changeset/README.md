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
