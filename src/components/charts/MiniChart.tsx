'use client';

import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface MiniChartData {
  value: number;
}

interface MiniChartProps {
  data: MiniChartData[];
  color: string;
  trend: 'up' | 'down';
}

export const MiniChart: React.FC<MiniChartProps> = ({ data, color, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-16"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};