const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  try {
    console.log('🚀 Starting database initialization...');

    // Check if database connection is available
    if (!process.env.POSTGRES_URL) {
      console.error('❌ POSTGRES_URL is not set in .env file');
      process.exit(1);
    }

    // Read schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await sql.unsafe(statement);
          console.log('✅ Executed:', statement.substring(0, 50) + '...');
        } catch (error) {
          // Ignore "already exists" errors
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            console.log('⚠️  Skipped (already exists):', statement.substring(0, 50) + '...');
          } else {
            console.error('❌ Error executing statement:', error.message);
            console.error('Statement:', statement.substring(0, 100));
          }
        }
      }
    }

    console.log('✅ Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();
