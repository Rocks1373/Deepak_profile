import cors from "cors";
import express from "express";
import {
  decideApproval,
  getDashboard,
  getHealth,
  getOrder,
  listApprovals,
  listEvents,
  listOrders,
  listShipments,
  listStock,
  listTables,
  subscribe,
  tickSimulation,
} from "./store.js";

const PORT = Number(process.env.GODAM_API_PORT || process.env.PORT || 4000);
const API_KEY = process.env.GODAM_API_KEY || "godam-dev-key";
const SIM_INTERVAL_MS = Number(process.env.GODAM_SIM_INTERVAL_MS || 5000);
const REQUIRE_AUTH = process.env.GODAM_REQUIRE_AUTH !== "false";

const app = express();
app.use(cors());
app.use(express.json());

function extractKey(req) {
  const header = req.get("authorization") || "";
  if (header.toLowerCase().startsWith("bearer ")) {
    return header.slice(7).trim();
  }
  return req.get("x-api-key") || req.query.api_key || "";
}

function auth(req, res, next) {
  if (!REQUIRE_AUTH) return next();
  // Health + OpenAPI stay public for discovery
  if (req.path === "/health" || req.path === "/openapi.json") return next();
  const key = extractKey(req);
  if (!key || key !== API_KEY) {
    return res.status(401).json({
      error: "unauthorized",
      message: "Provide GODAM_API_KEY via Authorization: Bearer <key> or X-API-Key",
    });
  }
  return next();
}

app.use("/api", auth);

app.get("/health", (_req, res) => {
  res.json(getHealth());
});

app.get("/api/health", (_req, res) => {
  res.json(getHealth());
});

app.get("/api/dashboard", (_req, res) => {
  res.json(getDashboard());
});

app.get("/api/orders", (req, res) => {
  res.json({ items: listOrders({ status: req.query.status }) });
});

app.get("/api/orders/:id", (req, res) => {
  const order = getOrder(req.params.id);
  if (!order) return res.status(404).json({ error: "order_not_found" });
  return res.json(order);
});

app.get("/api/shipments", (req, res) => {
  res.json({ items: listShipments({ status: req.query.status }) });
});

app.get("/api/stock", (req, res) => {
  res.json({ items: listStock({ partNumber: req.query.partNumber || req.query.q }) });
});

app.get("/api/approvals", (req, res) => {
  res.json({ items: listApprovals({ status: req.query.status || "PENDING" }) });
});

app.post("/api/approvals/:id/decide", (req, res) => {
  const result = decideApproval(req.params.id, req.body?.decision, req.body?.note);
  if (!result) return res.status(404).json({ error: "approval_not_found" });
  if (result.error) return res.status(400).json({ error: result.error });
  return res.json(result);
});

app.get("/api/tables", (_req, res) => {
  res.json({ items: listTables() });
});

app.get("/api/events", (req, res) => {
  res.json({ items: listEvents({ limit: req.query.limit }) });
});

/** Server-Sent Events stream for real-time warehouse updates. */
app.get("/api/realtime", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const send = (event) => {
    res.write(`event: ${event.type}\n`);
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  send({
    type: "connected",
    entity: "system",
    entityId: "godam",
    data: { message: "GoDam realtime connected", dashboard: getDashboard() },
    at: new Date().toISOString(),
    id: 0,
  });

  const unsubscribe = subscribe(send);
  const heartbeat = setInterval(() => {
    res.write(`event: heartbeat\ndata: ${JSON.stringify({ at: new Date().toISOString() })}\n\n`);
  }, 15000);

  req.on("close", () => {
    clearInterval(heartbeat);
    unsubscribe();
  });
});

app.get("/openapi.json", (_req, res) => {
  res.json({
    openapi: "3.0.3",
    info: {
      title: "GoDam Warehouse API",
      version: "1.0.0",
      description:
        "Real-time warehouse API for Hermes Desktop and the GoDam / GAPP application.",
    },
    servers: [{ url: `http://127.0.0.1:${PORT}` }],
    security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
    components: {
      securitySchemes: {
        ApiKeyAuth: { type: "apiKey", in: "header", name: "X-API-Key" },
        BearerAuth: { type: "http", scheme: "bearer" },
      },
    },
    paths: {
      "/health": { get: { summary: "Health check" } },
      "/api/dashboard": { get: { summary: "Live dashboard metrics" } },
      "/api/orders": { get: { summary: "List orders", parameters: [{ name: "status", in: "query" }] } },
      "/api/orders/{id}": { get: { summary: "Get order by id or order number" } },
      "/api/shipments": { get: { summary: "List shipments" } },
      "/api/stock": { get: { summary: "List stock levels" } },
      "/api/approvals": { get: { summary: "List approvals" } },
      "/api/approvals/{id}/decide": { post: { summary: "Approve or reject" } },
      "/api/events": { get: { summary: "Recent realtime events" } },
      "/api/realtime": { get: { summary: "SSE realtime stream" } },
    },
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "internal_error", message: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`GoDam API listening on http://127.0.0.1:${PORT}`);
  console.log(`Health:    http://127.0.0.1:${PORT}/health`);
  console.log(`Realtime:  http://127.0.0.1:${PORT}/api/realtime`);
  console.log(`API key:   ${API_KEY} (set GODAM_API_KEY to override)`);
});

let simTimer = null;
if (SIM_INTERVAL_MS > 0) {
  simTimer = setInterval(tickSimulation, SIM_INTERVAL_MS);
}

function shutdown() {
  if (simTimer) clearInterval(simTimer);
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
