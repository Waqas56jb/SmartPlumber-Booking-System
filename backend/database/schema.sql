CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) DEFAULT 'customer' CHECK (user_type IN ('customer', 'plumber', 'seller')),
    full_name VARCHAR(255),
    phone_number VARCHAR(20),
    address TEXT,
    cnic VARCHAR(20),
    profile_image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS plumbers (
    id SERIAL PRIMARY KEY,
    plumber_username VARCHAR(30) UNIQUE NOT NULL,
    plumber_email VARCHAR(255) UNIQUE NOT NULL,
    plumber_password VARCHAR(255) NOT NULL,
    
    
    full_name VARCHAR(255),
    plumber_bio TEXT,
    plumber_thumbnail_photo VARCHAR(500), 
    phone_number VARCHAR(20),
    email VARCHAR(255),
    cnic VARCHAR(20),
    
    
    location_address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'UK',
    latitude DECIMAL(10, 8), 
    longitude DECIMAL(11, 8), 
    location_updated_at TIMESTAMP, 
    
    
    per_hour_charges DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'GBP',
    minimum_charge DECIMAL(10, 2) DEFAULT 0.00,
    
    
    experience_years INTEGER DEFAULT 0,
    license_number VARCHAR(100),
    certifications TEXT[], 
    specializations TEXT[], 
    
    
    plumber_rating DECIMAL(3,2) DEFAULT 0.00 CHECK (plumber_rating >= 0 AND plumber_rating <= 5),
    plumber_total_jobs INTEGER DEFAULT 0,
    plumber_completed_jobs INTEGER DEFAULT 0,
    plumber_cancelled_jobs INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    
    
    is_available BOOLEAN DEFAULT TRUE,
    availability_schedule JSONB, 
    
    
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS sellers (
    id SERIAL PRIMARY KEY,
    seller_username VARCHAR(30) UNIQUE NOT NULL,
    seller_email VARCHAR(255) UNIQUE NOT NULL,
    seller_password VARCHAR(255) NOT NULL,
    
    
    full_name VARCHAR(255),
    seller_shop_name VARCHAR(255),
    seller_bio TEXT,
    phone_number VARCHAR(20),
    email VARCHAR(255),
    cnic VARCHAR(20),
    
    
    shop_address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'UK',
    latitude DECIMAL(10, 8), 
    longitude DECIMAL(11, 8), 
    
    
    delivery_available BOOLEAN DEFAULT TRUE,
    delivery_radius_km DECIMAL(5, 2) DEFAULT 0.00, 
    delivery_time_hours DECIMAL(4, 2) DEFAULT 24.00, 
    delivery_charges DECIMAL(10, 2) DEFAULT 0.00,
    free_delivery_above DECIMAL(10, 2) DEFAULT 0.00, 
    
    
    accepts_online_payment BOOLEAN DEFAULT TRUE,
    accepts_cash_on_delivery BOOLEAN DEFAULT TRUE,
    payment_methods TEXT[], 
    
    
    business_license VARCHAR(100),
    tax_id VARCHAR(100),
    experience_years INTEGER DEFAULT 0,
    
    
    seller_rating DECIMAL(3,2) DEFAULT 0.00 CHECK (seller_rating >= 0 AND seller_rating <= 5),
    seller_total_sales INTEGER DEFAULT 0,
    seller_total_orders INTEGER DEFAULT 0,
    seller_completed_orders INTEGER DEFAULT 0,
    seller_cancelled_orders INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    
    
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS plumber_services (
    id SERIAL PRIMARY KEY,
    plumber_id INTEGER NOT NULL REFERENCES plumbers(id) ON DELETE CASCADE,
    service_name VARCHAR(255) NOT NULL,
    service_description TEXT,
    service_image VARCHAR(500), 
    price DECIMAL(10, 2),
    price_type VARCHAR(20) DEFAULT 'hourly', 
    duration_hours DECIMAL(4, 2), 
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS seller_shop_photos (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    photo_url VARCHAR(500) NOT NULL,
    photo_type VARCHAR(50) DEFAULT 'shop', 
    caption TEXT,
    display_order INTEGER DEFAULT 0, 
    is_primary BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    
    
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_category VARCHAR(100), 
    product_brand VARCHAR(100),
    product_model VARCHAR(100),
    sku VARCHAR(100) UNIQUE, 
    
    
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2), 
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'GBP',
    
    
    stock_quantity INTEGER DEFAULT 0,
    min_order_quantity INTEGER DEFAULT 1,
    max_order_quantity INTEGER,
    is_in_stock BOOLEAN DEFAULT TRUE,
    
    
    weight_kg DECIMAL(8, 2),
    dimensions VARCHAR(100), 
    material VARCHAR(100),
    color VARCHAR(50),
    warranty_period_months INTEGER,
    
    
    delivery_time_hours DECIMAL(4, 2), 
    shipping_charges DECIMAL(10, 2) DEFAULT 0.00,
    
    
    product_rating DECIMAL(3,2) DEFAULT 0.00 CHECK (product_rating >= 0 AND product_rating <= 5),
    total_reviews INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    
    
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    image_type VARCHAR(50) DEFAULT 'product', 
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS plumber_reviews (
    id SERIAL PRIMARY KEY,
    plumber_id INTEGER NOT NULL REFERENCES plumbers(id) ON DELETE CASCADE,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER, 
    
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    
    review_title VARCHAR(255),
    review_comment TEXT,
    
    
    service_quality INTEGER CHECK (service_quality >= 1 AND service_quality <= 5),
    punctuality INTEGER CHECK (punctuality >= 1 AND punctuality <= 5),
    professionalism INTEGER CHECK (professionalism >= 1 AND professionalism <= 5),
    value_for_money INTEGER CHECK (value_for_money >= 1 AND value_for_money <= 5),
    
    
    helpful_count INTEGER DEFAULT 0,
    
    
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    is_edited BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS seller_reviews (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id INTEGER, 
    
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    
    review_title VARCHAR(255),
    review_comment TEXT,
    
    
    product_quality INTEGER CHECK (product_quality >= 1 AND product_quality <= 5),
    delivery_speed INTEGER CHECK (delivery_speed >= 1 AND delivery_speed <= 5),
    customer_service INTEGER CHECK (customer_service >= 1 AND customer_service <= 5),
    value_for_money INTEGER CHECK (value_for_money >= 1 AND value_for_money <= 5),
    
    
    helpful_count INTEGER DEFAULT 0,
    
    
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    is_edited BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id INTEGER, 
    
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    
    review_title VARCHAR(255),
    review_comment TEXT,
    
    
    product_quality INTEGER CHECK (product_quality >= 1 AND product_quality <= 5),
    value_for_money INTEGER CHECK (value_for_money >= 1 AND value_for_money <= 5),
    delivery_experience INTEGER CHECK (delivery_experience >= 1 AND delivery_experience <= 5),
    
    
    review_images TEXT[], 
    
    
    helpful_count INTEGER DEFAULT 0,
    
    
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_visible BOOLEAN DEFAULT TRUE,
    is_edited BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS otps (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('customer', 'plumber', 'seller')),
    expires_at TIMESTAMP NOT NULL,
    attempts INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE
);




CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    plumber_id INTEGER NOT NULL REFERENCES plumbers(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES plumber_services(id) ON DELETE SET NULL,
    
    
    booking_date DATE NOT NULL,
    booking_time TIME,
    booking_duration_hours DECIMAL(4, 2),
    
    
    customer_address TEXT,
    customer_phone VARCHAR(20),
    customer_notes TEXT,
    
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    plumber_notes TEXT,
    
    
    total_amount DECIMAL(10, 2),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
    
    
    confirmed_at TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS plumber_location_history (
    id SERIAL PRIMARY KEY,
    plumber_id INTEGER NOT NULL REFERENCES plumbers(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    accuracy_meters DECIMAL(8, 2), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS delivery_addresses (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address_label VARCHAR(100), 
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'UK',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_default BOOLEAN DEFAULT FALSE,
    delivery_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS plumber_experience (
    id SERIAL PRIMARY KEY,
    plumber_id INTEGER NOT NULL REFERENCES plumbers(id) ON DELETE CASCADE,
    company_name VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    end_date DATE, 
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    achievements TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE IF NOT EXISTS seller_experience (
    id SERIAL PRIMARY KEY,
    seller_id INTEGER NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    company_name VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    achievements TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






CREATE INDEX IF NOT EXISTS idx_users_email ON users(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_users_username ON users(LOWER(username));
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);


CREATE INDEX IF NOT EXISTS idx_plumbers_email ON plumbers(LOWER(plumber_email));
CREATE INDEX IF NOT EXISTS idx_plumbers_username ON plumbers(LOWER(plumber_username));
CREATE INDEX IF NOT EXISTS idx_plumbers_location ON plumbers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_plumbers_rating ON plumbers(plumber_rating DESC);
CREATE INDEX IF NOT EXISTS idx_plumbers_available ON plumbers(is_available, is_active);


CREATE INDEX IF NOT EXISTS idx_sellers_email ON sellers(LOWER(seller_email));
CREATE INDEX IF NOT EXISTS idx_sellers_username ON sellers(LOWER(seller_username));
CREATE INDEX IF NOT EXISTS idx_sellers_location ON sellers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_sellers_rating ON sellers(seller_rating DESC);
CREATE INDEX IF NOT EXISTS idx_sellers_active ON sellers(is_active);


CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(product_category);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(product_rating DESC);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active, is_in_stock);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);


CREATE INDEX IF NOT EXISTS idx_plumber_reviews_plumber ON plumber_reviews(plumber_id);
CREATE INDEX IF NOT EXISTS idx_plumber_reviews_customer ON plumber_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_plumber_reviews_rating ON plumber_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_plumber_reviews_created ON plumber_reviews(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_seller_reviews_seller ON seller_reviews(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_reviews_customer ON seller_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_seller_reviews_rating ON seller_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_seller_reviews_created ON seller_reviews(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_customer ON product_reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_product_reviews_created ON product_reviews(created_at DESC);


CREATE INDEX IF NOT EXISTS idx_otps_email ON otps(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_otps_type ON otps(user_type);
CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps(expires_at);
CREATE INDEX IF NOT EXISTS idx_otps_is_used ON otps(is_used);


CREATE INDEX IF NOT EXISTS idx_location_history_plumber ON plumber_location_history(plumber_id, created_at DESC);


CREATE INDEX IF NOT EXISTS idx_delivery_addresses_customer ON delivery_addresses(customer_id);
CREATE INDEX IF NOT EXISTS idx_delivery_addresses_default ON delivery_addresses(customer_id, is_default);






CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';


DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_plumbers_updated_at ON plumbers;
CREATE TRIGGER update_plumbers_updated_at
    BEFORE UPDATE ON plumbers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sellers_updated_at ON sellers;
CREATE TRIGGER update_sellers_updated_at
    BEFORE UPDATE ON sellers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_plumber_reviews_updated_at ON plumber_reviews;
CREATE TRIGGER update_plumber_reviews_updated_at
    BEFORE UPDATE ON plumber_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_seller_reviews_updated_at ON seller_reviews;
CREATE TRIGGER update_seller_reviews_updated_at
    BEFORE UPDATE ON seller_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_product_reviews_updated_at ON product_reviews;
CREATE TRIGGER update_product_reviews_updated_at
    BEFORE UPDATE ON product_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_delivery_addresses_updated_at ON delivery_addresses;
CREATE TRIGGER update_delivery_addresses_updated_at
    BEFORE UPDATE ON delivery_addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


CREATE OR REPLACE FUNCTION update_plumber_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE plumbers
    SET 
        plumber_rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM plumber_reviews
            WHERE plumber_id = NEW.plumber_id AND is_visible = TRUE
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM plumber_reviews
            WHERE plumber_id = NEW.plumber_id AND is_visible = TRUE
        )
    WHERE id = NEW.plumber_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_plumber_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON plumber_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_plumber_rating();


CREATE OR REPLACE FUNCTION update_seller_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE sellers
    SET 
        seller_rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM seller_reviews
            WHERE seller_id = NEW.seller_id AND is_visible = TRUE
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM seller_reviews
            WHERE seller_id = NEW.seller_id AND is_visible = TRUE
        )
    WHERE id = NEW.seller_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_seller_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON seller_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_seller_rating();


CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET 
        product_rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM product_reviews
            WHERE product_id = NEW.product_id AND is_visible = TRUE
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM product_reviews
            WHERE product_id = NEW.product_id AND is_visible = TRUE
        )
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON product_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_product_rating();


CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
    DELETE FROM otps WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ language 'plpgsql';






CREATE OR REPLACE VIEW plumber_profile_view AS
SELECT 
    p.*,
    COUNT(DISTINCT pr.id) as total_reviews_count,
    COUNT(DISTINCT ps.id) as total_services_count,
    COALESCE(AVG(pr.rating), 0) as calculated_rating
FROM plumbers p
LEFT JOIN plumber_reviews pr ON p.id = pr.plumber_id AND pr.is_visible = TRUE
LEFT JOIN plumber_services ps ON p.id = ps.plumber_id AND ps.is_active = TRUE
GROUP BY p.id;


CREATE OR REPLACE VIEW seller_profile_view AS
SELECT 
    s.*,
    COUNT(DISTINCT sr.id) as total_reviews_count,
    COUNT(DISTINCT p.id) as total_products_count,
    COALESCE(AVG(sr.rating), 0) as calculated_rating
FROM sellers s
LEFT JOIN seller_reviews sr ON s.id = sr.seller_id AND sr.is_visible = TRUE
LEFT JOIN products p ON s.id = p.seller_id AND p.is_active = TRUE
GROUP BY s.id;


CREATE OR REPLACE VIEW product_details_view AS
SELECT 
    p.*,
    s.seller_shop_name,
    s.seller_rating as seller_rating,
    s.delivery_time_hours as seller_delivery_time,
    COUNT(DISTINCT pr.id) as total_reviews_count,
    COALESCE(AVG(pr.rating), 0) as calculated_rating
FROM products p
JOIN sellers s ON p.seller_id = s.id
LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_visible = TRUE
GROUP BY p.id, s.id;
