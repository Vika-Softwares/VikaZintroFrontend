'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, DollarSign, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, Filter } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TablePagination } from "@/components/ui/table";

interface Lancamento {
  id: string;
  tipo: 'Pagar' | 'Receber';
  descricao: string;
  valor: number;
  dataVencimento: string;
  categoria: string;
  fornecedorCliente: string;
  status: 'Pendente' | 'Pago' | 'Recebido' | 'Vencido';
  recorrente: boolean;
}

const mockLancamentos: Lancamento[] = [
  // Contas a Pagar
  {
    id: '1',
    tipo: 'Pagar',
    descricao: 'Aluguel do Escritório',
    valor: 3500.00,
    dataVencimento: '2024-02-05',
    categoria: 'Infraestrutura',
    fornecedorCliente: 'Imobiliária Central',
    status: 'Pendente',
    recorrente: true
  },
  {
    id: '2',
    tipo: 'Pagar',
    descricao: 'Conta de Energia',
    valor: 450.80,
    dataVencimento: '2024-02-10',
    categoria: 'Utilidades',
    fornecedorCliente: 'Companhia Elétrica',
    status: 'Pendente',
    recorrente: true
  },
  {
    id: '3',
    tipo: 'Pagar',
    descricao: 'Fornecimento de Material',
    valor: 1200.00,
    dataVencimento: '2024-01-30',
    categoria: 'Materiais',
    fornecedorCliente: 'Materiais & Cia',
    status: 'Vencido',
    recorrente: false
  },
  // Contas a Receber
  {
    id: '4',
    tipo: 'Receber',
    descricao: 'Mensalidade de Serviços',
    valor: 2500.00,
    dataVencimento: '2024-02-05',
    categoria: 'Serviços',
    fornecedorCliente: 'João Silva',
    status: 'Pendente',
    recorrente: true
  },
  {
    id: '5',
    tipo: 'Receber',
    descricao: 'Projeto de Desenvolvimento',
    valor: 8500.00,
    dataVencimento: '2024-02-10',
    categoria: 'Projetos',
    fornecedorCliente: 'Maria Santos',
    status: 'Pendente',
    recorrente: false
  },
  {
    id: '6',
    tipo: 'Receber',
    descricao: 'Licença de Software',
    valor: 450.00,
    dataVencimento: '2024-01-25',
    categoria: 'Licenças',
    fornecedorCliente: 'Ana Costa',
    status: 'Recebido',
    recorrente: true
  }
];

