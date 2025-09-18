import { useState, useEffect } from 'react';
import { Transaction, FinancialData, CashFlowData, ExpenseCategory } from '../types';
import { 
  mockTransactions, 
  mockFinancialData, 
  mockCashFlowData, 
  mockExpenseCategories 
} from '../data/mockData';

export const useFinancialData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [cashFlowData, setCashFlowData] = useState<CashFlowData[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTransactions(mockTransactions);
      setFinancialData(mockFinancialData);
      setCashFlowData(mockCashFlowData);
      setExpenseCategories(mockExpenseCategories);
      
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    transactions,
    financialData,
    cashFlowData,
    expenseCategories,
    loading
  };
};