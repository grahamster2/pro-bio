-- Add BBB rating and OSHA certification fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bbb_rating TEXT,
ADD COLUMN IF NOT EXISTS osha_certified BOOLEAN DEFAULT FALSE;
