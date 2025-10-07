export const mockFornecedoresList = [
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
    totalCompras: 45200.0,
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
    totalCompras: 32500.0,
  },
  {
    id: '3',
    nome: 'Serviços Express',
    email: 'contato@servicosexpress.com',
    telefone: '(11) 5555-5555',
    endereco: 'Santos, SP',
    cnpj: '11.222.333/0001-44',
    status: 'Inativo',
    categoria: 'Serviços',
    dataUltimaCompra: '2023-12-15',
    totalCompras: 18900.0,
  },
];

export const mockNovoFornecedor = {
  nome: 'Nova Logística Ltda',
  email: 'contato@novalogistica.com',
  telefone: '(11) 6666-6666',
  endereco: 'Guarulhos, SP',
  cnpj: '55.666.777/0001-88',
  status: 'Ativo',
  categoria: 'Logística',
  totalCompras: 0,
  dataUltimaCompra: '',
};

export const mockFornecedorParaEditar = {
  id: '1',
  nome: 'Tech Solutions Ltda - Atualizado',
  email: 'novo@techsolutions.com',
  telefone: '(11) 2222-2222',
  endereco: 'São Paulo, SP - Centro',
  cnpj: '12.345.678/0001-90',
  status: 'Ativo',
  categoria: 'Tecnologia',
  dataUltimaCompra: '2024-01-12',
  totalCompras: 45200.0,
};

export const mockFornecedorInvalido = {
  nome: '',
  email: 'email-invalido',
  telefone: '123',
  endereco: '',
  cnpj: '123',
  status: 'Ativo',
  categoria: '',
  totalCompras: 0,
  dataUltimaCompra: '',
};

export const mockCategorias = [
  'Tecnologia',
  'Materiais',
  'Serviços',
  'Logística',
  'Consultoria',
  'Equipamentos',
  'Manutenção',
  'Outros',
];

export const mockAPIResponses = {
  getFornecedores: {
    status: 200,
    body: mockFornecedoresList,
  },
  createFornecedor: {
    status: 201,
    body: { ...mockNovoFornecedor, id: '4' },
  },
  updateFornecedor: {
    status: 200,
    body: mockFornecedorParaEditar,
  },
  deleteFornecedor: {
    status: 204,
    body: null,
  },
  error: {
    status: 500,
    body: { message: 'Erro interno do servidor' },
  },
};

