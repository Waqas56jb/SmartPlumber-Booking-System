const { sql } = require('../utils/db');

// Get All Products (with optional filters)
const getAllProducts = async (req, res) => {
  try {
    const { seller_id, category, is_active, search } = req.query;

    // Build query with filters
    let baseQuery = `
      SELECT 
        p.*,
        s.seller_shop_name,
        s.seller_rating as seller_rating,
        COUNT(DISTINCT pr.id) as total_reviews_count,
        COALESCE(AVG(pr.rating), 0) as calculated_rating
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_visible = TRUE
    `;

    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (seller_id) {
      conditions.push(`p.seller_id = $${paramCount++}`);
      values.push(seller_id);
    }
    if (category) {
      conditions.push(`p.product_category = $${paramCount++}`);
      values.push(category);
    }
    if (is_active !== undefined) {
      conditions.push(`p.is_active = $${paramCount++}`);
      values.push(is_active === 'true');
    }
    if (search) {
      conditions.push(`(p.product_name ILIKE $${paramCount++} OR p.product_description ILIKE $${paramCount++})`);
      const searchTerm = `%${search}%`;
      values.push(searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ${conditions.join(' AND ')}`;
    }

    baseQuery += ` GROUP BY p.id, s.id ORDER BY p.created_at DESC`;

    const result = await sql.unsafe(baseQuery, values);

    // Get images for each product
    const productsWithImages = await Promise.all(
      result.rows.map(async (product) => {
        const imagesResult = await sql`
          SELECT image_url, is_primary, display_order
          FROM product_images
          WHERE product_id = ${product.id}
          ORDER BY is_primary DESC, display_order ASC
          LIMIT 1
        `;
        return {
          ...product,
          product_images: imagesResult.rows
        };
      })
    );

    res.json({
      success: true,
      data: {
        products: productsWithImages,
        count: productsWithImages.length
      }
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productResult = await sql`
      SELECT 
        p.*,
        s.seller_shop_name,
        s.seller_rating as seller_rating,
        s.delivery_time_hours as seller_delivery_time,
        s.delivery_charges as seller_delivery_charges
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      WHERE p.id = ${id}
    `;

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get product images
    const imagesResult = await sql`
      SELECT * FROM product_images
      WHERE product_id = ${id}
      ORDER BY display_order, is_primary DESC
    `;

    // Get product reviews
    const reviewsResult = await sql`
      SELECT 
        pr.*,
        u.username as customer_username,
        u.profile_image as customer_image
      FROM product_reviews pr
      JOIN users u ON pr.customer_id = u.id
      WHERE pr.product_id = ${id} AND pr.is_visible = TRUE
      ORDER BY pr.created_at DESC
      LIMIT 10
    `;

    res.json({
      success: true,
      data: {
        product: productResult.rows[0],
        images: imagesResult.rows,
        reviews: reviewsResult.rows
      }
    });
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
};

// Create Product
const createProduct = async (req, res) => {
  try {
    const sellerId = req.user?.sellerId || req.body.seller_id;
    
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: 'Seller ID is required'
      });
    }

    const {
      product_name,
      product_description,
      product_category,
      product_brand,
      product_model,
      sku,
      price,
      original_price,
      discount_percentage,
      discount_amount,
      currency,
      stock_quantity,
      min_order_quantity,
      max_order_quantity,
      weight_kg,
      dimensions,
      material,
      color,
      warranty_period_months,
      delivery_time_hours,
      shipping_charges
    } = req.body;

    // Calculate discount if not provided
    let finalDiscountPercentage = discount_percentage;
    let finalDiscountAmount = discount_amount;
    
    if (original_price && price && !discount_percentage && !discount_amount) {
      finalDiscountAmount = original_price - price;
      finalDiscountPercentage = ((finalDiscountAmount / original_price) * 100).toFixed(2);
    }

    const result = await sql`
      INSERT INTO products (
        seller_id, product_name, product_description, product_category,
        product_brand, product_model, sku, price, original_price,
        discount_percentage, discount_amount, currency,
        stock_quantity, min_order_quantity, max_order_quantity,
        weight_kg, dimensions, material, color, warranty_period_months,
        delivery_time_hours, shipping_charges, is_in_stock
      )
      VALUES (
        ${sellerId}, ${product_name}, ${product_description}, ${product_category},
        ${product_brand || null}, ${product_model || null}, ${sku || null},
        ${price}, ${original_price || price}, ${finalDiscountPercentage || 0},
        ${finalDiscountAmount || 0}, ${currency || 'GBP'},
        ${stock_quantity || 0}, ${min_order_quantity || 1}, ${max_order_quantity || null},
        ${weight_kg || null}, ${dimensions || null}, ${material || null},
        ${color || null}, ${warranty_period_months || null},
        ${delivery_time_hours || null}, ${shipping_charges || 0},
        ${(stock_quantity || 0) > 0}
      )
      RETURNING *
    `;

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    if (error.message.includes('unique') || error.message.includes('duplicate')) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user?.sellerId;

    // Verify product belongs to seller
    const productCheck = await sql`
      SELECT seller_id FROM products WHERE id = ${id}
    `;

    if (productCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (sellerId && productCheck.rows[0].seller_id !== sellerId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this product'
      });
    }

    const updateFields = {};
    let hasUpdates = false;

    const fields = [
      'product_name', 'product_description', 'product_category', 'product_brand',
      'product_model', 'sku', 'price', 'original_price', 'discount_percentage',
      'discount_amount', 'currency', 'stock_quantity', 'min_order_quantity',
      'max_order_quantity', 'weight_kg', 'dimensions', 'material', 'color',
      'warranty_period_months', 'delivery_time_hours', 'shipping_charges',
      'is_active', 'is_featured', 'is_in_stock'
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
        hasUpdates = true;
      }
    });

    if (!hasUpdates) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    // Build SET clause
    const setParts = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updateFields)) {
      setParts.push(`${key} = $${paramCount++}`);
      values.push(value);
    }
    setParts.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE products
      SET ${setParts.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await sql.unsafe(query, values);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user?.sellerId;

    // Verify product belongs to seller
    const productCheck = await sql`
      SELECT seller_id FROM products WHERE id = ${id}
    `;

    if (productCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (sellerId && productCheck.rows[0].seller_id !== sellerId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this product'
      });
    }

    await sql`
      DELETE FROM products WHERE id = ${id}
    `;

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
};

// Get Products by Category (for service pages)
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const result = await sql`
      SELECT 
        p.*,
        s.seller_shop_name,
        s.seller_rating as seller_rating,
        COUNT(DISTINCT pr.id) as total_reviews_count,
        COALESCE(AVG(pr.rating), 0) as calculated_rating
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_visible = TRUE
      WHERE p.product_category = ${category} AND p.is_active = TRUE AND p.is_in_stock = TRUE
      GROUP BY p.id, s.id
      ORDER BY p.product_rating DESC, p.total_sales DESC
    `;

    // Get images for each product
    const productsWithImages = await Promise.all(
      result.rows.map(async (product) => {
        const imagesResult = await sql`
          SELECT image_url, is_primary, display_order
          FROM product_images
          WHERE product_id = ${product.id}
          ORDER BY is_primary DESC, display_order ASC
          LIMIT 1
        `;
        return {
          ...product,
          product_images: imagesResult.rows
        };
      })
    );

    res.json({
      success: true,
      data: {
        products: productsWithImages,
        category: category,
        count: productsWithImages.length
      }
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};
