const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const plumberRoutes = require('./routes/plumberRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const {
  verifyEmailConfig
} = require('./utils/emailService');
const {
  initializeDatabase,
  sql
} = require('./utils/db');
dotenv.config();
const app = express();
const allowedOrigins = ['http://localhost:3000', 'https://smart-plumber-booking-system-7cbo.vercel.app', 'https://smart-plumber-booking-system.vercel.app', process.env.FRONTEND_URL].filter(Boolean);
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (req.method === 'OPTIONS') {
    if (allowedOrigins.includes(origin) || origin && origin.includes('vercel.app')) {
      res.header('Access-Control-Allow-Origin', origin);
    } else {
      res.header('Access-Control-Allow-Origin', '*');
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
    return res.sendStatus(204);
  }
  if (allowedOrigins.includes(origin) || origin && origin.includes('vercel.app')) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  next();
});
app.use(express.json({
  limit: '10mb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || origin && origin.includes('vercel.app')) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  return res.sendStatus(204);
});
app.use('/api/auth', authRoutes);
app.use('/api/plumber', plumberRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/products', require('./routes/productRoutes'));
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running'
  });
});
app.get('/api/services/available', async (req, res) => {
  try {
    const result = await sql`
      SELECT DISTINCT LOWER(TRIM(service_name)) AS service_name
      FROM plumber_services
      WHERE is_active = TRUE
    `;
    const names = (result.rows || result || []).map(row => row.service_name).filter(Boolean);
    res.json({
      success: true,
      data: {
        serviceNames: names
      }
    });
  } catch (error) {
    console.error('services', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching available services'
    });
  }
});
app.get('/api/admin/overview', async (req, res) => {
  try {
    const [userResult, plumberResult, sellerResult, productResult] = await Promise.all([sql`SELECT COUNT(*)::int AS count FROM users`, sql`SELECT 
            COUNT(*)::int AS count,
            COALESCE(SUM(plumber_total_jobs), 0)::int AS total_jobs,
            COALESCE(SUM(plumber_completed_jobs), 0)::int AS completed_jobs
          FROM plumbers`, sql`SELECT 
            COUNT(*)::int AS count,
            COALESCE(SUM(seller_total_sales), 0)::int AS total_sales
          FROM sellers`, sql`SELECT COUNT(*)::int AS count FROM products`]);
    const overview = {
      totalCustomers: userResult.rows?.[0]?.count || 0,
      totalPlumbers: plumberResult.rows?.[0]?.count || 0,
      totalSellers: sellerResult.rows?.[0]?.count || 0,
      totalProducts: productResult.rows?.[0]?.count || 0,
      totalPlumberJobs: plumberResult.rows?.[0]?.total_jobs || 0,
      totalCompletedJobs: plumberResult.rows?.[0]?.completed_jobs || 0,
      totalSellerSales: sellerResult.rows?.[0]?.total_sales || 0
    };
    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    console.error('admin overview', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin overview'
    });
  }
});
app.get('/api/admin/plumbers', async (req, res) => {
  try {
    const result = await sql`
      SELECT
        id,
        plumber_username,
        plumber_email,
        full_name,
        city,
        country,
        plumber_rating,
        plumber_total_jobs,
        plumber_completed_jobs,
        plumber_cancelled_jobs,
        is_available,
        is_verified,
        created_at
      FROM plumbers
      ORDER BY created_at DESC
    `;
    res.json({
      success: true,
      data: {
        plumbers: result.rows || []
      }
    });
  } catch (error) {
    console.error('admin plumbers', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching plumbers'
    });
  }
});
app.get('/api/admin/customers', async (req, res) => {
  try {
    const result = await sql`
      SELECT
        id,
        username,
        email,
        created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 200
    `;
    res.json({
      success: true,
      data: {
        customers: result.rows || []
      }
    });
  } catch (error) {
    console.error('admin customers', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching customers'
    });
  }
});
app.get('/api/admin/sellers', async (req, res) => {
  try {
    const result = await sql`
      SELECT
        id,
        seller_username,
        seller_email,
        seller_shop_name,
        city,
        country,
        seller_rating,
        seller_total_sales,
        seller_total_orders,
        seller_completed_orders,
        seller_cancelled_orders,
        created_at
      FROM sellers
      ORDER BY created_at DESC
    `;
    res.json({
      success: true,
      data: {
        sellers: result.rows || []
      }
    });
  } catch (error) {
    console.error('admin sellers', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching sellers'
    });
  }
});
app.get('/api/admin/products', async (req, res) => {
  try {
    const result = await sql`
      SELECT
        p.id,
        p.product_name,
        p.product_category,
        p.price,
        p.original_price,
        p.discount_percentage,
        p.currency,
        p.stock_quantity,
        p.total_sales,
        p.product_rating,
        p.total_reviews,
        p.is_active,
        p.is_in_stock,
        p.created_at,
        s.seller_shop_name,
        s.seller_rating AS seller_rating
      FROM products p
      LEFT JOIN sellers s ON p.seller_id = s.id
      ORDER BY p.created_at DESC
      LIMIT 300
    `;
    res.json({
      success: true,
      data: {
        products: result.rows || []
      }
    });
  } catch (error) {
    console.error('admin products', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});
app.patch('/api/admin/plumbers/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      full_name,
      city,
      country,
      plumber_rating,
      is_verified,
      is_available
    } = req.body;
    const result = await sql`
      UPDATE plumbers SET
        full_name = COALESCE(${full_name}, full_name),
        city = COALESCE(${city}, city),
        country = COALESCE(${country}, country),
        plumber_rating = COALESCE(${plumber_rating}, plumber_rating),
        is_verified = COALESCE(${is_verified}, is_verified),
        is_available = COALESCE(${is_available}, is_available),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, plumber_username, plumber_email, full_name, city, country,
        plumber_rating, plumber_total_jobs, plumber_completed_jobs, plumber_cancelled_jobs,
        is_available, is_verified, created_at
    `;
    if (!result.rows?.length) {
      return res.status(404).json({
        success: false,
        message: 'Plumber not found'
      });
    }
    res.json({
      success: true,
      data: {
        plumber: result.rows[0]
      }
    });
  } catch (error) {
    console.error('admin update plumber', error.message);
    res.status(500).json({
      success: false,
      message: 'Error updating plumber'
    });
  }
});
app.patch('/api/admin/customers/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      username,
      email
    } = req.body;
    const result = await sql`
      UPDATE users SET
        username = COALESCE(${username}, username),
        email = COALESCE(${email}, email),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, username, email, created_at
    `;
    if (!result.rows?.length) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }
    res.json({
      success: true,
      data: {
        customer: result.rows[0]
      }
    });
  } catch (error) {
    console.error('admin update customer', error.message);
    res.status(500).json({
      success: false,
      message: 'Error updating customer'
    });
  }
});
app.patch('/api/admin/sellers/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      seller_shop_name,
      city,
      country,
      seller_rating,
      is_verified,
      is_active
    } = req.body;
    const result = await sql`
      UPDATE sellers SET
        seller_shop_name = COALESCE(${seller_shop_name}, seller_shop_name),
        city = COALESCE(${city}, city),
        country = COALESCE(${country}, country),
        seller_rating = COALESCE(${seller_rating}, seller_rating),
        is_verified = COALESCE(${is_verified}, is_verified),
        is_active = COALESCE(${is_active}, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, seller_username, seller_email, seller_shop_name, city, country,
        seller_rating, seller_total_sales, seller_total_orders, seller_completed_orders,
        seller_cancelled_orders, is_verified, is_active, created_at
    `;
    if (!result.rows?.length) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }
    res.json({
      success: true,
      data: {
        seller: result.rows[0]
      }
    });
  } catch (error) {
    console.error('admin update seller', error.message);
    res.status(500).json({
      success: false,
      message: 'Error updating seller'
    });
  }
});
app.patch('/api/admin/products/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      product_name,
      product_category,
      price,
      stock_quantity,
      is_active
    } = req.body;
    const result = await sql`
      UPDATE products SET
        product_name = COALESCE(${product_name}, product_name),
        product_category = COALESCE(${product_category}, product_category),
        price = COALESCE(${price}, price),
        stock_quantity = COALESCE(${stock_quantity}, stock_quantity),
        is_active = COALESCE(${is_active}, is_active),
        is_in_stock = COALESCE(${stock_quantity}, stock_quantity) > 0 OR is_in_stock,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id, product_name, product_category, price, original_price, discount_percentage,
        currency, stock_quantity, total_sales, product_rating, total_reviews, is_active, is_in_stock,
        created_at
    `;
    if (!result.rows?.length) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.json({
      success: true,
      data: {
        product: result.rows[0]
      }
    });
  } catch (error) {
    console.error('admin update product', error.message);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
});
app.delete('/api/admin/plumbers/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await sql`DELETE FROM plumbers WHERE id = ${id}`;
    res.json({
      success: true
    });
  } catch (error) {
    console.error('admin delete plumber', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting plumber'
    });
  }
});
app.delete('/api/admin/customers/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await sql`DELETE FROM users WHERE id = ${id}`;
    res.json({
      success: true
    });
  } catch (error) {
    console.error('admin delete customer', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting customer'
    });
  }
});
app.delete('/api/admin/sellers/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await sql`DELETE FROM sellers WHERE id = ${id}`;
    res.json({
      success: true
    });
  } catch (error) {
    console.error('admin delete seller', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting seller'
    });
  }
});
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await sql`DELETE FROM products WHERE id = ${id}`;
    res.json({
      success: true
    });
  } catch (error) {
    console.error('admin delete product', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
});
app.get('/api/admin/analytics/users-per-week', async (req, res) => {
  try {
    const result = await sql`
      SELECT 
        DATE_TRUNC('week', created_at)::date AS week,
        COUNT(*) FILTER (WHERE TRUE)::int AS total
      FROM users
      GROUP BY week
      ORDER BY week ASC
      LIMIT 12
    `;
    const points = (result.rows || []).map(row => ({
      label: row.week.toISOString().slice(0, 10),
      customers: row.total,
      plumbers: 0,
      sellers: 0
    }));
    res.json({
      success: true,
      data: {
        points
      }
    });
  } catch (error) {
    console.error('admin users week', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching user analytics'
    });
  }
});
app.get('/api/admin/analytics/bookings-per-day', async (req, res) => {
  try {
    const result = await sql`
      SELECT 
        booking_date AS day,
        COUNT(*)::int AS count
      FROM bookings
      GROUP BY booking_date
      ORDER BY booking_date ASC
      LIMIT 14
    `;
    const points = (result.rows || []).map(row => ({
      label: row.day.toISOString().slice(0, 10),
      count: row.count
    }));
    res.json({
      success: true,
      data: {
        points
      }
    });
  } catch (error) {
    console.error('admin bookings day', error.message);
    res.json({
      success: true,
      data: {
        points: []
      }
    });
  }
});
app.get('/api/admin/analytics/top-plumbers', async (req, res) => {
  try {
    const result = await sql`
      SELECT 
        id,
        COALESCE(full_name, plumber_username) AS name,
        plumber_rating,
        plumber_completed_jobs
      FROM plumbers
      ORDER BY plumber_completed_jobs DESC NULLS LAST, plumber_rating DESC NULLS LAST
      LIMIT 4
    `;
    const points = (result.rows || []).map(row => ({
      name: row.name || 'Plumber',
      completed: row.plumber_completed_jobs || 0,
      rating: parseFloat(row.plumber_rating) || 0
    }));
    res.json({
      success: true,
      data: {
        points
      }
    });
  } catch (error) {
    console.error('admin top plumbers', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching top plumbers'
    });
  }
});
app.get('/api/admin/analytics/top-products', async (req, res) => {
  try {
    const result = await sql`
      SELECT 
        product_name,
        total_sales,
        product_rating
      FROM products
      ORDER BY total_sales DESC NULLS LAST, product_rating DESC NULLS LAST
      LIMIT 4
    `;
    const points = (result.rows || []).map(row => ({
      name: row.product_name || 'Product',
      sales: row.total_sales || 0,
      rating: parseFloat(row.product_rating) || 0
    }));
    res.json({
      success: true,
      data: {
        points
      }
    });
  } catch (error) {
    console.error('admin top products', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching top products'
    });
  }
});
app.use((req, res) => {
  if (process.env.DEBUG_LOGS === 'true') {
    console.log('404', req.method, req.path);
  }
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});
app.use((err, req, res, next) => {
  console.error('handler', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});
module.exports = app;
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    console.log('port', PORT);
    try {
      await initializeDatabase();
      await verifyEmailConfig();
    } catch (error) {
      console.error('init error', error.message);
    }
  });
}
