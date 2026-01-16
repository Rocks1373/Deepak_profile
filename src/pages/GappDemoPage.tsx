import { useLocation, useNavigate } from 'react-router-dom'
import { DemoWrapper } from '../gapp-demo/components/demo/DemoWrapper'
import { MobileUIShowcase } from '../gapp-demo/components/demo/MobileUIShowcase'
import { SummaryPage } from '../gapp-demo/components/demo/SummaryPage'
import '../gapp-demo/styles.css'

// Import the full GAPP App components
// We'll create a simplified version that works standalone
import { useState, useEffect } from 'react'
import { 
  mockTables, 
  mockTableData, 
  mockReports, 
  mockReportResults, 
  mockApprovals,
  getMockData 
} from '../gapp-demo/data/mockData'
import { useDemo } from '../gapp-demo/components/demo/DemoWrapper'

type DashboardSummary = {
  inboundToday: number;
  outboundToday: number;
  pendingInbound: number;
  pendingOutbound: number;
  stockSummary: {
    totalParts: number;
    aggregatedQty: number;
    topParts: { partNumber: string; qty: number }[];
  };
  lastUpdated: string;
};

// Guide Section
function GuideSection() {
  const { isReadOnly } = useDemo();
  const showSummary = sessionStorage.getItem("demo_tour_completed") === "true" && isReadOnly;

  return (
    <div className="guide-section section-card" style={{ maxWidth: "1000px", margin: "0 auto", lineHeight: "1.6" }} data-tour="inbound">
      <h1 style={{ borderBottom: "3px solid #4caf50", paddingBottom: "0.5rem" }}>
        GAPP - Ground-Level Application for Warehouse Operations
      </h1>
      {showSummary && (
        <div id="summary-content" style={{ marginTop: "2rem" }}>
          <SummaryPage />
        </div>
      )}

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#1976d2", borderBottom: "2px solid #e3f2fd", paddingBottom: "0.5rem" }}>
          What is GAPP?
        </h2>
        <p>
          GAPP (Ground-level Application for Processing and Planning) is a comprehensive warehouse management 
          system designed for logistics operations. It handles:
        </p>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li><strong>Inbound Operations</strong> - Receiving shipments, checking items, confirming quantities</li>
          <li><strong>Outbound Operations</strong> - Order picking, checking, dispatch, and delivery confirmation</li>
          <li><strong>Stock Management</strong> - Real-time inventory tracking across warehouses</li>
          <li><strong>AI-Powered Automation</strong> - Document OCR, command execution, intelligent suggestions</li>
          <li><strong>Approval Workflows</strong> - Multi-level approval for critical operations</li>
          <li><strong>Integration</strong> - SAP, Telegram bots, external systems</li>
        </ul>
      </section>
    </div>
  );
}

