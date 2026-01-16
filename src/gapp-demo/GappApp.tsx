import axios from "axios";
import { io } from "socket.io-client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import HmsPage from "./pages/HmsPage";
import { DemoWrapper } from "./components/demo/DemoWrapper";
import { useDemo } from "./components/demo/DemoWrapper";
import { SummaryPage } from "./components/demo/SummaryPage";
import { MobileUIShowcase } from "./components/demo/MobileUIShowcase";
import { 
  mockTables, 
  mockTableData, 
  mockReports, 
  mockReportResults, 
  mockApprovals,
  getMockData 
} from "./demo/data/mockData";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";
const WS_BASE =
  import.meta.env.VITE_WS_URL ??
  (import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "")
    : "http://localhost:4000");

// ============================================
// Auth Context
// ============================================
type User = {
  username: string;
  role: string;
  canEdit: boolean;
  canApprove: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("gapp_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { username, password });
      if (res.data?.status === "SUCCESS" && res.data?.data?.user) {
        const userData = res.data.data.user;
        const loggedInUser: User = {
          username: userData.username,
          role: userData.role || "VIEW_ONLY",
          canEdit: userData.role === "HEAD_ADMIN",
          canApprove: userData.can_approve === true,
        };
        setUser(loggedInUser);
        localStorage.setItem("gapp_user", JSON.stringify(loggedInUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gapp_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ... existing type definitions ...
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

type TableColumn = {
  columnName: string;
  dataType: string;
  isNullable: boolean;
  ordinalPosition: number;
};

type TableDataResponse = {
  columns: TableColumn[];
  rows: Record<string, unknown>[];
  total: number;
  page: number;
  perPage: number;
};

type ReportDefinition = {
  id: number;
  report_name: string;
  description?: string | null;
  created_by: string;
  is_locked: boolean;
  created_at: string;
  tables: { table_name: string; is_base: boolean }[];
  columns: { table_name: string; column_name: string; alias_name?: string | null }[];
  relations: {
    left_table: string;
    left_column: string;
    right_table: string;
    right_column: string;
    join_type: string;
  }[];
};

type ReportResult = {
  metadata: {
    total: number;
    page: number;
    perPage: number;
  };
  rows: Record<string, unknown>[];
};

type SystemSetting = {
  id: number;
  key: string;
  value: string;
  description?: string;
};

type RelationConfig = {
  leftTable: string;
  leftColumn: string;
  rightTable: string;
  rightColumn: string;
  joinType: "INNER" | "LEFT" | "RIGHT" | "FULL";
};

type ColumnSelection = {
  alias: string;
  included: boolean;
};

function downloadCsv(rows: Record<string, unknown>[], columns: string[], title: string) {
  if (!rows.length || !columns.length) return;
  const header = columns.join(",");
  const body = rows
    .map((row) =>
      columns
        .map((col) => {
          const value = row[col];
          if (value === null || value === undefined) return "";
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\n");
  const csvContent = `${header}\n${body}`;

  const blob = new Blob([csvContent], { type: "text/csv" });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `${title.replace(/\s+/g, "_") || "export"}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

// ============================================
// AI Chat Types
// ============================================
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  type?: string;
  executed?: boolean;
};

// ============================================
// Login Page
// ============================================
function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(username, password);
    if (!success) {
      setError("Invalid username or password");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1e1e1e",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{
        backgroundColor: "#2d2d2d",
        padding: "2.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        width: "100%",
        maxWidth: "400px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#4ec9b0", margin: "0 0 0.5rem 0", fontSize: "2rem" }}>GAPP</h1>
          <p style={{ color: "#888", margin: 0, fontSize: "0.9rem" }}>
            Ground-level Application for Processing and Planning
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", color: "#ccc", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#3c3c3c",
                border: "1px solid #555",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter username"
              autoFocus
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "#ccc", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#3c3c3c",
                border: "1px solid #555",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: "#5c2b2b",
              color: "#ff6b6b",
              padding: "0.75rem",
              borderRadius: "6px",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              textAlign: "center",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            style={{
              width: "100%",
              padding: "0.875rem",
              backgroundColor: loading ? "#3c6e5c" : "#4ec9b0",
              color: "#1e1e1e",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#252526",
          borderRadius: "6px",
          fontSize: "0.85rem",
        }}>
          <div style={{ color: "#888", marginBottom: "0.75rem", textAlign: "center" }}>Test Accounts:</div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#ccc" }}>
              <span><strong>admin</strong> / admin</span>
              <span style={{ color: "#888" }}>View Only</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#4ec9b0" }}>
              <span><strong>admin_head</strong> / admin_head</span>
              <span style={{ color: "#4ec9b0" }}>Full Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<"guide" | "dashboard" | "tableViewer" | "reportBuilder" | "settings" | "aiChat" | "dataUpload" | "admin" | "approvals" | "mobile">(
    "guide"
  );
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [socketStatus, setSocketStatus] = useState<string>("connecting");

  useEffect(() => {
    let cancelled = false;
    async function fetchSummary() {
      try {
        const res = await axios.get<DashboardSummary>(`${API_BASE}/dashboard/summary`);
        if (!cancelled) {
          setDashboard(res.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard summary", error);
      }
    }

    fetchSummary();

    const socket = io(WS_BASE);
    socket.on("connect", () => setSocketStatus("connected"));
    socket.on("disconnect", () => setSocketStatus("disconnected"));
    socket.on("connect_error", () => setSocketStatus("error"));
    socket.on("dashboard.update", (payload: DashboardSummary) => setDashboard(payload));

    return () => {
      cancelled = true;
      socket.disconnect();
    };
  }, []);

  // If on HMS page, render it directly
  if (location.pathname === "/hms") {
    return <HmsPage />;
  }

  // If not logged in, show login page
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
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
            { id: "dataUpload", label: "Upload" },
            { id: "settings", label: "Settings" },
            { id: "aiChat", label: "AI Command" },
            ...(user.canEdit ? [{ id: "admin", label: "Admin" }] : []),
            ...(user.canApprove ? [{ id: "approvals", label: "Approvals" }] : []),
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-button ${activeSection === tab.id ? "active" : ""}`}
              onClick={() => setActiveSection(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
          <Link
            to="/hms"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.5rem 1rem",
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
            }}
          >
            HMS
          </Link>
        </div>
        {/* User Info & Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: "bold", color: user.canEdit ? "#4ec9b0" : "#888" }}>
              {user.username}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#888" }}>
              {user.canEdit ? "Full Access" : "View Only"}
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="content">
        {activeSection === "guide" && <GuideSection />}
        {activeSection === "dashboard" && <DashboardSection dashboard={dashboard} socketStatus={socketStatus} />}
        {activeSection === "mobile" && <MobileUIShowcase />}
        {activeSection === "tableViewer" && <TableViewerSection />}
        {activeSection === "reportBuilder" && <ReportBuilderSection />}
        {activeSection === "dataUpload" && <DataUploadSection />}
        {activeSection === "settings" && <SettingsSection canEdit={user.canEdit} />}
        {activeSection === "aiChat" && <AiChatSection />}
        {activeSection === "admin" && <AdminSection user={user} />}
        {activeSection === "approvals" && <ApprovalsSection user={user} />}
      </main>
      <footer className="footer-note">
        WebSockets: {socketStatus} • API: {API_BASE} • Logged in as: {user.username} ({user.canEdit ? "Admin" : "Viewer"})
      </footer>
    </div>
  );
}

// Demo version of AppContent (read-only)
function DemoAppContentInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isReadOnly } = useDemo();
  const [activeSection, setActiveSection] = useState<"guide" | "dashboard" | "tableViewer" | "reportBuilder" | "settings" | "aiChat" | "dataUpload" | "admin" | "approvals">(
    "guide"
  );
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [socketStatus, setSocketStatus] = useState<string>("connecting");

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
    setSocketStatus("connected");
  }, []);

  const handleNavigate = (route: string) => {
    if (route.startsWith("/demo")) {
      navigate(route);
    } else {
      navigate(`/demo${route}`);
    }
  };

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
            { id: "dataUpload", label: "Upload" },
            { id: "settings", label: "Settings" },
            { id: "aiChat", label: "AI Command" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-button ${activeSection === tab.id ? "active" : ""}`}
              onClick={() => setActiveSection(tab.id as any)}
              disabled={isReadOnly && ["dataUpload", "admin"].includes(tab.id)}
              title={isReadOnly && ["dataUpload", "admin"].includes(tab.id) ? "Read-only demo" : ""}
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
        {activeSection === "dashboard" && <DashboardSection dashboard={dashboard} socketStatus={socketStatus} />}
        {activeSection === "mobile" && <MobileUIShowcase />}
        {activeSection === "tableViewer" && <TableViewerSection />}
        {activeSection === "reportBuilder" && <ReportBuilderSection />}
        {activeSection === "dataUpload" && <DataUploadSection />}
        {activeSection === "settings" && <SettingsSection canEdit={false} />}
        {activeSection === "aiChat" && <AiChatSection />}
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
    if (route.startsWith("/demo")) {
      navigate(route);
    } else if (route === "/") {
      navigate("/demo");
    } else {
      navigate(`/demo${route}`);
    }
  };

  return (
    <DemoWrapper currentRoute={location.pathname} onNavigate={handleNavigate}>
      <DemoAppContentInner />
    </DemoWrapper>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/demo" element={<DemoAppContent />} />
          <Route path="/demo/*" element={<DemoAppContent />} />
          <Route path="/hms" element={<HmsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// ============================================
// Guide Section - Complete System Documentation
// ============================================
function GuideSection() {
  const { isReadOnly } = useDemo();
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "disconnected">("checking");
  const [backendStatus, setBackendStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    if (isReadOnly) {
      // In demo mode, show as connected (using mock data)
      setBackendStatus("online");
      setDbStatus("connected");
    } else {
      // Check backend health
      axios.get(`${API_BASE.replace('/api', '')}/health`)
        .then(() => setBackendStatus("online"))
        .catch(() => setBackendStatus("offline"));

      // Check database by calling dashboard (will fail if no DB)
      axios.get(`${API_BASE}/tables`)
        .then(() => setDbStatus("connected"))
        .catch(() => setDbStatus("disconnected"));
    }
  }, [isReadOnly]);

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

      {/* System Status */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "1rem", 
        marginBottom: "2rem",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px"
      }}>
        <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "white", borderRadius: "4px" }}>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>Backend Server</div>
          <div style={{ 
            fontSize: "1.2rem", 
            fontWeight: "bold", 
            color: backendStatus === "online" ? "#4caf50" : backendStatus === "offline" ? "#f44336" : "#ff9800"
          }}>
            {backendStatus === "checking" ? "Checking..." : backendStatus === "online" ? "Online" : "Offline"}
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "white", borderRadius: "4px" }}>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>Database</div>
          <div style={{ 
            fontSize: "1.2rem", 
            fontWeight: "bold", 
            color: dbStatus === "connected" ? "#4caf50" : dbStatus === "disconnected" ? "#f44336" : "#ff9800"
          }}>
            {dbStatus === "checking" ? "Checking..." : dbStatus === "connected" ? "Connected" : "Not Connected"}
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "1rem", backgroundColor: "white", borderRadius: "4px" }}>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>API URL</div>
          <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#2196f3", wordBreak: "break-all" }}>
            {API_BASE}
          </div>
        </div>
      </div>

      {/* Database Setup Instructions */}
      {dbStatus === "disconnected" && (
        <div style={{ 
          backgroundColor: "#fff3e0", 
          border: "1px solid #ff9800", 
          borderRadius: "8px", 
          padding: "1.5rem", 
          marginBottom: "2rem" 
        }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#e65100" }}>Database Setup Required</h3>
          <p>The database is not connected. Follow these steps to set up:</p>
          <ol style={{ marginLeft: "1.5rem" }}>
            <li><strong>Install PostgreSQL</strong> - Download from <a href="https://www.postgresql.org/download/" target="_blank">postgresql.org</a></li>
            <li><strong>Create a database</strong>:
              <pre style={{ backgroundColor: "#fff", padding: "0.5rem", borderRadius: "4px", overflow: "auto" }}>
{`createdb gapp`}</pre>
            </li>
            <li><strong>Create .env file</strong> in <code>backend/</code> folder:
              <pre style={{ backgroundColor: "#fff", padding: "0.5rem", borderRadius: "4px", overflow: "auto" }}>
{`DATABASE_URL="postgresql://postgres:password@localhost:5432/gapp"
PORT=4000
NODE_ENV=development`}</pre>
            </li>
            <li><strong>Run migrations</strong>:
              <pre style={{ backgroundColor: "#fff", padding: "0.5rem", borderRadius: "4px", overflow: "auto" }}>
{`cd backend
npx prisma migrate deploy
npx prisma db seed`}</pre>
            </li>
            <li><strong>Restart backend</strong>:
              <pre style={{ backgroundColor: "#fff", padding: "0.5rem", borderRadius: "4px", overflow: "auto" }}>
{`npm run dev`}</pre>
            </li>
          </ol>
        </div>
      )}

      {/* What is GAPP */}
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

      {/* System Architecture */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#1976d2", borderBottom: "2px solid #e3f2fd", paddingBottom: "0.5rem" }}>
          System Architecture
        </h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "1rem" 
        }}>
          <div style={{ backgroundColor: "#e3f2fd", padding: "1rem", borderRadius: "8px" }}>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Frontend (React)</h4>
            <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem" }}>
              <li>React 18 with TypeScript</li>
              <li>Vite build tool</li>
              <li>Axios for API calls</li>
              <li>Socket.IO for real-time updates</li>
            </ul>
          </div>
          <div style={{ backgroundColor: "#e8f5e9", padding: "1rem", borderRadius: "8px" }}>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Backend (Node.js)</h4>
            <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem" }}>
              <li>Express.js REST API</li>
              <li>Prisma ORM</li>
              <li>PostgreSQL database</li>
              <li>BullMQ job queues</li>
            </ul>
          </div>
          <div style={{ backgroundColor: "#fff3e0", padding: "1rem", borderRadius: "8px" }}>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>Mobile App (Flutter)</h4>
            <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem" }}>
              <li>Cross-platform (iOS/Android)</li>
              <li>Role-based workflows</li>
              <li>Barcode/QR scanning</li>
              <li>Offline support</li>
            </ul>
          </div>
          <div style={{ backgroundColor: "#fce4ec", padding: "1rem", borderRadius: "8px" }}>
            <h4 style={{ margin: "0 0 0.5rem 0" }}>AI Services</h4>
            <ul style={{ margin: 0, paddingLeft: "1.5rem", fontSize: "0.9rem" }}>
              <li>Ollama (local LLM)</li>
              <li>MCP Server (tool execution)</li>
              <li>FastAPI Sidecar (OCR)</li>
              <li>Document AI processing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#1976d2", borderBottom: "2px solid #e3f2fd", paddingBottom: "0.5rem" }}>
          User Roles
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ddd" }}>Role</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ddd" }}>Responsibilities</th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ddd" }}>Access Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd", fontWeight: "bold" }}>HEAD_ADMIN</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Full system access, settings, rules, user management</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Full Access</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd", fontWeight: "bold" }}>RECEIVER</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Receive incoming shipments, initial check</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Inbound Only</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd", fontWeight: "bold" }}>PICKER</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Pick items for outbound orders</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Outbound Pick</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd", fontWeight: "bold" }}>CHECKER</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Verify picked items, quality check</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Outbound Check</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd", fontWeight: "bold" }}>DISPATCHER</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Load trucks, confirm deliveries, POD</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Dispatch</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd", fontWeight: "bold" }}>SALES</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>View orders, customer queries</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Read Only</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd", fontWeight: "bold" }}>VIEW_ONLY</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Dashboard and reports viewing</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>Read Only</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Workflow Diagrams */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#1976d2", borderBottom: "2px solid #e3f2fd", paddingBottom: "0.5rem" }}>
          Workflows
        </h2>
        
        <h4>Inbound Flow:</h4>
        <div style={{ 
          backgroundColor: "#e8f5e9", 
          padding: "1rem", 
          borderRadius: "8px",
          fontFamily: "monospace",
          overflow: "auto"
        }}>
          <pre style={{ margin: 0 }}>
{`Shipment Arrival → Receiver Check → Item Scanning → Quantity Confirm → Stock Update → SAP Post
      ↓                  ↓                ↓                ↓                ↓
   UPCOMING          ARRIVED          CHECKING        CONFIRMED          POSTED`}
          </pre>
        </div>

        <h4 style={{ marginTop: "1rem" }}>Outbound Flow:</h4>
        <div style={{ 
          backgroundColor: "#e3f2fd", 
          padding: "1rem", 
          borderRadius: "8px",
          fontFamily: "monospace",
          overflow: "auto"
        }}>
          <pre style={{ margin: 0 }}>
{`Order Created → Picker Assigned → Items Picked → Checker Verify → Load Truck → Deliver → POD
      ↓               ↓                ↓              ↓              ↓           ↓
   PENDING        ASSIGNED          PICKED         CHECKED        LOADED     DELIVERED`}
          </pre>
        </div>
      </section>

      {/* AI Command System */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#1976d2", borderBottom: "2px solid #e3f2fd", paddingBottom: "0.5rem" }}>
          AI Command System (aicmd)
        </h2>
        <p>
          The AI Command feature allows you to control the system using natural language. 
          Prefix your message with <code>aicmd</code> to activate.
        </p>
        <div style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "1rem", borderRadius: "8px", fontFamily: "monospace" }}>
          <div style={{ color: "#569cd6" }}>Examples:</div>
          <div style={{ marginTop: "0.5rem" }}>
            <span style={{ color: "#4ec9b0" }}>aicmd run backend</span> - Start the backend server
          </div>
          <div>
            <span style={{ color: "#4ec9b0" }}>aicmd start frontend</span> - Start the frontend dev server
          </div>
          <div>
            <span style={{ color: "#4ec9b0" }}>aicmd run tests</span> - Run E2E tests
          </div>
          <div>
            <span style={{ color: "#4ec9b0" }}>aicmd check backend</span> - Check backend health
          </div>
          <div>
            <span style={{ color: "#4ec9b0" }}>aicmd docker up</span> - Start Docker services
          </div>
          <div style={{ marginTop: "1rem", color: "#ce9178" }}>
            Response: Shows command + "Proceed? (y/n)"
          </div>
          <div style={{ color: "#ce9178" }}>
            Type "y" to execute, "n" to cancel
          </div>
        </div>
      </section>

      {/* Database Tables */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#1976d2", borderBottom: "2px solid #e3f2fd", paddingBottom: "0.5rem" }}>
          Database Tables
        </h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "0.5rem",
          fontSize: "0.85rem"
        }}>
          {[
            "User", "Role", "Permission",
            "Vendor", "Warehouse", "Item",
            "InboundShipment", "InboundReceipt", "InboundItem",
            "OutboundOrder", "OutboundItem", "OutboundDispatch", "OutboundPod",
            "Stock", "StockMovement",
            "ApprovalRequest", "ApprovalLog",
            "TelegramEvent", "AiExtractedEntity",
            "SapJobQueue", "HmsRun",
            "RulesMaster", "SystemSetting",
            "Report", "ReportTable", "ReportColumn"
          ].map((table, idx) => (
            <div key={idx} style={{ 
              padding: "0.5rem", 
              backgroundColor: "#f5f5f5", 
              borderRadius: "4px",
              border: "1px solid #e0e0e0"
            }}>
              {table}
            </div>
          ))}
        </div>
      </section>

      {/* API Endpoints */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#1976d2", borderBottom: "2px solid #e3f2fd", paddingBottom: "0.5rem" }}>
          Key API Endpoints
        </h2>
        <div style={{ fontSize: "0.85rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "0.5rem", textAlign: "left", border: "1px solid #ddd" }}>Endpoint</th>
                <th style={{ padding: "0.5rem", textAlign: "left", border: "1px solid #ddd" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["/health", "Server health check"],
                ["/api/dashboard/summary", "Dashboard metrics"],
                ["/api/ai/chat", "AI command endpoint"],
                ["/api/stock", "Stock operations"],
                ["/api/logistics/inbound/*", "Inbound operations"],
                ["/api/outbound/*", "Outbound operations"],
                ["/api/approvals/*", "Approval workflows"],
                ["/api/tables", "List database tables"],
                ["/api/reports", "Report builder"],
                ["/api/settings", "System settings"],
              ].map(([endpoint, desc], idx) => (
                <tr key={idx}>
                  <td style={{ padding: "0.5rem", border: "1px solid #ddd", fontFamily: "monospace" }}>{endpoint}</td>
                  <td style={{ padding: "0.5rem", border: "1px solid #ddd" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Start */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ color: "#1976d2", borderBottom: "2px solid #e3f2fd", paddingBottom: "0.5rem" }}>
          Quick Start Guide
        </h2>
        <div style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <h4>1. Start Backend:</h4>
          <pre style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "0.5rem", borderRadius: "4px" }}>
{`cd backend
npm install
npm run dev`}</pre>

          <h4>2. Start Frontend:</h4>
          <pre style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "0.5rem", borderRadius: "4px" }}>
{`cd frontend
npm install
npm run dev`}</pre>

          <h4>3. Database Setup (PostgreSQL):</h4>
          <pre style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "0.5rem", borderRadius: "4px" }}>
{`# Create database
createdb gapp

# Create backend/.env file with:
DATABASE_URL="postgresql://user:pass@localhost:5432/gapp"

# Run migrations
cd backend
npx prisma migrate deploy
npx prisma db seed`}</pre>

          <h4>4. Optional Services:</h4>
          <pre style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "0.5rem", borderRadius: "4px" }}>
{`# MCP Server (AI tools)
cd services/mcp_server && npm run dev

# AI Sidecar (OCR)
cd services/ai_sidecar && python main.py

# Ollama (local LLM)
ollama serve`}</pre>
        </div>
      </section>

      <footer style={{ 
        marginTop: "2rem", 
        padding: "1rem", 
        backgroundColor: "#f5f5f5", 
        borderRadius: "8px",
        textAlign: "center",
        color: "#666"
      }}>
        <p style={{ margin: 0 }}>
          GAPP - Ground-level Application for Processing and Planning<br/>
          Built with React, Node.js, PostgreSQL, and AI
        </p>
      </footer>
    </div>
  );
}

