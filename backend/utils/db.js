const { sql } = require('@vercel/postgres');

// Initialize database tables
const initializeDatabase = async () => {
  try {
    // Check if database connection is available
    if (!process.env.POSTGRES_URL) {
      console.warn('⚠️  POSTGRES_URL is not set. Database operations will fail.');
      console.warn('   Please set POSTGRES_URL in your .env file.');
      return false;
    }

    // Create users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create index on email for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `;

    // Create index on username for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(LOWER(username))
    `;

    // Create index on email for faster lookups (case-insensitive)
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email_lower ON users(LOWER(email))
    `;

    // Create OTPs table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS otps (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        attempts INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_used BOOLEAN DEFAULT FALSE
      )
    `;

    // Create indexes for OTPs table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(LOWER(email))
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps(expires_at)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_otps_is_used ON otps(is_used)
    `;

    console.log('✅ Database initialized successfully');
    console.log('   ✓ users table created');
    console.log('   ✓ otps table created');
    console.log('   ✓ Indexes created');
    return true;
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    console.error('   Please check your Vercel Postgres connection strings in .env');
    return false;
  }
};

module.exports = {
  sql,
  initializeDatabase
};
