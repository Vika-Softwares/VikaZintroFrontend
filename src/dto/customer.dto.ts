export default interface CustomerDto {
  idCustomers: string;

  name: string;

  cpfCnpj: string;

  email: string;

  phone: string;

  status: "Ativo" | "Inativo";

  categoria: string;

  idCompany: number;

  supplier: boolean;

  totalCompras: number;

  dataUltimaCompra?: string;
}
