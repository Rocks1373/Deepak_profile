# GoDam Real-Time API

Express service that exposes warehouse data for:

- Hermes Desktop (`hermes-skills/godam`)
- GAPP / GoDam web demo (`/gapp-demo`)

## Run

```bash
npm install
npm start
# or from repo root: npm run godam-api
```

Listens on `http://127.0.0.1:4000` by default.

## Auth

Send `X-API-Key: godam-dev-key` or `Authorization: Bearer godam-dev-key`.

## Endpoints

See `../HERMES_GODAM_SETUP.md` and `GET /openapi.json`.
