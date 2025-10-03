'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, FileText, Users, Tag, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/ui/modal';

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

interface ContaReceberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (conta: Omit<ContaReceber, 'id'>) => void;
  conta?: ContaReceber | null;
}

const categorias = [
  'Serviços',
  'Projetos',
  'Consultoria',
  'Licenças',
  'Produtos',
  'Assinaturas',
  'Treinamentos',
  'Suporte',
  'Outros'
];

const clientes = [
  'João Silva',
  'Maria Santos',
  'Pedro Oliveira',
  'Ana Costa',
  'Carlos Ferreira',
  'Outros'
];

export const ContaReceberModal: React.FC<ContaReceberModalProps> = ({
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
    cliente: '',
    status: 'Pendente' as 'Pendente' | 'Recebido' | 'Vencido',
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
        cliente: conta.cliente,
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
        cliente: '',
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

    if (!formData.cliente) {
      newErrors.cliente = 'Cliente é obrigatório';
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
        cliente: formData.cliente,
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
      title={conta ? 'Editar Conta a Receber' : 'Nova Conta a Receber'}
      description={
        conta
          ? 'Atualize as informações da conta'
          : 'Preencha os dados da nova conta'
      }
      icon={<DollarSign className="w-5 h-5 text-white" />}
      iconBgColor="bg-gradient-to-br from-green-500 to-emerald-600"
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

                  {/* Cliente */}
                  <div className="space-y-2">
                    <Label htmlFor="cliente" className="text-sm font-medium text-gray-700">
                      Cliente *
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-10" />
                      <Select
                        id="cliente"
                        value={formData.cliente}
                        onChange={(e) => handleInputChange('cliente', e.target.value)}
                        className={`pl-10 ${errors.cliente ? 'border-red-500' : ''}`}
                      >
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cli => (
                          <option key={cli} value={cli}>{cli}</option>
                        ))}
                      </Select>
                    </div>
                    {errors.cliente && (
                      <p className="text-sm text-red-600">{errors.cliente}</p>
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
                      <option value="Recebido">Recebido</option>
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
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            {conta ? 'Atualizar' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};