/*
  # Create clientes table

  1. New Tables
    - `clientes`
      - `id` (uuid, primary key)
      - `nome` (text, not null)
      - `email` (text, unique, not null)
      - `telefone` (text, not null)
      - `endereco` (text, not null)
      - `status` (text, default 'Ativo')
      - `data_ultima_compra` (date, nullable)
      - `total_compras` (decimal, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `clientes` table
    - Add policy for authenticated users to manage their data
*/

CREATE TABLE IF NOT EXISTS clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text UNIQUE NOT NULL,
  telefone text NOT NULL,
  endereco text NOT NULL,
  status text DEFAULT 'Ativo' CHECK (status IN ('Ativo', 'Inativo')),
  data_ultima_compra date,
  total_compras decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage clientes"
  ON clientes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO clientes (nome, email, telefone, endereco, status, data_ultima_compra, total_compras) VALUES
('João Silva', 'joao.silva@email.com', '(11) 99999-9999', 'São Paulo, SP', 'Ativo', '2024-01-15', 15420.50),
('Maria Santos', 'maria.santos@email.com', '(11) 88888-8888', 'Rio de Janeiro, RJ', 'Ativo', '2024-01-10', 8750.00),
('Pedro Oliveira', 'pedro.oliveira@email.com', '(11) 77777-7777', 'Belo Horizonte, MG', 'Inativo', '2023-12-20', 3200.00),
('Ana Costa', 'ana.costa@email.com', '(11) 66666-6666', 'Curitiba, PR', 'Ativo', '2024-01-12', 12100.75),
('Carlos Ferreira', 'carlos.ferreira@email.com', '(11) 55555-5555', 'Porto Alegre, RS', 'Ativo', '2024-01-08', 6890.25);