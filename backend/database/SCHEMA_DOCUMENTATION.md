# Complete Database Schema Documentation

## Overview

This comprehensive database schema supports a multi-platform booking system with detailed profiles for plumbers and sellers, product management, and a robust rating/review system similar to Fiverr.

## Table Structure

### 1. Users Table (Customers)
**Purpose**: Store customer account information

**Key Fields**:
- `id`, `username`, `email`, `password`
- `full_name`, `phone_number`, `address`, `cnic`
- `profile_image` - Customer profile picture
- `user_type` - 'customer', 'plumber', or 'seller'

---

### 2. Plumbers Table (Enhanced Profile)
**Purpose**: Complete plumber profile with all professional details

**Profile Information**:
- `plumber_username`, `plumber_email`, `plumber_password`
- `full_name`, `plumber_bio`, `plumber_thumbnail_photo`
- `phone_number`, `email`, `cnic`

**Location & Tracking**:
- `location_address`, `city`, `state`, `zip_code`, `country`
- `latitude`, `longitude` - For live location tracking
- `location_updated_at` - Last location update timestamp

**Pricing**:
- `per_hour_charges` - Hourly rate (e.g., 25.00 GBP)
- `currency` - Default 'GBP'
- `minimum_charge` - Minimum service charge

**Professional Details**:
- `experience_years` - Years of experience
- `license_number` - Professional license
- `certifications` - Array of certifications
- `specializations` - Array of specializations (e.g., ['plumbing', 'heating', 'drainage'])

**Rating & Statistics**:
- `plumber_rating` - Average rating (0.00 to 5.00)
- `plumber_total_jobs`, `plumber_completed_jobs`, `plumber_cancelled_jobs`
- `total_reviews` - Total number of reviews

**Availability**:
- `is_available` - Current availability status
- `availability_schedule` - JSONB flexible schedule
  ```json
  {
    "monday": {"start": "09:00", "end": "17:00", "available": true},
    "tuesday": {"start": "09:00", "end": "17:00", "available": true}
  }
  ```

**Status**:
- `is_verified` - Account verification status
- `is_active` - Account active status

---

### 3. Sellers Table (Enhanced Shop Profile)
**Purpose**: Complete seller/shop profile with business details

**Personal Information**:
- `seller_username`, `seller_email`, `seller_password`
- `full_name`, `seller_shop_name`, `seller_bio`
- `phone_number`, `email`, `cnic`

**Location**:
- `shop_address`, `city`, `state`, `zip_code`, `country`
- `latitude`, `longitude` - Shop location coordinates

**Delivery Information**:
- `delivery_available` - Whether delivery is offered
- `delivery_radius_km` - Delivery radius in kilometers
- `delivery_time_hours` - Standard delivery time (e.g., 24.00 hours)
- `delivery_charges` - Delivery fee
- `free_delivery_above` - Free delivery above this amount

**Payment Options**:
- `accepts_online_payment` - Online payment enabled
- `accepts_cash_on_delivery` - COD enabled
- `payment_methods` - Array of payment methods (e.g., ['card', 'paypal', 'bank_transfer'])

**Business Information**:
- `business_license`, `tax_id`
- `experience_years` - Years in business

**Rating & Statistics**:
- `seller_rating` - Average rating (0.00 to 5.00)
- `seller_total_sales`, `seller_total_orders`
- `seller_completed_orders`, `seller_cancelled_orders`
- `total_reviews` - Total number of reviews

---

### 4. Plumber Services Table
**Purpose**: Services offered by plumbers (service cards)

**Fields**:
- `plumber_id` - Reference to plumber
- `service_name` - Name of service (e.g., "Emergency Plumbing")
- `service_description` - Detailed description
- `service_image` - Service card image URL
- `price` - Service price
- `price_type` - 'hourly', 'fixed', or 'per_job'
- `duration_hours` - Estimated duration
- `is_active` - Service availability

---

### 5. Seller Shop Photos Table
**Purpose**: Multiple photos of seller's shop/products

**Fields**:
- `seller_id` - Reference to seller
- `photo_url` - Image URL
- `photo_type` - 'shop', 'interior', 'exterior', 'products'
- `caption` - Photo description
- `display_order` - For ordering photos
- `is_primary` - Primary shop photo flag

---

### 6. Products Table (Sanitary Goods)
**Purpose**: Store all sanitary products with complete details

