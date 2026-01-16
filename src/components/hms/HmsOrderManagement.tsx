import { useState } from "react";

type HmsOrderStatus = 
  | "CREATED" | "MATCHING" | "MATCHED" | "NOT_MATCHED" | "ISSUE"
  | "PRE_CHECK_PENDING" | "PRE_CHECK_APPROVED" | "PRE_CHECK_REJECTED"
  | "SALES_APPROVAL_PENDING" | "SALES_APPROVED" | "SALES_REJECTED"
  | "FINAL_APPROVAL_PENDING" | "FINAL_APPROVED" | "FINAL_REJECTED"
  | "APPROVED" | "MOVED_TO_UPCOMING" | "ARRIVED" | "UNLOADING" | "RECEIVED"
  | "GR_ENTERED" | "SALES_NOTIFIED";

type MatchingStatus = "PENDING" | "MATCHED" | "NOT_MATCHED" | "ISSUE";

interface HmsOrder {
  id: number;
  order_number: string;
  order_status: HmsOrderStatus;
  matching_status: MatchingStatus;
  matching_remarks?: string;
  matching_version: number;
  created_by?: string;
  created_at: string;
  upcoming_shipment_id?: number;
  gr_number?: string;
  statusHistory?: any[];
  matchingHistory?: any[];
}

