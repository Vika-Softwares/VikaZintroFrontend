import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { DashboardClient } from './components/dashboard/DashboardClient'
import { ClientesPage } from './components/clientes/ClientesPage'
import { FornecedoresPage } from './components/fornecedores/FornecedoresPage'
import { ContasPagarPage } from './components/financeiro/ContasPagarPage'
import { ContasReceberPage } from './components/financeiro/ContasReceberPage'
import { TodosLancamentosPage } from './components/financeiro/TodosLancamentosPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardClient />} />
      <Route path="/clientes" element={<ClientesPage />} />
      <Route path="/fornecedores" element={<FornecedoresPage />} />
      <Route path="/todos-lancamentos" element={<TodosLancamentosPage />} />
      <Route path="/contas-pagar" element={<ContasPagarPage />} />
      <Route path="/contas-receber" element={<ContasReceberPage />} />
    </Routes>
  )
}

export default App