'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

interface TopBarProps {
  title?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title = "Dashboard" }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 flex-shrink-0"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs lg:text-sm">
              U
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-gray-800">Usuário</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};