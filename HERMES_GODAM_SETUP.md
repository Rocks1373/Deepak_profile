# Connect Hermes Desktop → GoDam (real-time API)

This repo now ships a local **GoDam warehouse API** plus a **Hermes skill** so Desktop Hermes can read live orders, stock, shipments, approvals, and SSE events.

## Architecture

```text
Hermes Desktop  --skill /godam-->  godam_cli.py / curl
                                      |
                                      v
                               GoDam API :4000
                               /api/dashboard
                               /api/orders
                               /api/stock
                               /api/realtime (SSE)
                                      ^
Website /gapp-demo  ---fetch/SSE------+
```

## 1) Start the GoDam API

```bash
# from repo root
npm run godam-api:install
npm run godam-api
```

Defaults:

| Setting | Value |
|---------|-------|
| URL | `http://127.0.0.1:4000` |
| API key | `godam-dev-key` |
| Health | `GET /health` |
| OpenAPI | `GET /openapi.json` |

Override with env:

```bash
export GODAM_API_PORT=4000
export GODAM_API_KEY=godam-dev-key
export GODAM_SIM_INTERVAL_MS=5000   # live simulation tick; 0 disables
```

## 2) Install the Hermes skill on your desktop

```bash
./scripts/install-hermes-godam-skill.sh
```

This copies `hermes-skills/godam` into `~/.hermes/skills/productivity/godam` and ensures:

```bash
GODAM_API_KEY=godam-dev-key
GODAM_API_BASE=http://127.0.0.1:4000
```

are present in `~/.hermes/.env`.

Restart Hermes Desktop (or reload skills), then ask:

```text
/godam show me the dashboard and pending approvals
/godam what stock do we have for PART-001?
/godam watch live warehouse events for 20 seconds
```

## 3) Run the website against the live API

```bash
npm install
npm run godam-api   # terminal 1
npm run dev         # terminal 2
```

Open `http://localhost:5173/gapp-demo`. When the API is up, the header shows **LIVE API** and the dashboard streams events.

## 4) Quick API smoke test

```bash
curl -s http://127.0.0.1:4000/health
curl -s -H "X-API-Key: godam-dev-key" http://127.0.0.1:4000/api/dashboard
python3 hermes-skills/godam/scripts/godam_cli.py orders --status PENDING
```

## Production notes

- Replace the in-memory store in `godam-api/src/store.js` with your real GoDam / SAP / DB adapters.
- Rotate `GODAM_API_KEY` and set `GODAM_REQUIRE_AUTH=true` (default).
- Point Hermes `GODAM_API_BASE` at your deployed API URL.
