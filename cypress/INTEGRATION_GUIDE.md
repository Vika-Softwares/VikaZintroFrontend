# Guia de Integração - Data TestIDs

Este guia mostra como adicionar `data-testid` aos componentes para os testes funcionarem corretamente.

## 📋 Componentes que Precisam de TestIDs

### **ClientesPage.tsx**

```tsx
// Botão Novo Cliente
<Button data-testid="btn-novo-cliente" onClick={handleNovoCliente}>
  <Plus className="h-4 w-4 mr-2" />
  Novo Cliente
</Button>

// Input de Busca
<Input
  data-testid="input-busca-clientes"
  type="text"
  placeholder="Buscar clientes..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

// Tabela
<Table data-testid="tabela-clientes">
  <TableBody>
    {clientes.map((cliente) => (
      <TableRow key={cliente.idCustomers} data-testid="linha-cliente">
        {/* ... */}
        <Button
          data-testid="btn-editar-cliente"
          size="sm"
          onClick={() => handleEditCliente(cliente)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          data-testid="btn-excluir-cliente"
          size="sm"
          onClick={() => handleDeleteCliente(cliente.idCustomers)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### **ClienteModal.tsx**

```tsx
// Modal
<Modal
  data-testid="modal-cliente"
  isOpen={isOpen}
  onClose={onClose}
  title={cliente ? "Editar Cliente" : "Novo Cliente"}
>
  {/* Campos do formulário já têm IDs corretos */}
  <Input id="nome" {...props} />
  <Input id="email" {...props} />
  <Input id="telefone" {...props} />
  <Input id="cpfCnpj" {...props} />
  <Select id="status" {...props} />

  {/* Botões */}
  <Button data-testid="btn-cancelar-cliente" type="button" onClick={onClose}>
    Cancelar
  </Button>
  <Button data-testid="btn-salvar-cliente" type="submit" onClick={handleSubmit}>
    Salvar
  </Button>
</Modal>
```

### **FornecedoresPage.tsx**

```tsx
// Botão Novo Fornecedor
<Button data-testid="btn-novo-fornecedor" onClick={handleNovoFornecedor}>
  <Plus className="h-4 w-4 mr-2" />
  Novo Fornecedor
</Button>

// Input de Busca
<Input
  data-testid="input-busca-fornecedores"
  type="text"
  placeholder="Buscar fornecedores..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

// Filtro de Categoria
<Select
  data-testid="filtro-categoria"
  value={categoriaFiltro}
  onChange={(e) => setCategoriaFiltro(e.target.value)}
>
  <option value="">Todas as Categorias</option>
  {/* ... */}
</Select>

// Filtro de Status
<Select
  data-testid="filtro-status"
  value={statusFiltro}
  onChange={(e) => setStatusFiltro(e.target.value)}
>
  <option value="">Todos os Status</option>
  <option value="Ativo">Ativo</option>
  <option value="Inativo">Inativo</option>
</Select>