export const TodosLancamentosPage = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'Todos' | 'Pagar' | 'Receber'>('Todos');
  const [filtroStatus, setFiltroStatus] = useState<'Todos' | 'Pendente' | 'Pago' | 'Recebido' | 'Vencido'>('Todos');
  const [lancamentos] = useState<Lancamento[]>(mockLancamentos);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtro por mês atual (padrão)
  const mesAtual = new Date().getMonth() + 1;
  const anoAtual = new Date().getFullYear();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const allFilteredLancamentos = lancamentos.filter(lancamento => {
    const dataVenc = new Date(lancamento.dataVencimento);
    const mesLancamento = dataVenc.getMonth() + 1;
    const anoLancamento = dataVenc.getFullYear();
    
    // Filtro por mês atual
    const noMesAtual = mesLancamento === mesAtual && anoLancamento === anoAtual;
    
    // Filtros de busca
    const matchSearch = lancamento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lancamento.fornecedorCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lancamento.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por tipo
    const matchTipo = filtroTipo === 'Todos' || lancamento.tipo === filtroTipo;
    
    // Filtro por status
    const matchStatus = filtroStatus === 'Todos' || lancamento.status === filtroStatus;
    
    return noMesAtual && matchSearch && matchTipo && matchStatus;
  });

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
      case 'Pago':
      case 'Recebido':
        return <CheckCircle className="w-4 h-4" />;
      case 'Vencido':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTipoStyle = (tipo: string) => {
    return tipo === 'Pagar' 
      ? 'bg-red-100 text-red-800 hover:bg-red-100'
      : 'bg-green-100 text-green-800 hover:bg-green-100';
  };

  // Cálculos para os cards
  const totalFiltered = allFilteredLancamentos.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredLancamentos = allFilteredLancamentos.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filtroTipo, filtroStatus]);

  const totalPagar = allFilteredLancamentos
    .filter(l => l.tipo === 'Pagar')
    .reduce((sum, l) => sum + l.valor, 0);

  const totalReceber = allFilteredLancamentos
    .filter(l => l.tipo === 'Receber')
    .reduce((sum, l) => sum + l.valor, 0);

  const saldoLiquido = totalReceber - totalPagar;

  const totalVencidos = allFilteredLancamentos
    .filter(l => l.status === 'Vencido')
    .reduce((sum, l) => sum + l.valor, 0);

  const getNomeDoMes = () => {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mesAtual - 1];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab="todos-lancamentos" 
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
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Todos Lançamentos</h1>
                <p className="text-gray-500 mt-1">Visão consolidada de contas a pagar e receber - {getNomeDoMes()} {anoAtual}</p>
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
                    <p className="text-sm font-medium text-gray-600">Total a Pagar</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalPagar)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-white" />
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
                    <p className="text-sm font-medium text-gray-600">Total a Receber</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalReceber)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
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
                    <p className="text-sm font-medium text-gray-600">Saldo Líquido</p>
                    <p className={`text-2xl font-bold ${saldoLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(saldoLiquido)}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    saldoLiquido >= 0 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-br from-orange-500 to-red-600'
                  }`}>
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
                    <p className="text-sm font-medium text-gray-600">Total Vencido</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalVencidos)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filtros:</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <select
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Todos">Todos os Tipos</option>
                    <option value="Pagar">Contas a Pagar</option>
                    <option value="Receber">Contas a Receber</option>
                  </select>

                  <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Recebido">Recebido</option>
                    <option value="Vencido">Vencido</option>
                  </select>

                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar lançamentos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Table Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Lançamentos do Mês</h3>
                    <p className="text-sm text-gray-500">{totalFiltered} lançamentos encontrados</p>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700">Tipo</TableHead>
                      <TableHead className="font-semibold text-gray-700">Descrição</TableHead>
                      <TableHead className="font-semibold text-gray-700">Valor</TableHead>
                      <TableHead className="font-semibold text-gray-700">Vencimento</TableHead>
                      <TableHead className="font-semibold text-gray-700">Fornecedor/Cliente</TableHead>
                      <TableHead className="font-semibold text-gray-700">Categoria</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Recorrente</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLancamentos.map((lancamento, index) => (
                      <motion.tr
                        key={lancamento.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell>
                          <Badge className={`${getTipoStyle(lancamento.tipo)} flex items-center gap-1 w-fit`}>
                            {lancamento.tipo === 'Pagar' ? (
                              <TrendingDown className="w-3 h-3" />
                            ) : (
                              <TrendingUp className="w-3 h-3" />
                            )}
                            {lancamento.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {lancamento.descricao}
                        </TableCell>
                        <TableCell className={`font-medium ${
                          lancamento.tipo === 'Pagar' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {formatCurrency(lancamento.valor)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDate(lancamento.dataVencimento)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {lancamento.fornecedorCliente}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {lancamento.categoria}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusStyle(lancamento.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(lancamento.status)}
                            {lancamento.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {lancamento.recorrente ? (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1 w-fit">
                              <Calendar className="w-3 h-3" />
                              Sim
                            </Badge>
                          ) : (
                            <span className="text-gray-400 text-sm">Não</span>
                          )}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>

                {totalFiltered === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum lançamento encontrado
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm ? 'Tente ajustar sua busca ou filtros' : `Não há lançamentos para ${getNomeDoMes()} ${anoAtual}`}
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
    </div>
  );
};