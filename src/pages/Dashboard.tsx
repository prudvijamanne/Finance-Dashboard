import React from 'react';
import {
  Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowRight, Clock
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { SummaryCard } from '../components/SummaryCard';
import { BalanceTrendChart } from '../components/charts/BalanceTrendChart';
import { SpendingBreakdown } from '../components/charts/SpendingBreakdown';
import { computeMonthlyData, computeCategoryBreakdown, CATEGORY_COLORS } from '../data/mockData';

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const Dashboard: React.FC = () => {
  const { transactions, getTotalIncome, getTotalExpenses, getTotalBalance, setActivePage } = useFinanceStore();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const totalBalance = getTotalBalance();
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const monthlyData = computeMonthlyData(transactions);
  const categoryData = computeCategoryBreakdown(transactions);

  // Compute month-over-month trends
  const lastTwo = monthlyData.slice(-2);
  const incomeTrend = lastTwo.length === 2 && lastTwo[0].income > 0
    ? ((lastTwo[1].income - lastTwo[0].income) / lastTwo[0].income) * 100 : 0;
  const expenseTrend = lastTwo.length === 2 && lastTwo[0].expenses > 0
    ? ((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100 : 0;

  // Recent 6 transactions
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  return (
    <div>
      {/* Summary Cards */}
      <div className="summary-grid">
        <SummaryCard variant="balance" label="Total Balance" value={fmt(totalBalance)} icon={Wallet} />
        <SummaryCard variant="income" label="Total Income" value={fmt(totalIncome)} icon={TrendingUp} trend={incomeTrend} />
        <SummaryCard variant="expense" label="Total Expenses" value={fmt(totalExpenses)} icon={TrendingDown} trend={expenseTrend} />
        <SummaryCard variant="savings" label="Savings Rate" value={`${savingsRate.toFixed(1)}%`} icon={PiggyBank} />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Balance Trend */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-title">Balance Trend</div>
              <div className="chart-subtitle">Running balance over time</div>
            </div>
          </div>
          <BalanceTrendChart data={monthlyData} />
        </div>

        {/* Spending Breakdown */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-title">Spending Breakdown</div>
              <div className="chart-subtitle">Expenses by category</div>
            </div>
          </div>
          <SpendingBreakdown data={categoryData} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Recent Transactions</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 1 }}>Latest 6 transactions</div>
          </div>
          <button
            id="view-all-transactions-btn"
            className="btn btn-ghost btn-sm"
            onClick={() => setActivePage('transactions')}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div className="recent-tx-list">
          {recent.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px 0' }}>No transactions yet.</p>
          ) : (
            recent.map((t) => (
              <div key={t.id} className="recent-tx-item">
                <div
                  className="recent-tx-icon"
                  style={{
                    background: `${CATEGORY_COLORS[t.category] ?? '#94a3b8'}22`,
                    color: CATEGORY_COLORS[t.category] ?? '#94a3b8',
                  }}
                >
                  {t.category.charAt(0)}
                </div>
                <div className="recent-tx-info">
                  <div className="recent-tx-desc">{t.description}</div>
                  <div className="recent-tx-meta">
                    {t.category} · <Clock size={10} style={{ display: 'inline', marginRight: 2 }} />
                    {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className={`recent-tx-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
