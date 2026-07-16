---
name: godam
description: Query GoDam warehouse real-time data (orders, stock, shipments, approvals) via API.
version: 1.0.0
author: Deepak Sharma
metadata:
  hermes:
    tags: [warehouse, godam, gapp, realtime, api]
    category: productivity
    config:
      - key: godam.api_base
        description: Base URL for the GoDam API
        default: "http://127.0.0.1:4000"
        prompt: GoDam API base URL
required_environment_variables:
  - name: GODAM_API_KEY
    prompt: GoDam API key
    help: Default local key is godam-dev-key. Set the same value used by godam-api.
    required_for: API access
  - name: GODAM_API_BASE
    prompt: GoDam API base URL
    help: Usually http://127.0.0.1:4000 when running godam-api locally.
    required_for: optional override
---

# GoDam Real-Time Warehouse Skill

Connect Hermes Desktop to the GoDam / GAPP warehouse application so you can answer questions with live API data.

## When to Use

Load this skill when the user asks about:

- GoDam / GAPP / warehouse status
- Orders, shipments, stock levels, approvals
- Real-time inbound/outbound metrics
- Pending approvals or recent warehouse events

## Quick Reference

Set env (or rely on Hermes skill setup):

```bash
export GODAM_API_BASE="http://127.0.0.1:4000"
export GODAM_API_KEY="godam-dev-key"
```

Use the helper script from this skill directory:

```bash
# Resolve skill root relative to this SKILL.md
SCRIPT="$(dirname "$0")/scripts/godam_cli.py"   # when run from skill folder use scripts/godam_cli.py

python3 scripts/godam_cli.py health
python3 scripts/godam_cli.py dashboard
python3 scripts/godam_cli.py orders
python3 scripts/godam_cli.py orders --status PENDING
python3 scripts/godam_cli.py order SO-2024-001
python3 scripts/godam_cli.py shipments
python3 scripts/godam_cli.py stock
python3 scripts/godam_cli.py stock --part PART-001
python3 scripts/godam_cli.py approvals
python3 scripts/godam_cli.py events --limit 10
python3 scripts/godam_cli.py approve 1 --decision APPROVED --note "Looks good"
python3 scripts/godam_cli.py watch --seconds 20
```

Direct curl equivalents (same auth):

```bash
curl -s -H "X-API-Key: $GODAM_API_KEY" "$GODAM_API_BASE/api/dashboard"
curl -s -N -H "X-API-Key: $GODAM_API_KEY" "$GODAM_API_BASE/api/realtime"
```

## Procedure

1. Confirm the GoDam API is reachable: `python3 scripts/godam_cli.py health`
2. For overview questions, call `dashboard` first.
3. Drill into `orders`, `shipments`, `stock`, or `approvals` based on the question.
4. For "what's changing right now?", use `events` or `watch`.
5. Only call `approve` / `reject` when the user explicitly asks to decide an approval.
6. Summarize results clearly (counts, statuses, ids). Prefer fresh API data over guesses.

## Pitfalls

- If you get `unauthorized`, the API key is wrong — re-check `GODAM_API_KEY`.
- If connection fails, the API may not be running. Tell the user to start it with `npm run godam-api` from the repo root.
- Do not invent warehouse numbers. Re-fetch when unsure.
- SSE `watch` blocks for the requested duration; keep `--seconds` short (10–30) in interactive chat.

## Verification

- `health` returns `"ok": true`
- `dashboard.lastUpdated` is a recent ISO timestamp
- `watch` prints at least a `connected` event
