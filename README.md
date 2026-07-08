# Nimbus — Cloud Infrastructure Monitoring Dashboard

A real-time-style dashboard for monitoring cloud infrastructure health, resource
utilization, and alerts across a multi-cloud server fleet. Built as a
front-end-only React application backed by static JSON data (no backend
required).

![Stack](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)

## Features

- **Dashboard** — fleet KPI cards (active servers, CPU/memory/disk usage,
  network traffic, active alerts), a 24-hour CPU & memory utilization area
  chart, a server health donut chart, and a recent alerts feed.
- **Servers** — searchable, filterable, sortable table of every monitored
  instance with live status badges and inline utilization bars.
- **Alerts** — filterable alert stream by severity with acknowledge/undo
  actions.
- **Reports** — monthly operational summary: incident volume, MTTR, uptime by
  region, and cost breakdown by cloud provider.
- **Dark / light theme** with system-preference detection and persistence.
- **Fully responsive** — collapsible desktop sidebar, off-canvas mobile
  navigation, and a mobile-friendly header search.
- **Reusable component library** — cards, badges, progress bars, sparklines,
  empty states, and loading skeletons shared across pages.

## Tech stack

| Layer      | Choice                                    |
|------------|--------------------------------------------|
| Framework  | React 19 + Vite                             |
| Routing    | React Router 7                              |
| Styling    | Tailwind CSS 4 (CSS-first `@theme` tokens)  |
| Charts     | Recharts                                    |
| Icons      | Lucide React                                |
| Data       | Static JS data modules (`src/data`)         |

## Project structure

```
src/
├── components/
│   ├── layout/     # Sidebar, Header, AppShell
│   ├── dashboard/  # StatCard, UtilizationChart, ServerHealthChart, AlertsPanel
│   ├── servers/    # ServerTable, StatusFilter
│   └── common/     # Card, Badge, StatusDot, ProgressBar, Sparkline, EmptyState, Skeleton
├── pages/          # Dashboard, Servers, Alerts, Reports (one per route)
├── data/           # Static datasets: servers, alerts, metrics, reports
├── context/        # ThemeContext (dark/light persistence)
├── hooks/          # useDebouncedValue
├── App.jsx         # Route table
└── main.jsx        # Entry point
```

## Getting started

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# Vite will print a local URL, typically http://localhost:5173
```

### Production build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Replacing the static data

All demo data lives in `src/data/`:

- `servers.js` — server fleet, status metadata, region/provider lists
- `alerts.js` — alert feed and severity metadata
- `metrics.js` — 24-hour CPU/memory/network history and sparkline samples
- `reports.js` — weekly incidents, uptime by region, cost by provider

Swap any of these modules for a real API call (e.g. inside a `useEffect` or a
data-fetching library) to connect the dashboard to a live backend — the
components only depend on the shapes exported from these files.

## Design notes

The visual language is built around a technical, ops-console feel rather than
a generic SaaS look:

- **Space Grotesk** for headings/brand, **Inter** for body copy, and
  **JetBrains Mono** with tabular numerals for every metric readout — so
  numbers stay legible and glanceable, the way they would in a real
  monitoring tool.
- A teal/cyan signal color for primary actions and brand accents, with
  amber (warning), red (critical), and a muted slate (offline) reserved
  strictly for status meaning.
- Critical alerts and critical-status servers get a soft pulsing dot instead
  of louder color alone, so incidents draw the eye without overwhelming the
  interface.
- Light and dark themes are driven by CSS custom properties mapped into
  Tailwind's `@theme`, so every component automatically adapts — no
  duplicated `dark:` classes scattered through the app logic.

## License

Provided as-is for demonstration purposes.
