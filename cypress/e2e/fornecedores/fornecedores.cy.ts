import { FornecedoresPageLogic } from "./fornecedores.logic";
import {
  mockNovoFornecedor,
  mockFornecedorParaEditar,
  mockFornecedorInvalido,
  mockCategorias,
} from "./fornecedores.mock";

describe("Fornecedores - Testes E2E", () => {
  beforeEach(() => {
    FornecedoresPageLogic.configurarInterceptadores();
    FornecedoresPageLogic.visitarPaginaFornecedores();
  });

  describe("Listagem de Fornecedores", () => {
    it("deve exibir a lista de fornecedores", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.verificarQuantidadeLinhas(3);
    });

    it("deve buscar fornecedores pelo nome", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.buscarFornecedor("Tech Solutions");
      FornecedoresPageLogic.verificarFornecedorNaTabela("Tech Solutions");
    });

    it("deve exibir mensagem quando não encontrar fornecedores", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.buscarFornecedor("Fornecedor Inexistente");
      cy.contains("Nenhum fornecedor encontrado").should("be.visible");
    });

    it("deve filtrar fornecedores por categoria", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.filtrarPorCategoria("Tecnologia");
      FornecedoresPageLogic.verificarFornecedorNaTabela("Tech Solutions");
    });

    it("deve filtrar fornecedores por status", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.filtrarPorStatus("Ativo");
      FornecedoresPageLogic.verificarBadgeStatus("Ativo");
    });
  });

  describe("Criação de Fornecedor", () => {
    it("deve abrir o modal ao clicar em Novo Fornecedor", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();
      FornecedoresPageLogic.verificarModalAberto();
    });

    it("deve criar um novo fornecedor com sucesso", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();
      FornecedoresPageLogic.preencherFormularioFornecedor(mockNovoFornecedor);
      FornecedoresPageLogic.salvarFornecedor();

      FornecedoresPageLogic.aguardarRequisicao("createFornecedor");
      FornecedoresPageLogic.verificarModalFechado();
      FornecedoresPageLogic.verificarToastSucesso("Fornecedor criado");
    });

    it("deve validar campos obrigatórios ao criar fornecedor", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();
      FornecedoresPageLogic.salvarFornecedor();

      FornecedoresPageLogic.verificarErrosValidacao();
      FornecedoresPageLogic.verificarModalAberto();
    });

    it("deve validar formato de email", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();
      FornecedoresPageLogic.preencherFormularioFornecedor({
        ...mockNovoFornecedor,
        email: "email-invalido",
      });
      FornecedoresPageLogic.salvarFornecedor();

      FornecedoresPageLogic.verificarErrosValidacao();
      cy.contains("Email inválido").should("be.visible");
    });

    it("deve validar formato de CNPJ", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();
      FornecedoresPageLogic.preencherFormularioFornecedor({
        ...mockNovoFornecedor,
        cnpj: "123",
      });
      FornecedoresPageLogic.salvarFornecedor();

      FornecedoresPageLogic.verificarErrosValidacao();
      cy.contains("CNPJ inválido").should("be.visible");
    });

    it("deve validar formato de telefone", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();
      FornecedoresPageLogic.preencherFormularioFornecedor({
        ...mockNovoFornecedor,
        telefone: "123",
      });
      FornecedoresPageLogic.salvarFornecedor();

      FornecedoresPageLogic.verificarErrosValidacao();
      cy.contains("Telefone inválido").should("be.visible");
    });

    it("deve exibir todas as categorias disponíveis", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();

      cy.get(FornecedoresPageLogic.selectors.selectCategoria).click();
      mockCategorias.forEach((categoria) => {
        cy.contains(categoria).should("be.visible");
      });
    });

    it("deve fechar o modal ao clicar em Cancelar", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();
      FornecedoresPageLogic.preencherFormularioFornecedor(mockNovoFornecedor);
      FornecedoresPageLogic.cancelarFormulario();

      FornecedoresPageLogic.verificarModalFechado();
    });
  });

  describe("Edição de Fornecedor", () => {
    it("deve abrir o modal com dados do fornecedor ao editar", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.editarPrimeiroFornecedor();

      FornecedoresPageLogic.verificarModalAberto();
      cy.get(FornecedoresPageLogic.selectors.inputNome).should(
        "not.have.value",
        ""
      );
    });

    it("deve editar um fornecedor com sucesso", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.editarPrimeiroFornecedor();

      FornecedoresPageLogic.preencherFormularioFornecedor({
        nome: mockFornecedorParaEditar.nome,
        email: mockFornecedorParaEditar.email,
        telefone: mockFornecedorParaEditar.telefone,
        endereco: mockFornecedorParaEditar.endereco,
        cnpj: mockFornecedorParaEditar.cnpj,
        categoria: mockFornecedorParaEditar.categoria,
      });
      FornecedoresPageLogic.salvarFornecedor();

      FornecedoresPageLogic.aguardarRequisicao("updateFornecedor");
      FornecedoresPageLogic.verificarModalFechado();
      FornecedoresPageLogic.verificarToastSucesso("Fornecedor atualizado");
    });

    it("deve manter campos Total Compras e Data Última Compra desabilitados ao editar", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.editarPrimeiroFornecedor();

      cy.get("#totalCompras").should("be.disabled");
      cy.get("#dataUltimaCompra").should("be.disabled");
    });

    it("deve permitir alterar a categoria do fornecedor", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.editarPrimeiroFornecedor();

      cy.get(FornecedoresPageLogic.selectors.selectCategoria).select(
        "Serviços"
      );
      FornecedoresPageLogic.salvarFornecedor();

      FornecedoresPageLogic.aguardarRequisicao("updateFornecedor");
      FornecedoresPageLogic.verificarToastSucesso("Fornecedor atualizado");
    });
  });

  describe("Exclusão de Fornecedor", () => {
    it("deve excluir um fornecedor com sucesso", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.excluirPrimeiroFornecedor();

      cy.contains("Tem certeza").should("be.visible");
      cy.get('[data-testid="btn-confirmar-exclusao"]').click();

      FornecedoresPageLogic.aguardarRequisicao("deleteFornecedor");
      FornecedoresPageLogic.verificarToastSucesso("Fornecedor excluído");
    });

    it("deve cancelar a exclusão de um fornecedor", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      const quantidadeInicial = 3;

      FornecedoresPageLogic.excluirPrimeiroFornecedor();
      cy.contains("Tem certeza").should("be.visible");
      cy.get('[data-testid="btn-cancelar-exclusao"]').click();

      FornecedoresPageLogic.verificarQuantidadeLinhas(quantidadeInicial);
    });
  });

  describe("Formatação de Campos", () => {
    it("deve formatar CNPJ automaticamente", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();

      cy.fillInput(FornecedoresPageLogic.selectors.inputCnpj, "12345678000195");
      cy.get(FornecedoresPageLogic.selectors.inputCnpj).should(
        "have.value",
        "12.345.678/0001-95"
      );
    });

    it("deve formatar telefone automaticamente", () => {
      FornecedoresPageLogic.clicarBotaoNovoFornecedor();

      cy.fillInput(FornecedoresPageLogic.selectors.inputTelefone, "1133333333");
      cy.get(FornecedoresPageLogic.selectors.inputTelefone).should(
        "have.value",
        "(11) 3333-3333"
      );
    });
  });

  describe("Integração e Performance", () => {
    it("deve carregar a lista de fornecedores em menos de 3 segundos", () => {
      const startTime = Date.now();

      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      FornecedoresPageLogic.verificarQuantidadeLinhas(3);

      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(3000);
    });

    it("deve exibir indicador de carregamento durante requisições", () => {
      cy.get('[data-testid="loading-spinner"]').should("be.visible");
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      cy.get('[data-testid="loading-spinner"]').should("not.exist");
    });
  });

  describe("Responsividade e UI", () => {
    it("deve ser responsivo em dispositivos móveis", () => {
      cy.viewport("iphone-x");
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");

      cy.get(FornecedoresPageLogic.selectors.btnNovoFornecedor).should(
        "be.visible"
      );
      cy.get(FornecedoresPageLogic.selectors.tabela).should("be.visible");
    });

    it("deve ser responsivo em tablets", () => {
      cy.viewport("ipad-2");
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");

      cy.get(FornecedoresPageLogic.selectors.btnNovoFornecedor).should(
        "be.visible"
      );
      cy.get(FornecedoresPageLogic.selectors.tabela).should("be.visible");
    });
  });

  describe("Dados e Estatísticas", () => {
    it("deve exibir total de compras formatado corretamente", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      cy.contains("R$ 45.200,00").should("be.visible");
    });

    it("deve exibir data da última compra formatada corretamente", () => {
      FornecedoresPageLogic.aguardarRequisicao("getFornecedores");
      cy.contains("12/01/2024").should("be.visible");
    });
  });
});
