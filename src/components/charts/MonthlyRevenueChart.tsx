'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface MonthlyRevenueData {
  month: string;
  revenue: number;
  target: number;
}

interface MonthlyRevenueChartProps {
  data: MonthlyRevenueData[];
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

export const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
            name="Receita Real"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#6B7280"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }}
            name="Meta"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};