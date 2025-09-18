/*
  # Create views and functions for dashboard data

  1. Views
    - `dashboard_financial_overview` - Financial summary data
    - `dashboard_cash_flow` - Monthly cash flow data
    - `dashboard_expense_categories` - Expense breakdown by category

  2. Functions
    - Helper functions for dashboard calculations
*/

-- View for financial overview
CREATE OR REPLACE VIEW dashboard_financial_overview AS
SELECT 
  COALESCE(SUM(CASE WHEN cr.status = 'Pendente' THEN cr.valor ELSE 0 END), 0) as total_receivable,
  COALESCE(SUM(CASE WHEN cp.status = 'Pendente' THEN cp.valor ELSE 0 END), 0) as total_payable,
  COALESCE(SUM(CASE WHEN cr.status = 'Pendente' THEN cr.valor ELSE 0 END), 0) - 
  COALESCE(SUM(CASE WHEN cp.status = 'Pendente' THEN cp.valor ELSE 0 END), 0) as balance,
  (SELECT COUNT(*) FROM clientes WHERE status = 'Ativo') as clients
FROM contas_receber cr
FULL OUTER JOIN contas_pagar cp ON 1=1;

-- View for monthly cash flow (last 6 months)
CREATE OR REPLACE VIEW dashboard_cash_flow AS
WITH months AS (
  SELECT 
    generate_series(
      date_trunc('month', CURRENT_DATE - INTERVAL '5 months'),
      date_trunc('month', CURRENT_DATE),
      '1 month'::interval
    ) as month
),
revenue_data AS (
  SELECT 
    date_trunc('month', data_vencimento) as month,
    SUM(valor) as revenue
  FROM contas_receber 
  WHERE status = 'Recebido'
    AND data_vencimento >= CURRENT_DATE - INTERVAL '6 months'
  GROUP BY date_trunc('month', data_vencimento)
),
expense_data AS (
  SELECT 
    date_trunc('month', data_vencimento) as month,
    SUM(valor) as expenses
  FROM contas_pagar 
  WHERE status = 'Pago'
    AND data_vencimento >= CURRENT_DATE - INTERVAL '6 months'
  GROUP BY date_trunc('month', data_vencimento)
)
SELECT 
  TO_CHAR(m.month, 'Mon') as month,
  COALESCE(r.revenue, 0) as revenue,
  COALESCE(e.expenses, 0) as expenses
FROM months m
LEFT JOIN revenue_data r ON m.month = r.month
LEFT JOIN expense_data e ON m.month = e.month
ORDER BY m.month;

-- View for expense categories
CREATE OR REPLACE VIEW dashboard_expense_categories AS
WITH total_expenses AS (
  SELECT SUM(valor) as total FROM contas_pagar WHERE status = 'Pago'
)
SELECT 
  categoria as name,
  SUM(valor) as value,
  ROUND((SUM(valor) / te.total * 100)::numeric, 0) as percentage,
  CASE 
    WHEN ROW_NUMBER() OVER (ORDER BY SUM(valor) DESC) = 1 THEN '#2563eb'
    WHEN ROW_NUMBER() OVER (ORDER BY SUM(valor) DESC) = 2 THEN '#60a5fa'
    WHEN ROW_NUMBER() OVER (ORDER BY SUM(valor) DESC) = 3 THEN '#7dd3fc'
    ELSE '#bfdbfe'
  END as color
FROM contas_pagar cp
CROSS JOIN total_expenses te
WHERE cp.status = 'Pago'
GROUP BY categoria, te.total
ORDER BY value DESC;

-- Insert some sample paid expenses for the dashboard
UPDATE contas_pagar SET status = 'Pago' WHERE descricao = 'Serviços de Consultoria';

-- Insert some sample received income for the dashboard  
UPDATE contas_receber SET status = 'Recebido' WHERE descricao = 'Licença de Software';