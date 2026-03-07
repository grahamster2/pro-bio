-- Add BBB rating and OSHA certification fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN bbb_rating TEXT,
ADD COLUMN osha_certified BOOLEAN DEFAULT FALSE;
