import React from 'react';
import { Moon, Sun, Menu, Download } from 'lucide-react';
import { useFinanceStore, Role } from '../../store/useFinanceStore';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your financial overview.' },
  transactions: { title: 'Transactions', subtitle: 'Manage and track all your financial activity.' },
  insights: { title: 'Insights', subtitle: 'Smart analysis of your spending patterns.' },
};

interface TopbarProps {
  collapsed: boolean;
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ collapsed, onMenuClick }) => {
  const { role, setRole, darkMode, toggleDarkMode, activePage, transactions } = useFinanceStore();

  const { title, subtitle } = PAGE_TITLES[activePage] ?? PAGE_TITLES.dashboard;

  const handleExportCSV = () => {
    const header = 'ID,Date,Description,Amount,Category,Type\n';
    const rows = transactions.map((t) =>
      `${t.id},${t.date},"${t.description}",${t.amount},${t.category},${t.type}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className={`topbar${collapsed ? ' sidebar-collapsed' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Mobile hamburger */}
        <button id="mobile-menu-btn" className="icon-btn" onClick={onMenuClick} style={{ display: 'none' }}>
          <Menu size={18} />
        </button>
        <div className="topbar-left">
          <div className="topbar-title">{title}</div>
          <div className="topbar-subtitle">{subtitle}</div>
        </div>
      </div>

      <div className="topbar-right">
        {/* Role badge */}
        <div className={`role-badge ${role}`}>
          <span className="role-badge-dot" />
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </div>

        {/* Role switcher */}
        <select
          id="role-select"
          className="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          title="Switch role"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">🔑 Admin</option>
        </select>

        {/* Export CSV */}
        <button id="export-csv-btn" className="icon-btn" onClick={handleExportCSV} title="Export CSV">
          <Download size={16} />
        </button>

        {/* Dark mode toggle */}
        <button id="dark-mode-toggle" className="icon-btn" onClick={toggleDarkMode} title="Toggle dark mode">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};
