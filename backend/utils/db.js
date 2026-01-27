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

    // Create users table (for customers) if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        user_type VARCHAR(20) DEFAULT 'customer' CHECK (user_type IN ('customer', 'plumber', 'seller')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create plumbers table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS plumbers (
        id SERIAL PRIMARY KEY,
        plumber_username VARCHAR(30) UNIQUE NOT NULL,
        plumber_email VARCHAR(255) UNIQUE NOT NULL,
        plumber_password VARCHAR(255) NOT NULL,
        plumber_bio TEXT,
        plumber_availability TEXT,
        plumber_phone VARCHAR(20),
        plumber_location VARCHAR(255),
        plumber_rating DECIMAL(3,2) DEFAULT 0.00,
        plumber_total_jobs INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create sellers table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS sellers (
        id SERIAL PRIMARY KEY,
        seller_username VARCHAR(30) UNIQUE NOT NULL,
        seller_email VARCHAR(255) UNIQUE NOT NULL,
        seller_password VARCHAR(255) NOT NULL,
        seller_shop_name VARCHAR(255),
        seller_phone VARCHAR(20),
        seller_location VARCHAR(255),
        seller_rating DECIMAL(3,2) DEFAULT 0.00,
        seller_total_sales INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create plumber_services table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS plumber_services (
        id SERIAL PRIMARY KEY,
        plumber_id INTEGER NOT NULL REFERENCES plumbers(id) ON DELETE CASCADE,
        service_name VARCHAR(255) NOT NULL,
        service_description TEXT,
        price DECIMAL(10, 2),
        price_type VARCHAR(20) DEFAULT 'hourly',
        duration_hours DECIMAL(4, 2),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create OTPs table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS otps (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('customer', 'plumber', 'seller')),
        expires_at TIMESTAMP NOT NULL,
        attempts INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_used BOOLEAN DEFAULT FALSE
      )
    `;

    // Create indexes for users table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(LOWER(email))
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(LOWER(username))
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type)
    `;

    // Create indexes for plumbers table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_plumbers_email ON plumbers(LOWER(plumber_email))
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_plumbers_username ON plumbers(LOWER(plumber_username))
    `;

    // Create indexes for sellers table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sellers_email ON sellers(LOWER(seller_email))
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sellers_username ON sellers(LOWER(seller_username))
    `;

    // Create indexes for plumber_services table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_plumber_services_plumber_id ON plumber_services(plumber_id)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_plumber_services_is_active ON plumber_services(is_active)
    `;

    // Create indexes for OTPs table
    await sql`
      CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(LOWER(email))
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_otps_type ON otps(user_type)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps(expires_at)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_otps_is_used ON otps(is_used)
    `;

    console.log('✅ Database initialized successfully');
    console.log('   ✓ users table created (customers)');
    console.log('   ✓ plumbers table created');
    console.log('   ✓ sellers table created');
    console.log('   ✓ plumber_services table created');
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