// Dashboard Section
function DashboardSection({ dashboard, socketStatus }: { dashboard: DashboardSummary | null; socketStatus: string }) {
  if (!dashboard) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-section section-card" data-tour="dashboard">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-sm text-gray-600">Real-time metrics and stock summary</p>
      </div>
      <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div className="metric-card" style={{ background: "#f8fafc", border: "1px solid #e4e7ec", borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 0.5rem 0", fontWeight: "600", textTransform: "uppercase" }}>Inbound Today</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "#101828", margin: 0 }}>{dashboard.inboundToday}</div>
        </div>
        <div className="metric-card" style={{ background: "#f8fafc", border: "1px solid #e4e7ec", borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 0.5rem 0", fontWeight: "600", textTransform: "uppercase" }}>Outbound Today</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "#101828", margin: 0 }}>{dashboard.outboundToday}</div>
        </div>
        <div className="metric-card" style={{ background: "#f8fafc", border: "1px solid #e4e7ec", borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 0.5rem 0", fontWeight: "600", textTransform: "uppercase" }}>Pending Inbound</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "#101828", margin: 0 }}>{dashboard.pendingInbound}</div>
        </div>
        <div className="metric-card" style={{ background: "#f8fafc", border: "1px solid #e4e7ec", borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 0.5rem 0", fontWeight: "600", textTransform: "uppercase" }}>Pending Outbound</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "#101828", margin: 0 }}>{dashboard.pendingOutbound}</div>
        </div>
      </div>

      <div className="stock-summary" style={{ marginTop: "2rem", padding: "1.5rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid #e4e7ec" }}>
        <h3>Stock Summary</h3>
        <p>Total Parts: {dashboard.stockSummary.totalParts} | Total Qty: {dashboard.stockSummary.aggregatedQty}</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.stockSummary.topParts.map((part, idx) => (
              <tr key={idx}>
                <td>{part.partNumber}</td>
                <td>{part.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Table Viewer Section
function TableViewerSection() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTable) {
      setLoading(true);
      getMockData(null, 300).then(() => {
        const data = mockTableData[selectedTable] || [];
        setTableData(data);
        setLoading(false);
      });
    }
  }, [selectedTable]);

  return (
    <div className="table-viewer-section section-card" data-tour="stock">
      <h2>Data Tables</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Select Table:</label>
        <select
          value={selectedTable || ""}
          onChange={(e) => setSelectedTable(e.target.value || null)}
          style={{ width: "100%", maxWidth: "400px", padding: "0.75rem", fontSize: "1rem" }}
        >
          <option value="">-- Select a table --</option>
          {mockTables.map((table) => (
            <option key={table.name} value={table.name}>
              {table.name} ({table.rowCount} rows)
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading data...</div>}
      {!loading && selectedTable && tableData.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val: any, colIdx) => (
                    <td key={colIdx}>{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Report Builder Section
function ReportBuilderSection() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [reportResults, setReportResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRunReport = async (reportId: number) => {
    setLoading(true);
    setSelectedReport(reportId);
    await getMockData(null, 500);
    const results = mockReportResults[reportId] || [];
    setReportResults(results);
    setLoading(false);
  };

  return (
    <div className="report-builder-section section-card" data-tour="ai">
      <h2>Reports</h2>
      <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
        {mockReports.map((report) => (
          <div key={report.id} style={{ padding: "1rem", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
            <h3>{report.name}</h3>
            <p style={{ color: "#666", margin: "0.5rem 0" }}>{report.description}</p>
            <p style={{ fontSize: "0.85rem", color: "#999" }}>Category: {report.category}</p>
            <button
              onClick={() => handleRunReport(report.id)}
              disabled={loading}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                background: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading && selectedReport === report.id ? "Running..." : "Run Report"}
            </button>
          </div>
        ))}
      </div>

      {selectedReport && !loading && reportResults.length > 0 && (
        <div>
          <h3>Results</h3>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(reportResults[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportResults.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val: any, colIdx) => (
                      <td key={colIdx}>{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Approvals Section
function ApprovalsSection() {
  const { isReadOnly } = useDemo();
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovals = async () => {
      await getMockData(null, 300);
      setApprovals(mockApprovals);
      setLoading(false);
    };
    fetchApprovals();
  }, []);

  if (loading) return <div className="loading">Loading approvals...</div>;

  return (
    <div className="settings-section" style={{ maxWidth: "1200px", margin: "0 auto" }} data-tour="approvals">
      <h2>Pending Approvals</h2>
      {approvals.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {approvals.map((approval) => (
            <div
              key={approval.id}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>
                {approval.step?.step_name || "Approval"}: {approval.reference_value}
              </h3>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>
                <strong>Action:</strong> {approval.requested_action}
              </p>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>
                <strong>Source:</strong> {approval.source}
              </p>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>
                <strong>Requested at:</strong> {new Date(approval.requested_at).toLocaleString()}
              </p>
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                <button
                  disabled={isReadOnly}
                  style={{
                    padding: "0.5rem 1rem",
                    background: isReadOnly ? "#ccc" : "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: isReadOnly ? "not-allowed" : "pointer",
                  }}
                >
                  Approve
                </button>
                <button
                  disabled={isReadOnly}
                  style={{
                    padding: "0.5rem 1rem",
                    background: isReadOnly ? "#ccc" : "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: isReadOnly ? "not-allowed" : "pointer",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Demo App Content
function DemoAppContentInner() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"guide" | "dashboard" | "tableViewer" | "reportBuilder" | "approvals" | "mobile">("guide");
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    // In demo mode, use mock data
    setDashboard({
      inboundToday: 5,
      outboundToday: 8,
      pendingInbound: 3,
      pendingOutbound: 2,
      stockSummary: {
        totalParts: 1250,
        aggregatedQty: 15200,
        topParts: [
          { partNumber: "PART-001", qty: 450 },
          { partNumber: "PART-002", qty: 320 },
        ],
      },
      lastUpdated: new Date().toISOString(),
    });
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header" data-tour="header">
        <div>
          <strong>Ground-Level Warehouse OS</strong>
          <div className="small">Real-time dashboard & no-code report builder</div>
        </div>
        <div className="nav-bar">
          {[
            { id: "guide", label: "Guide" },
            { id: "dashboard", label: "Dashboard" },
            { id: "mobile", label: "Mobile UI" },
            { id: "tableViewer", label: "Data Tables" },
            { id: "reportBuilder", label: "Reports" },
            { id: "approvals", label: "Approvals" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-button ${activeSection === tab.id ? "active" : ""}`}
              onClick={() => setActiveSection(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ padding: "0.5rem 1rem", backgroundColor: "#fef3c7", color: "#92400e", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "bold" }}>
            DEMO MODE
          </div>
        </div>
      </header>
      <main className="content">
        {activeSection === "guide" && <GuideSection />}
        {activeSection === "dashboard" && <DashboardSection dashboard={dashboard} socketStatus="connected" />}
        {activeSection === "mobile" && <MobileUIShowcase />}
        {activeSection === "tableViewer" && <TableViewerSection />}
        {activeSection === "reportBuilder" && <ReportBuilderSection />}
        {activeSection === "approvals" && <ApprovalsSection />}
      </main>
      <footer className="footer-note">
        Demo Mode • Read-Only • Prepared for Mr. Ahmed
      </footer>
    </div>
  );
}

function DemoAppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavigate = (route: string) => {
    if (route.startsWith("/gapp-demo")) {
      navigate(route);
    } else if (route === "/") {
      navigate("/gapp-demo");
    } else {
      navigate(`/gapp-demo${route}`);
    }
  };

  return (
    <DemoWrapper currentRoute={location.pathname} onNavigate={handleNavigate}>
      <DemoAppContentInner />
    </DemoWrapper>
  );
}

// Main GAPP Demo Page Component
export default function GappDemoPage() {
  return <DemoAppContent />;
}
