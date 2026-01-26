# Quick Start Guide

## Step 1: Configure .env File

Add these to your `backend/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Admin Email Configuration (Gmail) - Used for sending OTP emails
EMAIL_USER=your-admin-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password-here

# Vercel Postgres / Neon Database Connection
POSTGRES_URL=postgresql://neondb_owner:npg_bXWhY5VG1mRw@ep-red-sun-ahtw66v3-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_bXWhY5VG1mRw@ep-red-sun-ahtw66v3-pooler.c-3.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_bXWhY5VG1mRw@ep-red-sun-ahtw66v3.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## Step 2: Install Dependencies

```bash
cd backend
npm install
```

## Step 3: Test Database Connection

```bash
npm run test-db
```

Expected output:
```
✅ Database connection successful!
📅 Current time: 2026-01-27T...
🐘 PostgreSQL version: PostgreSQL 15.x
```

## Step 4: Initialize Database Tables

```bash
npm run init-db
```

This creates:
- ✅ `users` table (for signup/login)
- ✅ `otps` table (for password reset)
- ✅ All necessary indexes

## Step 5: Configure Email (Gmail)

1. Go to https://myaccount.google.com/
2. Security → 2-Step Verification (enable if not already)
3. App Passwords → Generate new password
4. Copy the 16-character password
5. Add to `.env`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

## Step 6: Start Server

```bash
npm start
# OR for development:
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
📦 Environment: development
✅ Database initialized successfully
   ✓ users table created
   ✓ otps table created
   ✓ Indexes created
✅ Email configuration verified successfully
   Admin email: your-email@gmail.com
```

## Step 7: Test API Endpoints

### Signup
```bash
POST http://localhost:5000/api/auth/signup
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Test123",
  "confirmPassword": "Test123"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "Test123"
}
```

### Forgot Password (Send OTP)
```bash
POST http://localhost:5000/api/auth/forgot-password
{
  "email": "test@example.com"
}
```

## Troubleshooting

### Database Connection Failed?
- ✅ Verify `POSTGRES_URL` is correct in `.env`
- ✅ Check Neon dashboard - database should be active
- ✅ Run `npm run test-db` to diagnose

### Email Not Sending?
- ✅ Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- ✅ Use Gmail App Password (not regular password)
- ✅ Enable 2-Step Verification first

### Tables Not Created?
- ✅ Run `npm run init-db` again
- ✅ Check console for error messages
- ✅ Verify database permissions

## Your Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password` - Bcrypt hashed
- `created_at` - Timestamp
- `updated_at` - Auto-updated timestamp

### OTPs Table
- `id` - Primary key
- `email` - User email
- `otp` - 6-digit code
- `expires_at` - 1 minute expiry
- `attempts` - Failed attempts counter
- `is_used` - Usage flag

Everything is ready! 🚀
