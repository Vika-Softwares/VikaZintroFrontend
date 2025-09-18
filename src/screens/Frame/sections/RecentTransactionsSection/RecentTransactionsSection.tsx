'use client';

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Transaction } from "../../../../types";
import { formatCurrency, formatDate } from "../../../../utils/formatters";

interface RecentTransactionsSectionProps {
  transactions: Transaction[];
}

const getCategoryStyle = (category: string) => {
  const styles = {
    'Receita': { bg: 'bg-scandal', text: 'text-jewel' },
    'Moradia': { bg: 'bg-cinderella', text: 'text-old-brick' },
    'Alimentação': { bg: 'bg-cinderella', text: 'text-old-brick' },
    'Utilidades': { bg: 'bg-cinderella', text: 'text-old-brick' },
    'Transporte': { bg: 'bg-cinderella', text: 'text-old-brick' },
  };
  return styles[category as keyof typeof styles] || { bg: 'bg-gray-100', text: 'text-gray-600' };
};

const getStatusStyle = (status: string) => {
  return status === 'Concluído' 
    ? { bg: 'bg-pattens-blue', text: 'text-denim' }
    : { bg: 'bg-beeswax', text: 'text-korma' };
};

export const RecentTransactionsSection: React.FC<RecentTransactionsSectionProps> = ({ 
  transactions 
}) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="p-4 lg:p-6 border-b border-gray-100">
        <h3 className="text-base lg:text-lg font-semibold text-gray-800">
          Transações Recentes
        </h3>
        <p className="text-xs lg:text-sm text-gray-500">Últimas movimentações financeiras</p>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-100">
              <TableHead className="px-4 lg:px-6 py-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  DATA
                </span>
              </TableHead>
              <TableHead className="px-4 lg:px-6 py-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  DESCRIÇÃO
                </span>
              </TableHead>
              <TableHead className="px-4 lg:px-6 py-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  VALOR
                </span>
              </TableHead>
              <TableHead className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  CATEGORIA
                </span>
              </TableHead>
              <TableHead className="px-4 lg:px-6 py-4 hidden md:table-cell">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  STATUS
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => {
              const categoryStyle = getCategoryStyle(transaction.category);
              const statusStyle = getStatusStyle(transaction.status);
              
              return (
              <motion.tr
                key={transaction.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell className="px-4 lg:px-6 py-4">
                  <span className="text-xs lg:text-sm font-medium text-gray-900 whitespace-nowrap">
                    {formatDate(transaction.date)}
                  </span>
                </TableCell>
                <TableCell className="px-4 lg:px-6 py-4">
                  <span className="text-xs lg:text-sm text-gray-600">
                    {transaction.description}
                  </span>
                </TableCell>
                <TableCell className="px-4 lg:px-6 py-4">
                  <span className={`text-xs lg:text-sm font-medium whitespace-nowrap ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(Math.abs(transaction.value))}
                  </span>
                </TableCell>
                <TableCell className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                  <Badge
                    className={`inline-flex items-center px-3 py-1 ${categoryStyle.bg} rounded-full border-0 text-xs font-medium`}
                  >
                    <span className={categoryStyle.text}>
                      {transaction.category}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell className="px-4 lg:px-6 py-4 hidden md:table-cell">
                  <Badge
                    className={`inline-flex items-center px-3 py-1 ${statusStyle.bg} rounded-full border-0 text-xs font-medium`}
                  >
                    <span className={statusStyle.text}>
                      {transaction.status}
                    </span>
                  </Badge>
                </TableCell>
              </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};
