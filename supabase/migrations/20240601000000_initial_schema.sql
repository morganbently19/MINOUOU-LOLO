-- إنشاء جدول العملاء
CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  id_number TEXT UNIQUE NOT NULL,
  dob DATE,
  status TEXT DEFAULT 'نشط',
  security_level TEXT DEFAULT 'medium',
  transaction_limit NUMERIC DEFAULT 50000,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- إنشاء جدول الحسابات
CREATE TABLE accounts (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_id BIGINT REFERENCES customers(id) ON DELETE CASCADE,
  account_number TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  currency TEXT NOT NULL,
  balance NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'نشط'
);

-- إنشاء جدول المعاملات
CREATE TABLE transactions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  account_id BIGINT REFERENCES accounts(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'مكتملة',
  recipient_account_id BIGINT REFERENCES accounts(id) NULL
);

-- إنشاء جدول أسعار العملات
CREATE TABLE currency_rates (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  base_rate NUMERIC NOT NULL,
  buy_rate NUMERIC NOT NULL,
  sell_rate NUMERIC NOT NULL,
  is_base BOOLEAN DEFAULT FALSE
);

-- إنشاء جدول أهداف الادخار
CREATE TABLE savings_goals (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_id BIGINT REFERENCES customers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  current_amount NUMERIC DEFAULT 0,
  target_amount NUMERIC NOT NULL,
  target_date DATE NOT NULL,
  monthly_contribution NUMERIC NOT NULL
);

-- إضافة بيانات أولية لأسعار العملات
INSERT INTO currency_rates (code, name, symbol, base_rate, buy_rate, sell_rate, is_base) VALUES
('DZD', 'دينار جزائري', 'د.ج', 1, 1, 1, TRUE),
('USD', 'دولار أمريكي', '$', 135.5, 134.8, 136.2, FALSE),
('EUR', 'يورو', '€', 148.2, 147.5, 149.0, FALSE),
('GBP', 'جنيه إسترليني', '£', 172.3, 171.5, 173.1, FALSE),
('CAD', 'دولار كندي', 'C$', 101.2, 100.5, 102.0, FALSE);
