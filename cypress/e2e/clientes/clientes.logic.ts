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
    cy.intercept("GET", "**/api/customers*", {
      fixture: "clientes/lista.json",
    }).as("getClientes");
    cy.intercept("POST", "**/api/customers", {
      fixture: "clientes/criar.json",
    }).as("createCliente");
    cy.intercept("PUT", "**/api/customers/*", {
      fixture: "clientes/atualizar.json",
    }).as("updateCliente");
    cy.intercept("DELETE", "**/api/customers/*", { statusCode: 204 }).as(
      "deleteCliente"
    );
  }

  static aguardarRequisicao(alias: string): void {
    cy.wait(`@${alias}`);
  }

  static verificarQuantidadeLinhas(quantidade: number): void {
    cy.get(this.selectors.linhaTabela).should("have.length", quantidade);
  }
}
