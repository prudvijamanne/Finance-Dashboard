import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Insights } from './pages/Insights';
import { useFinanceStore } from './store/useFinanceStore';
import './index.css';

function App() {
  const { activePage, darkMode } = useFinanceStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Apply dark/light theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Close mobile sidebar on page change
  useEffect(() => {
    setMobileOpen(false);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'insights': return <Insights />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-shell">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)',
            zIndex: 99, display: 'none'
          }}
          id="mobile-overlay"
        />
      )}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
      />

      <Topbar
        collapsed={collapsed}
        onMenuClick={() => setMobileOpen((o) => !o)}
      />

      <main className={`main-content${collapsed ? ' sidebar-collapsed' : ''}`}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
