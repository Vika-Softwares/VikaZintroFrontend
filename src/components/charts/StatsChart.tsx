'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface StatsData {
  name: string;
  value: number;
  growth: number;
}

interface StatsChartProps {
  data: StatsData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
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
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
          <p className="text-sm font-medium text-gray-700">
            Valor: R$ {payload[0].value.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className={`w-3 h-3 rounded-full ${data.growth >= 0 ? 'bg-green-500' : 'bg-red-500'}`} />
          <p className={`text-sm font-medium ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Crescimento: {data.growth >= 0 ? '+' : ''}{data.growth}%
          </p>
        </div>
      </motion.div>
    );
  }
  return null;
};

export const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-72"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={1}/>
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeWidth={1} />
          <XAxis 
            dataKey="name" 
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
          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};