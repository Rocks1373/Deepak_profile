# GAPP Standalone Demo

This is a **standalone demo** that works **without any backend**. All data is mock/dummy data stored locally.

## Features

- ✅ **No Backend Required** - Works completely standalone
- ✅ **Interactive** - Click through all features
- ✅ **Dummy Data** - Pre-loaded with realistic warehouse data
- ✅ **All Features** - Dashboard, Tables, Reports, Approvals, Mobile UI
- ✅ **Fully Functional** - All interactions work without API calls

## Quick Start

1. Start only the frontend:
   ```bash
   cd frontend
   npm install  # First time only
   npm run dev
   ```

2. Open the demo:
   ```
   http://localhost:3000/demo
   ```

## What's Included

### Mock Data Available

- **Shipments**: 3 sample shipments with different statuses
- **Orders**: 4 sample orders (pending, picked, checked, dispatched)
- **Approvals**: 3 pending approvals from different sources
- **Tables**: 6 database tables with sample data
- **Reports**: 5 pre-defined reports with results
- **Stock**: Sample stock levels and locations

### Interactive Features

All features are clickable and work without backend:

1. **Dashboard** - Shows mock metrics and stock summary
2. **Mobile UI** - Interactive mobile app preview
3. **Data Tables** - Browse tables and view sample data
4. **Reports** - Run reports and see results
5. **Approvals** - View pending approvals (read-only in demo)

## File Structure

```
demo/
├── README.md           # This file
├── data/
│   └── mockData.ts    # All mock/dummy data
└── components/         # Demo-specific components (in frontend/src/components/demo)
```

## Notes

- All data is **read-only** in demo mode
- No actual database operations
- No API calls made
- Perfect for presentations and demos
- Can run on any machine without setup
