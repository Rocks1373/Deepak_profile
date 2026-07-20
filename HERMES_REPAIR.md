# Fix Hermes after a broken update

If Hermes stopped working after `hermes update` (or the Desktop “Update” button), use this repair path. It preserves your config, API keys, sessions, memories, and skills.

## Windows fix (your error: `No module named 'certifi'`)

This means the Hermes venv lost packages during update. Quit Hermes Desktop first, then in **PowerShell**:

### Fastest fix

```powershell
# 1) Close Hermes Desktop completely, then:
Stop-Process -Name hermes -Force -ErrorAction SilentlyContinue

# 2) Reinstall missing deps into the Hermes venv
cd $env:LOCALAPPDATA\hermes\hermes-agent
.\venv\Scripts\python.exe -m pip install --force-reinstall certifi
.\venv\Scripts\python.exe -m pip install -e ".[all]"

# 3) Verify + chat
.\venv\Scripts\hermes.exe doctor --fix
hermes chat
```

### Or run the Windows repair script from this repo

```powershell
cd path\to\Deepak_profile
powershell -ExecutionPolicy Bypass -File .\scripts\repair-hermes.ps1
hermes chat
```

If that still fails, rebuild only the agent code (keeps your config/keys):

```powershell
Stop-Process -Name hermes -Force -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\hermes\hermes-agent"
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
hermes doctor --fix
hermes chat
```

## Linux / macOS (quick)

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
3. Run the repair commands above in a normal terminal.
4. Reopen Desktop.

Windows: close every `hermes.exe` before updating/repairing, or update will fail while the binary is locked.

## Re-attach GoDam

```bash
npm run hermes:install-godam
npm run godam-api   # separate terminal
# In Hermes: /godam show dashboard and pending approvals
```

## What we verified here

After repair on the cloud Linux machine:

- `hermes version` → **v0.18.2**
- `hermes doctor --fix` → config migrated
- GoDam skill installed at `~/.hermes/skills/productivity/godam`

On Windows, the matching install path is:

`%LOCALAPPDATA%\hermes\hermes-agent\venv`

