const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('./server');

// 1. REGISTER NEW USER
const registerUser = async (req, res) => {
    const { name, email, password, role_name } = req.body;
    try {
        if (!name || !email || !password || !role_name) {
            return res.status(400).json({ error: "Please fill all required registration fields." });
        }

        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "A user with this email address already exists." });
        }

        // Fetch the corresponding role ID from the database
        const roleQuery = await pool.query('SELECT id FROM roles WHERE name = $1', [role_name]);
        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ error: "Invalid account role specified." });
        }
        const role_id = roleQuery.rows[0].id;

        // Securely hash user password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Save user into database
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING id, name, email',
            [name, email, password_hash, role_id]
        );

        res.status(201).json({ message: "User registered successfully!", user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error occurred during account registration." });
    }
};

// 2. LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide both email and password." });
        }

        // Fetch user details along with their explicit role name
        const userQuery = await pool.query(
            'SELECT u.*, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = $1',
            [email]
        );

        if (userQuery.rows.length === 0) {
            return res.status(401).json({ error: "Invalid account login credentials." });
        }

        const user = userQuery.rows[0];

        // Check password matching
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid account login credentials." });
        }

        // Sign and issue security token
        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role_name },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: "Login successful!",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role_name }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error occurred during verification." });
    }
};

module.exports = { registerUser, loginUser };