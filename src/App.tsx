import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './contexts/ToastContext'
import { LoginPage } from './pages/auth/LoginPage'
import { DashboardClient } from './pages/dashboard/DashboardClient'
import { ClientesPage } from './pages/clientes/ClientesPage'
import { FornecedoresPage } from './pages/fornecedores/FornecedoresPage'
import { ContasPagarPage } from './pages/financeiro/ContasPagarPage'
import { ContasReceberPage } from './pages/financeiro/ContasReceberPage'
import { TodosLancamentosPage } from './pages/financeiro/TodosLancamentosPage'
import { FinanceiroClient } from './pages/financeiro/FinanceiroClient'
import { CadastrosPage } from './pages/cadastros/CadastrosPage'
import { LandingPage } from './pages/landing/LandingPage'
import { SuccessPage } from './pages/landing/SuccessPage'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { PublicLayout } from './components/layout/PublicLayout'
import { PrivateLayout } from './components/layout/PrivateLayout'

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          }
        />
        <Route
          path="/success"
          element={
            <PublicLayout>
              <SuccessPage />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <LoginPage />
            </PublicLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <DashboardClient />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <ClientesPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fornecedores"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <FornecedoresPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos-lancamentos"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <TodosLancamentosPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contas-pagar"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <ContasPagarPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contas-receber"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <ContasReceberPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/financeiro"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <FinanceiroClient />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cadastros"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <CadastrosPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ToastProvider>
  )
}

export default App