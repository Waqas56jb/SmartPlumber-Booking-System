const { sql } = require('@vercel/postgres');

// Helper function to run SQL with error handling
const runSQL = async (query, description) => {
  try {
    await query;
    return true;
  } catch (error) {
    console.warn(`   ⚠️  ${description}: ${error.message}`);
    return false;
  }
};

// Initialize database tables
const initializeDatabase = async () => {
  // Check if database connection is available
  if (!process.env.POSTGRES_URL) {
    console.warn('⚠️  POSTGRES_URL is not set. Database operations will fail.');
    console.warn('   Please set POSTGRES_URL in your .env file.');
    return false;
  }

  if (process.env.DEBUG_LOGS === 'true') {
    console.log('🔄 Initializing database tables...');
  }

  // Create users table (for customers) if it doesn't exist
  await runSQL(sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(30) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, 'Creating users table');

  // Create plumbers table if it doesn't exist
  await runSQL(sql`
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
  `, 'Creating plumbers table');

  // Create sellers table if it doesn't exist
  await runSQL(sql`
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
  `, 'Creating sellers table');

  // Create plumber_services table if it doesn't exist
  await runSQL(sql`
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
  `, 'Creating plumber_services table');

  // Create products table if it doesn't exist
  await runSQL(sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      seller_id INTEGER NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
      product_name VARCHAR(255) NOT NULL,
      product_description TEXT,
      product_category VARCHAR(100),
      product_brand VARCHAR(100),
      product_model VARCHAR(100),
      sku VARCHAR(100) UNIQUE,
      price DECIMAL(10, 2) NOT NULL,
      original_price DECIMAL(10, 2),
      discount_percentage DECIMAL(5, 2) DEFAULT 0,
      discount_amount DECIMAL(10, 2) DEFAULT 0,
      currency VARCHAR(10) DEFAULT 'GBP',
      stock_quantity INTEGER DEFAULT 0,
      min_order_quantity INTEGER DEFAULT 1,
      max_order_quantity INTEGER,
      weight_kg DECIMAL(8, 2),
      dimensions VARCHAR(100),
      material VARCHAR(100),
      color VARCHAR(50),
      warranty_period_months INTEGER,
      delivery_time_hours INTEGER,
      shipping_charges DECIMAL(10, 2) DEFAULT 0,
      product_rating DECIMAL(3, 2) DEFAULT 0,
      total_reviews INTEGER DEFAULT 0,
      total_sales INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      is_featured BOOLEAN DEFAULT FALSE,
      is_in_stock BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, 'Creating products table');

  // Create OTPs table if it doesn't exist
  await runSQL(sql`
    CREATE TABLE IF NOT EXISTS otps (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      otp VARCHAR(6) NOT NULL,
      user_type VARCHAR(20) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      attempts INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_used BOOLEAN DEFAULT FALSE
    )
  `, 'Creating otps table');

  // Create indexes (these are safe to run multiple times)
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(LOWER(email))`, 'Creating users email index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_users_username ON users(LOWER(username))`, 'Creating users username index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_plumbers_email ON plumbers(LOWER(plumber_email))`, 'Creating plumbers email index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_plumbers_username ON plumbers(LOWER(plumber_username))`, 'Creating plumbers username index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_sellers_email ON sellers(LOWER(seller_email))`, 'Creating sellers email index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_sellers_username ON sellers(LOWER(seller_username))`, 'Creating sellers username index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_plumber_services_plumber_id ON plumber_services(plumber_id)`, 'Creating plumber_services plumber_id index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_plumber_services_is_active ON plumber_services(is_active)`, 'Creating plumber_services is_active index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id)`, 'Creating products seller_id index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_products_category ON products(product_category)`, 'Creating products category index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active)`, 'Creating products is_active index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(LOWER(email))`, 'Creating otps email index');
  await runSQL(sql`CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps(expires_at)`, 'Creating otps expires_at index');

  if (process.env.DEBUG_LOGS === 'true') {
    console.log('✅ Database initialization complete');
  }
  return true;
};

module.exports = {
  sql,
  initializeDatabase
};
