# Zorvyn — Finance Dashboard

A modern, interactive finance dashboard built with **React 18 + Vite + TypeScript**. Track income, expenses, and spending patterns with rich visualizations, role-based UI, and dark mode support.

---

## 🚀 Setup & Running

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App will be available at **http://localhost:5173**

---

## ✨ Features

### 📊 Dashboard Overview
- **4 Summary Cards** — Total Balance, Income, Expenses, Savings Rate with month-over-month trend indicators
- **Balance Trend Chart** — Area chart of your running balance over time
- **Spending Breakdown** — Donut chart showing expenses by category
- **Recent Transactions** — Latest 6 transactions with quick-view to full list

### 💳 Transactions
- Full transaction table with Date, Amount, Category, and Type
- **Search** — real-time text search across description and category
- **Filters** — by category, type (income/expense), and date range
- **Sorting** — click column headers to sort by Date or Amount (asc/desc)
- **Active filter pills** — see what's active and dismiss individually
- **Admin only** — Add, Edit, Delete transactions
- **Double-confirm delete** — click delete twice to prevent accidental removal
- **Export** — JSON export of current filtered view; CSV export from topbar

### 📈 Insights
- Highest spending category card with percentage share
- Average daily spend across active days
- Savings rate with contextual feedback
- Month-over-month income and expense change percentages
- Monthly income vs expense grouped bar chart
- Top 5 spending categories with animated progress bars

### 🔐 Role-Based UI
| Feature | Viewer | Admin |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

Switch roles using the **dropdown in the top bar**. Role badge updates in real-time.

### 🌗 Dark / Light Mode
Toggle via the sun/moon icon in the topbar. Preference is persisted to `localStorage`.

### 💾 Data Persistence
All state (transactions, role, dark mode preference) is persisted to `localStorage` via Zustand's `persist` middleware. Data survives page refreshes.

### 📤 Export
- **CSV** — click the download icon in the topbar to export all transactions
- **JSON** — click "Export JSON" on the transactions page to export the current filtered view

---

## 🛠 Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, minimal config |
| Language | TypeScript | Type safety throughout |
| State | Zustand + persist | Simple, scalable, localStorage sync |
| Charts | Recharts | Composable, responsive SVG charts |
| Icons | Lucide React | Consistent, lightweight icon set |
| Styling | Vanilla CSS | Full control, no abstraction overhead |
| Fonts | Google Fonts — Inter | Clean, modern, highly legible |

---

## 📁 Project Structure

```
src/
├── data/
│   └── mockData.ts          # 40+ mock transactions, categories, aggregation helpers
├── store/
│   └── useFinanceStore.ts   # Zustand store — transactions, filters, role, darkMode
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx      # Collapsible sidebar with navigation
│   │   └── Topbar.tsx       # Role switcher, dark mode toggle, export, page title
│   ├── charts/
│   │   ├── BalanceTrendChart.tsx   # Area chart — balance over time
│   │   ├── SpendingBreakdown.tsx   # Donut chart — spending by category
│   │   └── MonthlyComparison.tsx  # Bar chart — income vs expenses MoM
│   ├── SummaryCard.tsx      # Reusable metric card with icon + trend
│   ├── TransactionModal.tsx # Add/Edit modal with validation
│   └── EmptyState.tsx       # Friendly empty state component
├── pages/
│   ├── Dashboard.tsx        # Overview page
│   ├── Transactions.tsx     # Full transaction management
│   └── Insights.tsx         # Analytics and spending patterns
├── App.tsx                  # Root layout, sidebar/topbar, page routing
├── main.tsx                 # React entry point
└── index.css                # Full design system (tokens, components, responsive)
```

---

## 🎨 Design Decisions

- **CSS Variables** for seamless dark/light switching without layout recalculation
- **Gradient accents** using `--brand-primary` (#6366f1 indigo) throughout
- **Responsive breakpoints** at 1200px, 900px, 768px, 540px
- **Collapsible sidebar** reduces visual noise on smaller screens
- **Double-confirm delete** prevents accidental data loss in admin mode
- **Animated rank bars** on Insights page for visual engagement

---

## 📱 Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| ≥ 1200px | Full sidebar + 2-column charts grid |
| 900–1200px | Charts stack to 1 column |
| 768–900px | Summary cards go 2-column |
| < 768px | Sidebar hidden (hamburger menu) |
| < 540px | Summary cards go 1-column |
