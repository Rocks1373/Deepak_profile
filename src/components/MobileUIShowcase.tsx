import { useState } from "react";

interface MobileScreen {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: React.ReactNode;
}

const mobileScreens: MobileScreen[] = [
  {
    id: "login",
    title: "Login Screen",
    description: "Secure authentication for warehouse staff",
    icon: "🔐",
    content: (
      <div className="mobile-screen-content">
        <div className="mobile-header">
          <div className="mobile-icon">🏭</div>
          <h3>GAPP Warehouse</h3>
        </div>
        <div className="mobile-form">
          <div className="mobile-input">
            <span className="mobile-label">Username</span>
            <div className="mobile-field">receiver@warehouse.com</div>
          </div>
          <div className="mobile-input">
            <span className="mobile-label">Password</span>
            <div className="mobile-field">••••••••</div>
          </div>
          <button className="mobile-button primary">Login</button>
        </div>
      </div>
    ),
  },
  {
    id: "main-menu",
    title: "Main Menu",
    description: "Role-based menu for different warehouse operations",
    icon: "📱",
    content: (
      <div className="mobile-screen-content">
        <div className="mobile-header-bar">
          <h3>GAPP Warehouse</h3>
          <span className="mobile-menu-icon">☰</span>
        </div>
        <div className="mobile-user-card">
          <div className="mobile-avatar">👤</div>
          <div>
            <div className="mobile-username">John Doe</div>
            <div className="mobile-role">Role: RECEIVER</div>
          </div>
        </div>
        <div className="mobile-menu-section">
          <div className="mobile-section-title">A. INBOUND</div>
          <div className="mobile-menu-item">
            <span className="mobile-menu-icon-item">📋</span>
            <span>Orders Status</span>
            <span>›</span>
          </div>
          <div className="mobile-menu-item">
            <span className="mobile-menu-icon-item">📦</span>
            <span>Receive Orders</span>
            <span>›</span>
          </div>
          <div className="mobile-menu-item">
            <span className="mobile-menu-icon-item">✏️</span>
            <span>Edit Orders</span>
            <span>›</span>
          </div>
          <div className="mobile-menu-item">
            <span className="mobile-menu-icon-item">✅</span>
            <span>Confirm Order</span>
            <span>›</span>
          </div>
        </div>
        <div className="mobile-menu-section">
          <div className="mobile-section-title">B. UPDATE LOCATION</div>
          <div className="mobile-menu-item">
            <span className="mobile-menu-icon-item">📍</span>
            <span>From Incoming Order</span>
            <span>›</span>
          </div>
          <div className="mobile-menu-item">
            <span className="mobile-menu-icon-item">➕</span>
            <span>Add New Racks</span>
            <span>›</span>
          </div>
          <div className="mobile-menu-item">
            <span className="mobile-menu-icon-item">📷</span>
            <span>Scan Racks</span>
            <span>›</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "receive-orders",
    title: "Receive Orders",
    description: "Scan and receive incoming shipments",
    icon: "📦",
    content: (
      <div className="mobile-screen-content">
        <div className="mobile-header-bar">
          <span>←</span>
          <h3>Receive Orders</h3>
          <span></span>
        </div>
        <div className="mobile-form">
          <div className="mobile-dropdown">
            <span className="mobile-label">Select Shipment:</span>
            <div className="mobile-field">PO-2024-001</div>
          </div>
          <div className="mobile-input">
            <span className="mobile-label">Part Number *</span>
            <div className="mobile-field">PART-001</div>
          </div>
          <div className="mobile-input">
            <span className="mobile-label">Quantity *</span>
            <div className="mobile-field">100</div>
          </div>
          <div className="mobile-input">
            <span className="mobile-label">Pallet No (Optional)</span>
            <div className="mobile-field">PAL-001</div>
          </div>
          <button className="mobile-button primary">Save</button>
          <div className="mobile-summary">
            <div className="mobile-summary-title">Summary</div>
            <div className="mobile-summary-item">
              <div className="mobile-summary-part">PART-001</div>
              <div className="mobile-summary-details">
                <div>Expected: 100</div>
                <div>Received: 100</div>
                <div className="mobile-variance">Variance: 0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "approvals",
    title: "Pending Approvals",
    description: "Approve or reject warehouse operations",
    icon: "✅",
    content: (
      <div className="mobile-screen-content">
        <div className="mobile-header-bar">
          <span>←</span>
          <h3>Pending Approvals</h3>
          <span>🔄</span>
        </div>
        <div className="mobile-approval-list">
          <div className="mobile-approval-card">
            <div className="mobile-approval-header">
              <div className="mobile-approval-title">Stock Posting (INBOUND)</div>
              <div className="mobile-approval-badge">TELEGRAM</div>
            </div>
            <div className="mobile-approval-info">
              <div>Reference: PO-2024-001</div>
              <div>Action: Post Stock</div>
              <div>Requested: 2024-01-15 10:30 AM</div>
            </div>
            <div className="mobile-approval-actions">
              <button className="mobile-button approve">✓ Approve</button>
              <button className="mobile-button reject">✗ Reject</button>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function MobileUIShowcase() {
  const [selectedScreen, setSelectedScreen] = useState(mobileScreens[0]);

  return (
    <div className="mobile-ui-showcase min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "600", marginBottom: "0.5rem", color: "#ffffff" }}>
            📱 Mobile App Interface
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "1.1rem" }}>
            Experience GAPP on mobile devices - designed for warehouse staff on the go
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "2rem" }}>
          {/* Screen Selector */}
          <div className="mobile-screen-selector">
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "600", color: "#06b6d4" }}>
              Available Screens
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {mobileScreens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setSelectedScreen(screen)}
                  className={`mobile-screen-button ${selectedScreen.id === screen.id ? "active" : ""}`}
                  style={{
                    padding: "1rem",
                    border: selectedScreen.id === screen.id ? "2px solid #06b6d4" : "1px solid #374151",
                    borderRadius: "8px",
                    backgroundColor: selectedScreen.id === screen.id ? "#1e3a5f" : "#1a1a1a",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    color: "#e5e5e5",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{screen.icon}</span>
                    <div>
                      <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{screen.title}</div>
                      <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>{screen.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone Frame */}
          <div className="mobile-phone-frame">
            <div className="mobile-phone-container">
              <div className="mobile-phone-screen">
                {selectedScreen.content}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mobile-phone-frame {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mobile-phone-container {
          width: 375px;
          height: 812px;
          background: #000;
          border-radius: 40px;
          padding: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          position: relative;
        }

        .mobile-phone-container::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 25px;
          background: #000;
          border-radius: 0 0 15px 15px;
          z-index: 10;
        }

        .mobile-phone-screen {
          width: 100%;
          height: 100%;
          background: #1a1a1a;
          border-radius: 32px;
          overflow: hidden;
          position: relative;
        }

        .mobile-screen-content {
          height: 100%;
          overflow-y: auto;
          padding: 16px;
          background: #0a0a0a;
        }

        .mobile-header {
          text-align: center;
          padding: 40px 16px 32px;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white;
          margin: -16px -16px 24px -16px;
        }

        .mobile-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .mobile-header h3 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }

        .mobile-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white;
          margin: -16px -16px 16px -16px;
        }

        .mobile-header-bar h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .mobile-user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .mobile-avatar {
          width: 48px;
          height: 48px;
          border-radius: 24px;
          background: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .mobile-username {
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
        }

        .mobile-role {
          font-size: 14px;
          color: #9ca3af;
        }

        .mobile-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-input, .mobile-dropdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-label {
          font-size: 14px;
          font-weight: 500;
          color: #9ca3af;
        }

        .mobile-field {
          padding: 12px;
          background: #1a1a1a;
          border: 1px solid #374151;
          border-radius: 8px;
          font-size: 16px;
          color: #e5e5e5;
        }

        .mobile-button {
          padding: 14px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mobile-button.primary {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white;
        }

        .mobile-button.primary:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }

        .mobile-button.approve {
          background: #10b981;
          color: white;
          flex: 1;
        }

        .mobile-button.reject {
          background: #ef4444;
          color: white;
          flex: 1;
        }

        .mobile-menu-section {
          margin-bottom: 24px;
        }

        .mobile-section-title {
          font-size: 16px;
          font-weight: bold;
          color: #06b6d4;
          margin-bottom: 12px;
        }

        .mobile-menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          margin-bottom: 8px;
          color: #e5e5e5;
        }

        .mobile-menu-icon-item {
          font-size: 24px;
        }

        .mobile-menu-item span:nth-child(2) {
          flex: 1;
          font-size: 16px;
        }

        .mobile-summary {
          margin-top: 24px;
          padding: 16px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
        }

        .mobile-summary-title {
          font-weight: 600;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .mobile-summary-item {
          padding: 12px;
          background: #111111;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .mobile-summary-part {
          font-weight: 600;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .mobile-summary-details {
          font-size: 14px;
          color: #9ca3af;
        }

        .mobile-variance {
          color: #10b981;
          font-weight: 600;
        }

        .mobile-approval-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-approval-card {
          padding: 16px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
        }

        .mobile-approval-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .mobile-approval-title {
          font-weight: 600;
          font-size: 16px;
          flex: 1;
          color: #ffffff;
        }

        .mobile-approval-badge {
          background: #06b6d4;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }

        .mobile-approval-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 14px;
          color: #9ca3af;
          margin-bottom: 12px;
        }

        .mobile-approval-actions {
          display: flex;
          gap: 8px;
        }

        .mobile-screen-button:hover {
          background: #2a2a2a !important;
          transform: translateX(4px);
        }

        .mobile-screen-button.active {
          border-color: #06b6d4 !important;
          background: #1e3a5f !important;
        }
      `}</style>
    </div>
  );
}
