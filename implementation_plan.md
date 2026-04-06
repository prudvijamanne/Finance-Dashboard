# Finance Dashboard UI — Implementation Plan

A full-featured finance dashboard with summary cards, charts, transaction management, insights, and role-based UI simulation.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Vanilla CSS (custom design system) |
| State | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| Fonts | Google Fonts — Inter |

## Proposed Changes

### Project Scaffold

#### [NEW] `package.json`, `vite.config.ts`, `tsconfig.json`
Vite + React + TypeScript project bootstrap via `npx create-vite`.

---

### Data Layer

#### [NEW] `src/data/mockData.ts`
Static mock transactions (~40 entries), categories, and monthly aggregations.

#### [NEW] `src/store/useFinanceStore.ts`
Zustand store managing:
- `transactions[]` — full list + CRUD (add/edit)
- `filters` — search, category, type, date range
- `role` — `'viewer' | 'admin'`
- `darkMode` — boolean
- `selectedMonth` — for insights

Persisted to `localStorage` via Zustand's `persist` middleware.

---

### Layout

#### [NEW] `src/components/layout/Sidebar.tsx`
Collapsible sidebar with nav links: Dashboard, Transactions, Insights.

#### [NEW] `src/components/layout/Topbar.tsx`
Role switcher dropdown, dark mode toggle, app title.

#### [NEW] `src/components/layout/Layout.tsx`
Shell component wrapping Sidebar + Topbar + `<Outlet />`.

---

### Pages

#### [NEW] `src/pages/Dashboard.tsx`
- Summary cards (Total Balance, Total Income, Total Expenses, Savings Rate)
- `BalanceTrendChart` — line chart of monthly balance over time
- `SpendingBreakdownChart` — pie/donut chart of expenses by category
- Recent transactions mini-list

#### [NEW] `src/pages/Transactions.tsx`
- Full transaction table with Date, Amount, Category, Type badge
- Search bar + category filter + type filter + date range filter
- Sort by Date / Amount (asc/desc)
- Admin: Add Transaction modal, Edit/Delete per row
- Empty state when no results match

#### [NEW] `src/pages/Insights.tsx`
- Highest spending category card
- Month-over-month comparison (grouped bar chart)
- Top 3 expense categories ranked
- Average daily spend
- Savings rate trend

---

### Components

#### [NEW] `src/components/SummaryCard.tsx`
Reusable card: icon, label, value, trend indicator (+/- %).

#### [NEW] `src/components/charts/BalanceTrendChart.tsx`
Recharts `LineChart` of monthly balance.

#### [NEW] `src/components/charts/SpendingBreakdown.tsx`
Recharts `PieChart` (donut) by category.

#### [NEW] `src/components/charts/MonthlyComparison.tsx`
Recharts `BarChart` comparing income vs expenses per month.

#### [NEW] `src/components/TransactionModal.tsx`
Modal form to add or edit a transaction (Admin only).

#### [NEW] `src/components/EmptyState.tsx`
Friendly illustration + message shown when lists are empty.

---

### Styles

#### [NEW] `src/index.css`
Full design system: CSS variables for colors (light/dark), typography, spacing, shadows, transitions, scrollbar styling, button/badge utilities.

---

### App Entry

#### [NEW] `src/App.tsx`
React Router v6 `<Routes>` with protected role display, dark mode class applied to `<html>`.

---

### Documentation

#### [NEW] `README.md`
Setup instructions, feature list, role-switching guide, tech decisions.

---

## Verification Plan

### Automated
None (no test framework in scope). Code is type-checked by TypeScript.

### Browser Verification (via browser subagent after `npm run dev`)

1. **Dashboard loads** — navigate to `http://localhost:5173`, confirm summary cards, charts, and recent transactions render.
2. **Dark mode** — click toggle in Topbar, confirm entire UI switches theme.
3. **Role switching** — switch from Viewer → Admin; confirm "Add Transaction" button appears in Transactions page and edit/delete icons appear on rows.
4. **Add transaction (Admin)** — fill modal form, submit, verify new row appears in table and summary cards update.
5. **Filters** — search for a merchant name; filter by category; filter by type; confirm table updates.
6. **Insights page** — navigate and confirm top category, monthly comparison chart, and insights cards render.
7. **Responsive** — resize browser to mobile width (~375px), confirm sidebar collapses and cards stack.
8. **Empty state** — apply a filter that matches no transactions, confirm empty state component renders.
