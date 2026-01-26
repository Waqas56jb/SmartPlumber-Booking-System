const { sql } = require('@vercel/postgres');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    if (!process.env.POSTGRES_URL) {
      console.error('❌ POSTGRES_URL is not set in .env file');
      process.exit(1);
    }

    // Test basic connection
    const result = await sql`SELECT NOW() as current_time, version() as postgres_version`;
    
    console.log('✅ Database connection successful!');
    console.log('📅 Current time:', result.rows[0].current_time);
    console.log('🐘 PostgreSQL version:', result.rows[0].postgres_version.split(',')[0]);
    
    // Check if tables exist
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    console.log('\n📊 Existing tables:');
    if (tables.rows.length === 0) {
      console.log('   No tables found. Run "npm run init-db" to create tables.');
    } else {
      tables.rows.forEach(table => {
        console.log(`   ✓ ${table.table_name}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your POSTGRES_URL in .env file');
    console.error('   2. Verify your database is active in Vercel/Neon dashboard');
    console.error('   3. Check network connectivity');
    process.exit(1);
  }
}

testConnection();
