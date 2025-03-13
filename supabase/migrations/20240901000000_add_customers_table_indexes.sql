-- Add indexes to improve query performance
CREATE INDEX IF NOT EXISTS customers_username_idx ON customers(username);
CREATE INDEX IF NOT EXISTS customers_email_idx ON customers(email);
CREATE INDEX IF NOT EXISTS accounts_customer_id_idx ON accounts(customer_id);

-- Add unique constraint to username and email
ALTER TABLE customers ADD CONSTRAINT IF NOT EXISTS customers_username_unique UNIQUE (username);
ALTER TABLE customers ADD CONSTRAINT IF NOT EXISTS customers_email_unique UNIQUE (email);
