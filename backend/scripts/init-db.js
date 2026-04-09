const {
  sql
} = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
// i replay schema.sql statement by statement so neon accepts the full dump
async function initializeDatabase() {
  try {
    console.log('init db');
    if (!process.env.POSTGRES_URL) {
      console.error('POSTGRES_URL missing');
      process.exit(1);
    }
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0 && !s.startsWith('--'));
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await sql.unsafe(statement);
          console.log('ok', statement.substring(0, 50));
        } catch (error) {
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            console.log('skip exists', statement.substring(0, 50));
          } else {
            console.error('sql error', error.message);
            console.error(statement.substring(0, 100));
          }
        }
      }
    }
    console.log('done');
    process.exit(0);
  } catch (error) {
    console.error('init failed', error);
    process.exit(1);
  }
}
initializeDatabase();
