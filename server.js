require('dotenv').config({ override: true });
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Configure PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// API Endpoint to get all APPROVED venues (for users)
app.get('/api/venues', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM venues WHERE status = 'approved' ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint to get a single venue's details
app.get('/api/venues/:id', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM venues WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Venue not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint for owners to add a new venue (defaults to pending)
app.post('/api/venues', async (req, res) => {
  const { name, type, capacity, pricing, location, description, amenities, image_url } = req.body;
  const hRate = pricing?.hourlyRate || 0;
  const fRate = pricing?.fullDayRate || 0;
  const cancelPolicy = pricing?.cancellationPolicy || 'Standard cancellation rules apply.';
  const locStr = location?.city ? `${location.area || ''}, ${location.city}` : 'Unknown Location';
  
  try {
    const result = await pool.query(
      `INSERT INTO venues (name, type, capacity, price, rating, location, status, description, amenities, cancellation_policy, hourly_rate, full_day_rate, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [name, type, capacity, `₹${fRate || hRate} / day`, 4.5, locStr, 'pending', description || 'No description provided.', amenities || {}, cancelPolicy, hRate, fRate, image_url || ''] 
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing post query', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Venue
app.delete('/api/venues/:id', async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM venues WHERE id = $1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Venue not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin Endpoint: Get pending venues
app.get('/api/admin/venues/pending', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM venues WHERE status = 'pending' ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin Endpoint: Get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role, company_name FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, 
             COALESCE(u.name, 'Unknown User') as user_name, 
             COALESCE(v.name, 'Deleted Venue') as venue_name, 
             v.price as venue_price 
      FROM bookings b 
      LEFT JOIN users u ON b.user_id = u.id 
      LEFT JOIN venues v ON b.venue_id = v.id
      ORDER BY b.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Bookings query error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET single booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, 
             COALESCE(u.name, 'Unknown User') as user_name, 
             COALESCE(v.name, 'Deleted Venue') as venue_name, 
             v.price as venue_price 
      FROM bookings b 
      LEFT JOIN users u ON b.user_id = u.id 
      LEFT JOIN venues v ON b.venue_id = v.id
      WHERE b.id = $1
    `, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Single booking query error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST Booking
app.post('/api/bookings', async (req, res) => {
  const { user_id, venue_id, event_date, guests, total_price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO bookings (user_id, venue_id, event_date, guests, status, total_price) VALUES ($1, $2, $3, $4, 'pending', $5) RETURNING *",
      [user_id, venue_id, event_date, guests, total_price || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Booking Status
app.patch('/api/bookings/:id/status', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin Endpoint: Approve or reject venue
app.patch('/api/admin/venues/:id/status', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE venues SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Venue not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Auth Endpoints
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_me';

// Register User
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role, company_name } = req.body;
  
  try {
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) return res.status(400).json({ error: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password_hash, role, company_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [name, email, password_hash, role || 'user', company_name || null]
    );

    // Create token
    const token = jwt.sign({ id: newUser.rows[0].id, role: newUser.rows[0].role }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, role]);
    
    if (user.rows.length === 0) return res.status(400).json({ error: 'Invalid credentials or role' });

    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email, role: user.rows[0].role } });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  if (!process.env.DATABASE_URL) {
    console.warn('WARNING: DATABASE_URL is not set in .env file.');
  }
});
