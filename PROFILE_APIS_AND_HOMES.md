# Profile APIs and Home Pages Documentation

## Overview

Complete profile management APIs and separate home pages for Plumber and Seller platforms have been created.

## Backend APIs

### Plumber Profile APIs

#### Get Plumber Profile
- **Endpoint**: `GET /api/plumber/profile/:id?`
- **Description**: Fetch plumber profile by ID
- **Response**: Complete plumber profile with all fields

#### Update Plumber Profile
- **Endpoint**: `PUT /api/plumber/profile/:id?`
- **Description**: Update plumber profile fields
- **Request Body**: Any combination of profile fields:
  ```json
  {
    "full_name": "John Smith",
    "plumber_bio": "Experienced plumber...",
    "plumber_thumbnail_photo": "https://...",
    "phone_number": "+44 7777 998381",
    "email": "john@example.com",
    "cnic": "CNIC123456",
    "location_address": "123 Main St",
    "city": "London",
    "state": "England",
    "zip_code": "SW1A 1AA",
    "country": "UK",
    "latitude": 51.5074,
    "longitude": -0.1278,
    "per_hour_charges": 25.00,
    "currency": "GBP",
    "minimum_charge": 50.00,
    "experience_years": 10,
    "license_number": "LIC123",
    "certifications": ["cert1", "cert2"],
    "specializations": ["plumbing", "heating"],
    "is_available": true,
    "availability_schedule": {
      "monday": {"start": "09:00", "end": "17:00", "available": true}
    }
  }
  ```

### Seller Profile APIs

#### Get Seller Profile
- **Endpoint**: `GET /api/seller/profile/:id?`
- **Description**: Fetch seller profile by ID
- **Response**: Complete seller profile with all fields

#### Update Seller Profile
- **Endpoint**: `PUT /api/seller/profile/:id?`
- **Description**: Update seller profile fields
- **Request Body**: Any combination of profile fields:
  ```json
  {
    "full_name": "Jane Doe",
    "seller_shop_name": "Best Sanitary Shop",
    "seller_bio": "Quality sanitary goods...",
    "phone_number": "+44 7777 998382",
    "email": "shop@example.com",
    "cnic": "CNIC789012",
    "shop_address": "456 High St",
    "city": "London",
    "state": "England",
    "zip_code": "SW1A 1AA",
    "country": "UK",
    "latitude": 51.5074,
    "longitude": -0.1278,
    "delivery_available": true,
    "delivery_radius_km": 10.00,
    "delivery_time_hours": 24.00,
    "delivery_charges": 5.00,
    "free_delivery_above": 50.00,
    "accepts_online_payment": true,
    "accepts_cash_on_delivery": true,
    "payment_methods": ["card", "paypal"],
    "business_license": "BL123",
    "tax_id": "TAX123",
    "experience_years": 5
  }
  ```

## Frontend Pages

### PlumberHome.js
**Route**: `/home` (when logged in as plumber)

**Features**:
- Profile header with plumber name and edit button
- Profile image/thumbnail display
- Rating display (stars + numeric)
- Statistics cards:
  - Total Jobs
  - Completed Jobs
  - Years Experience
  - Availability Status
- Contact Information section:
  - Phone number
  - Email
  - Location address
- Pricing & Services section:
  - Per hour charges
  - Minimum charge
  - Specializations (tags)
- Quick Actions:
  - Manage Services
  - View Bookings
  - Update Availability

### SellerHome.js
**Route**: `/home` (when logged in as seller)

**Features**:
- Profile header with shop name and edit button
- Shop information display
- Rating display (stars + numeric)
- Statistics cards:
  - Total Orders
  - Completed Orders
  - Total Sales
  - Years Experience
- Contact Information section:
  - Phone number
  - Email
  - Shop address
- Delivery & Payment section:
  - Delivery availability and time
  - Delivery radius
  - Online payment status
  - Cash on delivery status
  - Delivery charges
- Quick Actions:
  - Manage Products
  - View Orders
  - Upload Shop Photos

## Routing Logic

The `App.js` automatically routes users to the correct home page based on their `userType`:

- **Customer** (`userType: 'customer'` or undefined) → `Home.js`
- **Plumber** (`userType: 'plumber'`) → `PlumberHome.js`
- **Seller** (`userType: 'seller'`) → `SellerHome.js`

## API Integration

### Frontend API Service

Added to `apiService.js`:

```javascript
// Plumber Profile
plumberAPI.getPlumberProfile(plumberId)
plumberAPI.updatePlumberProfile(plumberId, profileData)

// Seller Profile
sellerAPI.getSellerProfile(sellerId)
sellerAPI.updateSellerProfile(sellerId, profileData)
```

## User Type Detection

The system detects user type from:
1. `user.userType` (set during login)
2. `user.user_type` (fallback)

Both plumber and seller login responses include `userType: 'plumber'` or `userType: 'seller'` in the user object.

## Next Steps

1. **Add Authentication Middleware**: Protect profile routes with JWT authentication
2. **Image Upload**: Implement image upload for profile photos and shop photos
3. **Profile Edit Forms**: Create edit forms for plumber and seller profiles
4. **Services Management**: Add API and UI for managing plumber services
5. **Products Management**: Add API and UI for managing seller products
6. **Reviews Display**: Show reviews below profiles
7. **Location Tracking**: Implement live location updates for plumbers
