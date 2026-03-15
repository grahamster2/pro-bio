-- Local SEO Power-Ups Migration
-- Add service areas and project location tagging

-- Add service areas table
CREATE TABLE service_areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  zip_code VARCHAR(10) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(50),
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id, zip_code)
);

-- Add project gallery with locations
CREATE TABLE project_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title VARCHAR(200),
  description TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  project_date DATE,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_service_areas_profile_id ON service_areas(profile_id);
CREATE INDEX idx_service_areas_zip_code ON service_areas(zip_code);
CREATE INDEX idx_project_gallery_profile_id ON project_gallery(profile_id);
CREATE INDEX idx_project_gallery_featured ON project_gallery(is_featured) WHERE is_featured = true;
CREATE INDEX idx_project_gallery_location ON project_gallery(city, state) WHERE city IS NOT NULL;

-- Add RLS policies
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;

-- Service areas policies
CREATE POLICY "Users can view their own service areas" ON service_areas
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id));

CREATE POLICY "Users can insert their own service areas" ON service_areas
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id));

CREATE POLICY "Users can update their own service areas" ON service_areas
  FOR UPDATE USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id));

CREATE POLICY "Users can delete their own service areas" ON service_areas
  FOR DELETE USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id));

-- Project gallery policies
CREATE POLICY "Users can view their own projects" ON project_gallery
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id));

CREATE POLICY "Public can view featured projects" ON project_gallery
  FOR SELECT USING (is_featured = true);

CREATE POLICY "Users can insert their own projects" ON project_gallery
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id));

CREATE POLICY "Users can update their own projects" ON project_gallery
  FOR UPDATE USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id));

CREATE POLICY "Users can delete their own projects" ON project_gallery
  FOR DELETE USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = profile_id));

-- Add service area count to profiles for quick lookup
ALTER TABLE profiles ADD COLUMN service_area_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN project_count INTEGER DEFAULT 0;

-- Create function to update service area count
CREATE OR REPLACE FUNCTION update_service_area_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE profiles 
    SET service_area_count = (
      SELECT COUNT(*) 
      FROM service_areas 
      WHERE profile_id = NEW.profile_id
    )
    WHERE id = NEW.profile_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles 
    SET service_area_count = (
      SELECT COUNT(*) 
      FROM service_areas 
      WHERE profile_id = OLD.profile_id
    )
    WHERE id = OLD.profile_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create function to update project count
CREATE OR REPLACE FUNCTION update_project_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE profiles 
    SET project_count = (
      SELECT COUNT(*) 
      FROM project_gallery 
      WHERE profile_id = NEW.profile_id
    )
    WHERE id = NEW.profile_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles 
    SET project_count = (
      SELECT COUNT(*) 
      FROM project_gallery 
      WHERE profile_id = OLD.profile_id
    )
    WHERE id = OLD.profile_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_update_service_area_count
  AFTER INSERT OR UPDATE OR DELETE ON service_areas
  FOR EACH ROW EXECUTE FUNCTION update_service_area_count();

CREATE TRIGGER trigger_update_project_count
  AFTER INSERT OR UPDATE OR DELETE ON project_gallery
  FOR EACH ROW EXECUTE FUNCTION update_project_count();
