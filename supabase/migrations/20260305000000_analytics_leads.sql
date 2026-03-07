-- Create page_views table for tracking profile visits
CREATE TABLE public.page_views (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create link_clicks table for tracking link engagement
CREATE TABLE public.link_clicks (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  link_type TEXT NOT NULL, -- e.g., 'custom', 'call', 'text', 'social'
  link_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create leads table for capturing quote requests
CREATE TABLE public.leads (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  zip TEXT NOT NULL,
  service_requested TEXT,
  status TEXT DEFAULT 'new', -- e.g., 'new', 'contacted', 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 1. Public can insert page views
CREATE POLICY "Public can insert page views."
  ON public.page_views FOR INSERT
  WITH CHECK ( true );

-- 2. Profile owner can view their page views
CREATE POLICY "Users can view their own page views."
  ON public.page_views FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM public.profiles WHERE user_id = requesting_user_id()
    )
  );

-- 3. Public can insert link clicks
CREATE POLICY "Public can insert link clicks."
  ON public.link_clicks FOR INSERT
  WITH CHECK ( true );

-- 4. Profile owner can view their link clicks
CREATE POLICY "Users can view their own link clicks."
  ON public.link_clicks FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM public.profiles WHERE user_id = requesting_user_id()
    )
  );

-- 5. Public can insert leads (via the quote form)
CREATE POLICY "Public can insert leads."
  ON public.leads FOR INSERT
  WITH CHECK ( true );

-- 6. Profile owner can view, update, and delete their leads
CREATE POLICY "Users can view their own leads."
  ON public.leads FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM public.profiles WHERE user_id = requesting_user_id()
    )
  );

CREATE POLICY "Users can update their own leads."
  ON public.leads FOR UPDATE
  USING (
    profile_id IN (
      SELECT id FROM public.profiles WHERE user_id = requesting_user_id()
    )
  );

CREATE POLICY "Users can delete their own leads."
  ON public.leads FOR DELETE
  USING (
    profile_id IN (
      SELECT id FROM public.profiles WHERE user_id = requesting_user_id()
    )
  );
