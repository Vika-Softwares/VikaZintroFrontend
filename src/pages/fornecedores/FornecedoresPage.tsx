"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Building2,
  DollarSign,
  TrendingUp,
} from "lucide-react";
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
import { FornecedorModal } from "@/components/fornecedores/FornecedorModal";
import { useToast } from "@/contexts/ToastContext";
import CustomerDto from "@/dto/customer.dto";
import { FornecedoresApi } from "@/services/FornecedoresApi";

export const FornecedoresPage = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fornecedores, setFornecedores] = useState<CustomerDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFornecedor, setEditingFornecedor] =
    useState<CustomerDto | null>(null);
  const [totalFornecedores, setTotalFornecedores] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fornecedorService = new FornecedoresApi();
  const toast = useToast();

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const data = await fornecedorService.getAll({
          page: currentPage,
          limit: itemsPerPage,
        });
        setTotalFornecedores(data.total);
        setFornecedores(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Erro", "Não foi possível carregar os fornecedores.");
      }
    };
    fetchFornecedores();
  }, [currentPage, itemsPerPage]);

  const filteredFornecedores = fornecedores.filter(
    (fornecedor) =>
      fornecedor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (fornecedor.category &&
        fornecedor.category.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const formatCNPJ = (cnpj: string) => {
    if (!cnpj) return "";
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  };

  const handleNewFornecedor = () => {
    setEditingFornecedor(null);
    setIsModalOpen(true);
  };

  const handleEditFornecedor = (fornecedor: CustomerDto) => {
    setEditingFornecedor(fornecedor);
    setIsModalOpen(true);
  };

  const handleDeleteFornecedor = async (id: string) => {
    const confirmed = await toast.confirm({
      title: "Excluir Fornecedor",
      message:
        "Tem certeza que deseja excluir este fornecedor? Esta ação não pode ser desfeita.",
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });

    if (confirmed) {
      try {
        await fornecedorService.deleteFornecedor(id);
        setFornecedores(fornecedores.filter((f) => f.idCustomers !== id));
        toast.success(
          "Fornecedor excluído",
          "Fornecedor excluído com sucesso!"
        );
      } catch (error) {
        toast.error(
          "Erro ao excluir",
          "Não foi possível excluir o fornecedor."
        );
      }
    }
  };

  const handleSaveFornecedor = async (fornecedorData: any) => {
    try {
      const fornecedor = {
        name: fornecedorData.nome,
        email: fornecedorData.email,
        phone: fornecedorData.telefone,
        address: fornecedorData.endereco || "",
        cpfCnpj: fornecedorData.cnpj,
        status: fornecedorData.status,
        category: fornecedorData.categoria || "",
        idCompany: 1,
        isSupplier: true,
      };

      if (editingFornecedor) {
        await fornecedorService.update(
          editingFornecedor.idCustomers,
          fornecedor
        );
        toast.success(
          "Fornecedor atualizado",
          "Dados do fornecedor atualizados com sucesso!"
        );
      } else {
        await fornecedorService.create(fornecedor);
        toast.success(
          "Fornecedor criado",
          "Novo fornecedor criado com sucesso!"
        );
      }

      const data = await fornecedorService.getAll({
        page: currentPage,
        limit: itemsPerPage,
      });
      setTotalFornecedores(data.total);
      setFornecedores(data.data);

      setIsModalOpen(false);
      setEditingFornecedor(null);
    } catch (error) {
      toast.error("Erro ao salvar", "Não foi possível salvar o fornecedor.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 lg:space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Fornecedores
          </h1>
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
              <p className="text-sm font-medium text-gray-600">
                Total Fornecedores
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {fornecedores.length}
              </p>
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
              <p className="text-sm font-medium text-gray-600">
                Fornecedores Ativos
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {fornecedores.filter((f) => f.status === "Ativo").length}
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
                {formatCurrency(
                  fornecedores.reduce((sum, f) => sum + f.totalCompras, 0)
                )}
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
                {formatCurrency(
                  fornecedores.reduce((sum, f) => sum + f.totalCompras, 0) /
                    fornecedores.length
                )}
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
              <h3 className="text-lg font-semibold text-gray-800">
                Lista de Fornecedores
              </h3>
              <p className="text-sm text-gray-500">
                Gerencie todos os seus fornecedores
              </p>
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
                  CNPJ
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Categoria
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Total Compras
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFornecedores.map((fornecedor, index) => (
                <motion.tr
                  key={fornecedor.idCustomers}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900">
                    {fornecedor.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {fornecedor.email}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {fornecedor.phone}
                  </TableCell>
                  <TableCell className="text-gray-600 font-mono text-sm">
                    {formatCNPJ(fornecedor.cpfCnpj)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {fornecedor.category || "-"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        fornecedor.status === "Ativo" ? "default" : "secondary"
                      }
                      className={
                        fornecedor.status === "Ativo"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {fornecedor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {formatCurrency(fornecedor.totalCompras || 0)}
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
                        onClick={() =>
                          handleDeleteFornecedor(fornecedor.idCustomers)
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

          {filteredFornecedores.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum fornecedor encontrado
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? "Tente ajustar sua busca"
                  : "Comece adicionando seu primeiro fornecedor"}
              </p>
            </div>
          )}
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalFornecedores / itemsPerPage)}
          totalItems={totalFornecedores}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newSize) => {
            setItemsPerPage(newSize);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Modal */}
      <FornecedorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFornecedor(null);
        }}
        onSave={handleSaveFornecedor}
        fornecedor={
          editingFornecedor
            ? {
                id: editingFornecedor.idCustomers,
                nome: editingFornecedor.name,
                email: editingFornecedor.email,
                telefone: editingFornecedor.phone,
                endereco: editingFornecedor.address || "",
                cnpj: editingFornecedor.cpfCnpj,
                status: editingFornecedor.status,
                categoria: editingFornecedor.category || "",
                totalCompras: editingFornecedor.totalCompras || 0,
                dataUltimaCompra: editingFornecedor.dataUltimaCompra,
              }
            : null
        }
      />
    </motion.div>
  );
};
