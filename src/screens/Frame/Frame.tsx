import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../../components/layout/Sidebar";
import { TopBar } from "../../components/layout/TopBar";
import { DashboardSection } from "./sections/DashboardSection/DashboardSection";
import { ExpenseCategorySection } from "./sections/ExpenseCategorySection/ExpenseCategorySection";
import { FinancialOverviewSection } from "./sections/FinancialOverviewSection/FinancialOverviewSection";
import { RecentTransactionsSection } from "./sections/RecentTransactionsSection/RecentTransactionsSection";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useFinancialData } from "../../hooks/useFinancialData";

export const Frame = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { transactions, financialData, cashFlowData, expenseCategories, loading } = useFinancialData();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  if (loading || !financialData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <LoadingSpinner />
          <p className="mt-4 text-gray-500">Carregando dados financeiros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={handleMenuClick} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 lg:space-y-8 max-w-7xl mx-auto"
              >
                {/* Page Title */}
                <div className="mb-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard</h1>
                  <p className="text-gray-500 mt-1">Visão geral do sistema</p>
                </div>

                {/* Period Filter */}
                <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      Filtrar Período:
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm min-w-[140px] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:transition-opacity"
                        placeholder="Data inicial"
                      />
                      <span className="text-gray-400 text-sm">até</span>
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 bg-white shadow-sm min-w-[140px] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:transition-opacity"
                        placeholder="Data final"
                      />
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Aplicar
                      </button>
                    </div>
                  </div>
                </div>
                <FinancialOverviewSection data={financialData} />
                <ExpenseCategorySection 
                  cashFlowData={cashFlowData} 
                  expenseCategories={expenseCategories} 
                />
                <RecentTransactionsSection transactions={transactions} />
              </motion.div>
            )}
            {activeTab === 'cadastros' && (
              <motion.div
                key="cadastros"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center gap-8 min-h-[60vh] max-w-7xl mx-auto"
              >
                <div className="text-center">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Cadastros</h1>
                  <p className="text-gray-500">Seção em desenvolvimento...</p>
                </div>
              </motion.div>
            )}
            {activeTab === 'financeiro' && (
              <motion.div
                key="financeiro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center gap-8 min-h-[60vh] max-w-7xl mx-auto"
              >
                <div className="text-center">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Cadastros</h1>
                  <p className="text-gray-500">Seção em desenvolvimento...</p>
                </div>
              </motion.div>
            )}
            {activeTab === 'financeiro' && (
              <motion.div
                key="financeiro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center gap-8 min-h-[60vh] max-w-7xl mx-auto"
              >
                <div className="text-center">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Financeiro</h1>
                  <p className="text-gray-500">Seção em desenvolvimento...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};