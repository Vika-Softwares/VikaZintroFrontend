export class ClientesPageLogic {
  static readonly selectors = {
    btnNovoCliente: '[data-testid="btn-novo-cliente"]',
    btnSalvar: '[data-testid="btn-salvar-cliente"]',
    btnCancelar: '[data-testid="btn-cancelar-cliente"]',
    btnEditar: '[data-testid="btn-editar-cliente"]',
    btnExcluir: '[data-testid="btn-excluir-cliente"]',
    inputBusca: '[data-testid="input-busca-clientes"]',
    inputNome: "#nome",
    inputEmail: "#email",
    inputTelefone: "#telefone",
    inputCpfCnpj: "#cpfCnpj",
    selectStatus: "#status",
    modal: '[data-testid="modal-cliente"]',
    tabela: '[data-testid="tabela-clientes"]',
    linhaTabela: '[data-testid="linha-cliente"]',
    toastSucesso: ".toast-success",
    toastErro: ".toast-error",
    erroNome: '[data-testid="erro-nome"]',
    erroEmail: '[data-testid="erro-email"]',
    erroTelefone: '[data-testid="erro-telefone"]',
    erroCpfCnpj: '[data-testid="erro-cpfCnpj"]',
  };

  static visitarPaginaClientes(): void {
    cy.visit("/clientes");
    cy.wait(500);
  }

  static clicarBotaoNovoCliente(): void {
    cy.get(this.selectors.btnNovoCliente).click();
  }

  static preencherFormularioCliente(cliente: {
    name: string;
    email: string;
    phone: string;
    cpfCnpj: string;
    status?: string;
  }): void {
    cy.fillInput(this.selectors.inputNome, cliente.name);
    cy.fillInput(this.selectors.inputEmail, cliente.email);
    cy.fillInput(this.selectors.inputTelefone, cliente.phone);
    cy.fillInput(this.selectors.inputCpfCnpj, cliente.cpfCnpj);

    if (cliente.status) {
      cy.get(this.selectors.selectStatus).select(cliente.status);
    }
  }

  static salvarCliente(): void {
    cy.get(this.selectors.btnSalvar).click();
  }

  static cancelarFormulario(): void {
    cy.get(this.selectors.btnCancelar).click();
  }

  static buscarCliente(termo: string): void {
    cy.fillInput(this.selectors.inputBusca, termo);
    cy.wait(300);
  }

  static editarPrimeiroCliente(): void {
    cy.get(this.selectors.linhaTabela)
      .first()
      .within(() => {
        cy.get(this.selectors.btnEditar).click();
      });
  }

  static excluirPrimeiroCliente(): void {
    cy.get(this.selectors.linhaTabela)
      .first()
      .within(() => {
        cy.get(this.selectors.btnExcluir).click();
      });
  }

  static verificarModalAberto(): void {
    cy.get(this.selectors.modal).should("be.visible");
  }

  static verificarModalFechado(): void {
    cy.get(this.selectors.modal).should("not.exist");
  }

  static verificarClienteNaTabela(nome: string): void {
    cy.get(this.selectors.tabela).contains(nome).should("be.visible");
  }

  static verificarClienteNaoNaTabela(nome: string): void {
    cy.get(this.selectors.tabela).contains(nome).should("not.exist");
  }

  static verificarToastSucesso(mensagem?: string): void {
    cy.get(this.selectors.toastSucesso).should("be.visible");
    if (mensagem) {
      cy.get(this.selectors.toastSucesso).contains(mensagem);
    }
  }

  static verificarToastErro(mensagem?: string): void {
    cy.get(this.selectors.toastErro).should("be.visible");
    if (mensagem) {
      cy.get(this.selectors.toastErro).contains(mensagem);
    }
  }

  static verificarErrosValidacao(): void {
    cy.get("input").then(($inputs) => {
      const hasError = $inputs.toArray().some((input) => {
        return input.classList.contains("border-red-500");
      });
      expect(hasError).to.be.true;
    });
  }

  static configurarInterceptadores(): void {
    cy.intercept("GET", "**/customer*", {
      statusCode: 200,
      body: {
        data: [
          {
            "idCustomers": "1",
            "name": "João Silva",
            "email": "joao.silva@email.com",
            "phone": "(11) 99999-9999",
            "cpfCnpj": "123.456.789-01",
            "status": "Ativo",
            "totalCompras": 5000.0,
            "dataUltimaCompra": "2024-01-15"
          },
          {
            "idCustomers": "2",
            "name": "Maria Santos",
            "email": "maria.santos@email.com",
            "phone": "(11) 98888-8888",
            "cpfCnpj": "987.654.321-00",
            "status": "Ativo",
            "totalCompras": 3200.0,
            "dataUltimaCompra": "2024-01-10"
          },
          {
            "idCustomers": "3",
            "name": "Empresa Tech Ltda",
            "email": "contato@empresatech.com",
            "phone": "(11) 97777-7777",
            "cpfCnpj": "12.345.678/0001-90",
            "status": "Inativo",
            "totalCompras": 15000.0,
            "dataUltimaCompra": "2023-12-20"
          }
        ],
        total: 3
      }
    }).as("getClientes");
    
    cy.intercept("POST", "**/customer", {
      statusCode: 201,
      body: {
        "idCustomers": "4",
        "name": "Carlos Oliveira",
        "email": "carlos.oliveira@email.com",
        "phone": "(11) 96666-6666",
        "cpfCnpj": "111.222.333-44",
        "status": "Ativo",
        "totalCompras": 0,
        "dataUltimaCompra": ""
      }
    }).as("createCliente");
    
    cy.intercept("PUT", "**/customer/*", {
      statusCode: 200,
      body: {
        "idCustomers": "1",
        "name": "João Silva Atualizado",
        "email": "joao.silva.novo@email.com",
        "phone": "(11) 95555-5555",
        "cpfCnpj": "123.456.789-01",
        "status": "Ativo",
        "totalCompras": 5000.0,
        "dataUltimaCompra": "2024-01-15"
      }
    }).as("updateCliente");
    
    cy.intercept("DELETE", "**/customer/*", { 
      statusCode: 204 
    }).as("deleteCliente");
  }

  static aguardarRequisicao(alias: string): void {
    cy.wait(`@${alias}`);
  }

  static verificarQuantidadeLinhas(quantidade: number): void {
    cy.get(this.selectors.linhaTabela).should("have.length", quantidade);
  }
}
