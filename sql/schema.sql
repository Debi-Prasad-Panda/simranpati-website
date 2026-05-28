CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY,
  hero_title text NOT NULL,
  hero_tagline text NOT NULL,
  about_text text NOT NULL,
  contact_email text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS writing_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  body text NOT NULL,
  cover_image_url text NOT NULL,
  reading_time integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS design_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  overview text NOT NULL,
  role text NOT NULL,
  tools text[] NOT NULL DEFAULT '{}',
  year text NOT NULL,
  cover_image_url text NOT NULL,
  gallery_images text[] NOT NULL DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt_text text NOT NULL,
  type text NOT NULL,
  width integer,
  height integer,
  created_at timestamptz DEFAULT now()
);