// ============================================
// Dashboard Section
// ============================================
function DashboardSection({
  dashboard,
  socketStatus,
}: {
  dashboard: DashboardSummary | null;
  socketStatus: string;
}) {
  const { isReadOnly } = useDemo();
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

      <div className="status-bar" style={{ marginTop: "1rem", padding: "0.75rem", background: "#f1f5f9", borderRadius: "0.5rem", textAlign: "center" }}>
        <small>Last Updated: {new Date(dashboard.lastUpdated).toLocaleString()} | Socket: {socketStatus}</small>
      </div>
    </div>
  );
}

// ============================================
// Table Viewer Section
// ============================================
function TableViewerSection() {
  const { isReadOnly } = useDemo();
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableData, setTableData] = useState<TableDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // In demo mode, use mock data
    if (isReadOnly) {
      const tableNames = mockTables.map(t => t.name);
      setTables(tableNames);
    } else {
      async function fetchTables() {
        try {
          const res = await axios.get(`${API_BASE}/tables`);
          if (res.data?.data) {
            setTables(res.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch tables", error);
        }
      }
      fetchTables();
    }
  }, [isReadOnly]);

  useEffect(() => {
    if (!selectedTable) return;

    async function fetchTableData() {
      setLoading(true);
      try {
        if (isReadOnly) {
          // Use mock data in demo mode
          const mockData = mockTableData[selectedTable] || [];
          await getMockData(null, 300);
          setTableData({
            columns: mockData.length > 0 ? Object.keys(mockData[0]).map(k => ({
              columnName: k,
              dataType: "text",
              isNullable: true,
              ordinalPosition: 1
            })) : [],
            rows: mockData,
            totalRows: mockData.length,
            page: 1,
            perPage: 20
          });
        } else {
          const res = await axios.get(`${API_BASE}/tables/${selectedTable}`, {
            params: { page, perPage: 20, search: search || undefined },
          });
          if (res.data?.data) {
            setTableData(res.data.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch table data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTableData();
  }, [selectedTable, page, search, isReadOnly]);

  return (
    <div className="table-viewer-section section-card" data-tour="stock">
      <h2>Data Table Viewer</h2>

      <div className="controls">
        <select
          value={selectedTable}
          onChange={(e) => {
            setSelectedTable(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Select a table...</option>
          {tables.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {tableData && (
          <button
            onClick={() =>
              downloadCsv(
                tableData.rows,
                tableData.columns.map((c) => c.columnName),
                selectedTable
              )
            }
          >
            Export CSV
          </button>
        )}
      </div>

      {loading && <div className="loading">Loading...</div>}

      {tableData && !loading && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                {tableData.columns.map((col) => (
                  <th key={col.columnName}>{col.columnName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, idx) => (
                <tr key={idx}>
                  {tableData.columns.map((col) => (
                    <td key={col.columnName}>{String(row[col.columnName] ?? "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination" style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center", marginTop: "1rem" }}>
            <button 
              disabled={page <= 1} 
              onClick={() => setPage(page - 1)}
              style={{ padding: "0.5rem 1rem", border: "1px solid #ddd", borderRadius: "4px", cursor: page <= 1 ? "not-allowed" : "pointer" }}
            >
              Previous
            </button>
            <span>
              Page {tableData.page || page} of {Math.ceil((tableData.totalRows || tableData.total || 0) / (tableData.perPage || 20))}
            </span>
            <button
              disabled={page >= Math.ceil((tableData.totalRows || tableData.total || 0) / (tableData.perPage || 20))}
              onClick={() => setPage(page + 1)}
              style={{ padding: "0.5rem 1rem", border: "1px solid #ddd", borderRadius: "4px", cursor: page >= Math.ceil((tableData.totalRows || tableData.total || 0) / (tableData.perPage || 20)) ? "not-allowed" : "pointer" }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================
// Report Builder Section
// ============================================
function ReportBuilderSection() {
  const { isReadOnly } = useDemo();
  const [reports, setReports] = useState<ReportDefinition[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportDefinition | null>(null);
  const [reportResult, setReportResult] = useState<ReportResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In demo mode, use mock data
    if (isReadOnly) {
      setReports(mockReports.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        query: `SELECT * FROM ${r.category.toLowerCase()}`,
        category: r.category,
        created_at: new Date().toISOString(),
        created_by: "demo_user"
      })));
    } else {
      async function fetchReports() {
        try {
          const res = await axios.get(`${API_BASE}/reports`);
          if (res.data?.data) {
            setReports(res.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch reports", error);
        }
      }
      fetchReports();
    }
  }, [isReadOnly]);

  async function runReport(reportId: number) {
    setLoading(true);
    try {
      if (isReadOnly) {
        // Use mock data in demo mode
        await getMockData(null, 500);
        const mockResult = mockReportResults[reportId];
        if (mockResult) {
          setReportResult({
            columns: mockResult.columns.map((name: string) => ({
              columnName: name,
              dataType: "text",
              isNullable: true,
              ordinalPosition: 1
            })),
            rows: mockResult.rows.map((row: any[]) => {
              const obj: any = {};
              mockResult.columns.forEach((col: string, idx: number) => {
                obj[col] = row[idx];
              });
              return obj;
            }),
            totalRows: mockResult.rows.length,
            page: 1,
            perPage: 20
          });
        }
      } else {
        const res = await axios.get(`${API_BASE}/reports/${reportId}/run`);
        if (res.data?.data) {
          setReportResult(res.data.data);
        }
      }
    } catch (error) {
      console.error("Failed to run report", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="report-builder-section section-card" data-tour="outbound">
      <h2>Report Builder</h2>

      <div className="report-list">
        <h3>Saved Reports</h3>
        {reports.length === 0 ? (
          <p>No reports found. Create one using the API.</p>
        ) : (
          <ul>
            {reports.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => {
                    setSelectedReport(r);
                    runReport(r.id);
                  }}
                >
                  {r.report_name}
                </button>
                <small> - {r.description || "No description"}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <div className="loading">Running report...</div>}

      {selectedReport && reportResult && !loading && (
        <div className="report-result">
          <h3>Results: {selectedReport.report_name}</h3>
          <p>Total rows: {reportResult.metadata.total}</p>

          <button
            onClick={() => {
              const cols = Object.keys(reportResult.rows[0] || {});
              downloadCsv(reportResult.rows, cols, selectedReport.report_name);
            }}
          >
            Export CSV
          </button>

          <table className="data-table">
            <thead>
              <tr>
                {Object.keys(reportResult.rows[0] || {}).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportResult.rows.slice(0, 100).map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{String(val ?? "")}</td>
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

// ============================================
// Data Upload Section
// ============================================
function DataUploadSection() {
  const { isReadOnly } = useDemo();
  const [uploadType, setUploadType] = useState<"stock" | "inbound" | "outbound" | "document">("stock");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; data?: any } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) {
      alert("Read-only demo mode. File selection is disabled.");
      e.target.value = "";
      return;
    }
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (isReadOnly) {
      alert("Read-only demo mode. Uploads are disabled.");
      return;
    }
    if (!file) return;
    setUploading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", uploadType);
      let endpoint = "";
      switch (uploadType) {
        case "stock":
          endpoint = `${API_BASE}/stock/upload`;
          break;
        case "inbound":
          endpoint = `${API_BASE}/logistics/inbound/upload`;
          break;
        case "outbound":
          endpoint = `${API_BASE}/outbound/upload`;
          break;
        case "document":
          endpoint = `${API_BASE}/ai/documents/upload`;
          break;
      }
      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult({ success: true, message: "Upload successful", data: res.data });
      setFile(null);
    } catch (error: any) {
      setResult({ success: false, message: error.response?.data?.message || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="data-upload-section" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Data Upload</h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Upload CSV or Excel files to populate the system with data.
      </p>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Upload Type:
        </label>
        <select
          value={uploadType}
          onChange={(e) => setUploadType(e.target.value as any)}
          style={{ padding: "0.5rem", fontSize: "1rem", width: "100%", maxWidth: "300px" }}
        >
          <option value="stock">Stock Master Data</option>
          <option value="inbound">Inbound Shipments</option>
          <option value="outbound">Outbound Orders</option>
          <option value="document">AI Document (PDF/Image)</option>
        </select>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Select File:
        </label>
        <input
          type="file"
          accept={uploadType === "document" ? ".pdf,.png,.jpg,.jpeg" : ".csv,.xlsx,.xls"}
          onChange={handleFileChange}
          disabled={isReadOnly}
          style={{ marginBottom: "0.5rem" }}
          title={isReadOnly ? "Read-only demo mode" : ""}
        />
        {file && (
          <div style={{ color: "#666", fontSize: "0.9rem" }}>
            Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <button
          onClick={handleUpload}
          disabled={!file || uploading || isReadOnly}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            backgroundColor: !file || uploading || isReadOnly ? "#ccc" : "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: !file || uploading || isReadOnly ? "not-allowed" : "pointer",
          }}
          title={isReadOnly ? "Read-only demo mode" : ""}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {result && (
        <div
          style={{
            padding: "1rem",
            borderRadius: "4px",
            backgroundColor: result.success ? "#e8f5e9" : "#ffebee",
            color: result.success ? "#2e7d32" : "#c62828",
            marginBottom: "1.5rem",
          }}
        >
          <strong>{result.success ? "Success!" : "Error:"}</strong> {result.message}
          {result.data && (
            <pre style={{ marginTop: "0.5rem", fontSize: "0.85rem", overflow: "auto" }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      )}

      <div style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
        <h3 style={{ marginTop: 0 }}>Expected File Formats:</h3>
        
        <div style={{ marginBottom: "1rem" }}>
          <strong>Stock Master (CSV/Excel):</strong>
          <pre style={{ margin: "0.5rem 0", backgroundColor: "#fff", padding: "0.5rem", fontSize: "0.85rem" }}>
part_number, description, vendor, warehouse, qty
ABC-001, Widget A, Avaya, WH1, 100
ABC-002, Widget B, Schneider, WH2, 50</pre>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <strong>Inbound Shipments (CSV/Excel):</strong>
          <pre style={{ margin: "0.5rem 0", backgroundColor: "#fff", padding: "0.5rem", fontSize: "0.85rem" }}>
local_po, vendor, part_number, qty, expected_date
A101, Avaya, ABC-001, 25, 2024-01-15
A102, Schneider, ABC-002, 10, 2024-01-16</pre>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <strong>Outbound Orders (CSV/Excel):</strong>
          <pre style={{ margin: "0.5rem 0", backgroundColor: "#fff", padding: "0.5rem", fontSize: "0.85rem" }}>
outbound_no, customer, part_number, qty
OUT-001, Customer A, ABC-001, 5
OUT-002, Customer B, ABC-002, 3</pre>
        </div>

        <div>
          <strong>AI Document:</strong>
          <p style={{ margin: "0.5rem 0", fontSize: "0.9rem" }}>
            Upload PDF or image files (PNG, JPG) for AI processing and OCR extraction.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// AI Chat Section
// ============================================
function AiChatSection() {
  const { isReadOnly } = useDemo();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const [os, setOs] = useState<"windows" | "macos" | "linux">("macos");

  const sendMessage = async () => {
    if (isReadOnly) {
      alert("Read-only demo mode. AI commands are disabled.");
      return;
    }
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/ai/chat`, {
        message: userMessage,
        sessionId,
        os,
      });

      const data = res.data;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message || JSON.stringify(data),
          type: data.type,
          executed: data.executed,
        },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message || "Failed to send message"}`,
          type: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ai-chat-section" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>AI Command Terminal</h2>
      <p style={{ color: "#666", marginBottom: "1rem" }}>
        Type <code>aicmd</code> followed by your command. Example: <code>aicmd run backend</code>
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <label>OS: </label>
        <select value={os} onChange={(e) => setOs(e.target.value as any)}>
          <option value="windows">Windows</option>
          <option value="macos">macOS</option>
          <option value="linux">Linux</option>
        </select>
      </div>

      <div
        className="chat-messages"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          height: "400px",
          overflowY: "auto",
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      >
        {messages.length === 0 && (
          <div style={{ color: "#888" }}>
            Welcome to GAPP AI Command Terminal.<br />
            Try: <span style={{ color: "#4ec9b0" }}>aicmd run backend</span>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              backgroundColor: msg.role === "user" ? "#2d2d2d" : "#252526",
              borderRadius: "4px",
              borderLeft: msg.role === "user" ? "3px solid #569cd6" : msg.executed ? "3px solid #4ec9b0" : "3px solid #ce9178",
            }}
          >
            <div style={{ color: msg.role === "user" ? "#569cd6" : "#ce9178", fontWeight: "bold", marginBottom: "0.25rem" }}>
              {msg.role === "user" ? "You:" : "AI:"}
              {msg.type && <span style={{ marginLeft: "0.5rem", color: "#888", fontWeight: "normal" }}>({msg.type})</span>}
              {msg.executed && <span style={{ marginLeft: "0.5rem", color: "#4ec9b0" }}>[EXECUTED]</span>}
            </div>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{msg.content}</pre>
          </div>
        ))}
        {loading && (
          <div style={{ color: "#888" }}>Processing...</div>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type 'aicmd run backend' or just 'y' / 'n' to approve/cancel..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.75rem",
            fontSize: "14px",
            fontFamily: "monospace",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim() || isReadOnly}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: isReadOnly ? "#ccc" : "#4ec9b0",
            color: "#1e1e1e",
            border: "none",
            borderRadius: "4px",
            cursor: loading || !input.trim() || isReadOnly ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
          title={isReadOnly ? "Read-only demo mode" : ""}
        >
          Send
        </button>
      </div>

      <div style={{ marginTop: "1rem", color: "#888", fontSize: "12px" }}>
        <strong>Commands:</strong> aicmd run backend | aicmd start frontend | aicmd run tests | aicmd docker up
      </div>
    </div>
  );
}

// ============================================
// Admin Section (HEAD_ADMIN only)
// ============================================
function AdminSection({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<"users" | "roles" | "rules" | "approval-steps" | "step-users" | "role-boundaries">("users");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: "VIEW_ONLY",
    can_approve: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/users`, {
        params: { username: user.username },
      });
      if (res.data?.data) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${API_BASE}/admin/users`, {
        ...formData,
        username: user.username,
      });
      setShowForm(false);
      setFormData({ username: "", password: "", full_name: "", email: "", role: "VIEW_ONLY", can_approve: false });
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create user");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`${API_BASE}/admin/users/${id}`, {
        ...formData,
        username: user.username,
      });
      setEditingUser(null);
      setFormData({ username: "", password: "", full_name: "", email: "", role: "VIEW_ONLY", can_approve: false });
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deactivate this user?")) return;
    try {
      await axios.delete(`${API_BASE}/admin/users/${id}`, {
        params: { username: user.username },
      });
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to deactivate user");
    }
  };

  const roles = ["HEAD_ADMIN", "RECEIVER", "PICKER", "CHECKER", "DISPATCHER", "SALES", "VIEW_ONLY", "APPROVER"];

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="settings-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>Admin Management</h2>
        {activeTab === "users" && (
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingUser(null);
              setFormData({ username: "", password: "", full_name: "", email: "", role: "VIEW_ONLY", can_approve: false });
            }}
            style={{ padding: "0.5rem 1rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            {showForm ? "Cancel" : "Add User"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "2px solid #e0e0e0" }}>
        <button
          onClick={() => setActiveTab("users")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: activeTab === "users" ? "#2196f3" : "transparent",
            color: activeTab === "users" ? "white" : "#666",
            border: "none",
            borderBottom: activeTab === "users" ? "3px solid #2196f3" : "3px solid transparent",
            cursor: "pointer",
            fontWeight: activeTab === "users" ? "bold" : "normal",
          }}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: activeTab === "roles" ? "#2196f3" : "transparent",
            color: activeTab === "roles" ? "white" : "#666",
            border: "none",
            borderBottom: activeTab === "roles" ? "3px solid #2196f3" : "3px solid transparent",
            cursor: "pointer",
            fontWeight: activeTab === "roles" ? "bold" : "normal",
          }}
        >
          User Roles
        </button>
        <button
          onClick={() => setActiveTab("rules")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: activeTab === "rules" ? "#2196f3" : "transparent",
            color: activeTab === "rules" ? "white" : "#666",
            border: "none",
            borderBottom: activeTab === "rules" ? "3px solid #2196f3" : "3px solid transparent",
            cursor: "pointer",
            fontWeight: activeTab === "rules" ? "bold" : "normal",
          }}
        >
          User Rules
        </button>
        <button
          onClick={() => setActiveTab("approval-steps")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: activeTab === "approval-steps" ? "#2196f3" : "transparent",
            color: activeTab === "approval-steps" ? "white" : "#666",
            border: "none",
            borderBottom: activeTab === "approval-steps" ? "3px solid #2196f3" : "3px solid transparent",
            cursor: "pointer",
            fontWeight: activeTab === "approval-steps" ? "bold" : "normal",
          }}
        >
          Approval Steps
        </button>
        <button
          onClick={() => setActiveTab("step-users")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: activeTab === "step-users" ? "#2196f3" : "transparent",
            color: activeTab === "step-users" ? "white" : "#666",
            border: "none",
            borderBottom: activeTab === "step-users" ? "3px solid #2196f3" : "3px solid transparent",
            cursor: "pointer",
            fontWeight: activeTab === "step-users" ? "bold" : "normal",
          }}
        >
          Step Users
        </button>
        <button
          onClick={() => setActiveTab("role-boundaries")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: activeTab === "role-boundaries" ? "#2196f3" : "transparent",
            color: activeTab === "role-boundaries" ? "white" : "#666",
            border: "none",
            borderBottom: activeTab === "role-boundaries" ? "3px solid #2196f3" : "3px solid transparent",
            cursor: "pointer",
            fontWeight: activeTab === "role-boundaries" ? "bold" : "normal",
          }}
        >
          Role Boundaries
        </button>
      </div>

      {activeTab === "users" && (
        <>
      {showForm && (
        <div style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <h3>{editingUser ? "Edit User" : "Create User"}</h3>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <label>Username *</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={!!editingUser}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
            <div>
              <label>{editingUser ? "New Password (leave blank to keep)" : "Password *"}</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
            <div>
              <label>Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                style={{ width: "100%", padding: "0.5rem" }}
              >
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={formData.can_approve}
                  onChange={(e) => setFormData({ ...formData, can_approve: e.target.checked })}
                />
                Can Approve
              </label>
            </div>
          </div>
          <button
            onClick={() => editingUser ? handleUpdate(editingUser.id) : handleCreate()}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            {editingUser ? "Update" : "Create"}
          </button>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
        <thead>
          <tr style={{ backgroundColor: "#e0e0e0" }}>
            <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Username</th>
            <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Full Name</th>
            <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Role</th>
            <th style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>Can Approve</th>
            <th style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>Status</th>
            <th style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>{u.username}</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>{u.full_name || "-"}</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>
                {u.roles.map((r: any) => r.role_code).join(", ")}
              </td>
              <td style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>
                {u.can_approve ? "✓" : "✗"}
              </td>
              <td style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>
                <span style={{ color: u.is_active ? "#4caf50" : "#f44336" }}>
                  {u.is_active ? "Active" : "Inactive"}
                </span>
              </td>
              <td style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>
                <button
                  onClick={() => {
                    setEditingUser(u);
                    setFormData({
                      username: u.username,
                      password: "",
                      full_name: u.full_name || "",
                      email: u.email || "",
                      role: u.roles[0]?.role_code || "VIEW_ONLY",
                      can_approve: u.can_approve,
                    });
                    setShowForm(true);
                  }}
                  style={{ marginRight: "0.5rem", padding: "0.25rem 0.5rem", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  style={{ padding: "0.25rem 0.5rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </>
      )}

      {activeTab === "roles" && <UserRolesSection user={user} />}
      {activeTab === "rules" && <UserRulesSection user={user} />}
      {activeTab === "approval-steps" && <ApprovalStepsSection user={user} />}
      {activeTab === "step-users" && <StepUsersSection user={user} />}
      {activeTab === "role-boundaries" && <RoleBoundariesSection user={user} />}
    </div>
  );
}

// ============================================
// User Roles Section
// ============================================
function UserRolesSection({ user }: { user: User }) {
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/user-roles/list`, {
        params: { username: user.username },
      });
      if (res.data?.data) {
        setUserRoles(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user roles", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: number, newRole: string) => {
    setSaving(userId);
    try {
      await axios.put(`${API_BASE}/admin/user-roles/${userId}`, {
        role: newRole,
        username: user.username,
      });
      fetchUserRoles();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update role");
    } finally {
      setSaving(null);
    }
  };

  const roles = ["HEAD_ADMIN", "RECEIVER", "PICKER", "CHECKER", "DISPATCHER", "SALES", "VIEW_ONLY", "APPROVER"];

  if (loading) return <div className="loading">Loading user roles...</div>;

  return (
    <div>
      <div style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
        <strong>Role Assignment:</strong> Assign a primary role to each user. Role changes take effect on next login.
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
        <thead>
          <tr style={{ backgroundColor: "#e0e0e0" }}>
            <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Username</th>
            <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Full Name</th>
            <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Current Role</th>
            <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Status</th>
            <th style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {userRoles.map((ur) => (
            <tr key={ur.id}>
              <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>{ur.username}</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>{ur.full_name || "-"}</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>
                <select
                  value={ur.role || ""}
                  onChange={(e) => handleRoleUpdate(ur.id, e.target.value)}
                  disabled={saving === ur.id}
                  style={{ width: "100%", padding: "0.5rem" }}
                >
                  <option value="">Select Role</option>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </td>
              <td style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>
                <span style={{ color: ur.is_active ? "#4caf50" : "#f44336" }}>
                  {ur.is_active ? "Active" : "Inactive"}
                </span>
              </td>
              <td style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc" }}>
                {saving === ur.id ? "Saving..." : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// User Rules Section
// ============================================
function UserRulesSection({ user }: { user: User }) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchUserRules(selectedUserId);
    }
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/users`, {
        params: { username: user.username },
      });
      if (res.data?.data) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRules = async (userId: number) => {
    try {
      const res = await axios.get(`${API_BASE}/admin/user-rules/${userId}`, {
        params: { username: user.username },
      });
      if (res.data?.data) {
        setRules(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user rules", error);
    }
  };

  const handleRuleToggle = (ruleId: number) => {
    setRules(rules.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r));
  };

  const handleSave = async () => {
    if (!selectedUserId) return;
    setSaving(true);
    try {
      await axios.post(`${API_BASE}/admin/user-rules/${selectedUserId}`, {
        rules: rules.map(r => ({ rule_id: r.id, enabled: r.enabled })),
        username: user.username,
      });
      alert("Rules saved successfully");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to save rules");
    } finally {
      setSaving(false);
    }
  };

  const groupedRules = rules.reduce((acc: any, rule: any) => {
    if (!acc[rule.module_code]) {
      acc[rule.module_code] = { module_name: rule.module_name, rules: [] };
    }
    acc[rule.module_code].rules.push(rule);
    return acc;
  }, {});

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Select User:
        </label>
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(Number(e.target.value) || null)}
          style={{ width: "100%", maxWidth: "400px", padding: "0.75rem", fontSize: "1rem" }}
        >
          <option value="">-- Select a user --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.username} {u.full_name ? `(${u.full_name})` : ""}
            </option>
          ))}
        </select>
      </div>

      {selectedUserId && (
        <>
          <div style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#e8f5e9", borderRadius: "4px" }}>
            <strong>Rule Assignment:</strong> Check rules to grant access. Unchecked rules = NO access. User must have BOTH role AND rule to access features.
          </div>

          {Object.entries(groupedRules).map(([moduleCode, moduleData]: [string, any]) => (
            <div key={moduleCode} style={{ marginBottom: "2rem", backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px" }}>
              <h3 style={{ marginTop: 0, color: "#2196f3" }}>{moduleData.module_name} ({moduleCode})</h3>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {moduleData.rules.map((rule: any) => (
                  <label
                    key={rule.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.75rem",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      cursor: "pointer",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => handleRuleToggle(rule.id)}
                      style={{ marginRight: "0.75rem", width: "20px", height: "20px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold" }}>{rule.rule_code}</div>
                      <div style={{ fontSize: "0.9rem", color: "#666" }}>{rule.rule_description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: "2rem", textAlign: "right" }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: saving ? "#ccc" : "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: saving ? "not-allowed" : "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {saving ? "Saving..." : "Save Rules"}
            </button>
          </div>
        </>
      )}

      {!selectedUserId && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
          Please select a user to assign rules
        </div>
      )}
    </div>
  );
}

// ============================================
// Approval Steps Section
// ============================================
function ApprovalStepsSection({ user }: { user: User }) {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStep, setEditingStep] = useState<any>(null);
  const [formData, setFormData] = useState({
    step_name: "",
    module: "Inbound",
    sequence_no: 1,
    is_active: true,
  });
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [newRule, setNewRule] = useState({ rule_name: "", description: "", is_mandatory: false });

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/approval-steps`, {
        params: { username: user.username },
      });
      if (res.data?.data) {
        setSteps(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch steps", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`${API_BASE}/admin/approval-steps`, {
        ...formData,
        id: editingStep?.id,
        username: user.username,
      });
      setShowForm(false);
      setEditingStep(null);
      setFormData({ step_name: "", module: "Inbound", sequence_no: 1, is_active: true });
      fetchSteps();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to save step");
    }
  };

  const handleAddRule = async (stepId: number) => {
    try {
      await axios.post(`${API_BASE}/admin/approval-steps/${stepId}/rules`, {
        ...newRule,
        username: user.username,
      });
      setNewRule({ rule_name: "", description: "", is_mandatory: false });
      fetchSteps();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add rule");
    }
  };

  const handleDeleteRule = async (stepId: number, ruleId: number) => {
    if (!confirm("Delete this rule?")) return;
    try {
      await axios.delete(`${API_BASE}/admin/approval-steps/${stepId}/rules/${ruleId}`, {
        params: { username: user.username },
      });
      fetchSteps();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete rule");
    }
  };

  const handleDeleteStep = async (id: number) => {
    if (!confirm("Delete this step?")) return;
    try {
      await axios.delete(`${API_BASE}/admin/approval-steps/${id}`, {
        params: { username: user.username },
      });
      fetchSteps();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete step");
    }
  };

  if (loading) return <div className="loading">Loading steps...</div>;

  const modules = ["Inbound", "Outbound", "Logistics"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h3>Approval Rule Setup</h3>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingStep(null);
            setFormData({ step_name: "", module: "Inbound", sequence_no: 1, is_active: true });
          }}
          style={{ padding: "0.5rem 1rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {showForm ? "Cancel" : "Add Step"}
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <h4>{editingStep ? "Edit Step" : "Create Step"}</h4>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <label>Step Name *</label>
              <input
                type="text"
                value={formData.step_name}
                onChange={(e) => setFormData({ ...formData, step_name: e.target.value })}
                style={{ width: "100%", padding: "0.5rem" }}
                placeholder="e.g. PO Creation"
              />
            </div>
            <div>
              <label>Module *</label>
              <select
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                style={{ width: "100%", padding: "0.5rem" }}
              >
                {modules.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label>Sequence Number *</label>
              <input
                type="number"
                value={formData.sequence_no}
                onChange={(e) => setFormData({ ...formData, sequence_no: Number(e.target.value) })}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </label>
            </div>
          </div>
          <button
            onClick={handleSave}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            {editingStep ? "Update" : "Create"}
          </button>
        </div>
      )}

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {steps.map((step) => (
          <div key={step.id} style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
              <div>
                <h4 style={{ margin: 0 }}>
                  {step.sequence_no}. {step.step_name} ({step.module})
                </h4>
                <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.25rem" }}>
                  Status: {step.is_active ? "Active" : "Inactive"}
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditingStep(step);
                    setFormData({
                      step_name: step.step_name,
                      module: step.module,
                      sequence_no: step.sequence_no,
                      is_active: step.is_active,
                    });
                    setShowForm(true);
                  }}
                  style={{ marginRight: "0.5rem", padding: "0.25rem 0.5rem", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStep(step.id)}
                  style={{ padding: "0.25rem 0.5rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <strong>Rules:</strong>
              <div style={{ marginTop: "0.5rem", display: "grid", gap: "0.5rem" }}>
                {step.rules.map((rule: any) => (
                  <div key={rule.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", backgroundColor: "white", borderRadius: "4px" }}>
                    <div>
                      <span style={{ fontWeight: "bold" }}>{rule.rule_name}</span>
                      {rule.is_mandatory && <span style={{ marginLeft: "0.5rem", color: "#f44336" }}>(Mandatory)</span>}
                      {rule.description && <div style={{ fontSize: "0.85rem", color: "#666" }}>{rule.description}</div>}
                    </div>
                    <button
                      onClick={() => handleDeleteRule(step.id, rule.id)}
                      style={{ padding: "0.25rem 0.5rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {selectedStep === step.id ? (
                <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "white", borderRadius: "4px" }}>
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="Rule name"
                      value={newRule.rule_name}
                      onChange={(e) => setNewRule({ ...newRule, rule_name: e.target.value })}
                      style={{ padding: "0.5rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Description (optional)"
                      value={newRule.description}
                      onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                      style={{ padding: "0.5rem" }}
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={newRule.is_mandatory}
                        onChange={(e) => setNewRule({ ...newRule, is_mandatory: e.target.checked })}
                      />
                      Mandatory
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => handleAddRule(step.id)}
                        style={{ padding: "0.5rem 1rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Add Rule
                      </button>
                      <button
                        onClick={() => setSelectedStep(null)}
                        style={{ padding: "0.5rem 1rem", backgroundColor: "#ccc", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedStep(step.id)}
                  style={{ marginTop: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "#2196f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  + Add Rule
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Step Users Section
// ============================================
function StepUsersSection({ user }: { user: User }) {
  const [steps, setSteps] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [selectedApproverIds, setSelectedApproverIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedStep) {
      const step = steps.find(s => s.id === selectedStep);
      if (step) {
        setSelectedUserIds(step.users.map((u: any) => u.user_id));
        setSelectedApproverIds(step.approvers.map((a: any) => a.user_id));
      }
    }
  }, [selectedStep, steps]);

  const fetchData = async () => {
    try {
      const [stepsRes, usersRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/approval-steps`, { params: { username: user.username } }),
        axios.get(`${API_BASE}/admin/users`, { params: { username: user.username } }),
      ]);
      if (stepsRes.data?.data) setSteps(stepsRes.data.data);
      if (usersRes.data?.data) setUsers(usersRes.data.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUsers = async () => {
    if (!selectedStep) return;
    try {
      await axios.post(`${API_BASE}/admin/approval-steps/${selectedStep}/users`, {
        user_ids: selectedUserIds,
        username: user.username,
      });
      alert("Users assigned successfully");
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to assign users");
    }
  };

  const handleSaveApprovers = async () => {
    if (!selectedStep) return;
    try {
      await axios.post(`${API_BASE}/admin/approval-steps/${selectedStep}/approvers`, {
        user_ids: selectedApproverIds,
        username: user.username,
      });
      alert("Approvers assigned successfully");
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to assign approvers");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h3>Step → User Assignment</h3>
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Select Step:
        </label>
        <select
          value={selectedStep || ""}
          onChange={(e) => setSelectedStep(Number(e.target.value) || null)}
          style={{ width: "100%", maxWidth: "400px", padding: "0.75rem", fontSize: "1rem" }}
        >
          <option value="">-- Select a step --</option>
          {steps.map(s => (
            <option key={s.id} value={s.id}>
              {s.sequence_no}. {s.step_name} ({s.module})
            </option>
          ))}
        </select>
      </div>

      {selectedStep && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <h4>Working Users (who can complete task)</h4>
            <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #e0e0e0", borderRadius: "4px", padding: "1rem" }}>
              {users.map(u => (
                <label key={u.id} style={{ display: "block", marginBottom: "0.5rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(u.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUserIds([...selectedUserIds, u.id]);
                      } else {
                        setSelectedUserIds(selectedUserIds.filter(id => id !== u.id));
                      }
                    }}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {u.username} {u.full_name ? `(${u.full_name})` : ""}
                </label>
              ))}
            </div>
            <button
              onClick={handleSaveUsers}
              style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Save Working Users
            </button>
          </div>

          <div>
            <h4>Approver Users (who receive approval request)</h4>
            <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #e0e0e0", borderRadius: "4px", padding: "1rem" }}>
              {users.map(u => (
                <label key={u.id} style={{ display: "block", marginBottom: "0.5rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedApproverIds.includes(u.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedApproverIds([...selectedApproverIds, u.id]);
                      } else {
                        setSelectedApproverIds(selectedApproverIds.filter(id => id !== u.id));
                      }
                    }}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {u.username} {u.full_name ? `(${u.full_name})` : ""}
                </label>
              ))}
            </div>
            <button
              onClick={handleSaveApprovers}
              style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Save Approvers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Role Boundaries Section
// ============================================
function RoleBoundariesSection({ user }: { user: User }) {
  const [roles, setRoles] = useState<any[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [stepsRes, rolesRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/approval-steps`, { params: { username: user.username } }),
        axios.get(`${API_BASE}/admin/user-roles/list`, { params: { username: user.username } }),
      ]);
      if (stepsRes.data?.data) setSteps(stepsRes.data.data);
      if (rolesRes.data?.data) {
        const uniqueRoles = Array.from(new Set(rolesRes.data.data.map((ur: any) => ur.role).filter(Boolean)));
        setRoles(uniqueRoles);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <h3>Role → Rule Boundaries</h3>
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Select Role:
        </label>
        <select
          value={selectedRole || ""}
          onChange={(e) => setSelectedRole(e.target.value || null)}
          style={{ width: "100%", maxWidth: "400px", padding: "0.75rem", fontSize: "1rem" }}
        >
          <option value="">-- Select a role --</option>
          {roles.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {selectedRole && (
        <div>
          <div style={{ padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px", marginBottom: "1rem" }}>
            <strong>Note:</strong> This view shows allowed steps and rules for role: <strong>{selectedRole}</strong>
          </div>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            {steps.filter(s => s.is_active).map(step => (
              <div key={step.id} style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px" }}>
                <h4>{step.sequence_no}. {step.step_name} ({step.module})</h4>
                <div style={{ marginTop: "0.5rem" }}>
                  <strong>Rules:</strong>
                  <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                    {step.rules.map((rule: any) => (
                      <li key={rule.id}>
                        {rule.rule_name} {rule.is_mandatory && <span style={{ color: "#f44336" }}>(Mandatory)</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Approvals Section (can_approve users only)
// ============================================
function ApprovalsSection({ user }: { user: User }) {
  const { isReadOnly } = useDemo();
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchApprovals();
    const interval = setInterval(fetchApprovals, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchApprovals = async () => {
    if (isReadOnly) {
      // Use mock data in demo mode
      await getMockData(null, 300);
      setApprovals(mockApprovals);
      setLoading(false);
      return;
    }
    try {
      // Try step-based approvals first, fallback to old endpoint
      const res = await axios.get(`${API_BASE}/approvals/my-pending`, {
        params: { username: user.username },
      });
      if (res.data?.data) {
        setApprovals(res.data.data);
      }
    } catch (error) {
      // Fallback to old endpoint
      try {
        const res = await axios.get(`${API_BASE}/approvals/pending`, {
          params: { username: user.username },
        });
        if (res.data?.data) {
          setApprovals(res.data.data);
        }
      } catch (e) {
        console.error("Failed to fetch approvals", e);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    if (isReadOnly) {
      alert("Read-only demo mode. Approvals are disabled.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/approvals/${id}/approve`, {
        approved_by: user.username,
        username: user.username,
      });
      setSelectedApproval(null);
      fetchApprovals();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to approve");
    }
  };

  const handleReject = async (id: number) => {
    if (isReadOnly) {
      alert("Read-only demo mode. Rejections are disabled.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/approvals/${id}/reject`, {
        rejected_by: user.username,
        remarks: remarks || null,
        username: user.username,
      });
      setSelectedApproval(null);
      setRemarks("");
      fetchApprovals();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to reject");
    }
  };

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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>
                    {approval.step?.step_name || approval.entity_type}: {approval.reference_value}
                  </h3>
                  {approval.step && (
                    <p style={{ margin: "0.25rem 0", color: "#2196f3", fontWeight: "bold" }}>
                      Step: {approval.step.step_name} ({approval.step.module})
                    </p>
                  )}
                  <p style={{ margin: "0.25rem 0", color: "#666" }}>
                    <strong>Action:</strong> {approval.requested_action}
                  </p>
                  {approval.description && (
                    <p style={{ margin: "0.25rem 0", color: "#666" }}>
                      <strong>Description:</strong> {approval.description}
                    </p>
                  )}
                  <p style={{ margin: "0.25rem 0", color: "#666" }}>
                    <strong>Requested by:</strong> {approval.requested_by || "System"}
                  </p>
                  <p style={{ margin: "0.25rem 0", color: "#666" }}>
                    <strong>Requested at:</strong> {new Date(approval.requested_at).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleApprove(approval.id)}
                    disabled={isReadOnly}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: isReadOnly ? "#ccc" : "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isReadOnly ? "not-allowed" : "pointer",
                    }}
                    title={isReadOnly ? "Read-only demo mode" : ""}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      if (isReadOnly) {
                        alert("Read-only demo mode. Rejections are disabled.");
                        return;
                      }
                      setSelectedApproval(approval);
                      setRemarks("");
                    }}
                    disabled={isReadOnly}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: isReadOnly ? "#ccc" : "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isReadOnly ? "not-allowed" : "pointer",
                    }}
                    title={isReadOnly ? "Read-only demo mode" : ""}
                  >
                    Reject
                  </button>
                </div>
              </div>
              {selectedApproval?.id === approval.id && (
                <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "white", borderRadius: "4px" }}>
                  <label>
                    Rejection Remarks (optional):
                    <textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      style={{ width: "100%", minHeight: "60px", padding: "0.5rem", marginTop: "0.5rem" }}
                      placeholder="Enter reason for rejection..."
                    />
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                      onClick={() => handleReject(approval.id)}
                      disabled={isReadOnly}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: isReadOnly ? "#ccc" : "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: isReadOnly ? "not-allowed" : "pointer",
                      }}
                      title={isReadOnly ? "Read-only demo mode" : ""}
                    >
                      Confirm Reject
                    </button>
                    <button
                      onClick={() => {
                        setSelectedApproval(null);
                        setRemarks("");
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#ccc",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Settings Section
// ============================================
function SettingsSection({ canEdit = false }: { canEdit?: boolean }) {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingSetting, setEditingSetting] = useState<{ key: string; value: string } | null>(null);
  const [filterModule, setFilterModule] = useState<string>("all");

  const fetchData = async () => {
    try {
      const [settingsRes, rulesRes] = await Promise.all([
        axios.get(`${API_BASE}/settings`),
        axios.get(`${API_BASE}/settings/rules`),
      ]);

      if (settingsRes.data?.data) {
        setSettings(settingsRes.data.data);
      }
      if (rulesRes.data?.data) {
        setRules(rulesRes.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleRule = async (ruleId: number, currentState: boolean) => {
    if (!canEdit) {
      alert("You do not have permission to edit rules. Login as admin_head for full access.");
      return;
    }

    setSaving(`rule-${ruleId}`);
    try {
      await axios.patch(`${API_BASE}/settings/rules/${ruleId}/toggle`, {
        enabled: !currentState,
      });
      // Update local state
      setRules(rules.map(r => 
        r.id === ruleId ? { ...r, is_enabled: !currentState, default_state: !currentState ? "ON" : "OFF" } : r
      ));
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update rule");
    } finally {
      setSaving(null);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    if (!canEdit) {
      alert("You do not have permission to edit settings. Login as admin_head for full access.");
      return;
    }

    setSaving(`setting-${key}`);
    try {
      await axios.patch(`${API_BASE}/settings/system`, { key, value });
      setSettings(settings.map(s => s.key === key ? { ...s, value } : s));
      setEditingSetting(null);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update setting");
    } finally {
      setSaving(null);
    }
  };

  const modules = [...new Set(rules.map(r => r.module_code))];
  const filteredRules = filterModule === "all" ? rules : rules.filter(r => r.module_code === filterModule);

  if (loading) {
    return <div className="loading">Loading settings...</div>;
  }

  return (
    <div className="settings-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>System Settings</h2>
        <div style={{ 
          padding: "0.5rem 1rem", 
          borderRadius: "4px", 
          backgroundColor: canEdit ? "#e8f5e9" : "#fff3e0",
          color: canEdit ? "#2e7d32" : "#e65100",
          fontWeight: "bold",
        }}>
          {canEdit ? "Edit Mode" : "View Only Mode"}
        </div>
      </div>

      {/* System Settings */}
      <div style={{ marginBottom: "2rem", backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px" }}>
        <h3 style={{ marginTop: 0 }}>General Settings</h3>
        {settings.length === 0 ? (
          <p>No settings found.</p>
        ) : (
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {settings.map((s) => (
              <div 
                key={s.id} 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "200px 1fr 200px", 
                  gap: "1rem",
                  alignItems: "center",
                  padding: "0.75rem",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <div>
                  <strong>{s.key}</strong>
                  {s.description && <div style={{ fontSize: "0.8rem", color: "#666" }}>{s.description}</div>}
                </div>
                <div>
                  {editingSetting?.key === s.key ? (
                    <input
                      type="text"
                      value={editingSetting.value}
                      onChange={(e) => setEditingSetting({ ...editingSetting, value: e.target.value })}
                      style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
                      autoFocus
                    />
                  ) : (
                    <span style={{ fontFamily: "monospace", backgroundColor: "#f5f5f5", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
                      {s.value}
                    </span>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  {editingSetting?.key === s.key ? (
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => updateSetting(s.key, editingSetting.value)}
                        disabled={saving === `setting-${s.key}`}
                        style={{ padding: "0.5rem 1rem", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        {saving === `setting-${s.key}` ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => setEditingSetting(null)}
                        style={{ padding: "0.5rem 1rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => canEdit ? setEditingSetting({ key: s.key, value: s.value }) : alert("View only mode")}
                      style={{ 
                        padding: "0.5rem 1rem", 
                        backgroundColor: canEdit ? "#2196f3" : "#ccc", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px", 
                        cursor: canEdit ? "pointer" : "not-allowed" 
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Business Rules */}
      <div style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ margin: 0 }}>Business Rules</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label>Filter by Module:</label>
            <select 
              value={filterModule} 
              onChange={(e) => setFilterModule(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px" }}
            >
              <option value="all">All Modules</option>
              {modules.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredRules.length === 0 ? (
          <p>No rules found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Module</th>
                <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Rule Code</th>
                <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ccc" }}>Description</th>
                <th style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc", width: "120px" }}>Status</th>
                <th style={{ padding: "0.75rem", textAlign: "center", border: "1px solid #ccc", width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((r) => (
                <tr key={r.id} style={{ backgroundColor: r.is_locked ? "#fff8e1" : "white" }}>
                  <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>
                    <span style={{ 
                      display: "inline-block",
                      padding: "0.25rem 0.5rem", 
                      backgroundColor: "#e3f2fd", 
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}>
                      {r.module_code}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem", border: "1px solid #ccc", fontFamily: "monospace" }}>
                    {r.rule_code}
                  </td>
                  <td style={{ padding: "0.75rem", border: "1px solid #ccc" }}>
                    {r.rule_description}
                    {r.is_locked && <span style={{ color: "#f57c00", marginLeft: "0.5rem" }}>(Locked)</span>}
                  </td>
                  <td style={{ padding: "0.75rem", border: "1px solid #ccc", textAlign: "center" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      backgroundColor: r.is_enabled ? "#4caf50" : "#f44336",
                      color: "white",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}>
                      {r.is_enabled ? "ON" : "OFF"}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem", border: "1px solid #ccc", textAlign: "center" }}>
                    <button
                      onClick={() => toggleRule(r.id, r.is_enabled)}
                      disabled={saving === `rule-${r.id}` || r.is_locked || !canEdit}
                      style={{
                        padding: "0.4rem 0.75rem",
                        backgroundColor: r.is_locked ? "#ccc" : (canEdit ? (r.is_enabled ? "#f44336" : "#4caf50") : "#ccc"),
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: r.is_locked || !canEdit ? "not-allowed" : "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      {saving === `rule-${r.id}` ? "..." : (r.is_enabled ? "Turn OFF" : "Turn ON")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#666" }}>
          Total Rules: {filteredRules.length} | 
          Enabled: {filteredRules.filter(r => r.is_enabled).length} | 
          Disabled: {filteredRules.filter(r => !r.is_enabled).length}
          {!canEdit && (
            <span style={{ marginLeft: "1rem", color: "#e65100" }}>
              Login as admin_head to edit rules
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
