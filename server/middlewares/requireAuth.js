const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        return res.status(403).json({ error: 'Already logged in' });
    }
    next();
};

module.exports = { isAuthenticated };
