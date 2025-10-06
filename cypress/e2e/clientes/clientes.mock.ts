export const mockClientesList = [
  {
    idCustomers: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    cpfCnpj: "123.456.789-01",
    status: "Ativo",
    totalCompras: 5000.0,
    dataUltimaCompra: "2024-01-15",
  },
  {
    idCustomers: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 98888-8888",
    cpfCnpj: "987.654.321-00",
    status: "Ativo",
    totalCompras: 3200.0,
    dataUltimaCompra: "2024-01-10",
  },
  {
    idCustomers: "3",
    name: "Empresa Tech Ltda",
    email: "contato@empresatech.com",
    phone: "(11) 97777-7777",
    cpfCnpj: "12.345.678/0001-90",
    status: "Inativo",
    totalCompras: 15000.0,
    dataUltimaCompra: "2023-12-20",
  },
];

export const mockNovoCliente = {
  name: "Carlos Oliveira",
  email: "carlos.oliveira@email.com",
  phone: "(11) 96666-6666",
  cpfCnpj: "111.222.333-44",
  status: "Ativo",
  totalCompras: 0,
  dataUltimaCompra: "",
};

export const mockClienteParaEditar = {
  idCustomers: "1",
  name: "João Silva Atualizado",
  email: "joao.silva.novo@email.com",
  phone: "(11) 95555-5555",
  cpfCnpj: "123.456.789-01",
  status: "Ativo",
  totalCompras: 5000.0,
  dataUltimaCompra: "2024-01-15",
};

export const mockClienteInvalido = {
  name: "",
  email: "email-invalido",
  phone: "123",
  cpfCnpj: "123",
  status: "Ativo",
  totalCompras: 0,
  dataUltimaCompra: "",
};

export const mockAPIResponses = {
  getClientes: {
    status: 200,
    body: mockClientesList,
  },
  createCliente: {
    status: 201,
    body: { ...mockNovoCliente, idCustomers: "4" },
  },
  updateCliente: {
    status: 200,
    body: mockClienteParaEditar,
  },
  deleteCliente: {
    status: 204,
    body: null,
  },
  error: {
    status: 500,
    body: { message: "Erro interno do servidor" },
  },
};
