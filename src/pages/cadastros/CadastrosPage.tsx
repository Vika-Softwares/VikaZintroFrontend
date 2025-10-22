"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export const CadastrosPage = (): JSX.Element => {
  const cadastros = [
    {
      id: "clientes",
      title: "Clientes",
      description: "Gerencie seus clientes e suas informações",
      icon: Users,
      path: "/clientes",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: "fornecedores",
      title: "Fornecedores",
      description: "Controle seus fornecedores e parceiros",
      icon: Building2,
      path: "/fornecedores",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 lg:space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cadastros</h1>
            <p className="text-gray-600">
              Gerencie clientes, fornecedores e outras informações importantes
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cadastros.map((cadastro) => {
          const Icon = cadastro.icon;
          return (
            <Link key={cadastro.id} to={cadastro.path}>
              <motion.div
                className={`${cadastro.bgColor} rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow`}
                  >
                    <Icon className={`w-6 h-6 ${cadastro.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {cadastro.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {cadastro.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className={`p-2 bg-gradient-to-r ${cadastro.color} rounded-lg`}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resumo Rápido
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total de Clientes</p>
              <p className="text-2xl font-bold text-blue-600">-</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
            <Building2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Total de Fornecedores</p>
              <p className="text-2xl font-bold text-green-600">-</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
