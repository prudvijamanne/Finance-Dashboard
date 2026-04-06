import React from 'react';
import {
  Trophy, Calendar, TrendingDown, BarChart2, Flame, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import {
  computeMonthlyData, computeCategoryBreakdown, CATEGORY_COLORS
} from '../data/mockData';
import { MonthlyComparison } from '../components/charts/MonthlyComparison';
import { EmptyState } from '../components/EmptyState';

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const fmtFull = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

export const Insights: React.FC = () => {
  const { transactions } = useFinanceStore();

  if (transactions.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <EmptyState
          icon={BarChart2}
          title="No data yet"
          message="Add some transactions to see insights about your spending patterns."
        />
      </div>
    );
  }

  const monthlyData = computeMonthlyData(transactions);
  const categoryBreakdown = computeCategoryBreakdown(transactions);

  // Highest spending category
  const topCategory = categoryBreakdown[0];

  // Total expenses & income
  const totalExpenses = transactions.reduce((s, t) => t.type === 'expense' ? s + t.amount : s, 0);
  const totalIncome = transactions.reduce((s, t) => t.type === 'income' ? s + t.amount : s, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Average daily spend — across unique dates with expenses
  const expenseDates = new Set(transactions.filter(t => t.type === 'expense').map(t => t.date));
  const avgDailySpend = expenseDates.size > 0 ? totalExpenses / expenseDates.size : 0;

  // Month-over-month last 2 months
  const lastTwo = monthlyData.slice(-2);
  const momExpChange = lastTwo.length === 2 && lastTwo[0].expenses > 0
    ? ((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100
    : null;
  const momIncChange = lastTwo.length === 2 && lastTwo[0].income > 0
    ? ((lastTwo[1].income - lastTwo[0].income) / lastTwo[0].income) * 100
    : null;

  // Top 3 categories for ranking bar
  const top3 = categoryBreakdown.slice(0, 5);
  const maxVal = top3[0]?.value ?? 1;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-header-title">Insights</h1>
          <p className="page-header-sub">Smart analysis of your financial patterns</p>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="insights-grid">
        {/* Top spending category */}
        <div className="insight-card">
          <div
            className="insight-icon"
            style={{
              background: topCategory ? `${CATEGORY_COLORS[topCategory.name] ?? '#6366f1'}22` : 'var(--bg-surface-2)',
              color: topCategory ? CATEGORY_COLORS[topCategory.name] : 'var(--brand-primary)',
            }}
          >
            <Trophy size={22} />
          </div>
          <div className="insight-info">
            <div className="insight-label">Top Spending Category</div>
            <div className="insight-value">{topCategory?.name ?? '—'}</div>
            <div className="insight-sub">
              {topCategory ? `${fmtFull(topCategory.value)} total · ${((topCategory.value / totalExpenses) * 100).toFixed(1)}% of expenses` : 'No expenses yet'}
            </div>
          </div>
        </div>

        {/* Average daily spend */}
        <div className="insight-card">
          <div className="insight-icon" style={{ background: 'rgba(239,68,68,.12)', color: '#ef4444' }}>
            <Flame size={22} />
          </div>
          <div className="insight-info">
            <div className="insight-label">Avg. Daily Spend</div>
            <div className="insight-value">{fmtFull(avgDailySpend)}</div>
            <div className="insight-sub">Across {expenseDates.size} days with activity</div>
          </div>
        </div>

        {/* Savings rate */}
        <div className="insight-card">
          <div className="insight-icon" style={{ background: 'rgba(6,182,212,.12)', color: 'var(--brand-accent)' }}>
            <TrendingDown size={22} />
          </div>
          <div className="insight-info">
            <div className="insight-label">Savings Rate</div>
            <div className="insight-value">{savingsRate.toFixed(1)}%</div>
            <div className="insight-sub">
              {savingsRate >= 20 ? '🎉 Great savings discipline!' : savingsRate >= 10 ? '👍 Decent, aim for 20%+' : '⚠️ Try to reduce expenses'}
            </div>
          </div>
        </div>
      </div>

      {/* Month-over-month & Monthly Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, marginBottom: 24 }}>
        {/* Monthly comparison chart */}
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>Monthly Income vs Expenses</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>Side-by-side monthly comparison</div>
          <MonthlyComparison data={monthlyData} />
        </div>

        {/* MoM change stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Month-over-month income */}
          <div className="card" style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
              Income Change (MoM)
            </div>
            {momIncChange !== null ? (
              <>
                <div style={{
                  fontSize: '1.6rem', fontWeight: 800,
                  color: momIncChange >= 0 ? 'var(--color-income)' : 'var(--color-expense)',
                  display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '-.02em'
                }}>
                  {momIncChange >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  {Math.abs(momIncChange).toFixed(1)}%
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {lastTwo[0].month} → {lastTwo[1].month}
                </div>
                <div style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {fmt(lastTwo[0].income)} → <strong>{fmt(lastTwo[1].income)}</strong>
                </div>
              </>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Need ≥2 months of data</p>
            )}
          </div>

          {/* Month-over-month expenses */}
          <div className="card" style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
              Expenses Change (MoM)
            </div>
            {momExpChange !== null ? (
              <>
                <div style={{
                  fontSize: '1.6rem', fontWeight: 800,
                  color: momExpChange <= 0 ? 'var(--color-income)' : 'var(--color-expense)',
                  display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '-.02em'
                }}>
                  {momExpChange >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  {Math.abs(momExpChange).toFixed(1)}%
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {lastTwo[0].month} → {lastTwo[1].month}
                </div>
                <div style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {fmt(lastTwo[0].expenses)} → <strong>{fmt(lastTwo[1].expenses)}</strong>
                </div>
              </>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Need ≥2 months of data</p>
            )}
          </div>

          {/* Net savings */}
          <div className="card" style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--text-muted)', marginBottom: 8 }}>
              Net Savings
            </div>
            <div style={{
              fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-.02em',
              color: totalIncome - totalExpenses >= 0 ? 'var(--color-income)' : 'var(--color-expense)'
            }}>
              {fmt(totalIncome - totalExpenses)}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Income minus all expenses
            </div>
          </div>
        </div>
      </div>

      {/* Top spending categories ranking */}
      <div className="card">
        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>Top Spending Categories</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>
          Ranked by total amount spent
        </div>
        <div className="category-rank-list">
          {top3.map((cat, i) => (
            <div key={cat.name} className="category-rank-item">
              <div className="rank-number">#{i + 1}</div>
              <div className="rank-bar-wrapper">
                <div className="rank-label">
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{cat.name}</span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {fmtFull(cat.value)}
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: 6 }}>
                      ({((cat.value / totalExpenses) * 100).toFixed(1)}%)
                    </span>
                  </span>
                </div>
                <div className="rank-bar-track">
                  <div
                    className="rank-bar-fill"
                    style={{
                      width: `${(cat.value / maxVal) * 100}%`,
                      background: cat.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
