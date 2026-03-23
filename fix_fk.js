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
      ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_venue_id_fkey;
      ALTER TABLE bookings ADD CONSTRAINT bookings_venue_id_fkey FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE;
      
      ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_user_id_fkey;
      ALTER TABLE bookings ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    `);
    console.log('Successfully updated foreign key constraints to ON DELETE CASCADE');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
