-- Migrate user_id from UUID to TEXT for Clerk compatibility
ALTER TABLE public.profiles DROP CONSTRAINT profiles_user_id_fkey;
ALTER TABLE public.profiles ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);

-- Drop Supabase Auth triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user;

-- Create function to get Clerk user ID from JWT
-- The JWT is passed from your Next.js server/middleware into Supabase in the Authorization header
CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT
LANGUAGE sql STABLE
AS $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$;

-- Update RLS policies to use the new requesting_user_id() function
DROP POLICY IF EXISTS "Users can create their own profile." ON public.profiles;
CREATE POLICY "Users can create their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( requesting_user_id() = user_id );

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( requesting_user_id() = user_id );

DROP POLICY IF EXISTS "Users can delete their own profile." ON public.profiles;
CREATE POLICY "Users can delete their own profile."
  ON public.profiles FOR DELETE
  USING ( requesting_user_id() = user_id );
