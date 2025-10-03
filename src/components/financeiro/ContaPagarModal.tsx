'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, FileText, Building2, Tag, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/ui/modal';

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

interface ContaPagarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (conta: Omit<ContaPagar, 'id'>) => void;
  conta?: ContaPagar | null;
}

const categorias = [
  'Infraestrutura',
  'Utilidades',
  'Materiais',
  'Serviços',
  'Consultoria',
  'Equipamentos',
  'Manutenção',
  'Marketing',
  'Outros'
];

const fornecedores = [
  'Imobiliária Central',
  'Companhia Elétrica',
  'Materiais & Cia',
  'Tech Solutions Ltda',
  'Logística Express',
  'Outros'
];

export const ContaPagarModal: React.FC<ContaPagarModalProps> = ({
  isOpen,
  onClose,
  onSave,
  conta
}) => {
  const [formData, setFormData] = useState({
    descricao: '',
    valor: 0,
    dataVencimento: '',
    categoria: '',
    fornecedor: '',
    status: 'Pendente' as 'Pendente' | 'Pago' | 'Vencido',
    recorrente: false,
    observacoes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (conta) {
      setFormData({
        descricao: conta.descricao,
        valor: conta.valor,
        dataVencimento: conta.dataVencimento,
        categoria: conta.categoria,
        fornecedor: conta.fornecedor,
        status: conta.status,
        recorrente: conta.recorrente,
        observacoes: conta.observacoes || ''
      });
    } else {
      setFormData({
        descricao: '',
        valor: 0,
        dataVencimento: '',
        categoria: '',
        fornecedor: '',
        status: 'Pendente',
        recorrente: false,
        observacoes: ''
      });
    }
    setErrors({});
  }, [conta, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (formData.valor <= 0) {
      newErrors.valor = 'Valor deve ser maior que zero';
    }

    if (!formData.dataVencimento) {
      newErrors.dataVencimento = 'Data de vencimento é obrigatória';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    if (!formData.fornecedor) {
      newErrors.fornecedor = 'Fornecedor é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        descricao: formData.descricao,
        valor: formData.valor,
        dataVencimento: formData.dataVencimento,
        categoria: formData.categoria,
        fornecedor: formData.fornecedor,
        status: formData.status,
        recorrente: formData.recorrente,
        observacoes: formData.observacoes || undefined
      });
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={conta ? 'Editar Conta a Pagar' : 'Nova Conta a Pagar'}
      description={
        conta
          ? 'Atualize as informações da conta'
          : 'Preencha os dados da nova conta'
      }
      icon={<DollarSign className="w-5 h-5 text-white" />}
      iconBgColor="bg-gradient-to-br from-red-500 to-pink-600"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Descrição */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                      Descrição *
                    </Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="descricao"
                        type="text"
                        value={formData.descricao}
                        onChange={(e) => handleInputChange('descricao', e.target.value)}
                        className={`pl-10 ${errors.descricao ? 'border-red-500' : ''}`}
                        placeholder="Digite a descrição da conta"
                      />
                    </div>
                    {errors.descricao && (
                      <p className="text-sm text-red-600">{errors.descricao}</p>
                    )}
                  </div>

                  {/* Valor */}
                  <div className="space-y-2">
                    <Label htmlFor="valor" className="text-sm font-medium text-gray-700">
                      Valor (R$) *
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="valor"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.valor}
                        onChange={(e) => handleInputChange('valor', parseFloat(e.target.value) || 0)}
                        className={`pl-10 ${errors.valor ? 'border-red-500' : ''}`}
                        placeholder="0,00"
                      />
                    </div>
                    {errors.valor && (
                      <p className="text-sm text-red-600">{errors.valor}</p>
                    )}
                  </div>

                  {/* Data de Vencimento */}
                  <div className="space-y-2">
                    <Label htmlFor="dataVencimento" className="text-sm font-medium text-gray-700">
                      Data de Vencimento *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="dataVencimento"
                        type="date"
                        value={formData.dataVencimento}
                        onChange={(e) => handleInputChange('dataVencimento', e.target.value)}
                        className={`pl-10 ${errors.dataVencimento ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.dataVencimento && (
                      <p className="text-sm text-red-600">{errors.dataVencimento}</p>
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

                  {/* Fornecedor */}
                  <div className="space-y-2">
                    <Label htmlFor="fornecedor" className="text-sm font-medium text-gray-700">
                      Fornecedor *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />
                      <Select
                        id="fornecedor"
                        value={formData.fornecedor}
                        onChange={(e) => handleInputChange('fornecedor', e.target.value)}
                        className={`pl-10 ${errors.fornecedor ? 'border-red-500' : ''}`}
                      >
                        <option value="">Selecione um fornecedor</option>
                        {fornecedores.map(forn => (
                          <option key={forn} value={forn}>{forn}</option>
                        ))}
                      </Select>
                    </div>
                    {errors.fornecedor && (
                      <p className="text-sm text-red-600">{errors.fornecedor}</p>
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
                      <option value="Pendente">Pendente</option>
                      <option value="Pago">Pago</option>
                      <option value="Vencido">Vencido</option>
                    </Select>
                  </div>

                  {/* Recorrente */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Conta Recorrente
                    </Label>
                    <Checkbox
                      id="recorrente"
                      checked={formData.recorrente}
                      onChange={(e) => handleInputChange('recorrente', e.target.checked)}
                      label="Esta conta se repete mensalmente"
                    />
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes" className="text-sm font-medium text-gray-700">
                    Observações
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4 pointer-events-none z-10" />
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange('observacoes', e.target.value)}
                      className="pl-10"
                      rows={3}
                      placeholder="Observações adicionais sobre a conta"
                    />
                  </div>
                </div>

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
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
          >
            {conta ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};