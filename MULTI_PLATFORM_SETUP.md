# Multi-Platform Setup Guide

## Overview

The SmartPlumber Booking System now supports **three separate platforms** with distinct authentication systems:

1. **Customer Platform** - For end users to book plumbers and shop for sanitary products
2. **Plumber Platform** - For professional plumbers to manage their profile and bookings
3. **Seller Platform** - For sanitary goods sellers to manage their online store

## Database Structure

### Separate Tables for Each Platform

#### Customers Table (`users`)
- `id`, `username`, `email`, `password`, `user_type`, `created_at`, `updated_at`
- Variables: `username`, `email`, `password`

#### Plumbers Table (`plumbers`)
- `id`, `plumber_username`, `plumber_email`, `plumber_password`, `plumber_bio`, `plumber_availability`, `plumber_phone`, `plumber_location`, `plumber_rating`, `plumber_total_jobs`, `created_at`, `updated_at`
- Variables: `plumber_username`, `plumber_email`, `plumber_password`

#### Sellers Table (`sellers`)
- `id`, `seller_username`, `seller_email`, `seller_password`, `seller_shop_name`, `seller_phone`, `seller_location`, `seller_rating`, `seller_total_sales`, `created_at`, `updated_at`
- Variables: `seller_username`, `seller_email`, `seller_password`

#### OTPs Table (`otps`)
- `id`, `email`, `otp`, `user_type` (customer/plumber/seller), `expires_at`, `attempts`, `created_at`, `is_used`

## Backend API Endpoints

### Customer Endpoints
- `POST /api/auth/signup` - Customer signup
- `POST /api/auth/login` - Customer login
- `POST /api/auth/forgot-password` - Customer forgot password
- `POST /api/auth/verify-otp` - Customer verify OTP
- `POST /api/auth/reset-password` - Customer reset password

### Plumber Endpoints
- `POST /api/plumber/signup` - Plumber signup
- `POST /api/plumber/login` - Plumber login
- `POST /api/plumber/forgot-password` - Plumber forgot password
- `POST /api/plumber/verify-otp` - Plumber verify OTP
- `POST /api/plumber/reset-password` - Plumber reset password

### Seller Endpoints
- `POST /api/seller/signup` - Seller signup
- `POST /api/seller/login` - Seller login
- `POST /api/seller/forgot-password` - Seller forgot password
- `POST /api/seller/verify-otp` - Seller verify OTP
- `POST /api/seller/reset-password` - Seller reset password

## Frontend Pages

### Customer Pages
- `/login` - CustomerLogin.js
- `/signup` - Signup.js
- `/forgot-password` - ForgotPassword.js
- `/reset-password` - ResetPassword.js

### Plumber Pages
- `/plumber-login` - PlumberLogin.js
- `/plumber-signup` - PlumberSignup.js
- `/plumber-forgot-password` - PlumberForgotPassword.js
- `/plumber-reset-password` - PlumberResetPassword.js

### Seller Pages
- `/seller-login` - SellerLogin.js
- `/seller-signup` - SellerSignup.js
- `/seller-forgot-password` - SellerForgotPassword.js
- `/seller-reset-password` - SellerResetPassword.js

## Variable Naming Convention

### Customer Variables
- `username`, `email`, `password`, `confirmPassword`
- `newPassword`, `confirmPassword` (for reset)

### Plumber Variables
- `plumber_username`, `plumber_email`, `plumber_password`, `confirm_plumber_password`
- `new_plumber_password`, `confirm_plumber_password` (for reset)

### Seller Variables
- `seller_username`, `seller_email`, `seller_password`, `confirm_seller_password`
- `new_seller_password`, `confirm_seller_password` (for reset)

## Authentication Flow

1. **Landing Page** (`/`) - Shows all three platforms
2. User clicks "Login as Customer/Plumber/Seller"
3. Redirects to respective login page
4. After login, redirects to `/home` (protected route)
5. If already logged in, stays in their platform

## Key Features

✅ **Separate Database Tables** - Each platform has its own table
✅ **Distinct Variable Names** - No conflicts between platforms
✅ **Separate API Endpoints** - `/api/auth`, `/api/plumber`, `/api/seller`
✅ **Separate Frontend Pages** - Each platform has its own login/signup/reset pages
✅ **OTP with User Type** - OTPs are stored with user_type to prevent conflicts
✅ **JWT Tokens with User Type** - Tokens include userType for authorization

## Testing

### Test Customer Signup
```bash
POST https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/signup
{
  "username": "customer1",
  "email": "customer@example.com",
  "password": "Customer123",
  "confirmPassword": "Customer123"
}
```

### Test Plumber Signup
```bash
POST https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/signup
{
  "plumber_username": "plumber1",
  "plumber_email": "plumber@example.com",
  "plumber_password": "Plumber123",
  "confirm_plumber_password": "Plumber123"
}
```

### Test Seller Signup
```bash
POST https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/signup
{
  "seller_username": "seller1",
  "seller_email": "seller@example.com",
  "seller_password": "Seller123",
  "confirm_seller_password": "Seller123"
}
```

## Next Steps

1. Deploy backend with updated database schema
2. Test all three platforms separately
3. Implement role-based routing in frontend
4. Create separate dashboard pages for each platform
5. Add profile management for plumbers and sellers
