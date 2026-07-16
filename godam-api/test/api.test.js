import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import test from "node:test";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(root, "..", "src", "server.js");
const PORT = 4017;
const KEY = "test-godam-key";

async function waitForHealth(base, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(`${base}/health`);
      if (res.ok) return;
    } catch {
      // retry
    }
    await sleep(100);
  }
  throw new Error("API did not become healthy");
}

test("godam api serves dashboard and auth", async (t) => {
  const child = spawn(process.execPath, [serverPath], {
    env: {
      ...process.env,
      GODAM_API_PORT: String(PORT),
      GODAM_API_KEY: KEY,
      GODAM_SIM_INTERVAL_MS: "0",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  t.after(() => {
    child.kill("SIGTERM");
  });

  const base = `http://127.0.0.1:${PORT}`;
  await waitForHealth(base);

  const denied = await fetch(`${base}/api/dashboard`);
  assert.equal(denied.status, 401);

  const ok = await fetch(`${base}/api/dashboard`, {
    headers: { "X-API-Key": KEY },
  });
  assert.equal(ok.status, 200);
  const dashboard = await ok.json();
  assert.equal(typeof dashboard.inboundToday, "number");
  assert.ok(dashboard.stockSummary.totalParts >= 1);

  const orders = await fetch(`${base}/api/orders`, {
    headers: { Authorization: `Bearer ${KEY}` },
  });
  assert.equal(orders.status, 200);
  const body = await orders.json();
  assert.ok(Array.isArray(body.items));
  assert.ok(body.items.length >= 1);

  await once(child, "exit").catch(() => undefined);
});
