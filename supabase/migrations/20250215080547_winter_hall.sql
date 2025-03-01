/*
  # Initial Schema Setup for Student Guide System

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `event_date` (timestamptz)
      - `created_at` (timestamptz)
      - `status` (text)
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `whatsapp` (text)
      - `email` (text)
      - `roll_number` (text)
      - `program` (text)
      - `created_at` (timestamptz)
    - `event_notifications`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key)
      - `student_id` (uuid, foreign key)
      - `sent_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    event_date timestamptz NOT NULL,
    created_at timestamptz DEFAULT now(),
    status text DEFAULT 'pending'
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    whatsapp text NOT NULL,
    email text NOT NULL,
    roll_number text NOT NULL,
    program text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Create event_notifications table
CREATE TABLE IF NOT EXISTS event_notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id uuid REFERENCES events(id),
    student_id uuid REFERENCES students(id),
    sent_at timestamptz DEFAULT now(),
    status text DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users" ON events
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable write access for authenticated users" ON events
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON students
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable write access for authenticated users" ON students
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON event_notifications
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable write access for authenticated users" ON event_notifications
    FOR INSERT TO authenticated WITH CHECK (true);