// Tabela
<Table data-testid="tabela-fornecedores">
  <TableBody>
    {fornecedores.map((fornecedor) => (
      <TableRow key={fornecedor.id} data-testid="linha-fornecedor">
        {/* ... */}
        <Button
          data-testid="btn-editar-fornecedor"
          size="sm"
          onClick={() => handleEditFornecedor(fornecedor)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          data-testid="btn-excluir-fornecedor"
          size="sm"
          onClick={() => handleDeleteFornecedor(fornecedor.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### **FornecedorModal.tsx**

```tsx
// Modal
<Modal
  data-testid="modal-fornecedor"
  isOpen={isOpen}
  onClose={onClose}
  title={fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
>
  {/* Campos do formulário já têm IDs corretos */}
  <Input id="nome" {...props} />
  <Input id="email" {...props} />
  <Input id="telefone" {...props} />
  <Input id="endereco" {...props} />
  <Input id="cnpj" {...props} />
  <Select id="categoria" {...props} />
  <Select id="status" {...props} />

  {/* Botões */}
  <Button data-testid="btn-cancelar-fornecedor" type="button" onClick={onClose}>
    Cancelar
  </Button>
  <Button
    data-testid="btn-salvar-fornecedor"
    type="submit"
    onClick={handleSubmit}
  >
    Salvar
  </Button>
</Modal>
```

### **ConfirmDialog (para exclusões)**

```tsx
<div data-testid="confirm-dialog">
  <Button data-testid="btn-cancelar-exclusao" onClick={onCancel}>
    Cancelar
  </Button>
  <Button data-testid="btn-confirmar-exclusao" onClick={onConfirm}>
    Confirmar
  </Button>
</div>
```

### **Toast/Notificações**

```tsx
// Toast de Sucesso
<div className="toast-success" data-testid="toast-success">
  {message}
</div>

// Toast de Erro
<div className="toast-error" data-testid="toast-error">
  {message}
</div>
```

### **Loading Spinner**

```tsx
<div data-testid="loading-spinner">
  <LoadingSpinner />
</div>
```

### **Mensagens de Validação**

```tsx
// Em cada campo com erro
{
  errors.name && (
    <span data-testid="erro-nome" className="text-red-500 text-sm">
      {errors.name}
    </span>
  );
}

{
  errors.email && (
    <span data-testid="erro-email" className="text-red-500 text-sm">
      {errors.email}
    </span>
  );
}

{
  errors.phone && (
    <span data-testid="erro-telefone" className="text-red-500 text-sm">
      {errors.phone}
    </span>
  );
}

{
  errors.cpfCnpj && (
    <span data-testid="erro-cpfCnpj" className="text-red-500 text-sm">
      {errors.cpfCnpj}
    </span>
  );
}
```

## 🎯 Padrão de Nomenclatura

### **Botões**

- `btn-{acao}-{entidade}`: `btn-novo-cliente`, `btn-editar-fornecedor`

### **Inputs**

- `input-{nome}-{entidade}`: `input-busca-clientes`, `input-busca-fornecedores`

### **Selects/Filtros**

- `filtro-{tipo}`: `filtro-categoria`, `filtro-status`

### **Tabelas e Linhas**

- `tabela-{entidade}`: `tabela-clientes`, `tabela-fornecedores`
- `linha-{entidade}`: `linha-cliente`, `linha-fornecedor`

### **Modals**

- `modal-{entidade}`: `modal-cliente`, `modal-fornecedor`

### **Mensagens de Erro**

- `erro-{campo}`: `erro-nome`, `erro-email`, `erro-cpfCnpj`

### **Componentes de UI**

- `loading-spinner`: Indicador de carregamento
- `toast-success`: Notificação de sucesso
- `toast-error`: Notificação de erro
- `confirm-dialog`: Diálogo de confirmação

## ✅ Checklist de Implementação

Ao implementar os data-testid, verifique:

- [ ] Todos os botões principais têm testid
- [ ] Inputs de busca e filtros têm testid
- [ ] Campos de formulário têm `id` (não testid)
- [ ] Botões de ação (editar/excluir) têm testid
- [ ] Tabelas e linhas têm testid
- [ ] Modals têm testid
- [ ] Mensagens de erro têm testid
- [ ] Toasts/notificações têm classes ou testid
- [ ] Loading spinners têm testid
- [ ] Diálogos de confirmação têm testid

## 🔍 Dica de Depuração

Para verificar se os testids estão corretos:

1. Abra o Chrome DevTools
2. Busque por `[data-testid="nome-do-testid"]`
3. Verifique se o elemento é encontrado

Ou use o Cypress:

```typescript
cy.get('[data-testid="btn-novo-cliente"]').should("exist");
```

## 📚 Referências

- [Cypress Best Practices - Selecting Elements](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)
- [Testing Library - Priority Guide](https://testing-library.com/docs/queries/about/#priority)
