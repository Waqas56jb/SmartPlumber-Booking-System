const { sql } = require('../utils/db');

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
        phone_number, email, cnic,
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

    const { Client } = require('pg');
    const client = new Client({
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL
    });

    try {
      await client.connect();
      await client.query('BEGIN');

      // Extract and validate fields from request
      const {
        full_name,
        plumber_bio,
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

      // Helper function to convert empty strings to null
      const toNull = (val) => (val === '' || val === undefined) ? null : val;
      
      // Helper function to convert to number or null
      const toNumber = (val) => {
        if (val === '' || val === null || val === undefined) return null;
        const num = parseFloat(val);
        return isNaN(num) ? null : num;
      };

      // Helper function to convert to integer or null
      const toInt = (val) => {
        if (val === '' || val === null || val === undefined) return null;
        const num = parseInt(val);
        return isNaN(num) ? null : num;
      };

      // Update text fields individually to avoid parameter type issues
      if (full_name !== undefined) {
        await client.query('UPDATE plumbers SET full_name = $1 WHERE id = $2', [toNull(full_name), plumberId]);
      }
      if (plumber_bio !== undefined) {
        await client.query('UPDATE plumbers SET plumber_bio = $1 WHERE id = $2', [toNull(plumber_bio), plumberId]);
      }
      if (phone_number !== undefined) {
        await client.query('UPDATE plumbers SET phone_number = $1 WHERE id = $2', [toNull(phone_number), plumberId]);
      }
      if (email !== undefined) {
        await client.query('UPDATE plumbers SET email = $1 WHERE id = $2', [toNull(email), plumberId]);
      }
      if (cnic !== undefined) {
        await client.query('UPDATE plumbers SET cnic = $1 WHERE id = $2', [toNull(cnic), plumberId]);
      }
      if (location_address !== undefined) {
        await client.query('UPDATE plumbers SET location_address = $1 WHERE id = $2', [toNull(location_address), plumberId]);
      }
      if (city !== undefined) {
        await client.query('UPDATE plumbers SET city = $1 WHERE id = $2', [toNull(city), plumberId]);
      }
      if (state !== undefined) {
        await client.query('UPDATE plumbers SET state = $1 WHERE id = $2', [toNull(state), plumberId]);
      }
      if (zip_code !== undefined) {
        await client.query('UPDATE plumbers SET zip_code = $1 WHERE id = $2', [toNull(zip_code), plumberId]);
      }
      if (country !== undefined) {
        await client.query('UPDATE plumbers SET country = $1 WHERE id = $2', [toNull(country), plumberId]);
      }
      if (license_number !== undefined) {
        await client.query('UPDATE plumbers SET license_number = $1 WHERE id = $2', [toNull(license_number), plumberId]);
      }
      if (currency !== undefined) {
        await client.query('UPDATE plumbers SET currency = $1 WHERE id = $2', [toNull(currency), plumberId]);
      }

      // Update numeric fields
      if (latitude !== undefined) {
        await client.query('UPDATE plumbers SET latitude = $1 WHERE id = $2', [toNumber(latitude), plumberId]);
      }
      if (longitude !== undefined) {
        await client.query('UPDATE plumbers SET longitude = $1 WHERE id = $2', [toNumber(longitude), plumberId]);
      }
      if (per_hour_charges !== undefined) {
        await client.query('UPDATE plumbers SET per_hour_charges = $1 WHERE id = $2', [toNumber(per_hour_charges), plumberId]);
      }
      if (minimum_charge !== undefined) {
        await client.query('UPDATE plumbers SET minimum_charge = $1 WHERE id = $2', [toNumber(minimum_charge), plumberId]);
      }
      if (experience_years !== undefined) {
        await client.query('UPDATE plumbers SET experience_years = $1 WHERE id = $2', [toInt(experience_years), plumberId]);
      }

      // Update boolean fields
      if (is_available !== undefined) {
        await client.query('UPDATE plumbers SET is_available = $1 WHERE id = $2', [Boolean(is_available), plumberId]);
      }

      // Update array fields (certifications, specializations)
      if (certifications !== undefined) {
        const certArray = Array.isArray(certifications) ? certifications.filter(c => c) : [];
        await client.query('UPDATE plumbers SET certifications = $1::text[] WHERE id = $2', [certArray, plumberId]);
      }
      if (specializations !== undefined) {
        const specArray = Array.isArray(specializations) ? specializations.filter(s => s) : [];
        await client.query('UPDATE plumbers SET specializations = $1::text[] WHERE id = $2', [specArray, plumberId]);
      }

      // Update JSONB fields (availability_schedule) - only if it has data
      if (availability_schedule !== undefined && typeof availability_schedule === 'object') {
        const hasData = availability_schedule && Object.keys(availability_schedule).length > 0;
        if (hasData) {
          await client.query('UPDATE plumbers SET availability_schedule = $1::jsonb WHERE id = $2', [JSON.stringify(availability_schedule), plumberId]);
        }
        // If empty object, don't update - leave existing value
      }

      // Update location timestamp if coordinates changed
      if (latitude !== undefined || longitude !== undefined) {
        await client.query('UPDATE plumbers SET location_updated_at = CURRENT_TIMESTAMP WHERE id = $1', [plumberId]);
      }

      // Update the updated_at timestamp
      await client.query('UPDATE plumbers SET updated_at = CURRENT_TIMESTAMP WHERE id = $1', [plumberId]);

      // Commit transaction
      await client.query('COMMIT');

      // Fetch updated record
      const result = await client.query('SELECT * FROM plumbers WHERE id = $1', [plumberId]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Plumber not found'
        });
      }

      return res.json({
        success: true,
        message: 'Plumber profile updated successfully',
        data: {
          plumber: result.rows[0]
        }
      });
    } catch (queryError) {
      await client.query('ROLLBACK').catch(() => {});
      console.error('Query execution error:', queryError);
      throw queryError;
    } finally {
      await client.end();
    }
  } catch (error) {
    console.error('Update plumber profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating plumber profile',
      error: error.message
    });
  }
};

