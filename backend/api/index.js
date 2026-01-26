// Vercel serverless function - handles all API routes
// This file is the entry point for Vercel serverless functions

const app = require('../server');

// Export the Express app for Vercel
// Vercel will automatically handle the routing
module.exports = app;
