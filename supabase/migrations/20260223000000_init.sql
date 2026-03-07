-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT,
  slug TEXT UNIQUE,
  trade_category TEXT,
  license_number TEXT,
  phone_number TEXT,
  bio TEXT,
  is_emergency_available BOOLEAN DEFAULT FALSE,
  profile_image_url TEXT,
  links JSONB DEFAULT '[]'::jsonb,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on row level security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies

-- 1. Public can view any profile by slug
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

-- 2. Users can insert their own profile
CREATE POLICY "Users can create their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- 3. Users can update their own profile
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = user_id );

-- 4. Users can delete their own profile
CREATE POLICY "Users can delete their own profile."
  ON public.profiles FOR DELETE
  USING ( auth.uid() = user_id );

-- Function to handle new user signup and create a profile sketch
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after a new user is created in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
