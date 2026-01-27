const { sql } = require('../utils/db');
const { findPlumberByEmail } = require('../utils/plumberService');

// Get Plumber Profile
const getPlumberProfile = async (req, res) => {
  try {
    const plumberId = req.params.id || req.user?.plumberId;
    
    if (!plumberId) {
      return res.status(401).json({
        success: false,
        message: 'Plumber ID is required'
      });
    }

    const result = await sql`
      SELECT 
        id, plumber_username, plumber_email, full_name, plumber_bio,
        plumber_thumbnail_photo, phone_number, email, cnic,
        location_address, city, state, zip_code, country,
        latitude, longitude, location_updated_at,
        per_hour_charges, currency, minimum_charge,
        experience_years, license_number, certifications, specializations,
        plumber_rating, plumber_total_jobs, plumber_completed_jobs,
        plumber_cancelled_jobs, total_reviews,
        is_available, availability_schedule,
        is_verified, is_active,
        created_at, updated_at
      FROM plumbers
      WHERE id = ${plumberId}
    `;

    if (result.rows.length === 0) {
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
    console.error('Get plumber profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching plumber profile'
    });
  }
};

// Update Plumber Profile
const updatePlumberProfile = async (req, res) => {
  try {
    const plumberId = req.params.id || req.user?.plumberId;
    
    if (!plumberId) {
      return res.status(401).json({
        success: false,
        message: 'Plumber ID is required'
      });
    }

    const {
      full_name,
      plumber_bio,
      plumber_thumbnail_photo,
      phone_number,
      email,
      cnic,
      location_address,
      city,
      state,
      zip_code,
      country,
      latitude,
      longitude,
      per_hour_charges,
      currency,
      minimum_charge,
      experience_years,
      license_number,
      certifications,
      specializations,
      is_available,
      availability_schedule
    } = req.body;

    // Build update fields object
    const updateFields = {};
    let hasUpdates = false;

    if (full_name !== undefined) { updateFields.full_name = full_name; hasUpdates = true; }
    if (plumber_bio !== undefined) { updateFields.plumber_bio = plumber_bio; hasUpdates = true; }
    if (plumber_thumbnail_photo !== undefined) { updateFields.plumber_thumbnail_photo = plumber_thumbnail_photo; hasUpdates = true; }
    if (phone_number !== undefined) { updateFields.phone_number = phone_number; hasUpdates = true; }
    if (email !== undefined) { updateFields.email = email; hasUpdates = true; }
    if (cnic !== undefined) { updateFields.cnic = cnic; hasUpdates = true; }
    if (location_address !== undefined) { updateFields.location_address = location_address; hasUpdates = true; }
    if (city !== undefined) { updateFields.city = city; hasUpdates = true; }
    if (state !== undefined) { updateFields.state = state; hasUpdates = true; }
    if (zip_code !== undefined) { updateFields.zip_code = zip_code; hasUpdates = true; }
    if (country !== undefined) { updateFields.country = country; hasUpdates = true; }
    if (latitude !== undefined) { updateFields.latitude = latitude; hasUpdates = true; }
    if (longitude !== undefined) { updateFields.longitude = longitude; hasUpdates = true; }
    if (per_hour_charges !== undefined) { updateFields.per_hour_charges = per_hour_charges; hasUpdates = true; }
    if (currency !== undefined) { updateFields.currency = currency; hasUpdates = true; }
    if (minimum_charge !== undefined) { updateFields.minimum_charge = minimum_charge; hasUpdates = true; }
    if (experience_years !== undefined) { updateFields.experience_years = experience_years; hasUpdates = true; }
    if (license_number !== undefined) { updateFields.license_number = license_number; hasUpdates = true; }
    if (certifications !== undefined) { updateFields.certifications = certifications; hasUpdates = true; }
    if (specializations !== undefined) { updateFields.specializations = specializations; hasUpdates = true; }
    if (is_available !== undefined) { updateFields.is_available = is_available; hasUpdates = true; }
    if (availability_schedule !== undefined) { updateFields.availability_schedule = availability_schedule; hasUpdates = true; }
    
    if (latitude !== undefined || longitude !== undefined) {
      updateFields.location_updated_at = new Date();
    }

    if (!hasUpdates) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    // Build SET clause manually - Vercel Postgres compatible approach
    const setParts = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updateFields)) {
      // Handle special types
      if (key === 'certifications' || key === 'specializations') {
        // Arrays - pass as array
        setParts.push(`${key} = $${paramCount}::text[]`);
        values.push(Array.isArray(value) ? value : []);
        paramCount++;
      } else if (key === 'availability_schedule') {
        // JSONB fields - stringify the object
        if (value !== null && value !== undefined && typeof value === 'object' && Object.keys(value).length > 0) {
          setParts.push(`${key} = $${paramCount}::jsonb`);
          values.push(JSON.stringify(value));
        } else {
          setParts.push(`${key} = NULL::jsonb`);
        }
        paramCount++;
      } else if (key === 'location_updated_at') {
        // Timestamp handling
        setParts.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      } else {
        // Regular fields
        setParts.push(`${key} = $${paramCount}`);
        // Convert empty strings to null for optional text fields
        const optionalTextFields = ['location_address', 'cnic', 'license_number', 'plumber_bio', 'city', 'state', 'zip_code'];
        const finalValue = (value === '' && optionalTextFields.includes(key)) ? null : value;
        values.push(finalValue);
        paramCount++;
      }
    }
    setParts.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(plumberId);

    // Build the query string
    const queryString = `
      UPDATE plumbers
      SET ${setParts.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    // Execute query - try sql.unsafe first, fallback to pg if needed
    let result;
    if (sql.unsafe && typeof sql.unsafe === 'function') {
      result = await sql.unsafe(queryString, values);
    } else {
      // Fallback: Use pg library directly
      const { Client } = require('pg');
      const client = new Client({
        connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL
      });
      try {
        await client.connect();
        result = await client.query(queryString, values);
      } finally {
        await client.end();
      }
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Plumber not found'
      });
    }

    res.json({
      success: true,
      message: 'Plumber profile updated successfully',
      data: {
        plumber: result.rows[0]
      }
    });
  } catch (error) {
    console.error('Update plumber profile error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error updating plumber profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getPlumberProfile,
  updatePlumberProfile
};
