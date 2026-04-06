import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataItem { name: string; value: number; color: string; }
interface Props { data: DataItem[]; }

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0];
    return (
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '10px 14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: 13,
      }}>
        <p style={{ fontWeight: 700, color: d.payload.color, marginBottom: 2 }}>{d.name}</p>
        <p style={{ color: 'var(--text-primary)' }}><strong>${d.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, marginTop: 8 }}>
    {payload?.map((entry: any) => (
      <div key={entry.value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: entry.color, flexShrink: 0, display: 'inline-block' }} />
        <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{entry.value}</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          ${entry.payload?.value?.toLocaleString(undefined, { minimumFractionDigits: 0 })}
        </span>
      </div>
    ))}
  </div>
);

export const SpendingBreakdown: React.FC<Props> = ({ data }) => {
  if (!data.length) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No expense data.</p>;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="42%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};
