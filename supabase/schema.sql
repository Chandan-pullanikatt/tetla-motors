-- ============================================================
-- TETLA MOTORS — Supabase Schema
-- Run this in your Supabase project: SQL Editor → New query
-- ============================================================

-- Products
CREATE TABLE IF NOT EXISTS products (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  slug        text UNIQUE NOT NULL,
  price       numeric NOT NULL DEFAULT 0,
  description text,
  category    text DEFAULT 'bike',
  specs       jsonb DEFAULT '{}',
  images      text[] DEFAULT '{}',
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blogs (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title        text NOT NULL,
  slug         text UNIQUE NOT NULL,
  excerpt      text,
  content      text,
  cover_image  text,
  author       text DEFAULT 'TETLA Team',
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at   timestamptz DEFAULT now()
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name          text NOT NULL,
  role          text NOT NULL,
  image_url     text,
  display_order integer DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);

-- Hero content (single row)
CREATE TABLE IF NOT EXISTS hero_content (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  headline      text DEFAULT 'TETLA Classic',
  subheadline   text DEFAULT 'Efficient, stylish, and built for city rides',
  stat1_label   text DEFAULT 'Electric Range',
  stat1_value   text DEFAULT 'Up to 100 Km',
  stat2_label   text DEFAULT 'Full Charge',
  stat2_value   text DEFAULT '2 to 4 Hrs',
  updated_at    timestamptz DEFAULT now()
);

-- Leads / CRM
CREATE TABLE IF NOT EXISTS leads (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL,
  email        text,
  phone        text,
  enquiry_type text,
  message      text,
  newsletter   boolean DEFAULT false,
  status       text DEFAULT 'new',   -- new | contacted | closed
  notes        text,
  created_at   timestamptz DEFAULT now()
);

-- Seed default hero content (only if table is empty)
INSERT INTO hero_content (headline, subheadline, stat1_label, stat1_value, stat2_label, stat2_value)
SELECT 'TETLA Classic', 'Efficient, stylish, and built for city rides', 'Electric Range', 'Up to 100 Km', 'Full Charge', '2 to 4 Hrs'
WHERE NOT EXISTS (SELECT 1 FROM hero_content);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;

-- Public: read active products, published blogs, all team/hero
CREATE POLICY "public_read_products"     ON products     FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_blogs"        ON blogs        FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_team"         ON team_members FOR SELECT USING (true);
CREATE POLICY "public_read_hero"         ON hero_content FOR SELECT USING (true);

-- Public: submit enquiry leads
CREATE POLICY "public_insert_leads" ON leads FOR INSERT WITH CHECK (true);

-- Authenticated (admin): full access to everything
CREATE POLICY "admin_all_products"  ON products     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_blogs"     ON blogs        FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_team"      ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_hero"      ON hero_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_leads"     ON leads        FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Storage bucket for images (run after creating the bucket)
-- In Supabase dashboard: Storage → New bucket → name: "images" → Public
-- Then run:
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
-- CREATE POLICY "public_read_images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
-- CREATE POLICY "admin_upload_images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
-- CREATE POLICY "admin_delete_images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
