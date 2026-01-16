import { useState } from "react";
import { HmsOrderManagement } from "./hms/HmsOrderManagement";

/**
 * HMS Demo Flow with Guided Steps
 * Shows complete HMS order flow with step-by-step narration for Mr. Ahmed
 */
export function HmsDemoFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showNarration, setShowNarration] = useState(true);

  const steps = [
    {
      title: "Step 1: Order Upload",
      description: "Upload Huawei Order Excel file. System stores order as CREATED status. No stock or logistics impact yet.",
      actor: "User A (Order Initiator)",
      benefit: "Centralized order entry, eliminates manual data entry errors",
    },
    {
      title: "Step 2: Huawei Matching",
      description: "System sends data to Huawei Matching Engine. Receives MATCHED, NOT_MATCHED, or ISSUE response. Matching report generated.",
      actor: "HMS System (Automated)",
      benefit: "Automated validation ensures data accuracy before processing",
    },
    {
      title: "Step 3: Pre-Check by User",
      description: "Review matching report. If issues found, correct data and resubmit. If OK, send for Sales Approval.",
      actor: "User A",
      benefit: "Early error detection saves time and prevents downstream issues",
    },
    {
      title: "Step 4: Sales Approval",
      description: "Sales user receives notification. Views order summary, matching status, and issues. Approve or Reject with reason.",
      actor: "Sales User",
      benefit: "Sales team ensures customer requirements are met before logistics processing",
    },
    {
      title: "Step 5: Final Approval",
      description: "Head/Manager reviews full history, comments, and corrections. Approve or Reject. On approval, order moves to UPCOMING.",
      actor: "Final Approver (Head/Manager)",
      benefit: "Management oversight ensures compliance and quality control",
    },
    {
      title: "Step 6: Upcoming Logistics",
      description: "Approved order appears in Upcoming Logistics Orders. Status: APPROVED – AWAITING ARRIVAL. All data available for logistics team.",
      actor: "System (Automated)",
      benefit: "Seamless handoff to logistics team, no data re-entry needed",
    },
    {
      title: "Step 7: Material Arrival",
      description: "Logistics team scans arrival documents. System validates order exists and is approved. Status changes to ARRIVED.",
      actor: "Logistics Team",
      benefit: "Real-time tracking of material arrival, instant status updates",
    },
    {
      title: "Step 8: GR in SAP",
      description: "Perform GR in SAP. Enter GR number into HMS. System validates format. Status changes to RECEIVED.",
      actor: "Logistics/Admin",
      benefit: "SAP integration ensures financial records are synchronized",
    },
    {
      title: "Step 9: Sales Notification",
      description: "System notifies Sales team. Order received in warehouse, ready for customer delivery. Order visible for outbound planning.",
      actor: "System (Automated)",
      benefit: "Sales team can immediately plan customer deliveries, improving customer service",
    },
  ];

  const narration = [
    "Dear Mr. Ahmed,",
    "",
    "This HMS (Huawei Matching System) demonstrates a complete order handling workflow that saves significant time and reduces errors.",
    "",
    "Key Benefits:",
    "• Time Savings: Automated matching eliminates hours of manual data validation",
    "• Visibility: Real-time status tracking at every step",
    "• Error Reduction: Multi-level approvals catch issues early",
    "• Scalability: Handles high order volumes efficiently",
    "• AI Boundaries: AI assists with matching, but all approvals require human decision",
    "",
    "The system ensures:",
    "• Complete audit trail for every action",
    "• Role-based access control",
    "• Integration with existing logistics workflows",
    "• No disruption to current operations",
    "",
    "Let me guide you through each step...",
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "linear-gradient(to bottom, #0a0a0a, #1a1a1a)" }}>
      {/* Narration Overlay */}
      {showNarration && currentStep === 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #2a2a2a",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "700px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#06b6d4", fontSize: "1.75rem", fontWeight: "600" }}>HMS Order Flow - Complete Workflow</h2>
            <div style={{ lineHeight: "1.8", marginBottom: "2rem", color: "#e5e5e5" }}>
              {narration.map((line, idx) => (
                <p key={idx} style={{ margin: line ? "0.5rem 0" : "0.25rem 0", color: line ? "#e5e5e5" : "transparent" }}>
                  {line}
                </p>
              ))}
            </div>
            <button
              onClick={() => {
                setShowNarration(false);
                setCurrentStep(1);
              }}
              style={{
                padding: "0.75rem 2rem",
                background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(6, 182, 212, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(6, 182, 212, 0.3)";
              }}
            >
              Start Guided Tour
            </button>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      {!showNarration && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "#1a1a1a",
            border: "1px solid #2a2a2a",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            zIndex: 100,
            maxWidth: "320px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ marginBottom: "0.5rem", fontWeight: "bold", color: "#06b6d4", fontSize: "1.1rem" }}>
            Step {currentStep} of {steps.length}
          </div>
          <div style={{ fontSize: "0.95rem", marginBottom: "0.5rem", fontWeight: "bold", color: "#ffffff" }}>
            {steps[currentStep - 1]?.title}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#d1d5db", marginBottom: "0.5rem", fontWeight: "500" }}>
            {steps[currentStep - 1]?.description}
          </div>
          <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "0.5rem", fontWeight: "500" }}>
            <strong style={{ color: "#06b6d4" }}>Actor:</strong> <span style={{ color: "#e5e5e5" }}>{steps[currentStep - 1]?.actor}</span>
          </div>
          <div style={{ fontSize: "0.85rem", color: "#34d399", marginBottom: "1rem", fontWeight: "600" }}>
            <strong>Benefit:</strong> {steps[currentStep - 1]?.benefit}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                style={{
                  flex: 1,
                  padding: "0.75rem 1.25rem",
                  backgroundColor: currentStep === 1 ? "#374151" : "#374151",
                  color: currentStep === 1 ? "#6b7280" : "#e5e5e5",
                  border: "1px solid #4b5563",
                  borderRadius: "6px",
                  cursor: currentStep === 1 ? "not-allowed" : "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (currentStep !== 1) {
                    e.currentTarget.style.backgroundColor = "#4b5563";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentStep !== 1) {
                    e.currentTarget.style.backgroundColor = "#374151";
                  }
                }}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                disabled={currentStep === steps.length}
                style={{
                  flex: 1,
                  padding: "0.75rem 1.25rem",
                  background: currentStep === steps.length ? "linear-gradient(to right, #374151, #374151)" : "linear-gradient(to right, #06b6d4, #3b82f6)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: currentStep === steps.length ? "not-allowed" : "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  boxShadow: currentStep === steps.length ? "none" : "0 4px 12px rgba(6, 182, 212, 0.3)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (currentStep !== steps.length) {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Next
              </button>
            </div>
            <button
              onClick={() => {
                setShowNarration(true);
                setCurrentStep(0);
              }}
              style={{
                width: "100%",
                padding: "0.75rem 1.25rem",
                backgroundColor: "#4b5563",
                color: "white",
                border: "1px solid #6b7280",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "bold",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#6b7280";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#4b5563";
              }}
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ opacity: showNarration ? 0.3 : 1, pointerEvents: showNarration ? "none" : "auto" }}>
        <div className="min-h-screen" style={{ background: "linear-gradient(to bottom, #0a0a0a, #1a1a1a)" }}>
          <HmsOrderManagement />
        </div>
      </div>
    </div>
  );
}
