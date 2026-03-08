-- Add card color and liquid glass effect columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS card_color TEXT DEFAULT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS liquid_glass BOOLEAN DEFAULT FALSE;
