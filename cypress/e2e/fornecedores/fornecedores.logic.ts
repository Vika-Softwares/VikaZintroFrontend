export class FornecedoresPageLogic {
  static readonly selectors = {
    btnNovoFornecedor: '[data-testid="btn-novo-fornecedor"]',
    btnSalvar: '[data-testid="btn-salvar-fornecedor"]',
    btnCancelar: '[data-testid="btn-cancelar-fornecedor"]',
    btnEditar: '[data-testid="btn-editar-fornecedor"]',
    btnExcluir: '[data-testid="btn-excluir-fornecedor"]',
    inputBusca: '[data-testid="input-busca-fornecedores"]',
    inputNome: "#nome",
    inputEmail: "#email",
    inputTelefone: "#telefone",
    inputEndereco: "#endereco",
    inputCnpj: "#cnpj",
    selectStatus: "#status",
    selectCategoria: "#categoria",
    modal: '[data-testid="modal-fornecedor"]',
    tabela: '[data-testid="tabela-fornecedores"]',
    linhaTabela: '[data-testid="linha-fornecedor"]',
    toastSucesso: ".toast-success",
    toastErro: ".toast-error",
    erroNome: '[data-testid="erro-nome"]',
    erroEmail: '[data-testid="erro-email"]',
    erroTelefone: '[data-testid="erro-telefone"]',
    erroEndereco: '[data-testid="erro-endereco"]',
    erroCnpj: '[data-testid="erro-cnpj"]',
    erroCategoria: '[data-testid="erro-categoria"]',
  };

  static visitarPaginaFornecedores(): void {
    cy.visit("/fornecedores");
    cy.wait(500);
  }

  static clicarBotaoNovoFornecedor(): void {
    cy.get(this.selectors.btnNovoFornecedor).click();
  }

  static preencherFormularioFornecedor(fornecedor: {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cnpj: string;
    categoria: string;
    status?: string;
  }): void {
    cy.fillInput(this.selectors.inputNome, fornecedor.nome);
    cy.fillInput(this.selectors.inputEmail, fornecedor.email);
    cy.fillInput(this.selectors.inputTelefone, fornecedor.telefone);
    cy.fillInput(this.selectors.inputEndereco, fornecedor.endereco);
    cy.fillInput(this.selectors.inputCnpj, fornecedor.cnpj);
    cy.get(this.selectors.selectCategoria).select(fornecedor.categoria);

    if (fornecedor.status) {
      cy.get(this.selectors.selectStatus).select(fornecedor.status);
    }
  }

  static salvarFornecedor(): void {
    cy.get(this.selectors.btnSalvar).click();
  }

  static cancelarFormulario(): void {
    cy.get(this.selectors.btnCancelar).click();
  }

  static buscarFornecedor(termo: string): void {
    cy.fillInput(this.selectors.inputBusca, termo);
    cy.wait(300);
  }

  static editarPrimeiroFornecedor(): void {
    cy.get(this.selectors.linhaTabela)
      .first()
      .within(() => {
        cy.get(this.selectors.btnEditar).click();
      });
  }

  static excluirPrimeiroFornecedor(): void {
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

  static verificarFornecedorNaTabela(nome: string): void {
    cy.get(this.selectors.tabela).contains(nome).should("be.visible");
  }

  static verificarFornecedorNaoNaTabela(nome: string): void {
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
    cy.intercept("GET", "**/api/fornecedores*", {
      fixture: "fornecedores/lista.json",
    }).as("getFornecedores");
    cy.intercept("POST", "**/api/fornecedores", {
      fixture: "fornecedores/criar.json",
    }).as("createFornecedor");
    cy.intercept("PUT", "**/api/fornecedores/*", {
      fixture: "fornecedores/atualizar.json",
    }).as("updateFornecedor");
    cy.intercept("DELETE", "**/api/fornecedores/*", { statusCode: 204 }).as(
      "deleteFornecedor"
    );
  }

  static aguardarRequisicao(alias: string): void {
    cy.wait(`@${alias}`);
  }

  static verificarQuantidadeLinhas(quantidade: number): void {
    cy.get(this.selectors.linhaTabela).should("have.length", quantidade);
  }

  static filtrarPorCategoria(categoria: string): void {
    cy.get('[data-testid="filtro-categoria"]').select(categoria);
    cy.wait(300);
  }

  static filtrarPorStatus(status: string): void {
    cy.get('[data-testid="filtro-status"]').select(status);
    cy.wait(300);
  }

  static verificarBadgeStatus(status: "Ativo" | "Inativo"): void {
    const badgeSelector =
      status === "Ativo" ? ".badge-success" : ".badge-danger";
    cy.get(badgeSelector).should("be.visible");
  }
}
