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
      ALTER TABLE venues ADD COLUMN IF NOT EXISTS hourly_rate INT DEFAULT 0, ADD COLUMN IF NOT EXISTS full_day_rate INT DEFAULT 0;
      ALTER TABLE bookings ADD COLUMN IF NOT EXISTS total_price INT DEFAULT 0;
    `);
    console.log('Successfully updated tables for dynamic pricing');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
