// Vercel serverless function - handles all API routes
// This file is the entry point for Vercel serverless functions
// Build timestamp: 2026-01-27T18:30:00Z - Fixed plumber services POST route

const app = require('../server');

// Export the Express app for Vercel
// Vercel will automatically handle the routing
module.exports = app;
