import { Transaction, FinancialData, CashFlowData, ExpenseCategory } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-07-15',
    description: 'Pagamento de Fatura',
    value: 500.00,
    category: 'Receita',
    status: 'Concluído',
    type: 'income'
  },
  {
    id: '2',
    date: '2024-07-14',
    description: 'Pagamento de Aluguel',
    value: -1500.00,
    category: 'Moradia',
    status: 'Concluído',
    type: 'expense'
  },
  {
    id: '3',
    date: '2024-07-13',
    description: 'Compras de Supermercado',
    value: -200.00,
    category: 'Alimentação',
    status: 'Concluído',
    type: 'expense'
  },
  {
    id: '4',
    date: '2024-07-12',
    description: 'Pagamento de Cliente',
    value: 1000.00,
    category: 'Receita',
    status: 'Pendente',
    type: 'income'
  },
  {
    id: '5',
    date: '2024-07-11',
    description: 'Conta de Luz',
    value: -150.00,
    category: 'Utilidades',
    status: 'Concluído',
    type: 'expense'
  }
];

export const mockFinancialData: FinancialData = {
  totalReceivable: 12500.00,
  totalPayable: 8200.00,
  balance: 4300.00,
  clients: 250
};

export const mockCashFlowData: CashFlowData[] = [
  { month: 'Jan', revenue: 15000, expenses: 12000 },
  { month: 'Fev', revenue: 18000, expenses: 14000 },
  { month: 'Mar', revenue: 16000, expenses: 13000 },
  { month: 'Abr', revenue: 22000, expenses: 15000 },
  { month: 'Mai', revenue: 25000, expenses: 16000 },
  { month: 'Jun', revenue: 20000, expenses: 18000 }
];

export const mockExpenseCategories: ExpenseCategory[] = [
  { name: 'Moradia', value: 3280, percentage: 40, color: '#2563eb' },
  { name: 'Alimentação', value: 2460, percentage: 30, color: '#60a5fa' },
  { name: 'Transporte', value: 1640, percentage: 20, color: '#7dd3fc' },
  { name: 'Outros', value: 820, percentage: 10, color: '#bfdbfe' }
];

export const mockMonthlyRevenueData = [
  { month: 'Jan', revenue: 15000, target: 14000 },
  { month: 'Fev', revenue: 18000, target: 16000 },
  { month: 'Mar', revenue: 16000, target: 17000 },
  { month: 'Abr', revenue: 22000, target: 18000 },
  { month: 'Mai', revenue: 25000, target: 20000 },
  { month: 'Jun', revenue: 28000, target: 22000 }
];

export const mockMiniChartData = [
  { value: 100 },
  { value: 120 },
  { value: 110 },
  { value: 140 },
  { value: 130 },
  { value: 160 },
  { value: 150 }
];