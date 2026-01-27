# Product Management System Documentation

## Overview

Complete product management system where sellers can list sanitary goods categorized by service types. Customers can browse services and view relevant products for each service category.

## Service Categories & Product Mapping

### 01. Boiler Installations & Servicing
**Category**: `boiler_installations`
**Products**: Combi Boiler Unit, System Boiler, Heat Exchanger, Expansion Vessel, Pressure Relief Valve, Boiler Mounting Bracket, Flue Kit, Condensate Pipe Kit

### 02. Boiler Repairs & Fault Finding
**Category**: `boiler_repairs`
**Products**: PCB Control Board, Ignition Electrode, Flame Sensor, Thermistor, Circulation Pump, Gas Valve, Fan Assembly, Boiler Seals & Gaskets

### 03. Central Heating
**Category**: `central_heating`
**Products**: Radiators (Single/Double Panel), Thermostatic Radiator Valves (TRVs), Room Thermostat, Smart Heating Controller, Radiator Brackets, Heating Manifold, Zone Valves

### 04. General Plumbing
**Category**: `general_plumbing`
**Products**: Basin Mixer Taps, Kitchen Sink Taps, Shower Mixer, Wash Basin, Kitchen Sink, Toilet Seat Cover, Angle Valves, Bottle Traps

### 05. Gas Safety Inspections
**Category**: `gas_safety`
**Products**: Gas Pressure Regulator, Gas Test Point, Gas Isolation Valve, Gas Hoses (Certified), Carbon Monoxide Detector, Gas Leak Detector Spray, Safety Shut-off Valve

### 06. Leak Detection & Repairs
**Category**: `leak_detection`
**Products**: Pipe Leak Repair Clamps, PTFE Thread Tape, Pipe Sealant Compound, Rubber Washers, O-Rings, Compression Fittings, Moisture Detection Sensors

### 07. Power Flushing
**Category**: `power_flushing`
**Products**: Power Flush Machine, Chemical Cleaner Solution, Magnetic System Filter, Sludge Remover Chemicals, Neutralizing Agent, Filter Cleaning Valves

### 08. Water Heaters
**Category**: `water_heaters`
**Products**: Electric Water Heater, Instant Water Heater, Thermostat for Heater, Heating Element, Safety Valve, Heater Mounting Kit, Temperature Control Knob

### 09. Pipe Installation & Repairs
**Category**: `pipe_installation`
**Products**: PVC Pipes, Copper Pipes, PEX Pipes, Pipe Bends & Elbows, Tee & Coupling Fittings, Pipe Clips, Insulation Sleeves

### 10. Hot Water Cylinders
**Category**: `hot_water_cylinders`
**Products**: Hot Water Cylinder Tank, Immersion Heater, Cylinder Thermostat, Expansion Kit, T&P Relief Valve, Cylinder Insulation Jacket

### 11. New Appliances Installations
**Category**: `appliances_installation`
**Products**: Washing Machine Valves, Dishwasher Inlet Hose, Appliance Waste Pipe, Anti-Vibration Pads, Electrical Isolation Switch, Appliance Connector Kits

### 12. Any Repairs
**Category**: `any_repairs`
**Products**: Adjustable Spanner, Pipe Wrench, Plumber Tool Kit, Replacement Screws, Wall Plugs, Silicone Sealant, Emergency Repair Kit

## Backend APIs

### Product APIs

#### Get All Products
- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `seller_id` - Filter by seller
  - `category` - Filter by category
  - `is_active` - Filter by active status
  - `search` - Search in name/description
- **Response**: List of products with seller info and ratings

#### Get Product by ID
- **Endpoint**: `GET /api/products/:id`
- **Response**: Product details with images and reviews

#### Get Products by Category
- **Endpoint**: `GET /api/products/category/:category`
- **Response**: Products filtered by service category

#### Create Product
- **Endpoint**: `POST /api/products`
- **Request Body**: Complete product information
- **Response**: Created product

#### Update Product
- **Endpoint**: `PUT /api/products/:id`
- **Request Body**: Fields to update
- **Response**: Updated product

#### Delete Product
- **Endpoint**: `DELETE /api/products/:id`
- **Response**: Success message

## Frontend Pages

### SellerProducts.js
**Route**: `/seller-products` (Seller only)

**Features**:
- Product grid with beautiful cards
- Search and filter by category
- Add new product form (modal)
- Edit and delete products
- Product statistics (stock, rating, sales)

### ServiceDetail.js
**Route**: `/service/:slug` (Public)

**Features**:
- Service header with icon and description
- Product grid showing all products for that service category
- Product cards with:
  - Image/placeholder
  - Product name and description
  - Price with discount badge
  - Seller information
  - Stock status
  - Rating and reviews
  - Add to cart button
  - View details button

### AddProductForm.js
**Component**: Modal form for adding products

**Fields**:
- Product Name (required)
- Service Category (required) - dropdown with all 12 categories
- SKU (optional)
- Description
- Brand, Model
- Price, Original Price (for discounts)
- Stock Quantity
- Delivery Time, Shipping Charges
- Weight, Dimensions, Material, Color
- Warranty Period

## User Flow

### Seller Flow
1. Seller logs in → SellerHome
2. Clicks "Manage Products" → SellerProducts page
3. Clicks "Add New Product" → AddProductForm modal
4. Fills form, selects service category
5. Product is created and appears in grid
6. Can edit/delete products

### Customer Flow
1. Customer visits Home page
2. Scrolls to Services section
3. Clicks on a service card (e.g., "Boiler Installations")
4. Redirected to `/service/boiler-installations`
5. Sees all products for that service category
6. Can view product details, add to cart

## Product Card Features

Each product card displays:
- **Image**: Product image or placeholder
- **Discount Badge**: Shows discount percentage if applicable
- **Product Name**: Clear, readable title
- **Description**: Brief product description
- **Seller Info**: Shop name and seller rating
- **Price**: Current price with original price (if discounted)
- **Stock Status**: In stock / Out of stock with quantity
- **Rating**: Star rating with review count
- **Delivery Info**: Delivery time badge
- **Actions**: Add to Cart, View Details buttons

## Database Integration

Products are stored in the `products` table with:
- `product_category` field links to service categories
- Each product belongs to one seller
- Products can have multiple images (product_images table)
- Products can have reviews (product_reviews table)
- Automatic rating calculation via triggers

## Next Steps

1. **Image Upload**: Implement image upload for products
2. **Product Detail Page**: Create detailed product view page
3. **Shopping Cart**: Implement cart functionality
4. **Checkout**: Create checkout flow
5. **Order Management**: Order creation and tracking
6. **Product Reviews**: Allow customers to review products
7. **Wishlist**: Add wishlist functionality
8. **Product Search**: Global product search across all categories
