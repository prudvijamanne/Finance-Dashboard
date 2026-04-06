export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export const CATEGORIES = [
  'Food & Dining',
  'Housing',
  'Transportation',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Utilities',
  'Education',
  'Travel',
  'Salary',
  'Freelance',
  'Investment',
  'Other',
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining': '#f97316',
  'Housing': '#8b5cf6',
  'Transportation': '#3b82f6',
  'Entertainment': '#ec4899',
  'Healthcare': '#ef4444',
  'Shopping': '#f59e0b',
  'Utilities': '#14b8a6',
  'Education': '#6366f1',
  'Travel': '#06b6d4',
  'Salary': '#22c55e',
  'Freelance': '#10b981',
  'Investment': '#84cc16',
  'Other': '#94a3b8',
};

export const mockTransactions: Transaction[] = [
  // January
  { id: 't001', date: '2024-01-03', description: 'Salary - Tech Corp', amount: 5200, category: 'Salary', type: 'income' },
  { id: 't002', date: '2024-01-04', description: 'Whole Foods Market', amount: 124.50, category: 'Food & Dining', type: 'expense' },
  { id: 't003', date: '2024-01-05', description: 'Rent Payment', amount: 1500, category: 'Housing', type: 'expense' },
  { id: 't004', date: '2024-01-07', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: 't005', date: '2024-01-09', description: 'Uber Rides', amount: 42.00, category: 'Transportation', type: 'expense' },
  { id: 't006', date: '2024-01-12', description: 'Freelance Project', amount: 800, category: 'Freelance', type: 'income' },
  { id: 't007', date: '2024-01-15', description: 'Electric Bill', amount: 89.00, category: 'Utilities', type: 'expense' },
  { id: 't008', date: '2024-01-18', description: 'Amazon Shopping', amount: 156.75, category: 'Shopping', type: 'expense' },
  { id: 't009', date: '2024-01-20', description: 'Doctor Visit', amount: 200.00, category: 'Healthcare', type: 'expense' },
  { id: 't010', date: '2024-01-25', description: 'Coursera Course', amount: 49.00, category: 'Education', type: 'expense' },

  // February
  { id: 't011', date: '2024-02-01', description: 'Salary - Tech Corp', amount: 5200, category: 'Salary', type: 'income' },
  { id: 't012', date: '2024-02-03', description: 'Trader Joe\'s', amount: 98.30, category: 'Food & Dining', type: 'expense' },
  { id: 't013', date: '2024-02-05', description: 'Rent Payment', amount: 1500, category: 'Housing', type: 'expense' },
  { id: 't014', date: '2024-02-08', description: 'Spotify Premium', amount: 9.99, category: 'Entertainment', type: 'expense' },
  { id: 't015', date: '2024-02-10', description: 'Gas Station', amount: 55.00, category: 'Transportation', type: 'expense' },
  { id: 't016', date: '2024-02-14', description: 'Valentine\'s Dinner', amount: 180.00, category: 'Food & Dining', type: 'expense' },
  { id: 't017', date: '2024-02-18', description: 'Internet Bill', amount: 60.00, category: 'Utilities', type: 'expense' },
  { id: 't018', date: '2024-02-20', description: 'Freelance Design', amount: 1200, category: 'Freelance', type: 'income' },
  { id: 't019', date: '2024-02-22', description: 'Nike Store', amount: 220.00, category: 'Shopping', type: 'expense' },
  { id: 't020', date: '2024-02-25', description: 'Stock Dividend', amount: 320.00, category: 'Investment', type: 'income' },

  // March
  { id: 't021', date: '2024-03-01', description: 'Salary - Tech Corp', amount: 5500, category: 'Salary', type: 'income' },
  { id: 't022', date: '2024-03-03', description: 'Chipotle', amount: 35.00, category: 'Food & Dining', type: 'expense' },
  { id: 't023', date: '2024-03-05', description: 'Rent Payment', amount: 1500, category: 'Housing', type: 'expense' },
  { id: 't024', date: '2024-03-08', description: 'Movie Tickets', amount: 48.00, category: 'Entertainment', type: 'expense' },
  { id: 't025', date: '2024-03-10', description: 'Car Maintenance', amount: 340.00, category: 'Transportation', type: 'expense' },
  { id: 't026', date: '2024-03-13', description: 'Starbucks', amount: 22.50, category: 'Food & Dining', type: 'expense' },
  { id: 't027', date: '2024-03-15', description: 'Water Bill', amount: 45.00, category: 'Utilities', type: 'expense' },
  { id: 't028', date: '2024-03-18', description: 'Freelance Writing', amount: 650, category: 'Freelance', type: 'income' },
  { id: 't029', date: '2024-03-20', description: 'Apple Store', amount: 129.00, category: 'Shopping', type: 'expense' },
  { id: 't030', date: '2024-03-25', description: 'Pharmacy', amount: 78.00, category: 'Healthcare', type: 'expense' },

  // April
  { id: 't031', date: '2024-04-01', description: 'Salary - Tech Corp', amount: 5500, category: 'Salary', type: 'income' },
  { id: 't032', date: '2024-04-03', description: 'Sushi Restaurant', amount: 95.00, category: 'Food & Dining', type: 'expense' },
  { id: 't033', date: '2024-04-05', description: 'Rent Payment', amount: 1500, category: 'Housing', type: 'expense' },
  { id: 't034', date: '2024-04-07', description: 'Disney+ Subscription', amount: 13.99, category: 'Entertainment', type: 'expense' },
  { id: 't035', date: '2024-04-10', description: 'Metro Card', amount: 127.00, category: 'Transportation', type: 'expense' },
  { id: 't036', date: '2024-04-12', description: 'Flight Tickets', amount: 450.00, category: 'Travel', type: 'expense' },
  { id: 't037', date: '2024-04-15', description: 'Gas & Electric', amount: 110.00, category: 'Utilities', type: 'expense' },
  { id: 't038', date: '2024-04-18', description: 'Investment Return', amount: 580.00, category: 'Investment', type: 'income' },
  { id: 't039', date: '2024-04-20', description: 'IKEA Purchase', amount: 340.00, category: 'Shopping', type: 'expense' },
  { id: 't040', date: '2024-04-22', description: 'Gym Membership', amount: 50.00, category: 'Healthcare', type: 'expense' },
  { id: 't041', date: '2024-04-25', description: 'Online Course', amount: 199.00, category: 'Education', type: 'expense' },
  { id: 't042', date: '2024-04-28', description: 'Freelance App Dev', amount: 1800, category: 'Freelance', type: 'income' },
];

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export function computeMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const map: Record<string, { income: number; expenses: number }> = {};
  for (const t of transactions) {
    const key = t.date.slice(0, 7); // "YYYY-MM"
    if (!map[key]) map[key] = { income: 0, expenses: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
  }
  const months = Object.keys(map).sort();
  let runningBalance = 0;
  return months.map((m) => {
    runningBalance += map[m].income - map[m].expenses;
    const label = new Date(m + '-01').toLocaleString('default', { month: 'short', year: '2-digit' });
    return { month: label, income: map[m].income, expenses: map[m].expenses, balance: runningBalance };
  });
}

export function computeCategoryBreakdown(transactions: Transaction[]) {
  const map: Record<string, number> = {};
  for (const t of transactions) {
    if (t.type === 'expense') {
      map[t.category] = (map[t.category] ?? 0) + t.amount;
    }
  }
  return Object.entries(map)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] ?? '#94a3b8' }))
    .sort((a, b) => b.value - a.value);
}
