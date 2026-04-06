import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { Transaction, CATEGORIES } from '../data/mockData';

interface Props {
  mode: 'add' | 'edit';
  initial?: Transaction;
  onClose: () => void;
}

const emptyForm = (): Omit<Transaction, 'id'> => ({
  date: new Date().toISOString().slice(0, 10),
  description: '',
  amount: 0,
  category: CATEGORIES[0],
  type: 'expense',
});

export const TransactionModal: React.FC<Props> = ({ mode, initial, onClose }) => {
  const { addTransaction, updateTransaction } = useFinanceStore();
  const [form, setForm] = useState<Omit<Transaction, 'id'>>(
    mode === 'edit' && initial
      ? { date: initial.date, description: initial.description, amount: initial.amount, category: initial.category, type: initial.type }
      : emptyForm()
  );
  const [error, setError] = useState('');

  const set = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.description.trim()) return setError('Description is required.');
    if (!form.amount || form.amount <= 0) return setError('Amount must be greater than 0.');
    if (!form.date) return setError('Date is required.');
    setError('');
    if (mode === 'add') {
      addTransaction(form);
    } else if (initial) {
      updateTransaction({ ...initial, ...form });
    }
    onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={mode === 'add' ? 'Add Transaction' : 'Edit Transaction'}>
        <div className="modal-header">
          <h2 className="modal-title">{mode === 'add' ? '➕ Add Transaction' : '✏️ Edit Transaction'}</h2>
          <button id="modal-close-btn" className="icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div style={{ background: 'var(--color-expense-bg)', color: 'var(--color-expense)', padding: '8px 12px', borderRadius: 8, fontSize: 13 }}>
              ⚠️ {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="modal-type">Type</label>
              <select id="modal-type" className="form-select" value={form.type}
                onChange={(e) => set('type', e.target.value as 'income' | 'expense')}>
                <option value="expense">💸 Expense</option>
                <option value="income">💰 Income</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="modal-date">Date</label>
              <input id="modal-date" type="date" className="form-input" value={form.date}
                onChange={(e) => set('date', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="modal-desc">Description</label>
            <input id="modal-desc" type="text" className="form-input" placeholder="e.g. Grocery shopping"
              value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="modal-amount">Amount ($)</label>
              <input id="modal-amount" type="number" className="form-input" min={0} step={0.01} placeholder="0.00"
                value={form.amount || ''} onChange={(e) => set('amount', parseFloat(e.target.value) || 0)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="modal-category">Category</label>
              <select id="modal-category" className="form-select" value={form.category}
                onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button id="modal-cancel-btn" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button id="modal-submit-btn" className="btn btn-primary" onClick={handleSubmit}>
            {mode === 'add' ? 'Add Transaction' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
