const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = asyncHandler(async (req, res, next) => {
    // Define an array of route and method combinations that should be excluded from token validation
    const excludedRoutes = [
        { path: '/users/login', method: 'POST' },
        { path: '/users', method: 'POST' },
        { path: '/users/:userId', method: 'GET' },
        { path: '/cart/:userId', method: 'GET' },
        { path: '/cart/:userId', method: 'PUT' },

        // Add more entries as needed
    ];

    // Check if the current route and method combination is in the excludedRoutes array
    const isExcluded = excludedRoutes.some(
        route => route.path === req.path && route.method === req.method
    );

    if (isExcluded) {
        return next(); // Skip token validation for this route and method
    }

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Authorization header is missing or invalid" });
    }

    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "User is not authorized" });
        }

        req.user = decoded.user;
        next();
    });
});

module.exports = validateToken;
