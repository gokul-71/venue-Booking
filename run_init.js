const fs = require('fs');
const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const initSqlPath = path.join(__dirname, 'init.sql');

async function initializeDb() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log('Connected to Neon DB successfully.');
        
        const sql = fs.readFileSync(initSqlPath, 'utf8');
        console.log('Executing init.sql...');
        
        await client.query(sql);
        console.log('Database initialized successfully with schema and dummy data!');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await client.end();
    }
}

initializeDb();
