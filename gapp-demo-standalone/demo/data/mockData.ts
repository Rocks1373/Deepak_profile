// Mock data for standalone demo - no backend required

export interface MockShipment {
  id: number;
  shipmentCode: string;
  localPoCode: string;
  shipmentStatus: string;
  vendorName: string;
  expectedDate: string;
  receivedDate?: string;
}

export interface MockOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  status: string;
  totalItems: number;
  orderDate: string;
}

export interface MockApproval {
  id: number;
  step: {
    step_name: string;
    module: string;
  };
  reference_value: string;
  requested_action: string;
  description?: string;
  requested_at: string;
  source: string;
}

export interface MockTable {
  name: string;
  rowCount: number;
  description: string;
}

export interface MockReport {
  id: number;
  name: string;
  description: string;
  category: string;
}

// Mock Shipments
export const mockShipments: MockShipment[] = [
  {
    id: 1,
    shipmentCode: "SH-2024-001",
    localPoCode: "PO-2024-001",
    shipmentStatus: "RECEIVED",
    vendorName: "ABC Suppliers Ltd",
    expectedDate: "2024-01-15",
    receivedDate: "2024-01-15",
  },
  {
    id: 2,
    shipmentCode: "SH-2024-002",
    localPoCode: "PO-2024-002",
    shipmentStatus: "IN_TRANSIT",
    vendorName: "XYZ Manufacturing",
    expectedDate: "2024-01-16",
  },
  {
    id: 3,
    shipmentCode: "SH-2024-003",
    localPoCode: "PO-2024-003",
    shipmentStatus: "RECEIVED",
    vendorName: "Global Parts Inc",
    expectedDate: "2024-01-14",
    receivedDate: "2024-01-14",
  },
];

// Mock Orders
export const mockOrders: MockOrder[] = [
  {
    id: 1,
    orderNumber: "SO-2024-001",
    customerName: "ABC Corporation",
    status: "PICKED",
    totalItems: 15,
    orderDate: "2024-01-15",
  },
  {
    id: 2,
    orderNumber: "SO-2024-002",
    customerName: "XYZ Industries",
    status: "CHECKED",
    totalItems: 8,
    orderDate: "2024-01-15",
  },
  {
    id: 3,
    orderNumber: "SO-2024-003",
    customerName: "Tech Solutions Ltd",
    status: "DISPATCHED",
    totalItems: 22,
    orderDate: "2024-01-14",
  },
  {
    id: 4,
    orderNumber: "SO-2024-004",
    customerName: "Manufacturing Co",
    status: "PENDING",
    totalItems: 12,
    orderDate: "2024-01-16",
  },
];

// Mock Approvals
export const mockApprovals: MockApproval[] = [
  {
    id: 1,
    step: {
      step_name: "Stock Posting",
      module: "INBOUND",
    },
    reference_value: "PO-2024-001",
    requested_action: "Post Stock",
    description: "Post stock for shipment PO-2024-001 with variance check",
    requested_at: "2024-01-15T10:30:00Z",
    source: "TELEGRAM",
  },
  {
    id: 2,
    step: {
      step_name: "Dispatch Confirmation",
      module: "OUTBOUND",
    },
    reference_value: "SO-2024-002",
    requested_action: "Confirm Dispatch",
    description: "Confirm dispatch for order SO-2024-002",
    requested_at: "2024-01-15T11:15:00Z",
    source: "WEB",
  },
  {
    id: 3,
    step: {
      step_name: "Stock Adjustment",
      module: "INVENTORY",
    },
    reference_value: "ADJ-2024-001",
    requested_action: "Adjust Stock",
    description: "Stock adjustment for damaged items",
    requested_at: "2024-01-15T09:45:00Z",
    source: "MOBILE",
  },
];

// Mock Tables
export const mockTables: MockTable[] = [
  {
    name: "shipments",
    rowCount: 1250,
    description: "Incoming shipments and purchase orders",
  },
  {
    name: "orders",
    rowCount: 3420,
    description: "Outbound sales orders",
  },
  {
    name: "stock_master",
    rowCount: 8500,
    description: "Current stock levels by part number",
  },
  {
    name: "check_logs",
    rowCount: 15200,
    description: "Receiving check logs with quantities",
  },
  {
    name: "approvals",
    rowCount: 450,
    description: "Pending and completed approvals",
  },
  {
    name: "users",
    rowCount: 85,
    description: "System users and their roles",
  },
];

