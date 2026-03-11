const { sql } = require('../utils/db');

// Get All Products (with optional filters)
const getAllProducts = async (req, res) => {
  try {
    const { seller_id, category, is_active, search } = req.query;

    // Use simple query without complex dynamic filtering for @vercel/postgres
    let result;
    
    if (seller_id && category && search) {
      const searchTerm = `%${search}%`;
      result = await sql`
        SELECT p.*, s.seller_shop_name, s.seller_rating as seller_rating
        FROM products p
        JOIN sellers s ON p.seller_id = s.id
        WHERE p.seller_id = ${seller_id} 
          AND p.product_category = ${category}
          AND (p.product_name ILIKE ${searchTerm} OR p.product_description ILIKE ${searchTerm})
        ORDER BY p.created_at DESC
      `;
    } else if (seller_id && category) {
      result = await sql`
        SELECT p.*, s.seller_shop_name, s.seller_rating as seller_rating
        FROM products p
        JOIN sellers s ON p.seller_id = s.id
        WHERE p.seller_id = ${seller_id} AND p.product_category = ${category}
        ORDER BY p.created_at DESC
      `;
    } else if (seller_id && search) {
      const searchTerm = `%${search}%`;
      result = await sql`
        SELECT p.*, s.seller_shop_name, s.seller_rating as seller_rating
        FROM products p
        JOIN sellers s ON p.seller_id = s.id
        WHERE p.seller_id = ${seller_id} 
          AND (p.product_name ILIKE ${searchTerm} OR p.product_description ILIKE ${searchTerm})
        ORDER BY p.created_at DESC
      `;
    } else if (seller_id) {
      result = await sql`
        SELECT p.*, s.seller_shop_name, s.seller_rating as seller_rating
        FROM products p
        JOIN sellers s ON p.seller_id = s.id
        WHERE p.seller_id = ${seller_id}
        ORDER BY p.created_at DESC
      `;
    } else if (category) {
      result = await sql`
        SELECT p.*, s.seller_shop_name, s.seller_rating as seller_rating
        FROM products p
        JOIN sellers s ON p.seller_id = s.id
        WHERE p.product_category = ${category}
        ORDER BY p.created_at DESC
      `;
    } else if (is_active !== undefined) {
      const activeStatus = is_active === 'true';
      result = await sql`
        SELECT p.*, s.seller_shop_name, s.seller_rating as seller_rating
        FROM products p
        JOIN sellers s ON p.seller_id = s.id
        WHERE p.is_active = ${activeStatus}
        ORDER BY p.created_at DESC
      `;
    } else {
      result = await sql`
        SELECT p.*, s.seller_shop_name, s.seller_rating as seller_rating
        FROM products p
        JOIN sellers s ON p.seller_id = s.id
        ORDER BY p.created_at DESC
        LIMIT 100
      `;
    }

    res.json({
      success: true,
      data: {
        products: result.rows || [],
        count: (result.rows || []).length
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
        s.seller_rating as seller_rating
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

    res.json({
      success: true,
      data: {
        product: productResult.rows[0]
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
    let finalDiscountPercentage = discount_percentage || 0;
    
    if (original_price && price && !discount_percentage) {
      finalDiscountPercentage = ((parseFloat(original_price) - parseFloat(price)) / parseFloat(original_price) * 100).toFixed(2);
    }

    const result = await sql`
      INSERT INTO products (
        seller_id, product_name, product_description, product_category,
        product_brand, product_model, sku, price, original_price,
        discount_percentage, currency,
        stock_quantity, min_order_quantity, max_order_quantity,
        weight_kg, dimensions, material, color, warranty_period_months,
        delivery_time_hours, shipping_charges, is_in_stock, is_active
      )
      VALUES (
        ${sellerId}, 
        ${product_name}, 
        ${product_description || null}, 
        ${product_category},
        ${product_brand || null}, 
        ${product_model || null}, 
        ${sku || null},
        ${parseFloat(price)}, 
        ${original_price ? parseFloat(original_price) : parseFloat(price)}, 
        ${parseFloat(finalDiscountPercentage)},
        ${currency || 'GBP'},
        ${parseInt(stock_quantity) || 0}, 
        ${parseInt(min_order_quantity) || 1}, 
        ${max_order_quantity ? parseInt(max_order_quantity) : null},
        ${weight_kg ? parseFloat(weight_kg) : null}, 
        ${dimensions || null}, 
        ${material || null},
        ${color || null}, 
        ${warranty_period_months ? parseInt(warranty_period_months) : null},
        ${delivery_time_hours ? parseFloat(delivery_time_hours) : null}, 
        ${parseFloat(shipping_charges) || 0},
        ${(parseInt(stock_quantity) || 0) > 0},
        true
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
    if (error.message && (error.message.includes('unique') || error.message.includes('duplicate'))) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating product: ' + error.message
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify product exists
    const productCheck = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;

    if (productCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
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
      shipping_charges,
      is_active
    } = req.body;

    // Calculate discount if not provided
    let finalDiscountPercentage = discount_percentage || 0;
    if (original_price && price && !discount_percentage) {
      finalDiscountPercentage = ((parseFloat(original_price) - parseFloat(price)) / parseFloat(original_price) * 100).toFixed(2);
    }

    const result = await sql`
      UPDATE products SET
        product_name = COALESCE(${product_name}, product_name),
        product_description = COALESCE(${product_description}, product_description),
        product_category = COALESCE(${product_category}, product_category),
        product_brand = COALESCE(${product_brand}, product_brand),
        product_model = COALESCE(${product_model}, product_model),
        sku = COALESCE(${sku}, sku),
        price = COALESCE(${price ? parseFloat(price) : null}, price),
        original_price = COALESCE(${original_price ? parseFloat(original_price) : null}, original_price),
        discount_percentage = ${parseFloat(finalDiscountPercentage)},
        currency = COALESCE(${currency}, currency),
        stock_quantity = COALESCE(${stock_quantity !== undefined ? parseInt(stock_quantity) : null}, stock_quantity),
        min_order_quantity = COALESCE(${min_order_quantity ? parseInt(min_order_quantity) : null}, min_order_quantity),
        max_order_quantity = ${max_order_quantity ? parseInt(max_order_quantity) : null},
        weight_kg = ${weight_kg ? parseFloat(weight_kg) : null},
        dimensions = COALESCE(${dimensions}, dimensions),
        material = COALESCE(${material}, material),
        color = COALESCE(${color}, color),
        warranty_period_months = ${warranty_period_months ? parseInt(warranty_period_months) : null},
        delivery_time_hours = ${delivery_time_hours ? parseFloat(delivery_time_hours) : null},
        shipping_charges = COALESCE(${shipping_charges !== undefined ? parseFloat(shipping_charges) : null}, shipping_charges),
        is_active = COALESCE(${is_active}, is_active),
        is_in_stock = ${(parseInt(stock_quantity) || productCheck.rows[0].stock_quantity || 0) > 0},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

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

    // Verify product exists
    const productCheck = await sql`
      SELECT seller_id FROM products WHERE id = ${id}
    `;

    if (productCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
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
        s.seller_rating as seller_rating
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      WHERE p.product_category = ${category} AND p.is_active = TRUE AND p.is_in_stock = TRUE
      ORDER BY p.product_rating DESC, p.total_sales DESC
    `;

    res.json({
      success: true,
      data: {
        products: result.rows || [],
        category: category,
        count: (result.rows || []).length
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
