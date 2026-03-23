require('dotenv').config({ override: true });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function fix() {
  try {
    await client.connect();
    const result = await client.query("UPDATE venues SET status = 'pending' WHERE status = 'approved' AND id > 4 RETURNING id, name");
    console.log('Fixed venues:', result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

fix();
