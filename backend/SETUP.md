# Backend Setup Guide

## Quick Start

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

4. **Configure .env file**
   
   Open `.env` and add your credentials:
   ```
   # Admin Email (Gmail) - Used for sending OTP emails
   EMAIL_USER=your-admin-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   
   # Vercel Postgres Database
   POSTGRES_URL=your-vercel-postgres-connection-string
   POSTGRES_PRISMA_URL=your-vercel-postgres-prisma-url
   POSTGRES_URL_NON_POOLING=your-vercel-postgres-non-pooling-url
   ```

5. **Get Gmail App Password**
   
   - Go to https://myaccount.google.com/
   - Click on "Security" in the left sidebar
   - Enable "2-Step Verification" if not already enabled
   - Go to "App passwords" (search for it if not visible)
   - Select "Mail" as the app and "Other" as the device
   - Enter a name like "SmartPlumber Backend"
   - Copy the generated 16-character password
   - Paste it in your `.env` file as `EMAIL_PASSWORD` (no spaces)

6. **Get Vercel Postgres Connection Strings**
   
   - Go to your Vercel dashboard
   - Navigate to your project → Storage → Postgres
   - Copy the connection strings:
     - `POSTGRES_URL` (pooled connection)
     - `POSTGRES_PRISMA_URL` (for Prisma)
     - `POSTGRES_URL_NON_POOLING` (direct connection)
   - Paste them in your `.env` file

7. **Start the server**
   ```bash
   npm start
   # OR for development with auto-reload:
   npm run dev
   ```

## How It Works

1. **Email Verification**: When a user requests password reset, the system first checks if their email exists in the Vercel Postgres database.

2. **OTP Generation**: If email exists, a 6-digit OTP is generated and stored (expires in 1 minute).

3. **Email Sending**: The OTP is sent from your admin email (configured in `.env`) to the user's email address.

4. **Password Reset**: User must enter the correct OTP to proceed with password reset.

## API Endpoints

### Signup
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

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
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123"
}
```

### Forgot Password (Send OTP)
```bash
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "test@example.com"
}
```
**Note**: This will only send OTP if the email exists in the database.

### Verify OTP
```bash
POST http://localhost:5000/api/auth/verify-otp
Content-Type: application/json

{
  "email": "test@example.com",
  "otp": "123456"
}
```

### Reset Password
```bash
POST http://localhost:5000/api/auth/reset-password
Content-Type: application/json

{
  "email": "test@example.com",
  "otp": "123456",
  "newPassword": "NewPass123",
  "confirmPassword": "NewPass123"
}
```

## Important Notes

- **OTP Expiration**: OTPs expire after 1 minute (60 seconds)
- **OTP Attempts**: Maximum 3 failed attempts before OTP is invalidated
- **Email Verification**: OTP is only sent if the email exists in the database
- **Admin Email**: All emails are sent from your admin email (configured in `.env`)
- **Password Requirements**: 
  - Minimum 6 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- **Database**: Uses Vercel Postgres for user storage

## Troubleshooting

### Email not sending?
- Check that `EMAIL_USER` and `EMAIL_PASSWORD` are set correctly in `.env` (no spaces)
- Verify that 2-Step Verification is enabled on your Google account
- Make sure you're using an App Password, not your regular Gmail password
- Check server logs for error messages

### Database connection errors?
- Verify your Vercel Postgres connection strings are correct
- Make sure all three connection strings are set in `.env`
- Check that your Vercel Postgres database is active

### Port already in use?
- Change `PORT` in `.env` to a different port (e.g., 5001)
- Or stop the process using port 5000

### CORS errors?
- Make sure `FRONTEND_URL` in `.env` matches your frontend URL
- Default is `http://localhost:3000`
