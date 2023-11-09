const validateToken = require("./middleware/tokenValidationMiddleware");

const ROUTES = [
    {
        url: '/products',
        auth: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002/products",
            changeOrigin: true,
            pathRewrite: {
                [`^/products`]: '',
            },
        }
    },
    {
        url: '/filter',
        auth: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002/filter",
            changeOrigin: true,
            pathRewrite: {
                [`^/filter`]: '',
            },
        }
    },
    {
        url: '/payment',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        middleware: [validateToken], // Add validateToken middleware for authentication
        proxy: {
            target: "http://localhost:3004/payment",
            changeOrigin: true,
            pathRewrite: {
                [`^/payment`]: '',
            },
        }
    },
    {
        url: '/cart',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        middleware: [validateToken], // Add validateToken middleware for authentication
        proxy: {
            target: "http://localhost:3003/cart",
            changeOrigin: true,
            pathRewrite: {
                [`^/cart`]: '',
            },
        }
    },
    {
        url: '/users',
        auth: true,
        middleware: [validateToken], // Add validateToken middleware for authentication
        proxy: {
            target: "http://localhost:3001/users",
            changeOrigin: true,
            pathRewrite: {
                [`^/users`]: '',
            },
        }
    }
];

exports.ROUTES = ROUTES;
