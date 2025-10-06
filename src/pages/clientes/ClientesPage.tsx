"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TablePagination,
} from "@/components/ui/table";
import { ClienteModal } from "@/components/clientes/ClienteModal";
import { ClientesApi } from "@/services/ClientesApi";
import CustomerDto from "@/dto/customer.dto";
import { useToast } from "@/contexts/ToastContext";

export const ClientesPage = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes, setClientes] = useState<CustomerDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<CustomerDto | null>(
    null
  );

  const [totalClientes, setTotalClientes] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const clienteService = new ClientesApi();
  const toast = useToast();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await clienteService.getAll({
          page: currentPage,
          limit: itemsPerPage,
          isSupplier: false,
        });
        setTotalClientes(data.total);
        setClientes(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientes();
  }, [currentPage, itemsPerPage]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleNewCliente = () => {
    setEditingCliente(null);
    setIsModalOpen(true);
  };

  const handleEditCliente = (cliente: CustomerDto) => {
    setEditingCliente(cliente);
    setIsModalOpen(true);
  };

  const handleDeleteCliente = async (idCustomers: string) => {
    const confirmed = await toast.confirm({
      title: "Excluir Cliente",
      message:
        "Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.",
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });

    if (confirmed) {
      try {
        await clienteService.deleteCliente(idCustomers);
        setClientes(clientes.filter((c) => c.idCustomers !== idCustomers));
        toast.success("Cliente excluído", "Cliente excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir", "Não foi possível excluir o cliente.");
      }
    }
  };

  const handleSaveCliente = async (clienteData: CustomerDto) => {
    try {
      if (editingCliente) {
        await clienteService.update(editingCliente.idCustomers, {
          ...clienteData,
          idCustomers: editingCliente.idCustomers,
        });
        toast.success(
          "Cliente atualizado",
          "Dados do cliente atualizados com sucesso!"
        );
      } else {
        await clienteService.create(clienteData);
        toast.success("Cliente criado", "Novo cliente criado com sucesso!");
      }

      const data = await clienteService.getAll({
        page: currentPage,
        limit: itemsPerPage,
        isSupplier: false,
      });
      setTotalClientes(data.total);
      setClientes(data.data);

      setIsModalOpen(false);
      setEditingCliente(null);
    } catch (error) {
      toast.error("Erro ao salvar", "Não foi possível salvar o cliente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab="clientes"
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
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Clientes
                </h1>
                <p className="text-gray-500 mt-1">Gerencie seus clientes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Clientes
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalClientes}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
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
                    <p className="text-sm font-medium text-gray-600">
                      Clientes Ativos
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {clientes.filter((c) => c.status === "Ativo").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
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
                    <p className="text-sm font-medium text-gray-600">
                      Receita Total
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(
                        clientes.reduce(
                          (sum, c) => sum + c.totalCompras || 0,
                          0
                        )
                      )}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
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
                    <p className="text-sm font-medium text-gray-600">
                      Ticket Médio
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(
                        clientes.reduce(
                          (sum, c) => sum + c.totalCompras || 0,
                          0
                        ) / clientes.length
                      )}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Lista de Clientes
                    </h3>
                    <p className="text-sm text-gray-500">
                      Gerencie todos os seus clientes
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar clientes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>

                    <Button
                      onClick={handleNewCliente}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Cliente
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700">
                        Nome
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Email
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Telefone
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Total Compras
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Última Compra
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 text-center">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientes.map((cliente, index) => (
                      <motion.tr
                        key={cliente.idCustomers}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-900">
                          {cliente.name}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {cliente.email}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {cliente.phone}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              cliente.status === "Ativo"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              cliente.status === "Ativo"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {cliente.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {formatCurrency(cliente.totalCompras)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {cliente.dataUltimaCompra
                            ? formatDate(cliente.dataUltimaCompra)
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditCliente(cliente)}
                              className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleDeleteCliente(cliente.idCustomers)
                              }
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

                {filteredClientes.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum cliente encontrado
                    </h3>
                    <p className="text-gray-500">
                      {searchTerm
                        ? "Tente ajustar sua busca"
                        : "Comece adicionando seu primeiro cliente"}
                    </p>
                  </div>
                )}
              </div>

              <TablePagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalClientes / itemsPerPage)}
                totalItems={totalClientes}
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

      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCliente(null);
        }}
        onSave={handleSaveCliente}
        cliente={editingCliente}
      />
    </div>
  );
};
