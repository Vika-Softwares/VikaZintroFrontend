// services/ClientesApi.ts
import CustomerDto from "@/dto/customer.dto";
import { BaseApi } from "./BaseApi";

export interface ClienteDTO {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  status: "Ativo" | "Inativo";
  dataUltimaCompra?: string;
  totalCompras: number;
}

export class ClientesApi extends BaseApi {
  constructor() {
    super(); // baseURL da tua API
  }

  async getAll(params: {
    page?: number;
    limit?: number;
    isSupplier?: boolean;
  }): Promise<{ data: CustomerDto[]; total: number }> {
    const query = params
      ? "?" + new URLSearchParams(params as any).toString()
      : "";

    return this.get<{ data: CustomerDto[]; total: number }>(
      `/customer${query}`
    );
  }

  async create(cliente: CustomerDto): Promise<CustomerDto> {
    return this.post<CustomerDto>("/customer", cliente);
  }

  async update(id: string, cliente: CustomerDto): Promise<CustomerDto> {
    return this.put<CustomerDto>(`/customer/${id}`, cliente);
  }

  async deleteCliente(id: string): Promise<boolean> {
    return this.delete<boolean>(`/customer/${id}`, {
      data: {
        deletionReason: "Deletado via tela de gerenciamento",
      },
    });
  }
}
