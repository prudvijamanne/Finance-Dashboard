import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { MonthlyData } from '../../data/mockData';

interface Props { data: MonthlyData[]; }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '10px 14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: 13,
      }}>
        <p style={{ fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.key} style={{ color: p.color, margin: '2px 0' }}>
            {p.name}: <strong>${p.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const BalanceTrendChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height={220}>
    <AreaChart data={data} margin={{ top: 6, right: 6, left: -10, bottom: 0 }}>
      <defs>
        <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
      <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false}
        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
      <Tooltip content={<CustomTooltip />} />
      <Area type="monotone" dataKey="balance" name="Balance" stroke="#6366f1" strokeWidth={2.5}
        fill="url(#balanceGrad)" dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
        activeDot={{ r: 6, fill: '#6366f1' }} />
    </AreaChart>
  </ResponsiveContainer>
);
