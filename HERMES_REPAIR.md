# Fix Hermes after a broken update

If Hermes stopped working after `hermes update` (or the Desktop “Update” button), use this repair path. It preserves your config, API keys, sessions, memories, and skills.

## On this machine (quick)

```bash
# from the repo
chmod +x scripts/repair-hermes.sh
./scripts/repair-hermes.sh
source ~/.bashrc
hermes doctor
hermes version
```

## Manual repair (official)

```bash
# 1) PATH — most common post-install/update failure
source ~/.bashrc   # or: source ~/.zshrc
export PATH="$HOME/.local/bin:$PATH"
which hermes

# 2) Auto-fix
hermes doctor --fix

# 3) If still broken: rebuild code only (keep ~/.hermes data)
rm -rf ~/.hermes/hermes-agent
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash -s -- \
  --skip-browser --skip-setup --non-interactive
source ~/.bashrc
hermes doctor --fix

# 4) Chat needs an LLM key
hermes setup
# or: hermes model
```

## Desktop app notes

If you use **Hermes Desktop**:

1. Fully quit Hermes Desktop (and any `hermes` terminal sessions).
2. Stop gateway if running: `hermes gateway stop`
3. Run the repair script above in a normal terminal.
4. Reopen Desktop.

Windows: close every `hermes.exe` before updating/repairing, or update will fail while the binary is locked.

## Re-attach GoDam

```bash
npm run hermes:install-godam
npm run godam-api   # separate terminal
# In Hermes: /godam show dashboard and pending approvals
```

## What we verified here

After repair on this cloud machine:

- `hermes version` → **v0.18.2**
- `hermes doctor --fix` → config migrated
- GoDam skill installed at `~/.hermes/skills/productivity/godam`

Remaining manual step: run `hermes setup` and add your LLM provider API key so chat works.
