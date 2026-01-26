# API Testing Guide

## Base URL
```
https://smart-plumber-booking-system-7cbo.vercel.app
```

## API Endpoints

### 1. Health Check
**GET** `/api/health`

**Request:**
```bash
GET https://smart-plumber-booking-system-7cbo.vercel.app/api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

### 2. Signup
**POST** `/api/auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "waqas",
  "email": "waqas56jb@gmail.com",
  "password": "Hamza@123",
  "confirmPassword": "Hamza@123"
}
```

**Password Requirements:**
- Minimum 6 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "waqas",
      "email": "waqas56jb@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }
  ]
}
```

---

### 3. Login
**POST** `/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "waqas56jb@gmail.com",
  "password": "Hamza@123"
}
```

**Note:** You can use either email or username in the `email` field.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "waqas",
      "email": "waqas56jb@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email/username or password"
}
```

---

### 4. Forgot Password (Send OTP)
**POST** `/api/auth/forgot-password`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "waqas56jb@gmail.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent to your email address"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Email not found in our database. Please check your email address or sign up first."
}
```

---

### 5. Verify OTP
**POST** `/api/auth/verify-otp`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "waqas56jb@gmail.com",
  "otp": "123456"
}
```

**Note:** OTP is 6 digits, expires in 1 minute.

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

---

### 6. Reset Password
**POST** `/api/auth/reset-password`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "waqas56jb@gmail.com",
  "otp": "123456",
  "newPassword": "NewPass@123",
  "confirmPassword": "NewPass@123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

---

## Postman Collection

### Import to Postman:
1. Open Postman
2. Click "Import"
3. Create a new collection
4. Add the following requests:

### Request 1: Health Check
- **Method:** GET
- **URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/health`
- **Headers:** None required

### Request 2: Signup
- **Method:** POST
- **URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/signup`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "username": "waqas",
  "email": "waqas56jb@gmail.com",
  "password": "Hamza@123",
  "confirmPassword": "Hamza@123"
}
```

### Request 3: Login
- **Method:** POST
- **URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/login`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "waqas56jb@gmail.com",
  "password": "Hamza@123"
}
```

### Request 4: Forgot Password
- **Method:** POST
- **URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/forgot-password`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "waqas56jb@gmail.com"
}
```

### Request 5: Verify OTP
- **Method:** POST
- **URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/verify-otp`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "waqas56jb@gmail.com",
  "otp": "123456"
}
```

### Request 6: Reset Password
- **Method:** POST
- **URL:** `https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/reset-password`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "waqas56jb@gmail.com",
  "otp": "123456",
  "newPassword": "NewPass@123",
  "confirmPassword": "NewPass@123"
}
```

---

## cURL Examples

### Health Check
```bash
curl -X GET https://smart-plumber-booking-system-7cbo.vercel.app/api/health
```

### Signup
```bash
curl -X POST https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "waqas",
    "email": "waqas56jb@gmail.com",
    "password": "Hamza@123",
    "confirmPassword": "Hamza@123"
  }'
```

### Login
```bash
curl -X POST https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "waqas56jb@gmail.com",
    "password": "Hamza@123"
  }'
```

### Forgot Password
```bash
curl -X POST https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "waqas56jb@gmail.com"
  }'
```

### Verify OTP
```bash
curl -X POST https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "waqas56jb@gmail.com",
    "otp": "123456"
  }'
```

### Reset Password
```bash
curl -X POST https://smart-plumber-booking-system-7cbo.vercel.app/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "waqas56jb@gmail.com",
    "otp": "123456",
    "newPassword": "NewPass@123",
    "confirmPassword": "NewPass@123"
  }'
```

---

## Testing Checklist

- [ ] Health check returns 200 OK
- [ ] Signup creates account successfully
- [ ] Signup rejects invalid passwords
- [ ] Signup rejects duplicate email/username
- [ ] Login works with correct credentials
- [ ] Login rejects incorrect credentials
- [ ] Forgot password sends OTP email
- [ ] Forgot password rejects non-existent email
- [ ] Verify OTP works with correct code
- [ ] Verify OTP rejects incorrect/expired code
- [ ] Reset password works after OTP verification
- [ ] CORS headers are present in all responses
- [ ] OPTIONS preflight requests return 204

---

## Common Issues

### CORS Error
If you see CORS errors, ensure:
- The origin is in the allowed origins list
- OPTIONS requests are handled correctly
- Headers include `Content-Type: application/json`

### 404 on OPTIONS
This should be fixed with the current setup. If still occurring:
- Check Vercel deployment logs
- Verify `vercel.json` is correct
- Ensure `api/index.js` exists and exports handler correctly

### Validation Errors
Check that:
- Password meets all requirements (uppercase, lowercase, number)
- Email is valid format
- Username is 3-30 characters, alphanumeric + underscore only
- All required fields are provided
