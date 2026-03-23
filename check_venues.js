require('dotenv').config({ override: true });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  try {
    await client.connect();
    const result = await client.query("SELECT id, name, status FROM venues");
    console.table(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
