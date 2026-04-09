const {
  sql
} = require('../utils/db');
const {
  findSellerByEmail
} = require('../utils/sellerService');
const {
  processBase64Image
} = require('../utils/imageService');
// i read seller row for dashboard settings using jwt id or explicit param
const getSellerProfile = async (req, res) => {
  try {
    const sellerId = req.params.id || req.user?.sellerId;
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: 'Seller ID is required'
      });
    }
    const result = await sql`
      SELECT 
        id, seller_username, seller_email, full_name, seller_shop_name, seller_bio,
        phone_number, email, cnic,
        shop_address, city, state, zip_code, country,
        latitude, longitude,
        delivery_available, delivery_radius_km, delivery_time_hours,
        delivery_charges, free_delivery_above,
        accepts_online_payment, accepts_cash_on_delivery, payment_methods,
        business_license, tax_id, experience_years,
        seller_rating, seller_total_sales, seller_total_orders,
        seller_completed_orders, seller_cancelled_orders, total_reviews,
        is_verified, is_active,
        created_at, updated_at
      FROM sellers
      WHERE id = ${sellerId}
    `;
    if (result.rows.length === 0) {
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
    console.error('Get seller profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching seller profile'
    });
  }
};
// i merge text fields and optional base64 shop image in one transaction flow
const updateSellerProfile = async (req, res) => {
  try {
    const sellerId = req.params.id || req.user?.sellerId;
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: 'Seller ID is required'
      });
    }
    const {
      full_name,
      seller_shop_name,
      seller_bio,
      phone_number,
      email,
      cnic,
      shop_address,
      city,
      state,
      zip_code,
      country,
      latitude,
      longitude,
      delivery_available,
      delivery_radius_km,
      delivery_time_hours,
      delivery_charges,
      free_delivery_above,
      accepts_online_payment,
      accepts_cash_on_delivery,
      payment_methods,
      business_license,
      tax_id,
      experience_years
    } = req.body;
    const updateFields = {};
    let hasUpdates = false;
    if (full_name !== undefined) {
      updateFields.full_name = full_name;
      hasUpdates = true;
    }
    if (seller_shop_name !== undefined) {
      updateFields.seller_shop_name = seller_shop_name;
      hasUpdates = true;
    }
    if (seller_bio !== undefined) {
      updateFields.seller_bio = seller_bio;
      hasUpdates = true;
    }
    if (phone_number !== undefined) {
      updateFields.phone_number = phone_number;
      hasUpdates = true;
    }
    if (email !== undefined) {
      updateFields.email = email;
      hasUpdates = true;
    }
    if (cnic !== undefined) {
      updateFields.cnic = cnic;
      hasUpdates = true;
    }
    if (shop_address !== undefined) {
      updateFields.shop_address = shop_address;
      hasUpdates = true;
    }
    if (city !== undefined) {
      updateFields.city = city;
      hasUpdates = true;
    }
    if (state !== undefined) {
      updateFields.state = state;
      hasUpdates = true;
    }
    if (zip_code !== undefined) {
      updateFields.zip_code = zip_code;
      hasUpdates = true;
    }
    if (country !== undefined) {
      updateFields.country = country;
      hasUpdates = true;
    }
    if (latitude !== undefined) {
      updateFields.latitude = latitude;
      hasUpdates = true;
    }
    if (longitude !== undefined) {
      updateFields.longitude = longitude;
      hasUpdates = true;
    }
    if (delivery_available !== undefined) {
      updateFields.delivery_available = delivery_available;
      hasUpdates = true;
    }
    if (delivery_radius_km !== undefined) {
      updateFields.delivery_radius_km = delivery_radius_km;
      hasUpdates = true;
    }
    if (delivery_time_hours !== undefined) {
      updateFields.delivery_time_hours = delivery_time_hours;
      hasUpdates = true;
    }
    if (delivery_charges !== undefined) {
      updateFields.delivery_charges = delivery_charges;
      hasUpdates = true;
    }
    if (free_delivery_above !== undefined) {
      updateFields.free_delivery_above = free_delivery_above;
      hasUpdates = true;
    }
    if (accepts_online_payment !== undefined) {
      updateFields.accepts_online_payment = accepts_online_payment;
      hasUpdates = true;
    }
    if (accepts_cash_on_delivery !== undefined) {
      updateFields.accepts_cash_on_delivery = accepts_cash_on_delivery;
      hasUpdates = true;
    }
    if (payment_methods !== undefined) {
      updateFields.payment_methods = payment_methods;
      hasUpdates = true;
    }
    if (business_license !== undefined) {
      updateFields.business_license = business_license;
      hasUpdates = true;
    }
    if (tax_id !== undefined) {
      updateFields.tax_id = tax_id;
      hasUpdates = true;
    }
    if (experience_years !== undefined) {
      updateFields.experience_years = experience_years;
      hasUpdates = true;
    }
    if (!hasUpdates) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    const arrayFields = {};
    const regularFields = {};
    for (const [key, value] of Object.entries(updateFields)) {
      if (key === 'payment_methods') {
        arrayFields[key] = Array.isArray(value) ? value.map(v => String(v)) : [];
      } else {
        const optionalTextFields = ['shop_address', 'cnic', 'business_license', 'tax_id', 'seller_bio', 'city', 'state', 'zip_code'];
        let finalValue = value;
        if (value === '' && optionalTextFields.includes(key)) {
          finalValue = null;
        } else if (value === undefined) {
          finalValue = null;
        }
        regularFields[key] = finalValue;
      }
    }
    const {
      Client
    } = require('pg');
    const client = new Client({
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL
    });
    try {
      await client.connect();
      await client.query('BEGIN');
      if (Object.keys(regularFields).length > 0) {
        const regularSetParts = [];
        const regularValues = [];
        let regParamCount = 1;
        for (const [key, value] of Object.entries(regularFields)) {
          regularSetParts.push(`${key} = $${regParamCount}`);
          regularValues.push(value);
          regParamCount++;
        }
        regularSetParts.push(`updated_at = CURRENT_TIMESTAMP`);
        regularValues.push(sellerId);
        await client.query(`UPDATE sellers SET ${regularSetParts.join(', ')} WHERE id = $${regParamCount}`, regularValues);
      }
      for (const [key, value] of Object.entries(arrayFields)) {
        await client.query(`UPDATE sellers SET ${key} = $1::text[] WHERE id = $2`, [value, sellerId]);
      }
      await client.query('COMMIT');
      const result = await client.query('SELECT * FROM sellers WHERE id = $1', [sellerId]);
      if (result.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({
          success: false,
          message: 'Seller not found'
        });
      }
      return res.json({
        success: true,
        message: 'Seller profile updated successfully',
        data: {
          seller: result.rows[0]
        }
      });
    } catch (error) {
      await client.query('ROLLBACK').catch(() => {});
      console.error('seller profile update', error.message);
      res.status(500).json({
        success: false,
        message: 'Error updating seller profile',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } finally {
      await client.end();
    }
  } catch (error) {
    console.error('Update seller profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating seller profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
module.exports = {
  getSellerProfile,
  updateSellerProfile
};
