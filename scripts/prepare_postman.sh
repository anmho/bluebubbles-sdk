#!/usr/bin/env bash
set -euo pipefail

POSTMAN_PATH="spec/bluebubbles.postman.json"

if [[ ! -f "$POSTMAN_PATH" ]]; then
  echo "Missing $POSTMAN_PATH" >&2
  exit 1
fi

# Keep spec derived from Postman, but replace unresolved env placeholders
# so postman-to-openapi can parse URL values.
perl -0pi -e 's/\{\{scheme\}\}:\/\/\{\{host\}\}/http:\/\/localhost/g' "$POSTMAN_PATH"
perl -0pi -e 's/\{\{host\}\}/localhost/g' "$POSTMAN_PATH"
perl -0pi -e 's/\{\{scheme\}\}/http/g' "$POSTMAN_PATH"
perl -0pi -e 's/\{\{password\}\}/password/g' "$POSTMAN_PATH"
perl -0pi -e 's/"localhost\//"http:\/\/localhost\//g' "$POSTMAN_PATH"

echo "Prepared Postman collection: $POSTMAN_PATH"
