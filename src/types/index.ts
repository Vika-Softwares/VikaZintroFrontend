import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  value: number;
  category: string;
  status: 'Concluído' | 'Pendente';
  type: 'income' | 'expense';
}

export interface FinancialData {
  totalReceivable: number;
  totalPayable: number;
  balance: number;
  clients: number;
}

export interface CashFlowData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface ExpenseCategory {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: LucideIcon;
  subItems?: NavigationItem[];
}