import CustomerDto from "@/dto/customer.dto";
import { BaseApi } from "./BaseApi";

export class FornecedoresApi extends BaseApi {
  constructor() {
    super();
  }

  async getAll(params: {
    page?: number;
    limit?: number;
  }): Promise<{ data: CustomerDto[]; total: number }> {
    const queryParams = {
      ...params,
      isSupplier: true,
    };

    const query = "?" + new URLSearchParams(queryParams as any).toString();

    return this.get<{ data: CustomerDto[]; total: number }>(
      `/customer${query}`
    );
  }

  async create(fornecedor: Partial<CustomerDto>): Promise<CustomerDto> {
    return this.post<CustomerDto>("/customer", {
      ...fornecedor,
      isSupplier: true,
    });
  }

  async update(
    id: string,
    fornecedor: Partial<CustomerDto>
  ): Promise<CustomerDto> {
    return this.put<CustomerDto>(`/customer/${id}`, {
      ...fornecedor,
      isSupplier: true,
    });
  }

  async deleteFornecedor(id: string): Promise<boolean> {
    return this.delete<boolean>(`/customer/${id}`, {
      data: {
        deletionReason: "Deletado via tela de gerenciamento",
      },
    });
  }
}
