// Vercel serverless function - handles all API routes
// This file is the entry point for Vercel serverless functions
// Build timestamp: 2026-01-27T14:00:00Z - Simplified profile update controller

const app = require('../server');

// Export the Express app for Vercel
// Vercel will automatically handle the routing
module.exports = app;
