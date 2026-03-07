-- Add Trust Verification fields
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_licensed_insured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS insurance_document_url TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'Unverified';
