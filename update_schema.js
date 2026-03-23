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
      ALTER TABLE venues 
      ADD COLUMN IF NOT EXISTS description TEXT,
      ADD COLUMN IF NOT EXISTS amenities JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS cancellation_policy TEXT;
    `);
    console.log('Successfully updated venues table');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
