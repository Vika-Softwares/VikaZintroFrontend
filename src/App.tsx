import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext'
import { DashboardClient } from './pages/dashboard/DashboardClient'
import { ClientesPage } from './pages/clientes/ClientesPage'
import { FornecedoresPage } from './pages/fornecedores/FornecedoresPage'
import { ContasPagarPage } from './pages/financeiro/ContasPagarPage'
import { ContasReceberPage } from './pages/financeiro/ContasReceberPage'
import { TodosLancamentosPage } from './pages/financeiro/TodosLancamentosPage'

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<DashboardClient />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/fornecedores" element={<FornecedoresPage />} />
        <Route path="/todos-lancamentos" element={<TodosLancamentosPage />} />
        <Route path="/contas-pagar" element={<ContasPagarPage />} />
        <Route path="/contas-receber" element={<ContasReceberPage />} />
      </Routes>
    </ToastProvider>
  )
}

export default App