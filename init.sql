-- Create the venues table
CREATE TABLE IF NOT EXISTS venues (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  capacity INT NOT NULL,
  price VARCHAR(50) NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
  location VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'approved'
);

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  company_name VARCHAR(255)
);

-- Truncate existing data to prevent duplicates if run multiple times
TRUNCATE TABLE venues RESTART IDENTITY;

-- Insert 4 dummy venues
INSERT INTO venues (name, type, capacity, price, rating, location, image_url) VALUES 
('Grand Corporate Hall', 'Convention Center', 500, '$12000 / day', 4.8, 'Downtown Manhattan, NY', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop'),
('Tech Innovation Hub', 'Meeting Room', 50, '$1200 / day', 4.6, 'SOMA, San Francisco', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'),
('Skyline Rooftop', 'Outdoor Space', 150, '$3600/ day', 4.9, 'Loop, Chicago', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop'),
('Executive Boardroom A', 'Boardroom', 20, '$480 / day', 4.7, 'Financial District, London', 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=800&auto=format&fit=crop');
