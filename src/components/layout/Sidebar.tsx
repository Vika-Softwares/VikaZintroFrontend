'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Settings,
  ChevronRight,
  ChevronDown,
  X,
  Building2,
  UserPlus,
  CreditCard,
  Banknote,
  Calendar
} from 'lucide-react';
import { NavigationItem } from '../../types';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", path: "/", icon: LayoutDashboard },
  { 
    id: "cadastros", 
    label: "Cadastros", 
    path: "/cadastros", 
    icon: UserPlus,
    subItems: [
      { id: "clientes", label: "Clientes", path: "/clientes", icon: Users },
      { id: "fornecedores", label: "Fornecedores", path: "/fornecedores", icon: Building2 },
    ]
  },
  { 
    id: "financeiro", 
    label: "Financeiro", 
    path: "/financeiro", 
    icon: DollarSign,
    subItems: [
      { id: "todos-lancamentos", label: "Todos Lançamentos", path: "/todos-lancamentos", icon: Calendar },
      { id: "contas-pagar", label: "Contas a Pagar", path: "/contas-pagar", icon: CreditCard },
      { id: "contas-receber", label: "Contas a Receber", path: "/contas-receber", icon: Banknote },
    ]
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname === '/') return 'dashboard';
    if (location.pathname === '/clientes') return 'clientes';
    if (location.pathname === '/fornecedores') return 'fornecedores';
    if (location.pathname === '/todos-lancamentos') return 'todos-lancamentos';
    if (location.pathname === '/contas-pagar') return 'contas-pagar';
    if (location.pathname === '/contas-receber') return 'contas-receber';
    if (location.pathname === '/financeiro') return 'financeiro';
    return activeTab;
  };
  
  const currentActiveTab = getActiveTab();

  // Auto-expand parent menus based on current active tab
  React.useEffect(() => {
    const activeTab = getActiveTab();
    if (activeTab === 'clientes' || activeTab === 'fornecedores') {
      setExpandedItems(prev => prev.includes('cadastros') ? prev : [...prev, 'cadastros']);
    } else if (activeTab === 'todos-lancamentos' || activeTab === 'contas-pagar' || activeTab === 'contas-receber') {
      setExpandedItems(prev => prev.includes('financeiro') ? prev : [...prev, 'financeiro']);
    }
  }, [location.pathname]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);
  const hasActiveSubItem = (item: any) => {
    return item.subItems?.some((subItem: any) => currentActiveTab === subItem.id);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed lg:static top-0 left-0 z-50 lg:z-auto
          w-[280px] h-full lg:h-auto
          bg-white border-r border-gray-100
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-8 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <img src="/logo (1).png" alt="Vika Zyntro"/>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 flex-1">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentActiveTab === item.id;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isItemExpanded = isExpanded(item.id);
              const hasActiveSub = hasActiveSubItem(item);
              
              return (
                <div key={item.id}>
                  {/* Main Item */}
                  {hasSubItems ? (
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        hasActiveSub
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium flex-1">{item.label}</span>
                      {isItemExpanded ? (
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      )}
                    </button>
                  ) : (
                    <Link to={item.path} onClick={onClose}>
                      <motion.div
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        whileHover={{ x: isActive ? 0 : 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
                        )}
                      </motion.div>
                    </Link>
                  )}

                  {/* Sub Items */}
                  <AnimatePresence>
                    {hasSubItems && isItemExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 space-y-1"
                      >
                        {item.subItems?.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = currentActiveTab === subItem.id;
                          
                          return (
                            <Link key={subItem.id} to={subItem.path} onClick={onClose}>
                              <motion.div
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-all duration-200 ${
                                  isSubActive
                                    ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-500'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                }`}
                                whileHover={{ x: isSubActive ? 0 : 2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <SubIcon className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium text-sm">{subItem.label}</span>
                              </motion.div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Settings */}
        <div className="px-4 pb-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Configurações</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};