'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { CashFlowData } from '../../types';

interface CashFlowChartProps {
  data: CashFlowData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-4 border-0 rounded-xl shadow-xl backdrop-blur-sm"
        style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: R$ ${entry.value.toLocaleString('pt-BR')}`}
            </p>
          </div>
        ))}
      </motion.div>
    );
  }
  return null;
};

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-96"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeWidth={1} />
          <XAxis 
            dataKey="month" 
            stroke="#64748b"
            fontSize={12}
            fontWeight={500}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            fontWeight={500}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4F46E5"
            strokeWidth={3}
            fill="url(#revenueGradient)"
            name="Receitas"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#EF4444"
            strokeWidth={3}
            fill="url(#expenseGradient)"
            name="Despesas"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};