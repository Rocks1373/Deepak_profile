/**
 * In-memory GoDam warehouse store with live mutation for real-time demos.
 * Replace this with a real DB / SAP adapter in production.
 */

function nowIso() {
  return new Date().toISOString();
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const state = {
  startedAt: nowIso(),
  orders: [
    {
      id: 1,
      orderNumber: "SO-2024-001",
      customerName: "ABC Corporation",
      status: "PICKED",
      totalItems: 15,
      totalValue: 45000,
      orderDate: "2024-01-15",
      updatedAt: nowIso(),
    },
    {
      id: 2,
      orderNumber: "SO-2024-002",
      customerName: "XYZ Industries",
      status: "CHECKED",
      totalItems: 8,
      totalValue: 28000,
      orderDate: "2024-01-15",
      updatedAt: nowIso(),
    },
    {
      id: 3,
      orderNumber: "SO-2024-003",
      customerName: "Tech Solutions Ltd",
      status: "DISPATCHED",
      totalItems: 22,
      totalValue: 65000,
      orderDate: "2024-01-14",
      updatedAt: nowIso(),
    },
    {
      id: 4,
      orderNumber: "SO-2024-004",
      customerName: "Manufacturing Co",
      status: "PENDING",
      totalItems: 12,
      totalValue: 31000,
      orderDate: "2024-01-16",
      updatedAt: nowIso(),
    },
  ],
  shipments: [
    {
      id: 1,
      shipmentCode: "SH-2024-001",
      localPoCode: "PO-2024-001",
      shipmentStatus: "RECEIVED",
      vendorName: "ABC Suppliers Ltd",
      expectedDate: "2024-01-15",
      receivedDate: "2024-01-15",
      totalParts: 25,
      totalQty: 1500,
      updatedAt: nowIso(),
    },
    {
      id: 2,
      shipmentCode: "SH-2024-002",
      localPoCode: "PO-2024-002",
      shipmentStatus: "IN_TRANSIT",
      vendorName: "XYZ Manufacturing",
      expectedDate: "2024-01-16",
      totalParts: 18,
      totalQty: 980,
      updatedAt: nowIso(),
    },
    {
      id: 3,
      shipmentCode: "SH-2024-003",
      localPoCode: "PO-2024-003",
      shipmentStatus: "RECEIVED",
      vendorName: "Global Parts Inc",
      expectedDate: "2024-01-14",
      receivedDate: "2024-01-14",
      totalParts: 32,
      totalQty: 2100,
      updatedAt: nowIso(),
    },
  ],
  stock: [
    {
      partNumber: "PART-001",
      description: "Component A",
      location: "A-01-B-02",
      currentQty: 450,
      reservedQty: 50,
      availableQty: 400,
      lastUpdated: nowIso(),
    },
    {
      partNumber: "PART-002",
      description: "Component B",
      location: "A-02-B-01",
      currentQty: 320,
      reservedQty: 20,
      availableQty: 300,
      lastUpdated: nowIso(),
    },
    {
      partNumber: "PART-003",
      description: "Component C",
      location: "A-03-B-01",
      currentQty: 280,
      reservedQty: 30,
      availableQty: 250,
      lastUpdated: nowIso(),
    },
  ],
  approvals: [
    {
      id: 1,
      step: { step_name: "Stock Posting", module: "INBOUND" },
      reference_value: "PO-2024-001",
      requested_action: "Post Stock",
      description: "Post stock for shipment PO-2024-001 with variance check",
      requested_at: "2024-01-15T10:30:00Z",
      source: "TELEGRAM",
      status: "PENDING",
    },
    {
      id: 2,
      step: { step_name: "Dispatch Confirmation", module: "OUTBOUND" },
      reference_value: "SO-2024-002",
      requested_action: "Confirm Dispatch",
      description: "Confirm dispatch for order SO-2024-002",
      requested_at: "2024-01-15T11:15:00Z",
      source: "WEB",
      status: "PENDING",
    },
    {
      id: 3,
      step: { step_name: "Stock Adjustment", module: "INVENTORY" },
      reference_value: "ADJ-2024-001",
      requested_action: "Adjust Stock",
      description: "Stock adjustment for damaged items",
      requested_at: "2024-01-15T09:45:00Z",
      source: "MOBILE",
      status: "PENDING",
    },
  ],
  events: [],
};

const listeners = new Set();

function publish(event) {
  const envelope = {
    id: state.events.length + 1,
    at: nowIso(),
    ...event,
  };
  state.events.unshift(envelope);
  if (state.events.length > 100) state.events.length = 100;
  for (const listener of listeners) {
    try {
      listener(envelope);
    } catch {
      // Ignore broken subscribers
    }
  }
  return envelope;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getHealth() {
  return {
    ok: true,
    service: "godam-api",
    version: "1.0.0",
    startedAt: state.startedAt,
    uptimeSec: Math.round((Date.now() - Date.parse(state.startedAt)) / 1000),
    realtimeSubscribers: listeners.size,
  };
}

export function getDashboard() {
  const inboundToday = state.shipments.filter((s) =>
    ["RECEIVED", "CHECKING", "IN_TRANSIT"].includes(s.shipmentStatus)
  ).length;
  const outboundToday = state.orders.length;
  const pendingInbound = state.shipments.filter((s) =>
    ["IN_TRANSIT", "ARRIVED", "CHECKING"].includes(s.shipmentStatus)
  ).length;
  const pendingOutbound = state.orders.filter((o) =>
    ["PENDING", "PICKED", "CHECKED"].includes(o.status)
  ).length;
  const aggregatedQty = state.stock.reduce((sum, row) => sum + row.currentQty, 0);
  const topParts = [...state.stock]
    .sort((a, b) => b.currentQty - a.currentQty)
    .slice(0, 5)
    .map((row) => ({ partNumber: row.partNumber, qty: row.currentQty }));

  return {
    inboundToday,
    outboundToday,
    pendingInbound,
    pendingOutbound,
    pendingApprovals: state.approvals.filter((a) => a.status === "PENDING").length,
    stockSummary: {
      totalParts: state.stock.length,
      aggregatedQty,
      topParts,
    },
    lastUpdated: nowIso(),
  };
}

export function listOrders({ status } = {}) {
  let rows = clone(state.orders);
  if (status) {
    const needle = String(status).toUpperCase();
    rows = rows.filter((row) => row.status === needle);
  }
  return rows;
}

export function getOrder(idOrNumber) {
  const key = String(idOrNumber).toLowerCase();
  return clone(
    state.orders.find(
      (row) => String(row.id) === key || row.orderNumber.toLowerCase() === key
    ) || null
  );
}

export function listShipments({ status } = {}) {
  let rows = clone(state.shipments);
  if (status) {
    const needle = String(status).toUpperCase();
    rows = rows.filter((row) => row.shipmentStatus === needle);
  }
  return rows;
}

export function listStock({ partNumber } = {}) {
  let rows = clone(state.stock);
  if (partNumber) {
    const needle = String(partNumber).toLowerCase();
    rows = rows.filter((row) => row.partNumber.toLowerCase().includes(needle));
  }
  return rows;
}

export function listApprovals({ status = "PENDING" } = {}) {
  let rows = clone(state.approvals);
  if (status && status !== "ALL") {
    const needle = String(status).toUpperCase();
    rows = rows.filter((row) => row.status === needle);
  }
  return rows;
}

export function decideApproval(id, decision, note = "") {
  const approval = state.approvals.find((row) => row.id === Number(id));
  if (!approval) return null;
  if (approval.status !== "PENDING") {
    return { error: `Approval ${id} is already ${approval.status}` };
  }
  const next = String(decision).toUpperCase();
  if (!["APPROVED", "REJECTED"].includes(next)) {
    return { error: "decision must be APPROVED or REJECTED" };
  }
  approval.status = next;
  approval.decidedAt = nowIso();
  approval.note = note || undefined;
  publish({
    type: "approval.updated",
    entity: "approval",
    entityId: approval.id,
    data: clone(approval),
  });
  return clone(approval);
}

export function listEvents({ limit = 20 } = {}) {
  return clone(state.events.slice(0, Math.min(Number(limit) || 20, 100)));
}

export function listTables() {
  return [
    { name: "orders", rowCount: state.orders.length, description: "Outbound sales orders" },
    { name: "shipments", rowCount: state.shipments.length, description: "Incoming shipments and POs" },
    { name: "stock_master", rowCount: state.stock.length, description: "Current stock by part" },
    { name: "approvals", rowCount: state.approvals.length, description: "Approval workflow items" },
  ];
}

const ORDER_FLOW = ["PENDING", "PICKED", "CHECKED", "DISPATCHED", "DELIVERED"];

/** Simulate warehouse activity so Hermes/SSE clients see live changes. */
export function tickSimulation() {
  const order = state.orders[Math.floor(Math.random() * state.orders.length)];
  const idx = ORDER_FLOW.indexOf(order.status);
  if (idx >= 0 && idx < ORDER_FLOW.length - 1 && Math.random() > 0.45) {
    order.status = ORDER_FLOW[idx + 1];
    order.updatedAt = nowIso();
    publish({
      type: "order.updated",
      entity: "order",
      entityId: order.id,
      data: clone(order),
    });
  }

  const stock = state.stock[Math.floor(Math.random() * state.stock.length)];
  const delta = Math.floor(Math.random() * 7) - 3;
  if (delta !== 0) {
    stock.currentQty = Math.max(0, stock.currentQty + delta);
    stock.availableQty = Math.max(0, stock.currentQty - stock.reservedQty);
    stock.lastUpdated = nowIso();
    publish({
      type: "stock.updated",
      entity: "stock",
      entityId: stock.partNumber,
      data: clone(stock),
    });
  }

  if (Math.random() > 0.7) {
    const shipment = state.shipments.find((s) => s.shipmentStatus === "IN_TRANSIT");
    if (shipment) {
      shipment.shipmentStatus = "RECEIVED";
      shipment.receivedDate = nowIso().slice(0, 10);
      shipment.updatedAt = nowIso();
      publish({
        type: "shipment.updated",
        entity: "shipment",
        entityId: shipment.id,
        data: clone(shipment),
      });
    }
  }
}
