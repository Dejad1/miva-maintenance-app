const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error acquiring database client:', err.stack);
    }
    console.log('✅ Connected successfully to the PostgreSQL Database engine.');
    release();
});

module.exports = { app, pool };

// Import Custom App Handlers and Security Policies
const { registerUser, loginUser } = require('./authController');
const { createRequest, getRequests, assignRequest, updateStatus } = require('./requestController');
const { protect, authorizeRoles } = require('./authMiddleware');

// --- APPLICATION EXPOSED API ROUTINGS ---
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

app.post('/api/requests', protect, authorizeRoles('Student/Staff'), createRequest);
app.get('/api/requests', protect, getRequests);
app.post('/api/admin/assign', protect, authorizeRoles('Admin'), assignRequest);
app.put('/api/requests/:id/status', protect, authorizeRoles('Maintenance Officer'), updateStatus);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to MIVA Open University Maintenance Request API" });
});

app.listen(PORT, () => {
    console.log(`🚀 Complete System routes loaded! Server listening on port: ${PORT}`);
});