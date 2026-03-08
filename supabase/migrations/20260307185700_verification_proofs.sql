-- Add fields for linking to BBB profiles and OSHA proof documents
ALTER TABLE profiles
ADD COLUMN bbb_profile_url text,
ADD COLUMN osha_proof_url text;
