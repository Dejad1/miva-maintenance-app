const jwt = require('jsonwebtoken');

// Middleware to verify if a user is logged in via JWT
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Store token payload (id, name, role) into request state
            next();
        } catch (error) {
            return res.status(401).json({ error: "Not authorized, security token verification failed." });
        }
    }
    if (!token) {
        return res.status(401).json({ error: "Access denied. No authorization token provided." });
    }
};

// Middleware to restrict access based on specific account clearance levels (RBAC)
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: `Access Denied: Your profile role (${req.user?.role || 'Guest'}) does not have permission.` });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };