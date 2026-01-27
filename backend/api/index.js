// Vercel serverless function - handles all API routes
// This file is the entry point for Vercel serverless functions
// Build timestamp: 2026-01-27T19:00:00Z - Added plumber_services table to DB init

const app = require('../server');

// Export the Express app for Vercel
// Vercel will automatically handle the routing
module.exports = app;
