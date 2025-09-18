/*
  # Create fornecedores table

  1. New Tables
    - `fornecedores`
      - `id` (uuid, primary key)
      - `nome` (text, not null)
      - `email` (text, unique, not null)
      - `telefone` (text, not null)
      - `endereco` (text, not null)
      - `cnpj` (text, unique, not null)
      - `status` (text, default 'Ativo')
      - `categoria` (text, not null)
      - `data_ultima_compra` (date, nullable)
      - `total_compras` (decimal, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `fornecedores` table
    - Add policy for authenticated users to manage their data
*/

CREATE TABLE IF NOT EXISTS fornecedores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text UNIQUE NOT NULL,
  telefone text NOT NULL,
  endereco text NOT NULL,
  cnpj text UNIQUE NOT NULL,
  status text DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Inativo')),
  categoria text NOT NULL,
  data_ultima_compra date,
  total_compras decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage fornecedores"
  ON fornecedores
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO fornecedores (nome, email, telefone, endereco, cnpj, status, categoria, data_ultima_compra, total_compras) VALUES
('Tech Solutions Ltda', 'contato@techsolutions.com', '(11) 3333-3333', 'São Paulo, SP', '12.345.678/0001-90', 'Ativo', 'Tecnologia', '2024-01-12', 45200.00),
('Materiais & Cia', 'vendas@materiaisecia.com', '(11) 4444-4444', 'Campinas, SP', '98.765.432/0001-10', 'Ativo', 'Materiais', '2024-01-08', 28750.50),
('Serviços Gerais S.A.', 'admin@servicosgerais.com', '(11) 5555-5555', 'Santos, SP', '11.222.333/0001-44', 'Inativo', 'Serviços', '2023-11-15', 12300.00),
('Logística Express', 'contato@logisticaexpress.com', '(11) 6666-6666', 'Guarulhos, SP', '44.555.666/0001-77', 'Ativo', 'Logística', '2024-01-10', 18900.25);