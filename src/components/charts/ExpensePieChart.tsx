'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { ExpenseCategory } from '../../types';

interface ExpensePieChartProps {
  data: ExpenseCategory[];
}

const MODERN_COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const CustomTooltip = ({ active, payload }: any) => {
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
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <p className="font-semibold text-gray-800">{data.name}</p>
        </div>
        <p className="text-sm text-gray-600">
          R$ {data.value.toLocaleString('pt-BR')} ({data.percentage}%)
        </p>
      </motion.div>
    );
  }
  return null;
};

export const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: MODERN_COLORS[index % MODERN_COLORS.length]
  }));
  
  const total = dataWithColors.reduce((sum, item) => sum + item.value, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-56 h-56"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithColors}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {dataWithColors.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke={activeIndex === index ? '#ffffff' : 'none'}
                  strokeWidth={activeIndex === index ? 3 : 0}
                  style={{
                    filter: activeIndex === index ? 'brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
                    transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'all 0.3s ease-in-out'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="font-bold text-2xl text-gray-800">
              R$ {(total / 1000).toFixed(1)}k
            </div>
            <div className="text-sm text-gray-500">Total Despesas</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-3 mt-6 w-full"
      >
        {dataWithColors.map((category, index) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.02, x: 4 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div
              className="w-4 h-4 rounded-full shadow-sm"
              style={{ backgroundColor: category.color }}
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">
                {category.name}
              </div>
              <div className="text-xs text-gray-500">
                {category.percentage}%
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};