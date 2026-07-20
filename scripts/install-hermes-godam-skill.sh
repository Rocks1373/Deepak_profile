#!/usr/bin/env bash
# Install the GoDam skill into the local Hermes Desktop skills directory.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/hermes-skills/godam"
HERMES_HOME="${HERMES_HOME:-$HOME/.hermes}"
DEST="$HERMES_HOME/skills/productivity/godam"

if [[ ! -f "$SRC/SKILL.md" ]]; then
  echo "Missing skill at $SRC/SKILL.md" >&2
  exit 1
fi

mkdir -p "$(dirname "$DEST")"
rm -rf "$DEST"
cp -R "$SRC" "$DEST"
chmod +x "$DEST/scripts/godam_cli.py"

ENV_FILE="$HERMES_HOME/.env"
touch "$ENV_FILE"
if ! grep -q '^GODAM_API_KEY=' "$ENV_FILE" 2>/dev/null; then
  echo 'GODAM_API_KEY=godam-dev-key' >> "$ENV_FILE"
fi
if ! grep -q '^GODAM_API_BASE=' "$ENV_FILE" 2>/dev/null; then
  echo 'GODAM_API_BASE=http://127.0.0.1:4000' >> "$ENV_FILE"
fi

CONFIG="$HERMES_HOME/config.yaml"
if [[ -f "$CONFIG" ]] && ! grep -q 'godam.api_base' "$CONFIG" 2>/dev/null; then
  cat >> "$CONFIG" <<'YAML'

# GoDam warehouse skill
skills:
  config:
    godam.api_base: "http://127.0.0.1:4000"
YAML
fi

echo "Installed GoDam skill → $DEST"
echo "Env keys ensured in $ENV_FILE"
echo
echo "Next:"
echo "  1) Start API:  cd \"$REPO_ROOT\" && npm run godam-api"
echo "  2) In Hermes:  /godam show dashboard and pending approvals"
echo "  3) Test CLI:   python3 \"$DEST/scripts/godam_cli.py\" dashboard"
