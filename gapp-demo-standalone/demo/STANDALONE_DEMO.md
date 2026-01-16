# Standalone Demo - No Backend Required

This demo works **completely standalone** without any backend server. All data is mock/dummy data.

## Quick Start

### Option 1: Frontend Only (Recommended for Demo)

```bash
cd frontend
npm install  # First time only
npm run dev
```

Then open: **http://localhost:3000/demo**

### Option 2: Using Start Script (Backend Optional)

```bash
./start.sh  # Backend will start but demo doesn't need it
```

Then open: **http://localhost:3000/demo**

## What Works Without Backend

✅ **Dashboard** - Shows mock metrics and stock summary  
✅ **Mobile UI** - Interactive mobile app preview  
✅ **Data Tables** - Browse 6 tables with sample data  
✅ **Reports** - Run 5 pre-defined reports with results  
✅ **Guide Section** - Complete documentation  
✅ **All Navigation** - Fully interactive  

## Mock Data Included

### Tables Available
- `shipments` - 2 sample shipments
- `orders` - 2 sample orders  
- `stock_master` - 2 sample stock items

### Reports Available
1. Daily Inbound Summary
2. Stock Level Report
3. Outbound Orders Status
4. Approval Pending Report
5. Variance Analysis

### Approvals
- 3 sample pending approvals from different sources (TELEGRAM, WEB, MOBILE)

## Features

- **No API Calls** - All data is local mock data
- **Fully Interactive** - Click through all features
- **Realistic Data** - Sample data that looks real
- **Fast Loading** - No network delays (simulated with small delays)
- **Read-Only** - Safe to explore without affecting anything

## File Structure

```
demo/
├── README.md              # Demo overview
├── STANDALONE_DEMO.md     # This file
└── data/
    └── mockData.ts        # All mock data definitions
```

## Testing the Demo

1. Start frontend: `cd frontend && npm run dev`
2. Open: http://localhost:3000/demo
3. Click "Yes, I am Mr. Ahmed" to start
4. Explore all tabs:
   - **Dashboard** - See mock metrics
   - **Mobile UI** - View mobile screens
   - **Data Tables** - Select a table and view data
   - **Reports** - Select and run a report
   - **Guide** - Read documentation

## Notes

- All interactions are **read-only**
- No data is saved or modified
- Perfect for presentations
- Works on any machine
- No database or backend setup needed
