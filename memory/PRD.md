# Address Approval Dashboard — Prototype

## Original problem statement
Build an interactive desktop prototype based on the attached UI screens for an Address Approval Dashboard used to review employee address change requests. Replicate the visual design exactly. Frontend-only, no backend. Support four interactions with smooth animations:
1. Clicking "View" on a row → Address Details side panel slides in from the right.
2. Clicking the Fact Check card → Fact Check popover.
3. Clicking the Downstream Impact card → Downstream Impact popover.
4. Clicking the Track Record card → Track Record popover.

Use mock data exactly as shown. Desktop only. Portfolio/stakeholder-ready polish.

## Architecture / stack
- React 19 + Tailwind + Framer Motion + Recharts (frontend only).
- No backend, no APIs — all mock data lives in `/app/frontend/src/data/mockData.js`.
- Single route `/` renders `pages/AddressApprovalDashboard.jsx`.
- Components under `/app/frontend/src/components/dashboard/`:
  - `MetricCard.jsx`, `ConfidenceDots.jsx`, `RequestsTable.jsx`
  - `FactCheckPopover.jsx`, `DownstreamImpactPopover.jsx`, `TrackRecordPopover.jsx`
  - `AddressDetailsPanel.jsx`
- Font: Manrope (imported in `App.css`).

## User personas
- Reviewer / ops lead who validates address change requests.
- Design reviewer / stakeholder viewing the prototype in a portfolio setting.

## Core requirements (static)
- Exact-visual replication of screenshots (title, banner, 5 metric cards in 3 groups, table with left color accent bars, verdict badges, confidence dots, View button).
- 4 interactions with smooth animated open/close.
- Detail panel slides in from the right; popovers are anchored to their card.
- Hover states on buttons and cards.
- All mock rows and popover content match the screenshots.

## What's been implemented (2026-02)
- Fully-styled Address Approval Dashboard with all 10 rows.
- Fact Check, Downstream Impact, Track Record anchored popovers (framer-motion open/close, invisible backdrop for outside-click dismissal, single-click switching between popovers).
- Address Details slide-in side panel with 6-check timeline, expandable FAIL cards, inline SVG street map, agent verdict footer. Per-row check sequences built via `buildCheckSequence(req)`.
- Recharts-based bar+trend charts in Track Record popover.
- Testing agent iteration 1 → 100% pass on all 8 flows.

## Backlog / potential next steps (P1 / P2)
- P1: On-page filters / search over the requests table.
- P1: "Approve" / "Reject" override actions inside the side panel.
- P2: Real map tile in the side panel via a Google/Mapbox key.
- P2: Row-level animation entrance stagger on first load; keyboard nav (Esc to close, ←/→ between requests).
- P2: Export decision log as CSV/PDF for stakeholder handoff.
