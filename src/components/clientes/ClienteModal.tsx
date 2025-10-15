"use client";

import CustomerDto from "@/dto/customer.dto";
import {
  formatCPF,
  formatPhone,
  validateCPF,
  validatePhone,
} from "@/utils/formatters";
import { IdCard, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Modal } from "../ui/modal";
import { Select } from "../ui/select";

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
    status: "Ativo" as "Ativo" | "Inativo",
    totalCompras: 0,
    dataUltimaCompra: "",
    cpfCnpj: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cliente) {
      setFormData({
        name: cliente.name,
        email: cliente.email,
        phone: cliente.phone,
        status: cliente.status,
        totalCompras: cliente.totalCompras,
        dataUltimaCompra: cliente.dataUltimaCompra || "",
        cpfCnpj: cliente.cpfCnpj || "",
        address: cliente.address || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "Ativo",
        totalCompras: 0,
        dataUltimaCompra: "",
        cpfCnpj: "",
        address: "",
      });
    }
    setErrors({});
  }, [cliente, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.cpfCnpj.trim()) {
      newErrors.cpfCnpj = "CPF ou CNPJ é obrigatório";
    } else if (!validateCPF(formData.cpfCnpj)) {
      newErrors.cpfCnpj = "CPF ou CNPJ inválido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Telefone inválido";
    }

    if (
      (formData.address.trim() && formData.address.length < 3) ||
      formData.address.length > 255
    ) {
      newErrors.address =
        "Endereço deve ter no mínimo 3 caracteres e no máximo 255 caracteres";
    }

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
        category: "",
        cpfCnpj: formData.cpfCnpj,
        idCustomers: "",
        idCompany: 0,
        isSupplier: false,
        address: formData.address || "",
      });
    }
  };

  const handleInputChange = (
    field: keyof CustomerDto,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setFormData((prev) => ({ ...prev, cpfCnpj: formatted }));
    if (errors.cpfCnpj) {
      setErrors((prev) => ({ ...prev, cpfCnpj: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  return (
    <Modal
      data-testid="modal-cliente"
      isOpen={isOpen}
      onClose={onClose}
      title={cliente ? "Editar Cliente" : "Novo Cliente"}
      description={
        cliente
          ? "Atualize as informações do cliente"
          : "Preencha os dados do novo cliente"
      }
      icon={<User className="w-5 h-5 text-white" />}
      iconBgColor="bg-gradient-to-br from-blue-500 to-purple-600"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
              Nome Completo *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="nome"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                placeholder="Digite o nome completo"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
              CPF ou CNPJ *
            </Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="cpfCnpj"
                type="text"
                value={formData.cpfCnpj}
                onChange={(e) => handleCPFChange(e.target.value)}
                className={`pl-10 ${errors.cpfCnpj ? "border-red-500" : ""}`}
                placeholder="Digite o CPF ou CNPJ"
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
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
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
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                placeholder="(11) 99999-9999"
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Endereço */}
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Endereço
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`pl-10 ${errors.address ? "border-red-500" : ""}`}
                placeholder="Rua x, numero x, bairro x, cidade x, estado x"
              />
            </div>
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address}</p>
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
            <Select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </Select>
          </div>
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
                disabled={!!cliente}
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
                disabled={!!cliente}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <Button
            data-testid="btn-cancelar-cliente"
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            data-testid="btn-salvar-cliente"
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {cliente ? "Atualizar" : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
