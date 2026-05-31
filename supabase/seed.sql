-- ============================================================
-- TETLA MOTORS — Seed Data
-- Run this in Supabase SQL Editor AFTER schema.sql and add_videos.sql
-- ============================================================

-- Products
INSERT INTO products (name, slug, price, category, specs, images, is_active) VALUES
  (
    'TETLA Classic',
    'tetla-classic',
    45999,
    'bike',
    '{"model": "RTO Model", "range": "Up to 100 Km", "charge_time": "2 to 4 Hrs"}',
    ARRAY['/pa1.jpg'],
    true
  ),
  (
    'TETLA E9 Pro',
    'tetla-e9-pro',
    62999,
    'bike',
    '{"model": "RTO Model", "range": "Up to 120 Km", "charge_time": "2 to 4 Hrs"}',
    ARRAY['/pa3.jpg'],
    true
  ),
  (
    'TETLA Pro Plus',
    'tetla-pro-plus',
    78999,
    'bike',
    '{"model": "Premium", "range": "Up to 140 Km", "charge_time": "2 to 3 Hrs"}',
    ARRAY['/pa2.jpg'],
    true
  ),
  (
    'TETLA Ailes',
    'tetla-ailes',
    89999,
    'bike',
    '{"model": "Sport", "range": "Up to 150 Km", "charge_time": "2 to 3 Hrs"}',
    ARRAY['/pa4.jpg'],
    true
  ),
  (
    'TETLA Voiture',
    'tetla-voiture',
    120000,
    'bike',
    '{"model": "Elite", "range": "Up to 180 Km", "charge_time": "1 to 2 Hrs"}',
    ARRAY['/pa5.jpg'],
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- Team members
INSERT INTO team_members (name, role, image_url, display_order) VALUES
  ('K T Davood',  'CEO', '/ceo.png', 1),
  ('Dr Ashraf C', 'CMD', '/cmd.png', 2),
  ('David Haley', 'CTO', '/cto.png', 3)
ON CONFLICT DO NOTHING;

-- Hero content (upsert — update if already seeded by schema.sql)
UPDATE hero_content SET
  headline     = 'TETLA Classic',
  subheadline  = 'Efficient, stylish, and built for city rides',
  stat1_label  = 'Electric Range',
  stat1_value  = 'Up to 100 Km',
  stat2_label  = 'Full Charge',
  stat2_value  = '2 to 4 Hrs',
  updated_at   = now();
