/*
  # User Profiles and Role Management System

  This migration creates the core authentication and user management tables for the learning platform.

  ## New Tables
    - `profiles`
      - `id` (uuid, primary key) - Links to auth.users
      - `email` (text, unique) - User email address
      - `full_name` (text) - User's full name
      - `role` (text) - User role: admin, teacher, learner, or parent
      - `id_number` (text, optional) - ID number for admin authentication
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

    - `parent_learner_links`
      - `id` (uuid, primary key)
      - `parent_id` (uuid) - References profiles(id) for parent
      - `learner_id` (uuid) - References profiles(id) for learner
      - `created_at` (timestamptz) - Link creation timestamp

  ## Security
    - Enable RLS on all tables
    - Admins can access all data (authenticated via id_number)
    - Teachers can view their own profile and learner profiles
    - Learners can view their own profile
    - Parents can view their own profile and linked learners' data
    - All users can update their own profile

  ## Important Notes
    1. Admin accounts must have an `id_number` for authentication
    2. The `role` field uses a CHECK constraint to ensure valid roles
    3. Parent-learner relationships are tracked in a separate table
    4. Timestamps are automatically managed with triggers
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'teacher', 'learner', 'parent')),
  id_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS parent_learner_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  learner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(parent_id, learner_id)
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_id_number ON profiles(id_number);
CREATE INDEX IF NOT EXISTS idx_parent_learner_parent ON parent_learner_links(parent_id);
CREATE INDEX IF NOT EXISTS idx_parent_learner_learner ON parent_learner_links(learner_id);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_learner_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Teachers can view learner profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    role = 'learner' AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'teacher'
    )
  );

CREATE POLICY "Parents can view linked learner profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM parent_learner_links
      WHERE parent_learner_links.parent_id = auth.uid()
      AND parent_learner_links.learner_id = profiles.id
    )
  );

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete profiles"
  ON profiles FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can view all parent-learner links"
  ON parent_learner_links FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Parents can view own links"
  ON parent_learner_links FOR SELECT
  TO authenticated
  USING (parent_id = auth.uid());

CREATE POLICY "Admins can manage parent-learner links"
  ON parent_learner_links FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
