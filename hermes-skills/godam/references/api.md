# GoDam API Reference

Base URL default: `http://127.0.0.1:4000`

Auth: `X-API-Key: <GODAM_API_KEY>` or `Authorization: Bearer <GODAM_API_KEY>`

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Public health |
| GET | `/api/dashboard` | Live KPIs |
| GET | `/api/orders?status=` | List orders |
| GET | `/api/orders/:id` | Order detail |
| GET | `/api/shipments?status=` | List shipments |
| GET | `/api/stock?partNumber=` | Stock levels |
| GET | `/api/approvals?status=` | Approvals (`PENDING` default, or `ALL`) |
| POST | `/api/approvals/:id/decide` | Body: `{ "decision": "APPROVED\|REJECTED", "note": "..." }` |
| GET | `/api/events?limit=` | Recent change events |
| GET | `/api/realtime` | SSE stream |
| GET | `/openapi.json` | OpenAPI stub |

## Hermes Desktop install

```bash
# From this repo
./scripts/install-hermes-godam-skill.sh

# Or manually
mkdir -p ~/.hermes/skills/productivity
cp -R hermes-skills/godam ~/.hermes/skills/productivity/godam
```

Then in Hermes Desktop / CLI:

```text
/godam show me pending approvals and current stock
```