// Get All Plumbers (for customers to find plumbers)
const getAllPlumbers = async (req, res) => {
  try {
    // Get ALL plumbers from database - no filtering
    // Using SELECT * to get all columns that exist in the database
    const result = await sql`
      SELECT *
      FROM plumbers
      ORDER BY plumber_rating DESC NULLS LAST, plumber_total_jobs DESC NULLS LAST, created_at DESC
    `;

    // Map the results to ensure consistent structure
    const plumbers = (result.rows || []).map(plumber => ({
      id: plumber.id,
      plumber_username: plumber.plumber_username,
      plumber_email: plumber.plumber_email,
      full_name: plumber.full_name || plumber.plumber_username,
      plumber_bio: plumber.plumber_bio || '',
      phone_number: plumber.phone_number || plumber.plumber_phone || '',
      email: plumber.email || plumber.plumber_email,
      location_address: plumber.location_address || plumber.plumber_location || '',
      city: plumber.city || '',
      state: plumber.state || '',
      country: plumber.country || 'UK',
      per_hour_charges: plumber.per_hour_charges || '0.00',
      currency: plumber.currency || 'GBP',
      minimum_charge: plumber.minimum_charge || '0.00',
      experience_years: plumber.experience_years || 0,
      license_number: plumber.license_number || '',
      certifications: plumber.certifications || [],
      specializations: plumber.specializations || [],
      plumber_rating: plumber.plumber_rating || '0.00',
      plumber_total_jobs: plumber.plumber_total_jobs || 0,
      plumber_completed_jobs: plumber.plumber_completed_jobs || 0,
      total_reviews: plumber.total_reviews || 0,
      is_available: plumber.is_available !== false,
      is_verified: plumber.is_verified || false,
      created_at: plumber.created_at
    }));

    console.log(`Found ${plumbers.length} plumbers in database`);

    res.json({
      success: true,
      data: {
        plumbers: plumbers,
        count: plumbers.length
      }
    });
  } catch (error) {
    console.error('Get all plumbers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching plumbers',
      error: error.message
    });
  }
};

module.exports = {
  getPlumberProfile,
  updatePlumberProfile,
  getAllPlumbers
};
