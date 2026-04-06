import React, { useState } from 'react';
import {
  Search, Plus, Edit2, Trash2, ChevronUp, ChevronDown,
  ChevronsUpDown, Filter, X, Download
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { Transaction, CATEGORIES, CATEGORY_COLORS } from '../data/mockData';
import { TransactionModal } from '../components/TransactionModal';
import { EmptyState } from '../components/EmptyState';

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

type ModalState =
  | { open: false }
  | { open: true; mode: 'add' }
  | { open: true; mode: 'edit'; tx: Transaction };

export const Transactions: React.FC = () => {
  const {
    filters, setFilter, resetFilters,
    getFilteredTransactions, deleteTransaction,
    role,
  } = useFinanceStore();

  const [modal, setModal] = useState<ModalState>({ open: false });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const rows = getFilteredTransactions();

  const handleSort = (col: 'date' | 'amount') => {
    if (filters.sortBy === col) {
      setFilter('sortDir', filters.sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setFilter('sortBy', col);
      setFilter('sortDir', 'desc');
    }
  };

  const SortIcon = ({ col }: { col: 'date' | 'amount' }) => {
    if (filters.sortBy !== col) return <ChevronsUpDown size={13} style={{ opacity: 0.4 }} />;
    return filters.sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />;
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteTransaction(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasActiveFilters =
    filters.search || filters.category || filters.type !== 'all' || filters.dateFrom || filters.dateTo;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-header-title">Transactions</h1>
          <p className="page-header-sub">
            {rows.length} transaction{rows.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button id="export-json-btn" className="btn btn-ghost btn-sm" onClick={handleExportJSON}>
            <Download size={14} /> Export JSON
          </button>
          {role === 'admin' && (
            <button
              id="add-transaction-btn"
              className="btn btn-primary btn-sm"
              onClick={() => setModal({ open: true, mode: 'add' })}
            >
              <Plus size={15} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="transactions-filters">
          {/* Search */}
          <div className="search-wrapper">
            <Search size={15} className="search-icon" />
            <input
              id="tx-search"
              type="text"
              className="search-input"
              placeholder="Search transactions…"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
            />
          </div>

          {/* Category */}
          <select
            id="category-filter"
            className="filter-select"
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Type */}
          <select
            id="type-filter"
            className="filter-select"
            style={{ minWidth: 120 }}
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value as any)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Date range */}
          <input
            id="date-from"
            type="date"
            className="date-input"
            value={filters.dateFrom}
            onChange={(e) => setFilter('dateFrom', e.target.value)}
            title="From date"
          />
          <input
            id="date-to"
            type="date"
            className="date-input"
            value={filters.dateTo}
            onChange={(e) => setFilter('dateTo', e.target.value)}
            title="To date"
          />

          {hasActiveFilters && (
            <button id="reset-filters-btn" className="btn btn-ghost btn-sm" onClick={resetFilters} title="Clear filters">
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {filters.search && (
              <span className="type-badge expense" style={{ cursor: 'pointer' }}
                onClick={() => setFilter('search', '')}>
                Search: "{filters.search}" ×
              </span>
            )}
            {filters.category && (
              <span className="type-badge expense" style={{ cursor: 'pointer' }}
                onClick={() => setFilter('category', '')}>
                {filters.category} ×
              </span>
            )}
            {filters.type !== 'all' && (
              <span className="type-badge income" style={{ cursor: 'pointer' }}
                onClick={() => setFilter('type', 'all')}>
                {filters.type} ×
              </span>
            )}
            {filters.dateFrom && (
              <span className="type-badge expense" style={{ cursor: 'pointer' }}
                onClick={() => setFilter('dateFrom', '')}>
                From: {filters.dateFrom} ×
              </span>
            )}
            {filters.dateTo && (
              <span className="type-badge expense" style={{ cursor: 'pointer' }}
                onClick={() => setFilter('dateTo', '')}>
                To: {filters.dateTo} ×
              </span>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrapper">
          {rows.length === 0 ? (
            <EmptyState
              icon={Filter}
              title="No transactions found"
              message="Try adjusting or clearing your filters to see transactions."
              action={
                <button className="btn btn-ghost btn-sm" onClick={resetFilters}>
                  <X size={14} /> Clear Filters
                </button>
              }
            />
          ) : (
            <table className="tx-table" id="transactions-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('date')} id="col-date">
                    Date <span className="sort-icon"><SortIcon col="date" /></span>
                  </th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th onClick={() => handleSort('amount')} id="col-amount" className="text-right">
                    Amount <span className="sort-icon"><SortIcon col="amount" /></span>
                  </th>
                  {role === 'admin' && <th style={{ width: 80 }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id} id={`tx-row-${t.id}`}>
                    <td className="tx-date">
                      {new Date(t.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="tx-desc">{t.description}</td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        <span
                          className="tx-category-dot"
                          style={{ background: CATEGORY_COLORS[t.category] ?? '#94a3b8' }}
                        />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{t.category}</span>
                      </span>
                    </td>
                    <td>
                      <span className={`type-badge ${t.type}`}>
                        {t.type === 'income' ? '↑' : '↓'} {t.type}
                      </span>
                    </td>
                    <td className={`tx-amount ${t.type} text-right`}>
                      {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                    </td>
                    {role === 'admin' && (
                      <td>
                        <div className="tx-actions">
                          <button
                            id={`edit-btn-${t.id}`}
                            className="action-btn edit"
                            onClick={() => setModal({ open: true, mode: 'edit', tx: t })}
                            title="Edit transaction"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            id={`delete-btn-${t.id}`}
                            className="action-btn delete"
                            onClick={() => handleDelete(t.id)}
                            title={deleteConfirm === t.id ? 'Click again to confirm' : 'Delete transaction'}
                            style={deleteConfirm === t.id ? {
                              background: 'var(--color-expense)',
                              color: 'white',
                              border: '1px solid var(--color-expense)'
                            } : {}}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Transaction count */}
      {rows.length > 0 && (
        <p style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 10 }}>
          Showing {rows.length} result{rows.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Modal */}
      {modal.open && (
        modal.mode === 'add'
          ? <TransactionModal mode="add" onClose={() => setModal({ open: false })} />
          : <TransactionModal mode="edit" initial={modal.tx} onClose={() => setModal({ open: false })} />
      )}
    </div>
  );
};
