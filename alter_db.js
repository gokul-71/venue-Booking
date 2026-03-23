require('dotenv').config({ override: true });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    await client.query("ALTER TABLE venues ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'approved'");
    console.log('Successfully added status column');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
