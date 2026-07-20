#!/usr/bin/env bash
# Repair Hermes Agent after a failed/partial update.
# Safe: keeps ~/.hermes config, .env, sessions, memories, and skills.
set -euo pipefail

export PATH="${HOME}/.local/bin:${HOME}/.hermes/bin:${PATH}"
HERMES_HOME="${HERMES_HOME:-$HOME/.hermes}"
AGENT_DIR="${HERMES_HOME}/hermes-agent"

echo "==> Hermes repair starting"
echo "    HERMES_HOME=${HERMES_HOME}"

# 1) Ensure PATH for current shell
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
  export PATH="$HOME/.local/bin:$PATH"
  echo "    Added ~/.local/bin to PATH for this session"
fi

# 2) If hermes binary is missing or broken, reinstall without wiping data
need_reinstall=false
if ! command -v hermes >/dev/null 2>&1; then
  echo "==> hermes command not found"
  need_reinstall=true
elif ! hermes version >/dev/null 2>&1; then
  echo "==> hermes command exists but fails to run"
  need_reinstall=true
fi

if [[ "$need_reinstall" == true ]]; then
  echo "==> Reinstalling Hermes Agent (preserving ${HERMES_HOME} config/data)"
  # Remove only the code checkout + launcher; keep config/.env/skills/sessions
  rm -rf "${AGENT_DIR}"
  rm -f "${HOME}/.local/bin/hermes"
  curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash -s -- \
    --skip-browser \
    --skip-setup \
    --non-interactive
  export PATH="$HOME/.local/bin:$PATH"
fi

# 3) If code checkout exists but update left it dirty/broken, repair in place
if [[ -d "${AGENT_DIR}/.git" ]]; then
  echo "==> Checking agent checkout"
  (
    cd "${AGENT_DIR}"
    git fetch origin main --quiet || true
    VENV_PYTHON="${AGENT_DIR}/venv/bin/python"
    VENV_HERMES="${AGENT_DIR}/venv/bin/hermes"
    if [[ ! -x "${VENV_HERMES}" ]] || ! "${VENV_PYTHON}" -c "import hermes_cli" >/dev/null 2>&1; then
      echo "==> venv looks broken — recreating dependencies"
      UV_BIN=""
      if [[ -x "${HERMES_HOME}/bin/uv" ]]; then
        UV_BIN="${HERMES_HOME}/bin/uv"
      elif command -v uv >/dev/null 2>&1; then
        UV_BIN="$(command -v uv)"
      fi
      if [[ -n "${UV_BIN}" && -d "${AGENT_DIR}/venv" ]]; then
        VIRTUAL_ENV="${AGENT_DIR}/venv" "${UV_BIN}" pip install -e ".[all]"
      else
        echo "    Falling back to full installer repair"
        curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash -s -- \
          --skip-browser --skip-setup --non-interactive
      fi
    else
      echo "    venv OK (hermes_cli importable)"
    fi
  )
fi

# 4) Auto-fix config/PATH issues Hermes knows how to heal
echo "==> Running hermes doctor --fix"
hermes doctor --fix || true

# 5) Migrate config if needed (non-interactive best-effort)
if hermes config check 2>/dev/null | grep -qi 'missing\|outdated\|migrate'; then
  echo "==> Config migration may be needed — run interactively if prompted:"
  echo "    hermes config migrate"
fi

# 6) Reinstall GoDam skill if this repo is present
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ -f "${REPO_ROOT}/scripts/install-hermes-godam-skill.sh" ]]; then
  echo "==> Reinstalling GoDam Hermes skill from repo"
  bash "${REPO_ROOT}/scripts/install-hermes-godam-skill.sh"
fi

echo
echo "==> Repair complete"
hermes version || true
echo
echo "Next steps:"
echo "  1) source ~/.bashrc   # or open a new terminal"
echo "  2) hermes setup       # configure your LLM API key if chat still fails"
echo "  3) hermes doctor      # should look clean"
echo "  4) hermes             # start chatting"
echo "  5) /godam show dashboard   # if GoDam API is running"
