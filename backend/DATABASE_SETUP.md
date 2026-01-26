# Database Setup Guide

## Your Database Connection

You're using **Neon Postgres** (compatible with Vercel Postgres). Your connection strings are already configured.

## Quick Setup Steps

### 1. Add Connection Strings to .env

Make sure your `.env` file contains:

```env
# Vercel Postgres / Neon Database
POSTGRES_URL=postgresql://neondb_owner:npg_bXWhY5VG1mRw@ep-red-sun-ahtw66v3-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_bXWhY5VG1mRw@ep-red-sun-ahtw66v3-pooler.c-3.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_bXWhY5VG1mRw@ep-red-sun-ahtw66v3.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2. Test Database Connection

```bash
npm run test-db
```

This will verify:
- ✅ Database connection works
- ✅ Shows existing tables
- ✅ Displays PostgreSQL version

### 3. Initialize Database Tables

```bash
npm run init-db
```

This will create:
- `users` table (for signup/login)
- `otps` table (for password reset)
- All necessary indexes

### 4. Verify Tables Created

Run the test again to see your tables:

```bash
npm run test-db
```

You should see:
```
📊 Existing tables:
   ✓ otps
   ✓ users
```

## Manual Setup (Alternative)

If you prefer to set up manually via Neon Dashboard:

1. Go to your Neon Dashboard
2. Navigate to SQL Editor
3. Copy the contents of `database/schema-simple.sql`
4. Paste and execute

## Database Schema

### Users Table
- Stores user accounts (signup/login)
- Fields: id, username, email, password, created_at, updated_at

### OTPs Table
- Stores password reset OTPs
- Fields: id, email, otp, expires_at, attempts, created_at, is_used

## Troubleshooting

### Connection Error?
- Verify `POSTGRES_URL` is correct in `.env`
- Check that your Neon database is active
- Ensure SSL mode is set to `require`

### Tables Not Created?
- Run `npm run init-db` again
- Check for error messages in console
- Verify you have write permissions

### Connection Timeout?
- Use `POSTGRES_URL_NON_POOLING` for direct connections
- Check your network/firewall settings

## Next Steps

Once database is set up:
1. ✅ Test connection: `npm run test-db`
2. ✅ Initialize tables: `npm run init-db`
3. ✅ Start server: `npm start`
4. ✅ Test API endpoints

Your database is ready! 🎉
