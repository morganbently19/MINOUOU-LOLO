-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  id_number TEXT NOT NULL,
  dob DATE NOT NULL,
  status TEXT DEFAULT 'نشط',
  security_level TEXT DEFAULT 'medium',
  transaction_limit NUMERIC DEFAULT 50000,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  account_number TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  currency TEXT NOT NULL,
  balance NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'نشط'
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  account_id BIGINT NOT NULL REFERENCES accounts(id),
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'مكتملة',
  recipient_account_id BIGINT REFERENCES accounts(id)
);

-- Create currency_rates table
CREATE TABLE IF NOT EXISTS currency_rates (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  base_rate NUMERIC NOT NULL,
  buy_rate NUMERIC NOT NULL,
  sell_rate NUMERIC NOT NULL,
  is_base BOOLEAN DEFAULT FALSE
);

-- Create savings_goals table
CREATE TABLE IF NOT EXISTS savings_goals (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  title TEXT NOT NULL,
  current_amount NUMERIC DEFAULT 0,
  target_amount NUMERIC NOT NULL,
  target_date DATE NOT NULL,
  monthly_contribution NUMERIC NOT NULL
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE currency_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;

-- Create default policies
CREATE POLICY "Public read access" ON customers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON accounts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON transactions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON currency_rates FOR SELECT USING (true);
CREATE POLICY "Public read access" ON savings_goals FOR SELECT USING (true);

-- Create insert policies
CREATE POLICY "Public insert access" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON accounts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON currency_rates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON savings_goals FOR INSERT WITH CHECK (true);

-- Create update policies
CREATE POLICY "Public update access" ON customers FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON accounts FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON transactions FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON currency_rates FOR UPDATE USING (true);
CREATE POLICY "Public update access" ON savings_goals FOR UPDATE USING (true);

-- Enable realtime
alter publication supabase_realtime add table customers;
alter publication supabase_realtime add table accounts;
alter publication supabase_realtime add table transactions;
alter publication supabase_realtime add table currency_rates;
alter publication supabase_realtime add table savings_goals;

-- Insert default customer for testing
INSERT INTO customers (name, email, phone, address, id_number, dob, username, password)
VALUES ('أحمد محمد', 'ahmed@example.com', '0555123456', 'الجزائر العاصمة', '29384756', '1990-01-01', 'ahmed', 'password123')
ON CONFLICT (username) DO NOTHING;
