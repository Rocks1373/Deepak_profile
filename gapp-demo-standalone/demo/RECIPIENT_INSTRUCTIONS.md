# GAPP Demo - Instructions for Recipients

## Welcome! 👋

You've received the **GAPP Standalone Demo** - a fully functional warehouse management system demo that works without any backend or database setup.

## Quick Start (3 Steps)

### Step 1: Install Node.js (if needed)

If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Install version 16 or higher
- Verify installation: Open terminal and run `node --version`

### Step 2: Install Dependencies

Open terminal/command prompt in the `frontend` folder:

```bash
cd frontend
npm install
```

This will take 1-2 minutes to download dependencies.

### Step 3: Start the Demo

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

### Step 4: Open in Browser

Open your web browser and go to:
```
http://localhost:3000/demo
```

Click **"Yes, I am Mr. Ahmed"** to start exploring!

## What You Can Do

### Explore Features

1. **Dashboard** - See warehouse metrics and stock summary
2. **Mobile UI** - View mobile app screens and workflows
3. **Data Tables** - Browse 6 database tables with sample data
   - Select a table from dropdown
   - View data in the table
4. **Reports** - Run 5 pre-defined reports
   - Select a report from dropdown
   - Click "Run Report" to see results
5. **Guide** - Read system documentation

### All Features Are Interactive

- ✅ Click through all tabs
- ✅ Select tables and view data
- ✅ Run reports and see results
- ✅ Explore mobile UI screens
- ✅ Everything works without backend!

## System Requirements

- **Node.js**: v16 or higher
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Disk Space**: ~200 MB
- **Internet**: Only needed for initial `npm install`

## Troubleshooting

### Port 3000 Already in Use

If you see "Port 3000 is already in use":

**Option 1:** Close the other application using port 3000

**Option 2:** Change the port:
1. Open `frontend/vite.config.ts`
2. Change `port: 3000` to `port: 3001` (or any other port)
3. Restart: `npm run dev`
4. Open: `http://localhost:3001/demo`

### npm install Fails

1. Check Node.js version: `node --version` (should be v16+)
2. Clear npm cache: `npm cache clean --force`
3. Try again: `npm install`

### Demo Page Shows Blank

1. Open browser console (F12)
2. Check for errors
3. Make sure you're going to `/demo` not just `/`
4. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### "Cannot find module" Errors

Make sure you:
1. Ran `npm install` in the `frontend` folder
2. Are running `npm run dev` from the `frontend` folder

## What's Included

- **Mock Data**: All data is pre-loaded (no database needed)
- **6 Tables**: shipments, orders, stock_master, check_logs, approvals, users
- **5 Reports**: Pre-defined reports with sample results
- **Mobile UI**: Interactive mobile app preview
- **Full Documentation**: Guide section with system overview

## Notes

- ✅ **No Backend Required** - Everything works standalone
- ✅ **No Database** - All data is mock/dummy data
- ✅ **Read-Only** - Safe to explore, nothing is saved
- ✅ **No Internet Needed** - After initial npm install
- ✅ **Cross-Platform** - Works on Windows, Mac, Linux

## Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. See `demo/QUICK_START.md` for more details
3. Check browser console (F12) for error messages

## Enjoy Exploring! 🚀

The demo showcases all major features of the GAPP warehouse management system. Feel free to explore and click through everything!
