-- Add BBB Rating and OSHA Certified columns to profiles
ALTER TABLE public.profiles ADD COLUMN bbb_rating TEXT;
ALTER TABLE public.profiles ADD COLUMN osha_certified BOOLEAN DEFAULT FALSE;
