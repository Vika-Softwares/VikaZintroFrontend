export default interface CustomerDto {
  idCustomers: string;

  name: string;

  cpfCnpj: string;

  email: string;

  phone: string;

  status: "Ativo" | "Inativo";

  category: string;

  idCompany: number;

  isSupplier: boolean;

  totalCompras: number;

  dataUltimaCompra?: string;
  address?: string;
}
