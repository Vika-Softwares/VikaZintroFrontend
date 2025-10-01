"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, IdCard } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CustomerDto from "@/dto/customer.dto";

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cliente: CustomerDto) => void;
  cliente?: CustomerDto | null;
}

export const ClienteModal: React.FC<ClienteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cliente,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    /*  endereco: "", */
    status: "Ativo" as "Ativo" | "Inativo",
    totalCompras: 0,
    dataUltimaCompra: "",
    cpfCnpj: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cliente) {
      setFormData({
        name: cliente.name,
        email: cliente.email,
        phone: cliente.phone,
        /*  endereco: cliente.endereco, */
        status: cliente.status,
        totalCompras: cliente.totalCompras,
        dataUltimaCompra: cliente.dataUltimaCompra || "",
        cpfCnpj: cliente.cpfCnpj || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        /* endereco: "", */
        status: "Ativo",
        totalCompras: 0,
        dataUltimaCompra: "",
        cpfCnpj: "",
      });
    }
    setErrors({});
  }, [cliente, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }

    /*  if (!formData.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório";
    } */

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        totalCompras: formData.totalCompras,
        categoria: "",
        cpfCnpj: formData.cpfCnpj,
        idCustomers: "",
        idCompany: 0,
        supplier: false,
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {cliente ? "Editar Cliente" : "Novo Cliente"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {cliente
                        ? "Atualize as informações do cliente"
                        : "Preencha os dados do novo cliente"}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="nome"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nome Completo *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="nome"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        placeholder="Digite o nome completo"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="nome"
                      className="text-sm font-medium text-gray-700"
                    >
                      CPF ou CNPJ *
                    </Label>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="nome"
                        type="text"
                        value={formData.cpfCnpj}
                        onChange={(e) =>
                          handleInputChange("cpfCnpj", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.cpfCnpj ? "border-red-500" : ""
                        }`}
                        placeholder="Digite o cpf ou cnpj completo"
                      />
                    </div>
                    {errors.cpfCnpj && (
                      <p className="text-sm text-red-600">{errors.cpfCnpj}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="Digite o email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="telefone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Telefone *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="telefone"
                        type="text"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="status"
                      className="text-sm font-medium text-gray-700"
                    >
                      Status
                    </Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </div>

                {/* Endereço */}
                <div className="space-y-2">
                  <Label
                    htmlFor="endereco"
                    className="text-sm font-medium text-gray-700"
                  >
                    Endereço *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="endereco"
                      type="text"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("endereco", e.target.value)
                      }
                      className={`pl-10 ${
                        errors.endereco ? "border-red-500" : ""
                      }`}
                      placeholder="Digite o endereço completo"
                    />
                  </div>
                  {errors.endereco && (
                    <p className="text-sm text-red-600">{errors.endereco}</p>
                  )}
                </div>

                {cliente && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total Compras */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="totalCompras"
                        className="text-sm font-medium text-gray-700"
                      >
                        Total em Compras (R$)
                      </Label>
                      <Input
                        id="totalCompras"
                        type="number"
                        step="0.01"
                        value={formData.totalCompras}
                        onChange={(e) =>
                          handleInputChange(
                            "totalCompras",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="0.00"
                      />
                    </div>

                    {/* Data Última Compra */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="dataUltimaCompra"
                        className="text-sm font-medium text-gray-700"
                      >
                        Data da Última Compra
                      </Label>
                      <Input
                        id="dataUltimaCompra"
                        type="date"
                        value={formData.dataUltimaCompra}
                        onChange={(e) =>
                          handleInputChange("dataUltimaCompra", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    {cliente ? "Atualizar" : "Salvar"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