**Product Information**:
- `seller_id` - Reference to seller
- `product_name`, `product_description`
- `product_category` - 'pipes', 'fixtures', 'tools', 'accessories'
- `product_brand`, `product_model`
- `sku` - Stock Keeping Unit (unique)

**Pricing**:
- `price` - Current price
- `original_price` - Price before discount
- `discount_percentage` - Discount percentage (e.g., 15.00)
- `discount_amount` - Discount amount
- `currency` - Default 'GBP'

**Inventory**:
- `stock_quantity` - Available stock
- `min_order_quantity` - Minimum order (default 1)
- `max_order_quantity` - Maximum order limit
- `is_in_stock` - Stock availability

**Product Details**:
- `weight_kg` - Product weight
- `dimensions` - Size (e.g., "10x5x3 cm")
- `material` - Material type
- `color` - Product color
- `warranty_period_months` - Warranty duration

**Delivery**:
- `delivery_time_hours` - Product-specific delivery time
- `shipping_charges` - Shipping cost

**Rating & Statistics**:
- `product_rating` - Average rating (0.00 to 5.00)
- `total_reviews` - Number of reviews
- `total_sales` - Total units sold
- `total_views` - Product views

**Status**:
- `is_active` - Product active status
- `is_featured` - Featured product flag

---

### 7. Product Images Table
**Purpose**: Multiple images for each product

**Fields**:
- `product_id` - Reference to product
- `image_url` - Image URL
- `image_type` - 'product', 'detail', 'packaging'
- `display_order` - For image ordering
- `is_primary` - Primary product image

---

### 8. Plumber Reviews Table (Fiverr-style)
**Purpose**: Customer reviews for plumbers with detailed ratings

**Rating System**:
- `rating` - Overall rating (1-5 stars)
- `service_quality` - Service quality rating (1-5)
- `punctuality` - Punctuality rating (1-5)
- `professionalism` - Professionalism rating (1-5)
- `value_for_money` - Value rating (1-5)

**Review Content**:
- `review_title` - Review headline
- `review_comment` - Detailed review text
- `helpful_count` - Number of helpful votes (like Fiverr)

**Metadata**:
- `plumber_id`, `customer_id`, `job_id`
- `is_verified_purchase` - Verified purchase flag
- `is_visible` - Review visibility
- `is_edited` - Edit status

---

### 9. Seller Reviews Table (Fiverr-style)
**Purpose**: Customer reviews for sellers with detailed ratings

**Rating System**:
- `rating` - Overall rating (1-5 stars)
- `product_quality` - Product quality rating (1-5)
- `delivery_speed` - Delivery speed rating (1-5)
- `customer_service` - Service rating (1-5)
- `value_for_money` - Value rating (1-5)

**Review Content**:
- `review_title`, `review_comment`
- `helpful_count` - Helpful votes

**Metadata**:
- `seller_id`, `customer_id`, `order_id`
- `is_verified_purchase`, `is_visible`, `is_edited`

---

### 10. Product Reviews Table
**Purpose**: Reviews for individual products

**Rating System**:
- `rating` - Overall rating (1-5 stars)
- `product_quality` - Quality rating (1-5)
- `value_for_money` - Value rating (1-5)
- `delivery_experience` - Delivery rating (1-5)

**Review Content**:
- `review_title`, `review_comment`
- `review_images` - Array of review image URLs
- `helpful_count` - Helpful votes

**Metadata**:
- `product_id`, `customer_id`, `order_id`
- `is_verified_purchase`, `is_visible`, `is_edited`

---

### 11. OTP Table
**Purpose**: Password reset OTPs for all user types

**Fields**:
- `email`, `otp`, `user_type` ('customer', 'plumber', 'seller')
- `expires_at`, `attempts`, `is_used`

---

### 12. Plumber Location History Table
**Purpose**: Track plumber's live location for real-time tracking

**Fields**:
- `plumber_id` - Reference to plumber
- `latitude`, `longitude` - GPS coordinates
- `address` - Resolved address
- `accuracy_meters` - GPS accuracy
- `created_at` - Timestamp

---

### 13. Delivery Addresses Table
**Purpose**: Customer delivery addresses

**Fields**:
- `customer_id` - Reference to customer
- `address_label` - 'Home', 'Office', 'Work'
- `full_name`, `phone_number`
- `address_line1`, `address_line2`
- `city`, `state`, `zip_code`, `country`
- `latitude`, `longitude` - Coordinates
- `is_default` - Default address flag
- `delivery_instructions` - Special instructions

