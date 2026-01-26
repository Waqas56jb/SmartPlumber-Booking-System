# SmartPlumber Backend API

Backend API server for SmartPlumber Booking System.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your email credentials:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-app-password-here
     ```

3. **Gmail App Password Setup**
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Go to App Passwords
   - Generate a new app password for "Mail"
   - Use this password in your `.env` file

4. **Start Server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Send OTP for password reset
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password with OTP

### Health Check

- `GET /api/health` - Server health check

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `EMAIL_HOST` - SMTP host (default: smtp.gmail.com)
- `EMAIL_PORT` - SMTP port (default: 587)
- `EMAIL_USER` - Your email address
- `EMAIL_PASSWORD` - Your app password
- `EMAIL_FROM` - From email address
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT expiration time (default: 7d)
- `FRONTEND_URL` - Frontend URL for CORS

## Features

- User registration and authentication
- Password reset with OTP (expires in 1 minute)
- Email notifications via Nodemailer
- JWT token-based authentication
- Input validation
- Secure password hashing with bcrypt
