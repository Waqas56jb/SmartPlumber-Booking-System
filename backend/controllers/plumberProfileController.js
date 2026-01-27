const { sql } = require('../utils/db');
const { findPlumberByEmail } = require('../utils/plumberService');
const { processBase64Image } = require('../utils/imageService');

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

    let {
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

    // Handle image upload if provided as base64
    if (plumber_thumbnail_photo && typeof plumber_thumbnail_photo === 'string' && plumber_thumbnail_photo.startsWith('data:image')) {
      const imageResult = processBase64Image(plumber_thumbnail_photo);
      if (imageResult.error) {
        return res.status(400).json({
          success: false,
          message: imageResult.error
        });
      }
      // Store the data URL in database (Vercel compatible - no external storage needed)
      plumber_thumbnail_photo = imageResult.dataUrl;
    }

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

    // Build SET clause - use individual UPDATE statements for complex types
    // This avoids parameter type inference issues
    const { Client } = require('pg');
    const client = new Client({
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL
    });
    
    try {
      await client.connect();
      
      // Start transaction
      await client.query('BEGIN');
      
      // Update regular fields first
      const regularFields = {};
      const arrayFields = {};
      const jsonbFields = {};
      
      for (const [key, value] of Object.entries(updateFields)) {
        if (key === 'certifications' || key === 'specializations') {
          arrayFields[key] = Array.isArray(value) ? value.map(v => String(v)) : [];
        } else if (key === 'availability_schedule') {
          jsonbFields[key] = value;
        } else if (key !== 'location_updated_at') {
          const optionalTextFields = ['location_address', 'cnic', 'license_number', 'plumber_bio', 'city', 'state', 'zip_code', 'plumber_thumbnail_photo'];
          let finalValue = value;
          if (value === '' && optionalTextFields.includes(key)) {
            finalValue = null;
          } else if (value === undefined) {
            finalValue = null;
          }
          regularFields[key] = finalValue;
        }
      }
      
      // Update regular fields
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
        regularValues.push(plumberId);
        
        await client.query(
          `UPDATE plumbers SET ${regularSetParts.join(', ')} WHERE id = $${regParamCount}`,
          regularValues
        );
      }
      
      // Update array fields
      for (const [key, value] of Object.entries(arrayFields)) {
        await client.query(
          `UPDATE plumbers SET ${key} = $1::text[] WHERE id = $2`,
          [value, plumberId]
        );
      }
      
      // Update JSONB fields
      for (const [key, value] of Object.entries(jsonbFields)) {
        if (value !== null && value !== undefined && typeof value === 'object' && Object.keys(value).length > 0) {
          await client.query(
            `UPDATE plumbers SET ${key} = $1::jsonb WHERE id = $2`,
            [JSON.stringify(value), plumberId]
          );
        } else {
          await client.query(
            `UPDATE plumbers SET ${key} = NULL::jsonb WHERE id = $1`,
            [plumberId]
          );
        }
      }
      
      // Update location_updated_at if needed
      if (updateFields.location_updated_at !== undefined) {
        await client.query(
          `UPDATE plumbers SET location_updated_at = $1 WHERE id = $2`,
          [updateFields.location_updated_at, plumberId]
        );
      }
      
      // Fetch updated record before committing to verify it exists
      const checkResult = await client.query('SELECT id FROM plumbers WHERE id = $1', [plumberId]);
      
      if (checkResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({
          success: false,
          message: 'Plumber not found'
        });
      }
      
      // Commit transaction
      await client.query('COMMIT');
      
      // Fetch updated record
      const result = await client.query('SELECT * FROM plumbers WHERE id = $1', [plumberId]);
      
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
      console.error('Error details:', queryError.message);
      console.error('Error stack:', queryError.stack);
      throw queryError;
    } finally {
      await client.end();
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
