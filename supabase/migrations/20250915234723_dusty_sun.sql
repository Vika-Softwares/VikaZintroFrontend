/*
  # Create contas_receber table

  1. New Tables
    - `contas_receber`
      - `id` (uuid, primary key)
      - `descricao` (text, not null)
      - `valor` (decimal, not null)
      - `data_vencimento` (date, not null)
      - `categoria` (text, not null)
      - `cliente_id` (uuid, foreign key to clientes)
      - `cliente_nome` (text, not null)
      - `status` (text, default 'Pendente')
      - `recorrente` (boolean, default false)
      - `observacoes` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `contas_receber` table
    - Add policy for authenticated users to manage their data
*/

CREATE TABLE IF NOT EXISTS contas_receber (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  descricao text NOT NULL,
  valor decimal(10,2) NOT NULL,
  data_vencimento date NOT NULL,
  categoria text NOT NULL,
  cliente_id uuid REFERENCES clientes(id),
  cliente_nome text NOT NULL,
  status text DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Recebido', 'Vencido')),
  recorrente boolean DEFAULT false,
  observacoes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contas_receber ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage contas_receber"
  ON contas_receber
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO contas_receber (descricao, valor, data_vencimento, categoria, cliente_nome, status, recorrente, observacoes) VALUES
('Mensalidade de Serviços', 2500.00, '2024-02-05', 'Serviços', 'João Silva', 'Pendente', true, 'Mensalidade recorrente'),
('Projeto de Desenvolvimento', 8500.00, '2024-02-10', 'Projetos', 'Maria Santos', 'Pendente', false, null),
('Consultoria Técnica', 1800.00, '2024-01-30', 'Consultoria', 'Pedro Oliveira', 'Vencido', false, null),
('Licença de Software', 450.00, '2024-01-25', 'Licenças', 'Ana Costa', 'Recebido', true, null),
('Suporte Técnico', 1200.00, '2024-02-12', 'Suporte', 'Carlos Ferreira', 'Pendente', false, null);