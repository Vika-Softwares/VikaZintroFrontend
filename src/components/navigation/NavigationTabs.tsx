'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { NavigationItem } from '../../types';

interface NavigationTabsProps {
  items: NavigationItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  items,
  activeTab,
  onTabChange
}) => {
  return (
    <nav className="flex items-center gap-8 relative">
      {items.map((item) => (
        <div key={item.id} className="relative">
          <Button
            variant="ghost"
            className={`h-auto px-0 py-3 bg-transparent hover:bg-transparent font-medium text-sm transition-colors relative z-10 ${
              activeTab === item.id
                ? 'text-blue-600'
                : 'text-river-bed hover:text-blue-600'
            }`}
            onClick={() => onTabChange(item.id)}
          >
            {item.label}
          </Button>
          
          {activeTab === item.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          )}
        </div>
      ))}
    </nav>
  );
};