// Mock data for standalone demo
const mockOrders: HmsOrder[] = [
  {
    id: 1,
    order_number: "HMS-2024-001",
    order_status: "CREATED",
    matching_status: "PENDING",
    matching_version: 1,
    created_by: "demo_user",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    order_number: "HMS-2024-002",
    order_status: "MATCHED",
    matching_status: "MATCHED",
    matching_remarks: "All items matched successfully",
    matching_version: 1,
    created_by: "demo_user",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    order_number: "HMS-2024-003",
    order_status: "SALES_APPROVED",
    matching_status: "MATCHED",
    matching_version: 1,
    created_by: "demo_user",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function HmsOrderManagement() {
  const [orders, setOrders] = useState<HmsOrder[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<HmsOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionRemarks, setActionRemarks] = useState("");

  const getStatusBadge = (status: HmsOrderStatus) => {
    const colors: Record<string, string> = {
      CREATED: "#9e9e9e",
      MATCHING: "#ff9800",
      MATCHED: "#4caf50",
      NOT_MATCHED: "#f44336",
      ISSUE: "#f44336",
      PRE_CHECK_PENDING: "#ff9800",
      PRE_CHECK_APPROVED: "#4caf50",
      PRE_CHECK_REJECTED: "#f44336",
      SALES_APPROVAL_PENDING: "#ff9800",
      SALES_APPROVED: "#4caf50",
      SALES_REJECTED: "#f44336",
      FINAL_APPROVAL_PENDING: "#ff9800",
      FINAL_APPROVED: "#4caf50",
      FINAL_REJECTED: "#f44336",
      APPROVED: "#4caf50",
      MOVED_TO_UPCOMING: "#2196f3",
      ARRIVED: "#2196f3",
      RECEIVED: "#2196f3",
      GR_ENTERED: "#4caf50",
      SALES_NOTIFIED: "#4caf50",
    };
    return colors[status] || "#9e9e9e";
  };

  const handleAction = async (action: string, orderId: number) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update order status based on action
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        if (action === "match") {
          return { ...order, order_status: "MATCHED", matching_status: "MATCHED" };
        } else if (action === "pre-check-approve") {
          return { ...order, order_status: "PRE_CHECK_APPROVED" };
        } else if (action === "sales-approve") {
          return { ...order, order_status: "SALES_APPROVED" };
        } else if (action === "final-approve") {
          return { ...order, order_status: "APPROVED" };
        } else if (action === "arrival") {
          return { ...order, order_status: "ARRIVED" };
        } else if (action === "enter-gr") {
          return { ...order, order_status: "GR_ENTERED", gr_number: actionRemarks };
        }
      }
      return order;
    }));
    
    setLoading(false);
    alert(`Action "${action}" completed (Demo Mode)`);
  };

  return (
    <div className="hms-order-management" style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: "600", margin: 0 }}>HMS Order Management</h1>
        <div style={{ backgroundColor: "#1f2937", borderLeft: "4px solid #fbbf24", padding: "1rem", borderRadius: "8px", border: "1px solid #374151" }}>
          <p style={{ fontSize: "0.875rem", color: "#fbbf24", margin: 0 }}>
            <strong>Demo Mode:</strong> This is a read-only demonstration. Actions are simulated.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <table className="w-full border-collapse" style={{ backgroundColor: "#1a1a1a", borderRadius: "12px", overflow: "hidden", border: "1px solid #2a2a2a", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          <thead>
            <tr style={{ backgroundColor: "#111111", borderBottom: "2px solid #2a2a2a" }}>
              <th className="p-4 text-left" style={{ color: "#06b6d4", fontWeight: "600" }}>Order Number</th>
              <th className="p-4 text-left" style={{ color: "#06b6d4", fontWeight: "600" }}>Status</th>
              <th className="p-4 text-left" style={{ color: "#06b6d4", fontWeight: "600" }}>Matching</th>
              <th className="p-4 text-left" style={{ color: "#06b6d4", fontWeight: "600" }}>Created By</th>
              <th className="p-4 text-left" style={{ color: "#06b6d4", fontWeight: "600" }}>Created At</th>
              <th className="p-4 text-left" style={{ color: "#06b6d4", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id} style={{ borderBottom: idx < orders.length - 1 ? "1px solid #2a2a2a" : "none", transition: "background-color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#222222"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                <td className="p-4" style={{ color: "#e5e5e5" }}>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      color: "#06b6d4",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "0.95rem",
                      fontWeight: "500",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#22d3ee"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#06b6d4"}
                  >
                    {order.order_number}
                  </button>
                </td>
                <td className="p-4" style={{ color: "#e5e5e5" }}>
                  <span
                    className="px-3 py-1 rounded text-white text-sm"
                    style={{ 
                      backgroundColor: getStatusBadge(order.order_status),
                      display: "inline-block",
                      fontWeight: "500"
                    }}
                  >
                    {order.order_status}
                  </span>
                </td>
                <td className="p-4" style={{ color: "#e5e5e5" }}>
                  <span
                    className="px-3 py-1 rounded text-white text-sm"
                    style={{
                      backgroundColor:
                        order.matching_status === "MATCHED"
                          ? "#10b981"
                          : order.matching_status === "NOT_MATCHED" || order.matching_status === "ISSUE"
                            ? "#ef4444"
                            : "#f59e0b",
                      display: "inline-block",
                      fontWeight: "500"
                    }}
                  >
                    {order.matching_status}
                  </span>
                </td>
                <td className="p-4" style={{ color: "#d1d5db" }}>{order.created_by || "System"}</td>
                <td className="p-4" style={{ color: "#d1d5db" }}>{new Date(order.created_at).toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {order.order_status === "CREATED" && (
                      <button
                        onClick={() => handleAction("match", order.id)}
                        disabled={loading}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "linear-gradient(to right, #3b82f6, #2563eb)",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.5 : 1,
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Match
                      </button>
                    )}
                    {["MATCHED", "NOT_MATCHED", "ISSUE"].includes(order.order_status) && (
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setActionRemarks("");
                        }}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "linear-gradient(to right, #f59e0b, #d97706)",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(245, 158, 11, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Pre-Check
                      </button>
                    )}
                    {order.order_status === "SALES_APPROVAL_PENDING" && (
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setActionRemarks("");
                        }}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "linear-gradient(to right, #10b981, #059669)",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Approve/Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light" style={{ color: "#ffffff" }}>Order: {selectedOrder.order_number}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#374151",
                  color: "#e5e5e5",
                  border: "1px solid #4b5563",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#4b5563";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#374151";
                }}
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: "#06b6d4" }}>Status Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div style={{ color: "#d1d5db" }}>
                    <strong style={{ color: "#e5e5e5" }}>Order Status:</strong>{" "}
                    <span
                      className="px-3 py-1 rounded text-white text-sm"
                      style={{ 
                        backgroundColor: getStatusBadge(selectedOrder.order_status),
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        fontWeight: "500"
                      }}
                    >
                      {selectedOrder.order_status}
                    </span>
                  </div>
                  <div style={{ color: "#d1d5db" }}>
                    <strong style={{ color: "#e5e5e5" }}>Matching Status:</strong>{" "}
                    <span
                      className="px-3 py-1 rounded text-white text-sm"
                      style={{
                        backgroundColor:
                          selectedOrder.matching_status === "MATCHED"
                            ? "#10b981"
                            : selectedOrder.matching_status === "NOT_MATCHED" || selectedOrder.matching_status === "ISSUE"
                              ? "#ef4444"
                              : "#f59e0b",
                        display: "inline-block",
                        marginLeft: "0.5rem",
                        fontWeight: "500"
                      }}
                    >
                      {selectedOrder.matching_status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons based on status */}
              {["MATCHED", "NOT_MATCHED", "ISSUE"].includes(selectedOrder.order_status) && (
                <div style={{ backgroundColor: "#1f2937", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #f59e0b", border: "1px solid #374151" }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "#f59e0b" }}>Pre-Check Actions</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#d1d5db" }}>Remarks:</label>
                      <textarea
                        value={actionRemarks}
                        onChange={(e) => setActionRemarks(e.target.value)}
                        placeholder="Enter remarks..."
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          backgroundColor: "#111111",
                          border: "1px solid #374151",
                          borderRadius: "6px",
                          color: "#e5e5e5",
                          resize: "vertical",
                        }}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleAction("pre-check-approve", selectedOrder.id)}
                        disabled={loading}
                        style={{
                          padding: "0.75rem 1.5rem",
                          background: "linear-gradient(to right, #10b981, #059669)",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.5 : 1,
                          fontWeight: "500",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Approve & Send to Sales
                      </button>
                      <button
                        onClick={() => handleAction("match", selectedOrder.id)}
                        disabled={loading}
                        style={{
                          padding: "0.75rem 1.5rem",
                          background: "linear-gradient(to right, #3b82f6, #2563eb)",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.5 : 1,
                          fontWeight: "500",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Resubmit for Matching
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedOrder.order_status === "SALES_APPROVAL_PENDING" && (
                <div style={{ backgroundColor: "#1f2937", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #3b82f6", border: "1px solid #374151" }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "#3b82f6" }}>Sales Approval</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#d1d5db" }}>Remarks:</label>
                      <textarea
                        value={actionRemarks}
                        onChange={(e) => setActionRemarks(e.target.value)}
                        placeholder="Enter approval/rejection remarks..."
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          backgroundColor: "#111111",
                          border: "1px solid #374151",
                          borderRadius: "6px",
                          color: "#e5e5e5",
                          resize: "vertical",
                        }}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleAction("sales-approve", selectedOrder.id)}
                        disabled={loading}
                        style={{
                          padding: "0.75rem 1.5rem",
                          background: "linear-gradient(to right, #10b981, #059669)",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.5 : 1,
                          fontWeight: "500",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.4)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
