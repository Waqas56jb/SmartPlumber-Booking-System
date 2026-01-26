# Database Schema for Vercel Postgres

## Quick Reference

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose**: Stores user accounts for signup and login

**Fields**:
- `id` - Auto-incrementing primary key
- `username` - Unique username (3-30 characters)
- `email` - Unique email address (stored in lowercase)
- `password` - Bcrypt hashed password
- `created_at` - Account creation time
- `updated_at` - Last modification time

---

### OTPs Table
```sql
CREATE TABLE otps (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    attempts INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE
);
```

**Purpose**: Stores one-time passwords for password reset

**Fields**:
- `id` - Auto-incrementing primary key
- `email` - User's email address
- `otp` - 6-digit OTP code
- `expires_at` - Expiration timestamp (1 minute from creation)
- `attempts` - Failed verification attempts (max 3)
- `created_at` - OTP creation time
- `is_used` - Whether OTP has been used

---

## Indexes

```sql
-- Fast email lookups (case-insensitive)
CREATE INDEX idx_users_email ON users(LOWER(email));
CREATE INDEX idx_otps_email ON otps(LOWER(email));

-- Fast username lookups (case-insensitive)
CREATE INDEX idx_users_username ON users(LOWER(username));

-- Fast expired OTP cleanup
CREATE INDEX idx_otps_expires_at ON otps(expires_at);
```

---

## Setup Methods

### Method 1: Vercel Dashboard (Recommended)
1. Go to Vercel Dashboard → Your Project → Storage → Postgres
2. Click "SQL Editor"
3. Copy and paste `schema.sql` or `schema-simple.sql`
4. Click "Run"

### Method 2: Command Line Script
```bash
npm run init-db
```

### Method 3: Direct SQL Execution
```bash
psql "your-postgres-connection-string" -f database/schema.sql
```

---

## Data Flow

### Signup Flow
1. User submits: `username`, `email`, `password`
2. System checks: Email and username uniqueness
3. Password is hashed with bcrypt
4. Record inserted into `users` table

### Login Flow
1. User submits: `email` (or username), `password`
2. System queries `users` table by email/username
3. Password verified with bcrypt
4. JWT token generated on success

### Password Reset Flow
1. User submits: `email`
2. System verifies email exists in `users` table
3. OTP generated and stored in `otps` table
4. Email sent with OTP (expires in 1 minute)
5. User submits: `email`, `otp`, `newPassword`
6. System verifies OTP from `otps` table
7. Password updated in `users` table
8. OTP marked as used in `otps` table

---

## Sample Queries

### Insert User
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
VALUES (
    'john@example.com', 
    '123456', 
    CURRENT_TIMESTAMP + INTERVAL '1 minute'
);
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

### Update Password
```sql
UPDATE users 
SET password = '$2a$10$newhashedpassword...', 
    updated_at = CURRENT_TIMESTAMP
WHERE LOWER(email) = LOWER('john@example.com');
```

### Mark OTP as Used
```sql
UPDATE otps 
SET is_used = TRUE 
WHERE LOWER(email) = LOWER('john@example.com') 
  AND otp = '123456';
```

### Cleanup Expired OTPs
```sql
DELETE FROM otps 
WHERE expires_at < CURRENT_TIMESTAMP 
   OR is_used = TRUE;
```

---

## Security Considerations

1. **Passwords**: Always hashed with bcrypt (10 rounds) before storage
2. **Emails**: Stored in lowercase for consistency
3. **OTP Expiration**: 1 minute timeout for security
4. **OTP Attempts**: Limited to 3 failed attempts
5. **Case Insensitivity**: All email/username lookups are case-insensitive
6. **Indexes**: All queries use indexes for performance

---

## Maintenance

### Regular Cleanup (Recommended: Every 5-10 minutes)
```sql
DELETE FROM otps 
WHERE expires_at < CURRENT_TIMESTAMP 
   OR (is_used = TRUE AND created_at < CURRENT_TIMESTAMP - INTERVAL '1 hour');
```

### Monitor Table Sizes
```sql
SELECT 
    'users' as table_name,
    COUNT(*) as row_count,
    pg_size_pretty(pg_total_relation_size('users')) as size
UNION ALL
SELECT 
    'otps' as table_name,
    COUNT(*) as row_count,
    pg_size_pretty(pg_total_relation_size('otps')) as size;
```

---

## Notes

- The current implementation uses in-memory storage for OTPs (see `utils/otpService.js`)
- For production, consider updating `otpService.js` to use the `otps` table instead
- The `users` table is already integrated with Postgres
- All timestamps use `CURRENT_TIMESTAMP` for consistency
