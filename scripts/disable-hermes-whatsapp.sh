#!/usr/bin/env bash
# Disable Hermes WhatsApp (Baileys + Cloud) and stop the gateway bridge.
set -euo pipefail

export PATH="${HOME}/.local/bin:${HOME}/.hermes/bin:${PATH}"
HERMES_HOME="${HERMES_HOME:-$HOME/.hermes}"
ENV_FILE="${HERMES_HOME}/.env"

mkdir -p "${HERMES_HOME}"
touch "${ENV_FILE}"

set_env_key() {
  local key="$1"
  local value="$2"
  if grep -qE "^[[:space:]]*#?[[:space:]]*${key}=" "${ENV_FILE}"; then
    # portable-ish in-place edit
    if sed --version >/dev/null 2>&1; then
      sed -i -E "s|^[[:space:]]*#?[[:space:]]*${key}=.*|${key}=${value}|" "${ENV_FILE}"
    else
      sed -i '' -E "s|^[[:space:]]*#?[[:space:]]*${key}=.*|${key}=${value}|" "${ENV_FILE}"
    fi
  else
    printf '%s=%s\n' "${key}" "${value}" >> "${ENV_FILE}"
  fi
}

echo "==> Disabling WhatsApp in Hermes"
echo "    HERMES_HOME=${HERMES_HOME}"
set_env_key "WHATSAPP_ENABLED" "false"
set_env_key "WHATSAPP_CLOUD_ENABLED" "false"
echo "    Set WHATSAPP_ENABLED=false"
echo "    Set WHATSAPP_CLOUD_ENABLED=false"

if command -v hermes >/dev/null 2>&1; then
  echo "==> Stopping gateway"
  hermes gateway stop || true
  hermes gateway status || true
fi

echo
echo "==> WhatsApp stopped/disabled"
echo "    Re-enable later with: hermes whatsapp && hermes gateway restart"
