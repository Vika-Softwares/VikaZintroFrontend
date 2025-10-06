# Testes E2E com Cypress

Estrutura bem arquitetada para testes automatizados do sistema Vika Zyntro.

## 📁 Estrutura de Pastas

```
cypress/
├── e2e/                         # Testes end-to-end
│   ├── clientes/                # Testes do módulo de clientes
│   │   ├── clientes.mock.ts     # Dados mockados para testes
│   │   ├── clientes.logic.ts    # Lógica e helpers dos testes
│   │   └── clientes.cy.ts       # Suíte de testes
│   │
│   └── fornecedores/            # Testes do módulo de fornecedores
│       ├── fornecedores.mock.ts # Dados mockados para testes
│       ├── fornecedores.logic.ts# Lógica e helpers dos testes
│       └── fornecedores.cy.ts   # Suíte de testes
│
├── fixtures/                    # Arquivos JSON para interceptadores
│   ├── clientes/
│   │   ├── lista.json
│   │   ├── criar.json
│   │   └── atualizar.json
│   │
│   └── fornecedores/
│       ├── lista.json
│       ├── criar.json
│       └── atualizar.json
│
└── support/                     # Configurações e comandos customizados
    ├── commands.ts              # Comandos customizados do Cypress
    └── e2e.ts                   # Configuração global dos testes
```

## 🏗️ Arquitetura de Testes

Cada módulo segue uma estrutura padronizada com 3 arquivos:

### 1. **\*.mock.ts** - Dados Mockados

Contém todos os dados de teste:

- Listas de registros
- Novos registros para criação
- Registros para edição
- Registros inválidos para validação
- Respostas da API mockadas

### 2. **\*.logic.ts** - Lógica dos Testes

Encapsula toda a lógica de interação:

- Seletores CSS/data-testid organizados
- Métodos de navegação
- Métodos de interação com formulários
- Métodos de verificação
- Configuração de interceptadores

### 3. **\*.cy.ts** - Suítes de Testes

Organiza os testes em blocos lógicos:

- Listagem
- Criação
- Edição
- Exclusão
- Validações
- Formatação
- Responsividade

## 🚀 Como Executar

### Abrir Interface do Cypress

```bash
cd frontend
npm run cy:open
```

### Executar Todos os Testes (Headless)

```bash
npm run test:e2e
```

### Executar Testes de Clientes

```bash
npm run test:clientes
```

### Executar Testes de Fornecedores

```bash
npm run test:fornecedores
```

## 📝 Comandos Customizados

### `interceptAPI(method, url, fixture)`

Intercepta requisições da API com fixtures

```typescript
cy.interceptAPI("GET", "/api/customers", "clientes/lista.json");
```

### `fillInput(selector, value)`

Limpa e preenche um campo de input

```typescript
cy.fillInput("#nome", "João Silva");
```

### `openModal(buttonSelector)`

Abre um modal clicando no botão

```typescript
cy.openModal('[data-testid="btn-novo-cliente"]');
```

### `submitForm()`

Submete o formulário atual

```typescript
cy.submitForm();
```

## ✅ Cobertura de Testes

### Módulo Clientes

- ✅ Listagem e busca
- ✅ Criação com validações
- ✅ Edição com campos bloqueados
- ✅ Exclusão com confirmação
- ✅ Formatação CPF/CNPJ/Telefone
- ✅ Validações de campos
- ✅ Responsividade

### Módulo Fornecedores

- ✅ Listagem e busca
- ✅ Filtros por categoria e status
- ✅ Criação com validações
- ✅ Edição com campos bloqueados
- ✅ Exclusão com confirmação
- ✅ Formatação CNPJ/Telefone
- ✅ Validações de campos
- ✅ Responsividade
- ✅ Performance

## 🎯 Boas Práticas Implementadas

1. **Separação de Responsabilidades**

   - Mock: Dados de teste isolados
   - Logic: Lógica reutilizável
   - Testes: Casos de teste limpos

2. **Data Attributes**

   - Uso de `data-testid` para seletores estáveis
   - Independência de classes CSS

3. **Interceptadores**

   - Controle total sobre respostas da API
   - Testes independentes do backend

4. **Reutilização**

   - Classes com métodos estáticos
   - Comandos customizados do Cypress

5. **Organização**
   - Testes agrupados por funcionalidade
   - Descrições claras e objetivas

## 📊 Relatórios

Os relatórios de execução são salvos em:

- Screenshots: `cypress/screenshots/`
- Vídeos: `cypress/videos/` (desabilitado por padrão)

## 🔧 Configuração

A configuração principal está em `cypress.config.ts`:

- BaseURL: `http://localhost:5173`
- Viewport: 1920x1080
- Timeout: 10 segundos
- Vídeo: Desabilitado

## 🚨 Troubleshooting

### Erro: "Cannot find module"

```bash
npm install --save-dev cypress
```

### Erro: "baseUrl" não está acessível

Certifique-se de que o frontend está rodando:

```bash
npm run dev
```

### Testes falhando aleatoriamente

Ajuste os timeouts em `cypress.config.ts`

## 📚 Documentação

- [Cypress Docs](https://docs.cypress.io)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Commands](https://docs.cypress.io/api/table-of-contents)
