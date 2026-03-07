-- Add new columns for profile picture and photo library
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
ADD COLUMN IF NOT EXISTS photo_library_urls TEXT[] DEFAULT '{}';

-- Create the Storage bucket for Profile images and project photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('contractor_assets', 'contractor_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS for the Storage Bucket
CREATE POLICY "Public profiles are viewable by everyone"
ON storage.objects FOR SELECT
USING ( bucket_id = 'contractor_assets' );

CREATE POLICY "Users can upload their own team/job photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'contractor_assets' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own team/job photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'contractor_assets' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own team/job photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'contractor_assets' 
  AND auth.role() = 'authenticated'
);
