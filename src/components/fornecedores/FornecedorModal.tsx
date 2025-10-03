'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Mail, Phone, MapPin, FileText, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';

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

interface FornecedorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fornecedor: Omit<Fornecedor, 'id'>) => void;
  fornecedor?: Fornecedor | null;
}

const categorias = [
  'Tecnologia',
  'Materiais',
  'Serviços',
  'Logística',
  'Consultoria',
  'Equipamentos',
  'Manutenção',
  'Outros'
];

export const FornecedorModal: React.FC<FornecedorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  fornecedor
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cnpj: '',
    status: 'Ativo' as 'Ativo' | 'Inativo',
    categoria: '',
    totalCompras: 0,
    dataUltimaCompra: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (fornecedor) {
      setFormData({
        nome: fornecedor.nome,
        email: fornecedor.email,
        telefone: fornecedor.telefone,
        endereco: fornecedor.endereco,
        cnpj: fornecedor.cnpj,
        status: fornecedor.status,
        categoria: fornecedor.categoria,
        totalCompras: fornecedor.totalCompras,
        dataUltimaCompra: fornecedor.dataUltimaCompra || ''
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        cnpj: '',
        status: 'Ativo',
        categoria: '',
        totalCompras: 0,
        dataUltimaCompra: ''
      });
    }
    setErrors({});
  }, [fornecedor, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    }

    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        endereco: formData.endereco,
        cnpj: formData.cnpj,
        status: formData.status,
        categoria: formData.categoria,
        totalCompras: formData.totalCompras,
        dataUltimaCompra: formData.dataUltimaCompra || undefined
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={fornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
      description={
        fornecedor
          ? 'Atualize as informações do fornecedor'
          : 'Preencha os dados do novo fornecedor'
      }
      icon={<Building2 className="w-5 h-5 text-white" />}
      iconBgColor="bg-gradient-to-br from-orange-500 to-red-600"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                      Nome da Empresa *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="nome"
                        type="text"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        className={`pl-10 ${errors.nome ? 'border-red-500' : ''}`}
                        placeholder="Digite o nome da empresa"
                      />
                    </div>
                    {errors.nome && (
                      <p className="text-sm text-red-600">{errors.nome}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Digite o email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                      Telefone *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="telefone"
                        type="text"
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', e.target.value)}
                        className={`pl-10 ${errors.telefone ? 'border-red-500' : ''}`}
                        placeholder="(11) 3333-3333"
                      />
                    </div>
                    {errors.telefone && (
                      <p className="text-sm text-red-600">{errors.telefone}</p>
                    )}
                  </div>

                  {/* CNPJ */}
                  <div className="space-y-2">
                    <Label htmlFor="cnpj" className="text-sm font-medium text-gray-700">
                      CNPJ *
                    </Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="cnpj"
                        type="text"
                        value={formData.cnpj}
                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                        className={`pl-10 ${errors.cnpj ? 'border-red-500' : ''}`}
                        placeholder="12.345.678/0001-90"
                      />
                    </div>
                    {errors.cnpj && (
                      <p className="text-sm text-red-600">{errors.cnpj}</p>
                    )}
                  </div>

                  {/* Categoria */}
                  <div className="space-y-2">
                    <Label htmlFor="categoria" className="text-sm font-medium text-gray-700">
                      Categoria *
                    </Label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />
                      <Select
                        id="categoria"
                        value={formData.categoria}
                        onChange={(e) => handleInputChange('categoria', e.target.value)}
                        className={`pl-10 ${errors.categoria ? 'border-red-500' : ''}`}
                      >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </Select>
                    </div>
                    {errors.categoria && (
                      <p className="text-sm text-red-600">{errors.categoria}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                      Status
                    </Label>
                    <Select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </Select>
                  </div>
                </div>

                {/* Endereço */}
                <div className="space-y-2">
                  <Label htmlFor="endereco" className="text-sm font-medium text-gray-700">
                    Endereço *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="endereco"
                      type="text"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      className={`pl-10 ${errors.endereco ? 'border-red-500' : ''}`}
                      placeholder="Digite o endereço completo"
                    />
                  </div>
                  {errors.endereco && (
                    <p className="text-sm text-red-600">{errors.endereco}</p>
                  )}
                </div>

                {fornecedor && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Total Compras */}
                    <div className="space-y-2">
                      <Label htmlFor="totalCompras" className="text-sm font-medium text-gray-700">
                        Total em Compras (R$)
                      </Label>
                      <Input
                        id="totalCompras"
                        type="number"
                        step="0.01"
                        value={formData.totalCompras}
                        onChange={(e) => handleInputChange('totalCompras', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>

                    {/* Data Última Compra */}
                    <div className="space-y-2">
                      <Label htmlFor="dataUltimaCompra" className="text-sm font-medium text-gray-700">
                        Data da Última Compra
                      </Label>
                      <Input
                        id="dataUltimaCompra"
                        type="date"
                        value={formData.dataUltimaCompra}
                        onChange={(e) => handleInputChange('dataUltimaCompra', e.target.value)}
                      />
                    </div>
                  </div>
                )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {fornecedor ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};