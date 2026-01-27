# Complete API Documentation - Plumber & Seller

**Base URL:** `https://smart-plumber-booking-system-7cbo.vercel.app`

---

## 🔧 PLUMBER APIs

### 1. Plumber Signup
**URL:** `POST /api/plumber/signup`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/signup`

**Request Body:**
```json
{
  "plumber_username": "john_plumber",
  "plumber_email": "john@example.com",
  "plumber_password": "Password123",
  "confirm_plumber_password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Plumber account created successfully",
  "data": {
    "plumber": {
      "id": 1,
      "plumber_username": "john_plumber",
      "plumber_email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

### 2. Plumber Login
**URL:** `POST /api/plumber/login`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/login`

**Request Body:**
```json
{
  "plumber_email": "john@example.com",
  "plumber_password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Plumber login successful",
  "data": {
    "plumber": {
      "id": 1,
      "plumber_username": "john_plumber",
      "plumber_email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

### 3. Plumber Forgot Password
**URL:** `POST /api/plumber/forgot-password`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/forgot-password`

**Request Body:**
```json
{
  "plumber_email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your plumber email address"
}
```

---

### 4. Plumber Verify OTP
**URL:** `POST /api/plumber/verify-otp`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/verify-otp`

**Request Body:**
```json
{
  "plumber_email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

---

### 5. Plumber Reset Password
**URL:** `POST /api/plumber/reset-password`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/reset-password`

**Request Body:**
```json
{
  "plumber_email": "john@example.com",
  "otp": "123456",
  "new_plumber_password": "NewPassword123",
  "confirm_plumber_password": "NewPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Plumber password reset successfully"
}
```

---

### 6. Get Plumber Profile
**URL:** `GET /api/plumber/profile/:id`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/profile/1`

**Request Body:** None (ID in URL)

**Response:**
```json
{
  "success": true,
  "data": {
    "plumber": {
      "id": 1,
      "plumber_username": "john_plumber",
      "plumber_email": "john@example.com",
      "full_name": "John Smith",
      "plumber_bio": "Experienced plumber",
      "phone_number": "+44 7700 900123",
      "email": "john@example.com",
      "per_hour_charges": "35.00",
      "currency": "GBP",
      "experience_years": 10,
      "certifications": ["Gas Safe Registered"],
      "specializations": ["Emergency Plumbing", "Boiler Installation"],
      "is_available": true,
      ...
    }
  }
}
```

---

### 7. Update Plumber Profile
**URL:** `PUT /api/plumber/profile/:id`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/profile/1`

**Request Body (All fields optional - only send fields you want to update):**
```json
{
  "full_name": "John Smith",
  "plumber_bio": "Experienced plumber with 10+ years in the industry",
  "plumber_thumbnail_photo": "https://example.com/photo.jpg",
  "phone_number": "+44 7700 900123",
  "email": "john.smith@example.com",
  "cnic": "12345-1234567-1",
  "location_address": "123 Main Street",
  "city": "London",
  "state": "Greater London",
  "zip_code": "SW1A 1AA",
  "country": "UK",
  "latitude": 51.5074,
  "longitude": -0.1278,
  "per_hour_charges": 35.00,
  "currency": "GBP",
  "minimum_charge": 50.00,
  "experience_years": 10,
  "license_number": "PL123456",
  "certifications": ["Gas Safe Registered", "City & Guilds Level 3"],
  "specializations": ["Emergency Plumbing", "Boiler Installation", "Heating Systems"],
  "is_available": true,
  "availability_schedule": {
    "monday": {"start": "09:00", "end": "17:00", "available": true},
    "tuesday": {"start": "09:00", "end": "17:00", "available": true},
    "wednesday": {"start": "09:00", "end": "17:00", "available": true},
    "thursday": {"start": "09:00", "end": "17:00", "available": true},
    "friday": {"start": "09:00", "end": "17:00", "available": true},
    "saturday": {"start": "10:00", "end": "14:00", "available": true},
    "sunday": {"start": "10:00", "end": "14:00", "available": false}
  }
}
```

**Minimal Update Example:**
```json
{
  "full_name": "John Smith",
  "phone_number": "+44 7700 900123",
  "email": "john@example.com",
  "per_hour_charges": 35.00,
  "experience_years": 10,
  "is_available": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Plumber profile updated successfully",
  "data": {
    "plumber": {
      "id": 1,
      "full_name": "John Smith",
      ...
    }
  }
}
```

---

## 🏪 SELLER APIs

### 1. Seller Signup
**URL:** `POST /api/seller/signup`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/signup`

**Request Body:**
```json
{
  "seller_username": "shop_owner",
  "seller_email": "shop@example.com",
  "seller_password": "Password123",
  "confirm_seller_password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Seller account created successfully",
  "data": {
    "seller": {
      "id": 1,
      "seller_username": "shop_owner",
      "seller_email": "shop@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

### 2. Seller Login
**URL:** `POST /api/seller/login`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/login`

**Request Body:**
```json
{
  "seller_email": "shop@example.com",
  "seller_password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Seller login successful",
  "data": {
    "seller": {
      "id": 1,
      "seller_username": "shop_owner",
      "seller_email": "shop@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

---

### 3. Seller Forgot Password
**URL:** `POST /api/seller/forgot-password`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/forgot-password`

**Request Body:**
```json
{
  "seller_email": "shop@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your seller email address"
}
```

---

### 4. Seller Verify OTP
**URL:** `POST /api/seller/verify-otp`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/verify-otp`

**Request Body:**
```json
{
  "seller_email": "shop@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

---

### 5. Seller Reset Password
**URL:** `POST /api/seller/reset-password`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/reset-password`

**Request Body:**
```json
{
  "seller_email": "shop@example.com",
  "otp": "123456",
  "new_seller_password": "NewPassword123",
  "confirm_seller_password": "NewPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Seller password reset successfully"
}
```

---

### 6. Get Seller Profile
**URL:** `GET /api/seller/profile/:id`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/profile/1`

**Request Body:** None (ID in URL)

**Response:**
```json
{
  "success": true,
  "data": {
    "seller": {
      "id": 1,
      "seller_username": "shop_owner",
      "seller_email": "shop@example.com",
      "seller_shop_name": "ABC Plumbing Supplies",
      "seller_bio": "Quality plumbing supplies",
      "phone_number": "+44 7700 900123",
      "shop_address": "456 Shop Street",
      "delivery_available": true,
      "delivery_radius_km": 10,
      "accepts_online_payment": true,
      "accepts_cash_on_delivery": true,
      ...
    }
  }
}
```

---

### 7. Update Seller Profile
**URL:** `PUT /api/seller/profile/:id`  
**Full URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/profile/1`

**Request Body (All fields optional - only send fields you want to update):**
```json
{
  "full_name": "Jane Doe",
  "seller_shop_name": "ABC Plumbing Supplies",
  "seller_bio": "Quality plumbing supplies and sanitary goods",
  "phone_number": "+44 7700 900123",
  "email": "shop@example.com",
  "cnic": "12345-1234567-2",
  "shop_address": "456 Shop Street",
  "city": "London",
  "state": "Greater London",
  "zip_code": "SW1A 1BB",
  "country": "UK",
  "latitude": 51.5074,
  "longitude": -0.1278,
  "delivery_available": true,
  "delivery_radius_km": 10,
  "delivery_time_hours": 24.00,
  "delivery_charges": 5.00,
  "free_delivery_above": 50.00,
  "accepts_online_payment": true,
  "accepts_cash_on_delivery": true,
  "payment_methods": ["card", "paypal", "bank_transfer"],
  "business_license": "BL123456",
  "tax_id": "TAX789",
  "experience_years": 5
}
```

**Minimal Update Example:**
```json
{
  "seller_shop_name": "ABC Plumbing Supplies",
  "phone_number": "+44 7700 900123",
  "email": "shop@example.com",
  "delivery_available": true,
  "accepts_online_payment": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Seller profile updated successfully",
  "data": {
    "seller": {
      "id": 1,
      "seller_shop_name": "ABC Plumbing Supplies",
      ...
    }
  }
}
```

---

## 📝 Notes

1. **All endpoints require `Content-Type: application/json` header**
2. **Replace `:id` in URLs with actual ID (e.g., `/profile/1`)**
3. **Password requirements:**
   - Minimum 6 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
4. **OTP expires in 1 minute**
5. **For profile updates, only include fields you want to change**
6. **Arrays (certifications, specializations, payment_methods) should be sent as JSON arrays**
7. **JSONB fields (availability_schedule) should be sent as JSON objects**

---

## 🧪 Quick Test Commands (cURL)

### Test Plumber Login:
```bash
curl -X POST https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/login \
  -H "Content-Type: application/json" \
  -d '{"plumber_email":"john@example.com","plumber_password":"Password123"}'
```

### Test Plumber Profile Update:
```bash
curl -X PUT https://smart-plumber-booking-system-7cbo.vercel.app/api/plumber/profile/1 \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John Smith","phone_number":"+44 7700 900123","per_hour_charges":35.00}'
```

### Test Seller Login:
```bash
curl -X POST https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/login \
  -H "Content-Type: application/json" \
  -d '{"seller_email":"shop@example.com","seller_password":"Password123"}'
```

### Test Seller Profile Update:
```bash
curl -X PUT https://smart-plumber-booking-system-7cbo.vercel.app/api/seller/profile/1 \
  -H "Content-Type: application/json" \
  -d '{"seller_shop_name":"ABC Supplies","phone_number":"+44 7700 900123","delivery_available":true}'
```
