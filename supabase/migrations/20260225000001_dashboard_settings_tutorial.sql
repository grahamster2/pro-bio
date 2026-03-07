-- Add new settings and tutorial state
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS accepts_credit_cards BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS offers_financing BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS free_consultations BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS has_seen_tutorial BOOLEAN DEFAULT false;
