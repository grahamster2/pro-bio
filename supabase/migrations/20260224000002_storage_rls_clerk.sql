-- Drop the old policies that relied on Supabase Auth's `auth.role()`
DROP POLICY IF EXISTS "Users can upload their own team/job photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own team/job photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own team/job photos" ON storage.objects;

-- Create new policies relying on the Clerk JWT parsed via requesting_user_id()
-- We also enforce that the first folder in the path matches the user's ID
CREATE POLICY "Users can upload their own team/job photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'contractor_assets' 
  AND public.requesting_user_id() IS NOT NULL
  AND (storage.foldername(name))[1] = public.requesting_user_id()
);

CREATE POLICY "Users can update their own team/job photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'contractor_assets' 
  AND public.requesting_user_id() IS NOT NULL
  AND (storage.foldername(name))[1] = public.requesting_user_id()
);

CREATE POLICY "Users can delete their own team/job photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'contractor_assets' 
  AND public.requesting_user_id() IS NOT NULL
  AND (storage.foldername(name))[1] = public.requesting_user_id()
);
