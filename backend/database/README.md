# Database Schema Documentation

## Overview
This schema is designed for the SmartPlumber Booking System authentication system using Vercel Postgres.

## Tables

### 1. Users Table
Stores user account information for signup and login.

**Columns:**
- `id` (SERIAL PRIMARY KEY) - Auto-incrementing unique identifier
- `username` (VARCHAR(30) UNIQUE NOT NULL) - Unique username (3-30 characters)
- `email` (VARCHAR(255) UNIQUE NOT NULL) - Unique email address (lowercase)
- `password` (VARCHAR(255) NOT NULL) - Bcrypt hashed password
- `created_at` (TIMESTAMP) - Account creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp (auto-updated)

**Indexes:**
- `idx_users_email` - Fast email lookups (case-insensitive)
- `idx_users_username` - Fast username lookups (case-insensitive)

**Constraints:**
- Username must be unique
- Email must be unique
- Both username and email are required

### 2. OTPs Table
Stores one-time passwords for password reset functionality.

**Columns:**
- `id` (SERIAL PRIMARY KEY) - Auto-incrementing unique identifier
- `email` (VARCHAR(255) NOT NULL) - User's email address
- `otp` (VARCHAR(6) NOT NULL) - 6-digit OTP code
- `expires_at` (TIMESTAMP NOT NULL) - OTP expiration time (1 minute from creation)
- `attempts` (INTEGER DEFAULT 0) - Number of failed verification attempts
- `created_at` (TIMESTAMP) - OTP creation timestamp
- `is_used` (BOOLEAN DEFAULT FALSE) - Whether OTP has been used

**Indexes:**
- `idx_otps_email` - Fast email lookups for OTP retrieval
- `idx_otps_expires_at` - Fast queries for expired OTP cleanup
- `idx_otps_is_used` - Fast queries for used OTP filtering

**Features:**
- OTP expires after 1 minute
- Maximum 3 failed attempts before OTP is invalidated
- OTP marked as used after successful password reset

## Database Functions

### 1. update_updated_at_column()
Automatically updates the `updated_at` timestamp when a user record is modified.

### 2. cleanup_expired_otps()
Removes expired OTPs from the database. Can be called periodically via cron job.

## Setup Instructions

### Option 1: Using Vercel Dashboard
1. Go to your Vercel project dashboard
2. Navigate to Storage → Postgres
3. Open the SQL Editor
4. Copy and paste the contents of `schema.sql`
5. Execute the SQL

### Option 2: Using psql Command Line
```bash
# Connect to your Vercel Postgres database
psql "your-postgres-connection-string"

# Run the schema file
\i schema.sql
```

### Option 3: Using Node.js Script
```bash
# Run the initialization script
node scripts/init-db.js
```

## Sample Queries

### Create a User
```sql
INSERT INTO users (username, email, password)
VALUES ('john_doe', 'john@example.com', '$2a$10$hashedpassword...');
```

### Find User by Email
```sql
SELECT * FROM users WHERE LOWER(email) = LOWER('john@example.com');
```

### Create OTP
```sql
INSERT INTO otps (email, otp, expires_at)
VALUES ('john@example.com', '123456', CURRENT_TIMESTAMP + INTERVAL '1 minute');
```

### Verify OTP
```sql
SELECT * FROM otps 
WHERE LOWER(email) = LOWER('john@example.com') 
  AND otp = '123456'
  AND expires_at > CURRENT_TIMESTAMP
  AND is_used = FALSE
  AND attempts < 3;
```

### Cleanup Expired OTPs
```sql
SELECT cleanup_expired_otps();
-- OR
DELETE FROM otps WHERE expires_at < CURRENT_TIMESTAMP;
```

## Maintenance

### Regular Cleanup
Set up a cron job or scheduled task to run:
```sql
SELECT cleanup_expired_otps();
```

This should run every 5-10 minutes to keep the database clean.

### Monitor Table Sizes
```sql
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Security Notes

1. **Password Storage**: Passwords are hashed using bcrypt (10 rounds) before storage
2. **Email Storage**: Emails are stored in lowercase for consistency
3. **OTP Expiration**: OTPs expire after 1 minute for security
4. **OTP Attempts**: Limited to 3 failed attempts before invalidation
5. **Indexes**: All lookups use indexes for performance
6. **Case Insensitivity**: Email and username lookups are case-insensitive

## Migration Notes

If you need to modify the schema later:

1. Always backup your database first
2. Test migrations on a development database
3. Use transactions for multiple changes
4. Update the application code accordingly

Example migration:
```sql
BEGIN;

-- Add new column
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- Create index
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

COMMIT;
```