---

### 14. Plumber Experience Table
**Purpose**: Professional experience history

**Fields**:
- `plumber_id` - Reference to plumber
- `company_name`, `position`
- `start_date`, `end_date`
- `is_current` - Current position flag
- `description` - Job description
- `achievements` - Array of achievements

---

### 15. Seller Experience Table
**Purpose**: Business experience history

**Fields**:
- `seller_id` - Reference to seller
- `company_name`, `position`
- `start_date`, `end_date`
- `is_current` - Current position flag
- `description` - Business description
- `achievements` - Array of achievements

---

## Automatic Features

### Rating Calculation Triggers

1. **Plumber Rating Trigger**: Automatically updates `plumber_rating` and `total_reviews` when reviews are added/updated/deleted
2. **Seller Rating Trigger**: Automatically updates `seller_rating` and `total_reviews` when reviews are added/updated/deleted
3. **Product Rating Trigger**: Automatically updates `product_rating` and `total_reviews` when reviews are added/updated/deleted

### Updated Timestamp Triggers

All tables with `updated_at` fields automatically update when records are modified.

---

## Database Views

### 1. plumber_profile_view
Combines plumber data with review counts and calculated ratings.

### 2. seller_profile_view
Combines seller data with review counts and calculated ratings.

### 3. product_details_view
Combines product data with seller information and review statistics.

---

## Indexes

Comprehensive indexes are created for:
- Email and username lookups (case-insensitive)
- Location-based searches (latitude/longitude)
- Rating-based sorting
- Review queries
- Product searches by category, price, rating
- Active status filtering

---

## Usage Examples

### Create a Plumber Profile
```sql
INSERT INTO plumbers (
    plumber_username, plumber_email, plumber_password,
    full_name, plumber_bio, plumber_thumbnail_photo,
    phone_number, email, cnic,
    location_address, city, latitude, longitude,
    per_hour_charges, experience_years,
    specializations
) VALUES (
    'john_plumber', 'john@example.com', 'hashed_password',
    'John Smith', 'Experienced plumber with 10+ years...', 'https://example.com/photo.jpg',
    '+44 7777 998381', 'john@example.com', 'CNIC123456',
    '123 Main St', 'London', 51.5074, -0.1278,
    25.00, 10,
    ARRAY['plumbing', 'heating', 'drainage']
);
```

### Create a Seller Profile
```sql
INSERT INTO sellers (
    seller_username, seller_email, seller_password,
    full_name, seller_shop_name, seller_bio,
    phone_number, email, cnic,
    shop_address, city, latitude, longitude,
    delivery_available, delivery_radius_km, delivery_time_hours,
    accepts_online_payment, accepts_cash_on_delivery
) VALUES (
    'sanitary_shop', 'shop@example.com', 'hashed_password',
    'Jane Doe', 'Best Sanitary Shop', 'Quality sanitary goods...',
    '+44 7777 998382', 'shop@example.com', 'CNIC789012',
    '456 High St', 'London', 51.5074, -0.1278,
    TRUE, 10.00, 24.00,
    TRUE, TRUE
);
```

### Add a Product
```sql
INSERT INTO products (
    seller_id, product_name, product_description,
    product_category, price, original_price, discount_percentage,
    stock_quantity, delivery_time_hours
) VALUES (
    1, 'Premium Pipe Set', 'High-quality plumbing pipes...',
    'pipes', 49.99, 59.99, 16.67,
    100, 24.00
);
```

### Add a Review (Fiverr-style)
```sql
INSERT INTO plumber_reviews (
    plumber_id, customer_id, rating,
    review_title, review_comment,
    service_quality, punctuality, professionalism, value_for_money
) VALUES (
    1, 1, 5,
    'Excellent Service!', 'Very professional and punctual...',
    5, 5, 5, 5
);
```

---

## Schema Flexibility

This schema is designed to be:
- **Extensible**: Easy to add new fields or tables
- **Scalable**: Indexed for performance with large datasets
- **Flexible**: JSONB fields for dynamic data (schedules, payment methods)
- **Comprehensive**: Covers all requirements for profiles, products, reviews, and ratings

---

## Next Steps

1. Run the schema SQL file on your Vercel Postgres database
2. Update backend services to use new fields
3. Create API endpoints for profile management
4. Implement image upload functionality
5. Build review/rating UI components
6. Add location tracking for plumbers
