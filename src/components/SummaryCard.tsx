import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  variant: 'balance' | 'income' | 'expense' | 'savings';
  label: string;
  value: string;
  trend?: number; // e.g. +5.2 or -3.1
  icon: LucideIcon;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ variant, label, value, trend, icon: Icon }) => {
  const positive = trend !== undefined && trend >= 0;

  return (
    <div className={`summary-card ${variant}`} id={`summary-card-${variant}`}>
      <div className="summary-card-header">
        <span className="summary-card-label">{label}</span>
        <div className="summary-card-icon">
          <Icon size={18} />
        </div>
      </div>
      <div className="summary-card-value">{value}</div>
      {trend !== undefined && (
        <div className={`summary-card-trend ${positive ? 'trend-up' : 'trend-down'}`}>
          {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(trend).toFixed(1)}% vs last month
        </div>
      )}
    </div>
  );
};
