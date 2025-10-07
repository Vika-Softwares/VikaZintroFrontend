import { ClientesPageLogic } from "./clientes.logic";
import {
  mockNovoCliente,
  mockClienteParaEditar,
  mockClienteInvalido,
} from "./clientes.mock";

describe("Clientes - Testes E2E", () => {
  beforeEach(() => {
    ClientesPageLogic.configurarInterceptadores();
    ClientesPageLogic.visitarPaginaClientes();
    ClientesPageLogic.aguardarRequisicao("getClientes");
  });

  describe("Listagem de Clientes", () => {
    it("deve exibir a lista de clientes", () => {
      ClientesPageLogic.verificarQuantidadeLinhas(3);
    });

    it("deve buscar clientes pelo nome", () => {
      ClientesPageLogic.buscarCliente("João Silva");
      ClientesPageLogic.verificarClienteNaTabela("João Silva");
    });

    it("deve exibir mensagem quando não encontrar clientes", () => {
      ClientesPageLogic.buscarCliente("Cliente Inexistente");
      cy.contains("Nenhum cliente encontrado").should("be.visible");
    });
  });

  describe("Criação de Cliente", () => {
    it("deve abrir o modal ao clicar em Novo Cliente", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();
      ClientesPageLogic.verificarModalAberto();
    });

    it("deve criar um novo cliente com sucesso", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();
      ClientesPageLogic.preencherFormularioCliente(mockNovoCliente);
      ClientesPageLogic.salvarCliente();

      ClientesPageLogic.aguardarRequisicao("createCliente");
      ClientesPageLogic.verificarModalFechado();
      ClientesPageLogic.verificarToastSucesso("Cliente criado");
    });

    it("deve validar campos obrigatórios ao criar cliente", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();
      ClientesPageLogic.salvarCliente();

      ClientesPageLogic.verificarErrosValidacao();
      ClientesPageLogic.verificarModalAberto();
    });

    it.skip("deve validar formato de email", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();
      ClientesPageLogic.preencherFormularioCliente({
        ...mockNovoCliente,
        email: "email-invalido",
      });
      ClientesPageLogic.salvarCliente();

      cy.contains("Email inválido", { timeout: 5000 }).should("be.visible");
    });

    it("deve validar formato de CPF/CNPJ", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();
      ClientesPageLogic.preencherFormularioCliente({
        ...mockNovoCliente,
        cpfCnpj: "123",
      });
      ClientesPageLogic.salvarCliente();

      ClientesPageLogic.verificarErrosValidacao();
      cy.contains("CPF ou CNPJ inválido").should("be.visible");
    });

    it("deve validar formato de telefone", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();
      ClientesPageLogic.preencherFormularioCliente({
        ...mockNovoCliente,
        phone: "123",
      });
      ClientesPageLogic.salvarCliente();

      ClientesPageLogic.verificarErrosValidacao();
      cy.contains("Telefone inválido").should("be.visible");
    });

    it("deve fechar o modal ao clicar em Cancelar", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();
      ClientesPageLogic.preencherFormularioCliente(mockNovoCliente);
      ClientesPageLogic.cancelarFormulario();

      ClientesPageLogic.verificarModalFechado();
    });
  });

  describe("Edição de Cliente", () => {
    it("deve abrir o modal com dados do cliente ao editar", () => {
      ClientesPageLogic.editarPrimeiroCliente();

      ClientesPageLogic.verificarModalAberto();
      cy.get(ClientesPageLogic.selectors.inputNome).should(
        "not.have.value",
        ""
      );
    });

    it("deve editar um cliente com sucesso", () => {
      ClientesPageLogic.editarPrimeiroCliente();

      ClientesPageLogic.preencherFormularioCliente({
        name: mockClienteParaEditar.name,
        email: mockClienteParaEditar.email,
        phone: mockClienteParaEditar.phone,
        cpfCnpj: mockClienteParaEditar.cpfCnpj,
      });
      ClientesPageLogic.salvarCliente();

      ClientesPageLogic.aguardarRequisicao("updateCliente");
      ClientesPageLogic.verificarModalFechado();
      ClientesPageLogic.verificarToastSucesso("Cliente atualizado");
    });

    it("deve manter campos Total Compras e Data Última Compra desabilitados ao editar", () => {
      ClientesPageLogic.editarPrimeiroCliente();

      cy.get("#totalCompras").should("be.disabled");
      cy.get("#dataUltimaCompra").should("be.disabled");
    });
  });

  describe("Exclusão de Cliente", () => {
    it("deve excluir um cliente com sucesso", () => {
      ClientesPageLogic.excluirPrimeiroCliente();

      cy.contains("Tem certeza").should("be.visible");
      cy.get('[data-testid="btn-confirmar-exclusao"]').click();

      ClientesPageLogic.aguardarRequisicao("deleteCliente");
      ClientesPageLogic.verificarToastSucesso("Cliente excluído");
    });

    it("deve cancelar a exclusão de um cliente", () => {
      const quantidadeInicial = 3;

      ClientesPageLogic.excluirPrimeiroCliente();
      cy.contains("Tem certeza").should("be.visible");
      cy.get('[data-testid="btn-cancelar-exclusao"]').click();

      ClientesPageLogic.verificarQuantidadeLinhas(quantidadeInicial);
    });
  });

  describe("Formatação de Campos", () => {
    it("deve formatar CPF automaticamente", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();

      cy.fillInput(ClientesPageLogic.selectors.inputCpfCnpj, "12345678901");
      cy.get(ClientesPageLogic.selectors.inputCpfCnpj).should(
        "have.value",
        "123.456.789-01"
      );
    });

    it("deve formatar CNPJ automaticamente", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();

      cy.fillInput(ClientesPageLogic.selectors.inputCpfCnpj, "12345678000195");
      cy.get(ClientesPageLogic.selectors.inputCpfCnpj).should(
        "have.value",
        "12.345.678/0001-95"
      );
    });

    it("deve formatar telefone automaticamente", () => {
      ClientesPageLogic.clicarBotaoNovoCliente();

      cy.fillInput(ClientesPageLogic.selectors.inputTelefone, "11999999999");
      cy.get(ClientesPageLogic.selectors.inputTelefone).should(
        "have.value",
        "(11) 99999-9999"
      );
    });
  });

  describe("Responsividade e UI", () => {
    it("deve ser responsivo em dispositivos móveis", () => {
      cy.viewport("iphone-x");

      cy.get(ClientesPageLogic.selectors.btnNovoCliente).should("be.visible");
      cy.get(ClientesPageLogic.selectors.tabela).should("be.visible");
    });

    it("deve ser responsivo em tablets", () => {
      cy.viewport("ipad-2");

      cy.get(ClientesPageLogic.selectors.btnNovoCliente).should("be.visible");
      cy.get(ClientesPageLogic.selectors.tabela).should("be.visible");
    });
  });
});
