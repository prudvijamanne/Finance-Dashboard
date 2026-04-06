import React, { useState } from 'react';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, ChevronLeft, ChevronRight, TrendingUp, Menu } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, mobileOpen }) => {
  const { activePage, setActivePage } = useFinanceStore();

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <TrendingUp size={20} color="white" />
        </div>
        <span className="sidebar-logo-text">Zorvyn</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <span className="sidebar-section-title">Menu</span>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`nav-${id}`}
            className={`nav-item${activePage === id ? ' active' : ''}`}
            onClick={() => setActivePage(id)}
            title={collapsed ? label : undefined}
          >
            <span className="nav-item-icon"><Icon size={18} /></span>
            <span className="nav-item-label">{label}</span>
          </button>
        ))}
      </nav>

      {/* Toggle collapse */}
      <div className="sidebar-toggle">
        <button
          id="sidebar-collapse-btn"
          className="icon-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};
