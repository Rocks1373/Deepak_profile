# AI Vision Website

Professional website showcasing AI-driven business capability and vision.

## Structure

- **Main Website** (`/`) - Landing page with vision, philosophy, business value
- **Demo Section** (`/demo`) - Interactive demo for clients with feedback collection
- **GoDam / GAPP Demo** (`/gapp-demo`) - Warehouse demo with optional live API
- **GoDam API** (`godam-api/`) - Real-time REST + SSE API for Hermes Desktop
- **Hermes skill** (`hermes-skills/godam/`) - Connect Desktop Hermes to GoDam data

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Express (GoDam API)

## Development

```bash
npm install
npm run godam-api:install
npm run godam-api   # terminal 1 — real-time warehouse API on :4000
npm run dev         # terminal 2 — website (proxies /api → :4000)
```

Connect Hermes Desktop:

```bash
npm run hermes:install-godam
# then in Hermes: /godam show dashboard and pending approvals
```

See [HERMES_GODAM_SETUP.md](./HERMES_GODAM_SETUP.md) for full wiring steps.

## Build for Production

```bash
npm run build
```

## Deployment

Ready for deployment to Coolify or any static hosting service. Deploy `godam-api` as a separate service and set `GODAM_API_BASE` / `VITE_GODAM_API_BASE` accordingly.