// Mock Reports
export const mockReports: MockReport[] = [
  {
    id: 1,
    name: "Daily Inbound Summary",
    description: "Summary of all inbound shipments received today",
    category: "Inbound",
  },
  {
    id: 2,
    name: "Stock Level Report",
    description: "Current stock levels by location and part number",
    category: "Inventory",
  },
  {
    id: 3,
    name: "Outbound Orders Status",
    description: "Status of all outbound orders by stage",
    category: "Outbound",
  },
  {
    id: 4,
    name: "Approval Pending Report",
    description: "All pending approvals grouped by module",
    category: "Approvals",
  },
  {
    id: 5,
    name: "Variance Analysis",
    description: "Variance analysis for received shipments",
    category: "Inbound",
  },
];

// Mock Table Data
export const mockTableData: Record<string, any[]> = {
  shipments: [
    {
      id: 1,
      shipment_code: "SH-2024-001",
      local_po_code: "PO-2024-001",
      vendor_name: "ABC Suppliers Ltd",
      shipment_status: "RECEIVED",
      expected_date: "2024-01-15",
      received_date: "2024-01-15",
      total_parts: 25,
      total_qty: 1500,
    },
    {
      id: 2,
      shipment_code: "SH-2024-002",
      local_po_code: "PO-2024-002",
      vendor_name: "XYZ Manufacturing",
      shipment_status: "IN_TRANSIT",
      expected_date: "2024-01-16",
      total_parts: 18,
      total_qty: 980,
    },
  ],
  orders: [
    {
      id: 1,
      order_number: "SO-2024-001",
      customer_name: "ABC Corporation",
      order_status: "PICKED",
      total_items: 15,
      order_date: "2024-01-15",
      total_value: 45000,
    },
    {
      id: 2,
      order_number: "SO-2024-002",
      customer_name: "XYZ Industries",
      order_status: "CHECKED",
      total_items: 8,
      order_date: "2024-01-15",
      total_value: 28000,
    },
  ],
  stock_master: [
    {
      part_number: "PART-001",
      description: "Component A",
      location: "A-01-B-02",
      current_qty: 450,
      reserved_qty: 50,
      available_qty: 400,
      last_updated: "2024-01-15T10:30:00Z",
    },
    {
      part_number: "PART-002",
      description: "Component B",
      location: "A-02-B-01",
      current_qty: 320,
      reserved_qty: 20,
      available_qty: 300,
      last_updated: "2024-01-15T09:15:00Z",
    },
  ],
};

// Mock Report Results
export const mockReportResults: Record<number, any> = {
  1: {
    columns: ["Shipment Code", "Vendor", "Status", "Parts", "Quantity"],
    rows: [
      ["SH-2024-001", "ABC Suppliers", "RECEIVED", 25, 1500],
      ["SH-2024-002", "XYZ Manufacturing", "IN_TRANSIT", 18, 980],
      ["SH-2024-003", "Global Parts", "RECEIVED", 32, 2100],
    ],
  },
  2: {
    columns: ["Part Number", "Description", "Location", "Current Qty", "Available"],
    rows: [
      ["PART-001", "Component A", "A-01-B-02", 450, 400],
      ["PART-002", "Component B", "A-02-B-01", 320, 300],
      ["PART-003", "Component C", "A-03-B-01", 280, 250],
    ],
  },
  3: {
    columns: ["Order Number", "Customer", "Status", "Items", "Value"],
    rows: [
      ["SO-2024-001", "ABC Corp", "PICKED", 15, 45000],
      ["SO-2024-002", "XYZ Industries", "CHECKED", 8, 28000],
      ["SO-2024-003", "Tech Solutions", "DISPATCHED", 22, 65000],
    ],
  },
};

// Helper function to get mock data with delay (simulate API)
export const getMockData = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};
