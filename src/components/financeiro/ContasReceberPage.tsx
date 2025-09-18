'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, DollarSign, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContaReceberModal } from "./ContaReceberModal";

interface ContaReceber {
  id: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  categoria: string;
  cliente: string;
  status: 'Pendente' | 'Recebido' | 'Vencido';
  recorrente: boolean;
  observacoes?: string;
}

const mockContasReceber: ContaReceber[] = [
  {
    id: '1',
    descricao: 'Mensalidade de Serviços',
    valor: 2500.00,
    dataVencimento: '2024-02-05',
    categoria: 'Serviços',
    cliente: 'João Silva',
    status: 'Pendente',
    recorrente: true,
    observacoes: 'Mensalidade recorrente'
  },
  {
    id: '2',
    descricao: 'Projeto de Desenvolvimento',
    valor: 8500.00,
    dataVencimento: '2024-02-10',
    categoria: 'Projetos',
    cliente: 'Maria Santos',
    status: 'Pendente',
    recorrente: false
  },
  {
    id: '3',
    descricao: 'Consultoria Técnica',
    valor: 1800.00,
    dataVencimento: '2024-01-30',
    categoria: 'Consultoria',
    cliente: 'Pedro Oliveira',
    status: 'Vencido',
    recorrente: false
  },
  {
    id: '4',
    descricao: 'Licença de Software',
    valor: 450.00,
    dataVencimento: '2024-01-25',
    categoria: 'Licenças',
    cliente: 'Ana Costa',
    status: 'Recebido',
    recorrente: true
  }
];

export const ContasReceberPage = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [contas, setContas] = useState<ContaReceber[]>(mockContasReceber);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConta, setEditingConta] = useState<ContaReceber | null>(null);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const filteredContas = contas.filter(conta =>
    conta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conta.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Recebido':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Vencido':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Recebido':
        return <CheckCircle className="w-4 h-4" />;
      case 'Vencido':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleNewConta = () => {
    setEditingConta(null);
    setIsModalOpen(true);
  };

  const handleEditConta = (conta: ContaReceber) => {
    setEditingConta(conta);
    setIsModalOpen(true);
  };

  const handleDeleteConta = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta conta?')) {
      setContas(contas.filter(c => c.id !== id));
    }
  };

  const handleSaveConta = (contaData: Omit<ContaReceber, 'id'>) => {
    if (editingConta) {
      setContas(contas.map(c => 
        c.id === editingConta.id 
          ? { ...contaData, id: editingConta.id }
          : c
      ));
    } else {
      const newConta: ContaReceber = {
        ...contaData,
        id: Date.now().toString()
      };
      setContas([...contas, newConta]);
    }
    setIsModalOpen(false);
    setEditingConta(null);
  };

  const totalPendente = contas
    .filter(c => c.status === 'Pendente')
    .reduce((sum, c) => sum + c.valor, 0);

  const totalVencido = contas
    .filter(c => c.status === 'Vencido')
    .reduce((sum, c) => sum + c.valor, 0);

  const totalRecebido = contas
    .filter(c => c.status === 'Recebido')
    .reduce((sum, c) => sum + c.valor, 0);

  const contasRecorrentes = contas.filter(c => c.recorrente).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab="contas-receber" 
        onTabChange={() => {}}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={handleMenuClick} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 lg:space-y-8 max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Contas a Receber</h1>
                <p className="text-gray-500 mt-1">Gerencie suas contas a receber</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pendente</p>
                    <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPendente)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Vencido</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalVencido)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Recebido</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRecebido)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contas Recorrentes</p>
                    <p className="text-2xl font-bold text-blue-600">{contasRecorrentes}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Table Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Lista de Contas a Receber</h3>
                    <p className="text-sm text-gray-500">Gerencie todas as suas contas a receber</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar contas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleNewConta}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Conta
                    </Button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700">Descrição</TableHead>
                      <TableHead className="font-semibold text-gray-700">Valor</TableHead>
                      <TableHead className="font-semibold text-gray-700">Vencimento</TableHead>
                      <TableHead className="font-semibold text-gray-700">Cliente</TableHead>
                      <TableHead className="font-semibold text-gray-700">Categoria</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Recorrente</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContas.map((conta, index) => (
                      <motion.tr
                        key={conta.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-900">
                          {conta.descricao}
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(conta.valor)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDate(conta.dataVencimento)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {conta.cliente}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {conta.categoria}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusStyle(conta.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(conta.status)}
                            {conta.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {conta.recorrente ? (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1 w-fit">
                              <Calendar className="w-3 h-3" />
                              Sim
                            </Badge>
                          ) : (
                            <span className="text-gray-400 text-sm">Não</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditConta(conta)}
                              className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteConta(conta.id)}
                              className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>

                {filteredContas.length === 0 && (
                  <div className="text-center py-12">
                    <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhuma conta encontrada
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm ? 'Tente ajustar sua busca' : 'Comece adicionando sua primeira conta a receber'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Modal */}
      <ContaReceberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingConta(null);
        }}
        onSave={handleSaveConta}
        conta={editingConta}
      />
    </div>
  );
};