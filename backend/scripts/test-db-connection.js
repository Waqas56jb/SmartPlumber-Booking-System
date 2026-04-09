const {
  sql
} = require('@vercel/postgres');
require('dotenv').config();
async function testConnection() {
  try {
    console.log('test db');
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL missing in env');
      process.exit(1);
    }
    const result = await sql`SELECT NOW() as current_time, version() as postgres_version`;
    console.log('connected');
    console.log('time', result.rows[0].current_time);
    console.log('version', result.rows[0].postgres_version.split(',')[0]);
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log('tables');
    if (tables.rows.length === 0) {
      console.log('none run npm run init-db');
    } else {
      tables.rows.forEach(table => {
        console.log(table.table_name);
      });
    }
    process.exit(0);
  } catch (error) {
    console.error('db failed', error.message);
    console.error('check POSTGRES_URL and database is up');
    process.exit(1);
  }
}
testConnection();
