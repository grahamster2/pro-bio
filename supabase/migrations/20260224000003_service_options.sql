-- Add service_options array to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS service_options TEXT[] DEFAULT '{}';
