import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, mockTransactions } from '../data/mockData';

export type Role = 'viewer' | 'admin';

export interface Filters {
  search: string;
  category: string;
  type: 'all' | 'income' | 'expense';
  dateFrom: string;
  dateTo: string;
  sortBy: 'date' | 'amount';
  sortDir: 'asc' | 'desc';
}

interface FinanceStore {
  transactions: Transaction[];
  filters: Filters;
  role: Role;
  darkMode: boolean;
  activePage: string;

  setRole: (role: Role) => void;
  toggleDarkMode: () => void;
  setActivePage: (page: string) => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;

  // derived
  getFilteredTransactions: () => Transaction[];
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getTotalBalance: () => number;
}

const defaultFilters: Filters = {
  search: '',
  category: '',
  type: 'all',
  dateFrom: '',
  dateTo: '',
  sortBy: 'date',
  sortDir: 'desc',
};

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      filters: defaultFilters,
      role: 'viewer',
      darkMode: true,
      activePage: 'dashboard',

      setRole: (role) => set({ role }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setActivePage: (page) => set({ activePage: page }),

      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),

      resetFilters: () => set({ filters: defaultFilters }),

      addTransaction: (t) =>
        set((s) => ({
          transactions: [
            ...s.transactions,
            { ...t, id: `t${Date.now()}` },
          ],
        })),

      updateTransaction: (updated) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === updated.id ? updated : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }
        if (filters.category) {
          result = result.filter((t) => t.category === filters.category);
        }
        if (filters.type !== 'all') {
          result = result.filter((t) => t.type === filters.type);
        }
        if (filters.dateFrom) {
          result = result.filter((t) => t.date >= filters.dateFrom);
        }
        if (filters.dateTo) {
          result = result.filter((t) => t.date <= filters.dateTo);
        }
        result.sort((a, b) => {
          let diff = 0;
          if (filters.sortBy === 'date') {
            diff = a.date.localeCompare(b.date);
          } else {
            diff = a.amount - b.amount;
          }
          return filters.sortDir === 'asc' ? diff : -diff;
        });
        return result;
      },

      getTotalIncome: () =>
        get().transactions.reduce(
          (sum, t) => (t.type === 'income' ? sum + t.amount : sum),
          0
        ),

      getTotalExpenses: () =>
        get().transactions.reduce(
          (sum, t) => (t.type === 'expense' ? sum + t.amount : sum),
          0
        ),

      getTotalBalance: () => get().getTotalIncome() - get().getTotalExpenses(),
    }),
    {
      name: 'finance-dashboard-store',
      partialize: (s) => ({
        transactions: s.transactions,
        role: s.role,
        darkMode: s.darkMode,
      }),
    }
  )
);
