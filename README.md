## 🔗 Live Demo
[https://performance-dashboard-five-ruby.vercel.app/dashboard](https://performance-dashboard-five-ruby.vercel.app/dashboard)


# Performance-Critical Real-Time Visualization Dashboard (Next.js 14 + TypeScript)

A high-performance real-time dashboard that renders **10,000+ points at 60 FPS** using a **Canvas-first** approach (no Chart.js/D3). Built with **Next.js App Router**, **React 18**, and **TypeScript**. Includes live data stream, interactive controls, virtualization, and an on-screen FPS/memory monitor.

---

## 🔗 Demo / Video
- **Local**: `http://localhost:3000/dashboard`


---


## ✨ Features

- **Charts:** Line, Bar, Scatter, Heatmap (pure Canvas)
- **Real-time updates:** every **100ms** (simulated stream)
- **Interactive:** category filter + time window (5m/15m/30m/1h)
- **Virtualized table:** smooth scroll across thousands of rows
- **Performance overlay:** FPS + memory (Chromium)
- **Responsive UI:** desktop/tablet/mobile friendly
- **No chart libraries** and **no blocking work** on the main React tree

---
|



## 🧱 Tech Stack & Key Decisions

- **Next.js 14 App Router**: server component for initial data → faster interactive paint
- **Client components**: charts, controls, data stream
- **TypeScript**: strict types for safety
- **Canvas**: smooth, low-overhead drawing with `requestAnimationFrame`
- **State model**:
  - Large data kept in a **mutable `ref`** (`DataProvider`) to avoid React re-renders
  - Charts **pull** data per frame → React isn’t involved in per-point updates
- **Virtualization**: renders ~50 rows at a time instead of thousands

---

## 📁 Project Structure
performance-dashboard-final/
├── app/
│ ├── api/data/route.ts # Example data API
│ ├── dashboard/
│ │ ├── page.tsx # Server component (initial dataset)
│ │ └── runner.tsx # Starts the client data stream
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx # Link to /dashboard
├── components/
│ ├── charts/ # Canvas charts (no libraries)
│ ├── controls/ # Filter + Time range
│ ├── providers/DataProvider.tsx # Ref-backed store + filters
│ └── ui/ # Performance monitor + table
├── hooks/ # useDataStream, useChartRenderer, etc.
├── lib/ # canvas utils, types, generator
├── public/
│ └── screenshots/ # <-- put PNG screenshots here
├── package.json
├── tsconfig.json
└── next.config.js

