const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const plumberRoutes = require('./routes/plumberRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const { verifyEmailConfig } = require('./utils/emailService');
const { initializeDatabase } = require('./utils/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware - CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://smart-plumber-booking-system-7cbo.vercel.app',
  'https://smart-plumber-booking-system.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

// CORS middleware - must be first
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Handle OPTIONS requests (preflight)
  if (req.method === 'OPTIONS') {
    if (allowedOrigins.includes(origin) || (origin && origin.includes('vercel.app'))) {
      res.header('Access-Control-Allow-Origin', origin);
    } else {
      res.header('Access-Control-Allow-Origin', '*');
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    return res.sendStatus(204);
  }
  
  // Handle actual requests
  if (allowedOrigins.includes(origin) || (origin && origin.includes('vercel.app'))) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Explicit OPTIONS handler for all routes (must be before other routes)
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || (origin && origin.includes('vercel.app'))) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  return res.sendStatus(204);
});

// Routes
app.use('/api/auth', authRoutes); // Customer routes
app.use('/api/plumber', plumberRoutes); // Plumber routes
app.use('/api/seller', sellerRoutes); // Seller routes
app.use('/api/products', require('./routes/productRoutes')); // Product routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Catch-all route for undefined routes
app.use((req, res) => {
  console.log(`Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// For Vercel serverless functions
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    try {
      // Initialize database
      await initializeDatabase();
      
      // Verify email configuration
      await verifyEmailConfig();
    } catch (error) {
      console.error('❌ Initialization error:', error.message);
      console.error('   Server will continue but some features may not work.');
    }
  });
}
