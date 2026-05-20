-- Central de Onboarding Maiver - Schema do Banco de Dados
-- Supabase PostgreSQL

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('Básico', 'Pro', 'Enterprise')),
  start_date DATE NOT NULL,
  consultant_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de etapas do onboarding
CREATE TABLE IF NOT EXISTS onboarding_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_onboarding_steps_client_id ON onboarding_steps(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_consultant ON clients(consultant_name);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);

-- Row Level Security (RLS) - Permitir acesso anônimo para leitura/escrita
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_steps ENABLE ROW LEVEL SECURITY;

-- Políticas para clients
CREATE POLICY "Permitir todas as operações para anônimos" ON clients
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Políticas para onboarding_steps
CREATE POLICY "Permitir todas as operações para anônimos" ON onboarding_steps
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
