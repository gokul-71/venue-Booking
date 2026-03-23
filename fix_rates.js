require('dotenv').config({ override: true });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    await client.query("UPDATE venues SET hourly_rate = 500, full_day_rate = 4000 WHERE hourly_rate = 0 OR hourly_rate IS NULL");
    console.log('Successfully backfilled legacy 0 rates');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
