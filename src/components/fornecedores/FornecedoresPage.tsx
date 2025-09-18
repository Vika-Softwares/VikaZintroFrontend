'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Building2, DollarSign, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FornecedorModal } from "./FornecedorModal";

interface Fornecedor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cnpj: string;
  status: 'Ativo' | 'Inativo';
  categoria: string;
  dataUltimaCompra?: string;
  totalCompras: number;
}

const mockFornecedores: Fornecedor[] = [
  {
    id: '1',
    nome: 'Tech Solutions Ltda',
    email: 'contato@techsolutions.com',
    telefone: '(11) 3333-3333',
    endereco: 'São Paulo, SP',
    cnpj: '12.345.678/0001-90',
    status: 'Ativo',
    categoria: 'Tecnologia',
    dataUltimaCompra: '2024-01-12',
    totalCompras: 45200.00
  },
  {
    id: '2',
    nome: 'Materiais & Cia',
    email: 'vendas@materiaisecia.com',
    telefone: '(11) 4444-4444',
    endereco: 'Campinas, SP',
    cnpj: '98.765.432/0001-10',
    status: 'Ativo',
    categoria: 'Materiais',
    dataUltimaCompra: '2024-01-08',
    totalCompras: 28750.50
  },
  {
    id: '3',
    nome: 'Serviços Gerais S.A.',
    email: 'admin@servicosgerais.com',
    telefone: '(11) 5555-5555',
    endereco: 'Santos, SP',
    cnpj: '11.222.333/0001-44',
    status: 'Inativo',
    categoria: 'Serviços',
    dataUltimaCompra: '2023-11-15',
    totalCompras: 12300.00
  },
  {
    id: '4',
    nome: 'Logística Express',
    email: 'contato@logisticaexpress.com',
    telefone: '(11) 6666-6666',
    endereco: 'Guarulhos, SP',
    cnpj: '44.555.666/0001-77',
    status: 'Ativo',
    categoria: 'Logística',
    dataUltimaCompra: '2024-01-10',
    totalCompras: 18900.25
  }
];

export const FornecedoresPage = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(mockFornecedores);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.categoria.toLowerCase().includes(searchTerm.toLowerCase())
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

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const handleNewFornecedor = () => {
    setEditingFornecedor(null);
    setIsModalOpen(true);
  };

  const handleEditFornecedor = (fornecedor: Fornecedor) => {
    setEditingFornecedor(fornecedor);
    setIsModalOpen(true);
  };

  const handleDeleteFornecedor = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      setFornecedores(fornecedores.filter(f => f.id !== id));
    }
  };

  const handleSaveFornecedor = (fornecedorData: Omit<Fornecedor, 'id'>) => {
    if (editingFornecedor) {
      // Editar fornecedor existente
      setFornecedores(fornecedores.map(f => 
        f.id === editingFornecedor.id 
          ? { ...fornecedorData, id: editingFornecedor.id }
          : f
      ));
    } else {
      // Criar novo fornecedor
      const newFornecedor: Fornecedor = {
        ...fornecedorData,
        id: Date.now().toString()
      };
      setFornecedores([...fornecedores, newFornecedor]);
    }
    setIsModalOpen(false);
    setEditingFornecedor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab="fornecedores" 
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
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Fornecedores</h1>
                <p className="text-gray-500 mt-1">Gerencie seus fornecedores</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Fornecedores</p>
                    <p className="text-2xl font-bold text-gray-900">{fornecedores.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
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
                    <p className="text-sm font-medium text-gray-600">Fornecedores Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {fornecedores.filter(f => f.status === 'Ativo').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
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
                    <p className="text-sm font-medium text-gray-600">Total Gasto</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(fornecedores.reduce((sum, f) => sum + f.totalCompras, 0))}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
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
                    <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(fornecedores.reduce((sum, f) => sum + f.totalCompras, 0) / fornecedores.length)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
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
                    <h3 className="text-lg font-semibold text-gray-800">Lista de Fornecedores</h3>
                    <p className="text-sm text-gray-500">Gerencie todos os seus fornecedores</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar fornecedores..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleNewFornecedor}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Fornecedor
                    </Button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700">Nome</TableHead>
                      <TableHead className="font-semibold text-gray-700">Email</TableHead>
                      <TableHead className="font-semibold text-gray-700">Telefone</TableHead>
                      <TableHead className="font-semibold text-gray-700">CNPJ</TableHead>
                      <TableHead className="font-semibold text-gray-700">Categoria</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Total Compras</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFornecedores.map((fornecedor, index) => (
                      <motion.tr
                        key={fornecedor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-900">
                          {fornecedor.nome}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {fornecedor.email}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {fornecedor.telefone}
                        </TableCell>
                        <TableCell className="text-gray-600 font-mono text-sm">
                          {formatCNPJ(fornecedor.cnpj)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {fornecedor.categoria}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={fornecedor.status === 'Ativo' ? 'default' : 'secondary'}
                            className={fornecedor.status === 'Ativo' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                            }
                          >
                            {fornecedor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {formatCurrency(fornecedor.totalCompras)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditFornecedor(fornecedor)}
                              className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteFornecedor(fornecedor.id)}
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

                {filteredFornecedores.length === 0 && (
                  <div className="text-center py-12">
                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum fornecedor encontrado
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm ? 'Tente ajustar sua busca' : 'Comece adicionando seu primeiro fornecedor'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Modal */}
      <FornecedorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFornecedor(null);
        }}
        onSave={handleSaveFornecedor}
        fornecedor={editingFornecedor}
      />
    </div>
  );
};