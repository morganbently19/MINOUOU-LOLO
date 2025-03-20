-- Add verification_status column to customers table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'customers' 
                AND column_name = 'verification_status') THEN
    ALTER TABLE customers ADD COLUMN verification_status TEXT DEFAULT 'pending';
  END IF;
END $$;

-- Create verification_documents table if it doesn't exist
CREATE TABLE IF NOT EXISTS verification_documents (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  document_type TEXT NOT NULL,
  front_image_url TEXT NOT NULL,
  back_image_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for verification_documents
DROP POLICY IF EXISTS "Customers can view their own documents" ON verification_documents;
CREATE POLICY "Customers can view their own documents"
  ON verification_documents FOR SELECT
  USING (auth.uid()::text = customer_id::text);

DROP POLICY IF EXISTS "Customers can insert their own documents" ON verification_documents;
CREATE POLICY "Customers can insert their own documents"
  ON verification_documents FOR INSERT
  WITH CHECK (auth.uid()::text = customer_id::text);

-- Add to realtime publication
alter publication supabase_realtime add table verification_documents;