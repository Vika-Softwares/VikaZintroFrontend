'use client';

import { CalendarIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";


export const DashboardSection = (): JSX.Element => {
  return (
    <motion.header 
      className="flex flex-wrap items-center justify-between gap-4 relative w-full max-w-[1280px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-start">
        <h1 className="font-semantic-heading-1 font-[number:var(--semantic-heading-1-font-weight)] text-ebony-clay text-[length:var(--semantic-heading-1-font-size)] tracking-[var(--semantic-heading-1-letter-spacing)] leading-[var(--semantic-heading-1-line-height)] [font-style:var(--semantic-heading-1-font-style)]">
          Dashboard
        </h1>
      </div>

      <motion.div 
        className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <Label className="font-medium text-river-bed text-sm whitespace-nowrap">
            Filtrar por período:
          </Label>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              id="data-inicial"
              type="date"
              className="w-[140px] h-9 px-3 py-2 bg-white rounded-md border border-gray-300 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <span className="text-gray-400 text-sm">até</span>
          
          <div className="relative">
            <Input
              id="data-final"
              type="date"
              className="w-[140px] h-9 px-3 py-2 bg-white rounded-md border border-gray-300 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <Button 
          className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          Aplicar Filtro
        </Button>

        <Button 
          variant="outline"
          className="h-9 px-4 text-gray-600 border-gray-300 hover:bg-gray-50 text-sm font-medium rounded-md transition-colors"
        >
          Limpar
        </Button>
      </motion.div>
    </motion.header>
  );
};
