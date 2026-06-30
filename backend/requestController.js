const { pool } = require('./server');

// 1. FILE NEW COMPLAINT (Student / Staff)
const createRequest = async (req, res) => {
    const { title, description, category_name } = req.body;
    try {
        const categoryQuery = await pool.query('SELECT id FROM request_categories WHERE name = $1', [category_name]);
        if (categoryQuery.rows.length === 0) {
            return res.status(400).json({ error: "Specified maintenance category does not exist." });
        }
        const category_id = categoryQuery.rows[0].id;

        // Advanced Feature placeholder path for uploaded image evidence files
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        const newRequest = await pool.query(
            'INSERT INTO service_requests (title, description, category_id, created_by, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, category_id, req.user.id, image_url]
        );

        // Log baseline status movement trail
        await pool.query('INSERT INTO status_logs (request_id, status, changed_by, notes) VALUES ($1, $2, $3, $4)',
            [newRequest.rows[0].id, 'Pending', req.user.id, 'Complaint submitted into system queue.']
        );

        res.status(201).json({ message: "Maintenance request logged successfully!", data: newRequest.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to process complaint creation entry." });
    }
};

// 2. VIEW SERVICE REQUESTS (Tailored UI Filters)
const getRequests = async (req, res) => {
    try {
        let requests;
        if (req.user.role === 'Admin') {
            // Admins overview all requests globally
            requests = await pool.query('SELECT sr.*, c.name as category_name, u.name as requester FROM service_requests sr JOIN request_categories c ON sr.category_id = c.id JOIN users u ON sr.created_by = u.id ORDER BY sr.created_at DESC');
        } else if (req.user.role === 'Maintenance Officer') {
            // Officers only see cases explicitly mapped to their profile queue
            requests = await pool.query('SELECT sr.*, c.name as category_name FROM service_requests sr JOIN request_categories c ON sr.category_id = c.id JOIN assignments a ON sr.id = a.request_id WHERE a.officer_id = $1 ORDER BY sr.created_at DESC', [req.user.id]);
        } else {
            // Students see only their own logged history
            requests = await pool.query('SELECT sr.*, c.name as category_name FROM service_requests sr JOIN request_categories c ON sr.category_id = c.id WHERE sr.created_by = $1 ORDER BY sr.created_at DESC', [req.user.id]);
        }
        res.json(requests.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to fetch request logs records." });
    }
};

// 3. ASSIGN TASK TO OFFICER (Admin Control)
const assignRequest = async (req, res) => {
    const { request_id, officer_id } = req.body;
    try {
        // Insert assignment detail record
        await pool.query('INSERT INTO assignments (request_id, officer_id, assigned_by) VALUES ($1, $2, $3)', [request_id, officer_id, req.user.id]);
        
        // Advance request state to 'Assigned'
        await pool.query('UPDATE service_requests SET status = $1 WHERE id = $2', ['Assigned', request_id]);
        
        // Log transaction historical trail
        await pool.query('INSERT INTO status_logs (request_id, status, changed_by, notes) VALUES ($1, $2, $3, $4)', [request_id, 'Assigned', req.user.id, `Task mapped directly to Officer ID: ${officer_id}`]);

        res.json({ message: "Maintenance request mapped and routed successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to compile assignment link configuration." });
    }
};

// 4. UPDATE COMPLAINT STATUS PROGRESSION (Maintenance Officer Control)
const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body; // Expects: 'In Progress' or 'Completed'
    try {
        await pool.query('UPDATE service_requests SET status = $1 WHERE id = $2', [status, id]);
        await pool.query('INSERT INTO status_logs (request_id, status, changed_by, notes) VALUES ($1, $2, $3, $4)', [id, status, req.user.id, notes || `Status updated by field technical team.`]);
        
        res.json({ message: `Progress updated state successfully moved to: ${status}` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to write status modification log entry." });
    }
};

module.exports = { createRequest, getRequests, assignRequest, updateStatus };