/*
  # Create contas_pagar table

  1. New Tables
    - `contas_pagar`
      - `id` (uuid, primary key)
      - `descricao` (text, not null)
      - `valor` (decimal, not null)
      - `data_vencimento` (date, not null)
      - `categoria` (text, not null)
      - `fornecedor_id` (uuid, foreign key to fornecedores)
      - `fornecedor_nome` (text, not null)
      - `status` (text, default 'Pendente')
      - `recorrente` (boolean, default false)
      - `observacoes` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `contas_pagar` table
    - Add policy for authenticated users to manage their data
*/

CREATE TABLE IF NOT EXISTS contas_pagar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  descricao text NOT NULL,
  valor decimal(10,2) NOT NULL,
  data_vencimento date NOT NULL,
  categoria text NOT NULL,
  fornecedor_id uuid REFERENCES fornecedores(id),
  fornecedor_nome text NOT NULL,
  status text DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Pago', 'Vencido')),
  recorrente boolean DEFAULT false,
  observacoes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contas_pagar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage contas_pagar"
  ON contas_pagar
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO contas_pagar (descricao, valor, data_vencimento, categoria, fornecedor_nome, status, recorrente, observacoes) VALUES
('Aluguel do Escritório', 3500.00, '2024-02-05', 'Infraestrutura', 'Imobiliária Central', 'Pendente', true, 'Pagamento mensal do aluguel'),
('Conta de Energia', 450.80, '2024-02-10', 'Utilidades', 'Companhia Elétrica', 'Pendente', true, null),
('Fornecimento de Material', 1200.00, '2024-01-30', 'Materiais', 'Materiais & Cia', 'Vencido', false, null),
('Serviços de Consultoria', 2800.00, '2024-01-25', 'Serviços', 'Tech Solutions Ltda', 'Pago', false, null),
('Conta de Internet', 299.90, '2024-02-15', 'Utilidades', 'Telecom Brasil', 'Pendente', true, null);