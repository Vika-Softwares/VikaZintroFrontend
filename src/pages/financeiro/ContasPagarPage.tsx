'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, DollarSign, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TablePagination } from "@/components/ui/table";
import { ContaPagarModal } from "@/components/financeiro/ContaPagarModal";
import { useToast } from "@/contexts/ToastContext";

interface ContaPagar {
  id: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  categoria: string;
  fornecedor: string;
  status: 'Pendente' | 'Pago' | 'Vencido';
  recorrente: boolean;
  observacoes?: string;
}

const mockContasPagar: ContaPagar[] = [
  {
    id: '1',
    descricao: 'Aluguel do Escritório',
    valor: 3500.00,
    dataVencimento: '2024-02-05',
    categoria: 'Infraestrutura',
    fornecedor: 'Imobiliária Central',
    status: 'Pendente',
    recorrente: true,
    observacoes: 'Pagamento mensal do aluguel'
  },
  {
    id: '2',
    descricao: 'Conta de Energia',
    valor: 450.80,
    dataVencimento: '2024-02-10',
    categoria: 'Utilidades',
    fornecedor: 'Companhia Elétrica',
    status: 'Pendente',
    recorrente: true
  },
  {
    id: '3',
    descricao: 'Fornecimento de Material',
    valor: 1200.00,
    dataVencimento: '2024-01-30',
    categoria: 'Materiais',
    fornecedor: 'Materiais & Cia',
    status: 'Vencido',
    recorrente: false
  },
  {
    id: '4',
    descricao: 'Serviços de Consultoria',
    valor: 2800.00,
    dataVencimento: '2024-01-25',
    categoria: 'Serviços',
    fornecedor: 'Tech Solutions Ltda',
    status: 'Pago',
    recorrente: false
  }
];

export const ContasPagarPage = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [contas, setContas] = useState<ContaPagar[]>(mockContasPagar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConta, setEditingConta] = useState<ContaPagar | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const toast = useToast();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const filteredContas = contas.filter(conta =>
    conta.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conta.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conta.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFiltered = filteredContas.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContas = filteredContas.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
      case 'Pago':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Vencido':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pago':
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

  const handleEditConta = (conta: ContaPagar) => {
    setEditingConta(conta);
    setIsModalOpen(true);
  };

  const handleDeleteConta = async (id: string) => {
    const confirmed = await toast.confirm({
      title: "Excluir Conta",
      message: "Tem certeza que deseja excluir esta conta a pagar? Esta ação não pode ser desfeita.",
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });

    if (confirmed) {
      setContas(contas.filter(c => c.id !== id));
      toast.success("Conta excluída", "Conta a pagar excluída com sucesso!");
    }
  };

  const handleSaveConta = (contaData: Omit<ContaPagar, 'id'>) => {
    if (editingConta) {
      setContas(contas.map(c => 
        c.id === editingConta.id 
          ? { ...contaData, id: editingConta.id }
          : c
      ));
      toast.success("Conta atualizada", "Conta a pagar atualizada com sucesso!");
    } else {
      const newConta: ContaPagar = {
        ...contaData,
        id: Date.now().toString()
      };
      setContas([...contas, newConta]);
      toast.success("Conta criada", "Nova conta a pagar criada com sucesso!");
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

  const totalPago = contas
    .filter(c => c.status === 'Pago')
    .reduce((sum, c) => sum + c.valor, 0);

  const contasRecorrentes = contas.filter(c => c.recorrente).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab="contas-pagar" 
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
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Contas a Pagar</h1>
                <p className="text-gray-500 mt-1">Gerencie suas contas a pagar</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Pago</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPago)}</p>
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
                    <h3 className="text-lg font-semibold text-gray-800">Lista de Contas a Pagar</h3>
                    <p className="text-sm text-gray-500">Gerencie todas as suas contas a pagar</p>
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
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
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
                      <TableHead className="font-semibold text-gray-700">Fornecedor</TableHead>
                      <TableHead className="font-semibold text-gray-700">Categoria</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Recorrente</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedContas.map((conta, index) => (
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
                        <TableCell className="font-medium text-red-600">
                          {formatCurrency(conta.valor)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDate(conta.dataVencimento)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {conta.fornecedor}
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
                      {searchTerm ? 'Tente ajustar sua busca' : 'Comece adicionando sua primeira conta a pagar'}
                    </p>
                  </div>
                )}
              </div>

              <TablePagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalFiltered / itemsPerPage)}
                totalItems={totalFiltered}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newSize) => {
                  setItemsPerPage(newSize);
                  setCurrentPage(1);
                }}
              />
            </div>
          </motion.div>
        </main>
      </div>

      {/* Modal */}
      <ContaPagarModal
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