-- Add premium background appearance fields
ALTER TABLE public.profiles
ADD COLUMN theme_color TEXT,
ADD COLUMN background_image_url TEXT;
