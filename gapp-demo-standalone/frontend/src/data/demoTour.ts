import { TourStep } from "../components/demo/GuidedTour";

export const demoSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to GAPP",
    message: "Mr. Ahmed, thank you for your time. GAPP (Ground-level Application for Processing and Planning) is a comprehensive warehouse management system designed to streamline your operations, reduce errors, and provide complete visibility across all processes.",
  },
  {
    id: "vision",
    title: "Our Vision",
    message: "GAPP transforms warehouse operations by digitizing workflows, automating approvals, and providing real-time visibility. This reduces manual paperwork, eliminates delays, and ensures accuracy at every step.",
  },
  {
    id: "dashboard",
    title: "Real-Time Dashboard",
    message: "The dashboard provides instant visibility into today's operations: inbound shipments, outbound orders, pending approvals, and stock levels. All data updates in real-time, so you always have the current status.",
    targetSelector: '[data-tour="dashboard"]',
    route: "/demo",
  },
  {
    id: "inbound-flow",
    title: "Inbound Workflow",
    message: "When shipments arrive, the system tracks them from pre-advice through receiving, checking, and stock posting. Each step has validation rules and can require approval, ensuring accuracy before stock is updated.",
    targetSelector: '[data-tour="inbound"]',
    route: "/demo",
  },
  {
    id: "approvals",
    title: "Approval System",
    message: "The step-by-step approval workflow ensures critical actions are reviewed before execution. Approvers receive notifications and can approve or reject from web or mobile. This prevents errors and maintains control.",
    targetSelector: '[data-tour="approvals"]',
  },
  {
    id: "stock-visibility",
    title: "Stock Visibility",
    message: "Real-time stock levels are visible across all warehouses. The system tracks every movement, so you always know what's available, where it's located, and when it was last updated.",
    targetSelector: '[data-tour="stock"]',
  },
  {
    id: "outbound-flow",
    title: "Outbound Workflow",
    message: "Orders flow through picking, checking, and dispatch stages. Each stage validates quantities and can trigger approvals if needed. This ensures orders are accurate before dispatch.",
    targetSelector: '[data-tour="outbound"]',
  },
  {
    id: "ai-integration",
    title: "AI-Powered Features",
    message: "AI assists with document extraction and OCR, but all critical decisions require human approval. The system suggests actions, but you maintain full control through approval gates and role-based access.",
    targetSelector: '[data-tour="ai"]',
  },
  {
    id: "benefits",
    title: "Key Benefits",
    message: "GAPP saves time by eliminating manual data entry, reduces mistakes through validation and approvals, provides complete visibility for all stakeholders, scales as your operations grow, and reduces manpower pressure by automating routine tasks.",
  },
  {
    id: "summary",
    title: "Summary",
    message: "Mr. Ahmed, GAPP is designed to make your warehouse operations more efficient, accurate, and scalable. The system respects your business rules, requires approvals for critical actions, and provides the visibility you need to make informed decisions. Thank you for your time.",
  },
];
