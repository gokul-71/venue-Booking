require('dotenv').config({ override: true });
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function addAdmin() {
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash('admin123', salt);
  
  try {
    const res = await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ('System Admin', 'admin@corpvenue.com', $1, 'admin') ON CONFLICT (email) DO NOTHING RETURNING id",
      [password_hash]
    );
    if (res.rowCount > 0) {
      console.log('Admin account created successfully.');
    } else {
      console.log('Admin account already exists.');
    }
  } catch (err) {
    console.error('Error inserting admin:', err);
  } finally {
    await pool.end();
  }
}

addAdmin();
