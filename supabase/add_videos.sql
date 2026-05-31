-- ============================================================
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ============================================================

-- Site video slots (hero, section backgrounds, testimonials)
CREATE TABLE IF NOT EXISTS site_videos (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key        text UNIQUE NOT NULL,
  label      text NOT NULL,
  url        text,
  public_id  text,
  updated_at timestamptz DEFAULT now()
);

-- Add video field to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS video_url text;

-- Pre-seed the 9 video slots
INSERT INTO site_videos (key, label) VALUES
  ('hero',          'Hero Background'),
  ('va1',           'Why Choose Us — Safety'),
  ('va2',           'Why Choose Us — Emissions'),
  ('va3',           'Why Choose Us — Design'),
  ('lineup',        'CTA / Lineup Banner'),
  ('testimonial_1', 'Testimonial 1'),
  ('testimonial_2', 'Testimonial 2'),
  ('testimonial_3', 'Testimonial 3'),
  ('testimonial_4', 'Testimonial 4'),
  ('testimonial_5', 'Testimonial 5'),
  ('testimonial_6', 'Testimonial 6'),
  ('testimonial_7', 'Testimonial 7')
ON CONFLICT (key) DO NOTHING;

-- RLS
ALTER TABLE site_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_videos"  ON site_videos FOR SELECT USING (true);
CREATE POLICY "admin_all_videos"    ON site_videos FOR ALL   USING (auth.role() = 'authenticated');
