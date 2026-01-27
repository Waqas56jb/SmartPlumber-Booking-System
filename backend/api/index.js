// Vercel serverless function - handles all API routes
// This file is the entry point for Vercel serverless functions
// Build timestamp: 2026-01-27T13:00:00Z - Force redeploy

const app = require('../server');

// Export the Express app for Vercel
// Vercel will automatically handle the routing
module.exports = app;
