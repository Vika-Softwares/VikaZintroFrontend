import React from "react";
import { CashFlowChart } from "../../../../components/charts/CashFlowChart";
import { ExpensePieChart } from "../../../../components/charts/ExpensePieChart";
import { MonthlyRevenueChart } from "../../../../components/charts/MonthlyRevenueChart";
import { CashFlowData, ExpenseCategory } from "../../../../types";
import { mockMonthlyRevenueData } from "../../../../data/mockData";

interface ExpenseCategorySectionProps {
  cashFlowData: CashFlowData[];
  expenseCategories: ExpenseCategory[];
}

export const ExpenseCategorySection: React.FC<ExpenseCategorySectionProps> = ({
  cashFlowData,
  expenseCategories
}) => {
  return (
    <>
    <div className="space-y-4 lg:space-y-8">
      {/* First Row - Cash Flow and Expense Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Cash Flow Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-4">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-800">
                  Fluxo de Caixa
                </h3>
                <p className="text-xs lg:text-sm text-gray-500">Receitas vs Despesas</p>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                  <span className="text-xs lg:text-sm text-gray-600">
                      Receitas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-xs lg:text-sm text-gray-600">
                      Despesas
                  </span>
                </div>
              </div>
            </div>

            <CashFlowChart data={cashFlowData} />
          </div>
        </div>

        {/* Expense Categories */}
        <div>
          <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="mb-4 lg:mb-6">
              <h3 className="text-base lg:text-lg font-semibold text-gray-800">
                Despesas por Categoria
              </h3>
              <p className="text-xs lg:text-sm text-gray-500">Distribuição mensal</p>
            </div>

            <ExpensePieChart data={expenseCategories} />
          </div>
        </div>
      </div>

      {/* Second Row - Monthly Revenue Chart */}
      <div className="grid grid-cols-1">
        <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-4">
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-800">
                Receita Mensal vs Meta
              </h3>
              <p className="text-xs lg:text-sm text-gray-500">Acompanhamento do desempenho mensal</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-xs lg:text-sm text-gray-600">Receita Real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full" />
                <span className="text-xs lg:text-sm text-gray-600">Meta</span>
              </div>
            </div>
          </div>

          <MonthlyRevenueChart data={mockMonthlyRevenueData} />
        </div>
      </div>
    </div>
    </>
  );
};
