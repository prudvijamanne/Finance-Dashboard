import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
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
        <p style={{ fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.fill, margin: '2px 0' }}>
            {p.name}: <strong>${p.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MonthlyComparison: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <BarChart data={data} margin={{ top: 6, right: 6, left: -10, bottom: 0 }} barGap={4} barCategoryGap="30%">
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
      <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false}
        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
      <Tooltip content={<CustomTooltip />} />
      <Legend
        formatter={(value) => (
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{value}</span>
        )}
      />
      <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
      <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);
