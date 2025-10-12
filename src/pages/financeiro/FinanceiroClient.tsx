'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";

export const FinanceiroClient = (): JSX.Element => {


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar title="Financeiro" />
        
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center gap-8 min-h-[60vh] max-w-7xl mx-auto"
          >
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Financeiro</h1>
              <p className="text-gray-500">Seção em desenvolvimento...</p>
            </div>
          </motion.div>
      </main>
    </div>
  );
};