/*
  # Create transacoes table for dashboard

  1. New Tables
    - `transacoes`
      - `id` (uuid, primary key)
      - `data` (date, not null)
      - `descricao` (text, not null)
      - `valor` (decimal, not null)
      - `categoria` (text, not null)
      - `status` (text, default 'Concluído')
      - `tipo` (text, not null - 'income' or 'expense')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `transacoes` table
    - Add policy for authenticated users to manage their data
*/

CREATE TABLE IF NOT EXISTS transacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data date NOT NULL,
  descricao text NOT NULL,
  valor decimal(10,2) NOT NULL,
  categoria text NOT NULL,
  status text DEFAULT 'Concluído' CHECK (status IN ('Concluído', 'Pendente')),
  tipo text NOT NULL CHECK (tipo IN ('income', 'expense')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage transacoes"
  ON transacoes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data for dashboard
INSERT INTO transacoes (data, descricao, valor, categoria, status, tipo) VALUES
('2024-07-15', 'Pagamento de Fatura', 500.00, 'Receita', 'Concluído', 'income'),
('2024-07-14', 'Pagamento de Aluguel', 1500.00, 'Moradia', 'Concluído', 'expense'),
('2024-07-13', 'Compras de Supermercado', 200.00, 'Alimentação', 'Concluído', 'expense'),
('2024-07-12', 'Pagamento de Cliente', 1000.00, 'Receita', 'Pendente', 'income'),
('2024-07-11', 'Conta de Luz', 150.00, 'Utilidades', 'Concluído', 'expense'),
('2024-07-10', 'Serviços de Consultoria', 2500.00, 'Receita', 'Concluído', 'income'),
('2024-07-09', 'Combustível', 180.00, 'Transporte', 'Concluído', 'expense'),
('2024-07-08', 'Venda de Produto', 750.00, 'Receita', 'Concluído', 'income');