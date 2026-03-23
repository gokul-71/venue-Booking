require('dotenv').config({ override: true });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        venue_id INT REFERENCES venues(id),
        event_date DATE NOT NULL,
        guests INT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Successfully created bookings table');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
