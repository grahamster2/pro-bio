-- Add fields for linking to BBB profiles and OSHA proof documents
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS bbb_profile_url text,
ADD COLUMN IF NOT EXISTS osha_proof_url text;
