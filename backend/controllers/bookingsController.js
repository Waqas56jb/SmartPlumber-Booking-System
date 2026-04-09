const {
  sql
} = require('../utils/db');
const getPlumberBookings = async (req, res) => {
  try {
    const plumberId = req.params.plumberId;
    const {
      status,
      date_from,
      date_to
    } = req.query;
    if (!plumberId) {
      return res.status(400).json({
        success: false,
        message: 'Plumber ID is required'
      });
    }
    let query = `
      SELECT 
        b.*,
        u.username as customer_name,
        u.email as customer_email,
        ps.service_name
      FROM bookings b
      LEFT JOIN users u ON b.customer_id = u.id
      LEFT JOIN plumber_services ps ON b.service_id = ps.id
      WHERE b.plumber_id = $1
    `;
    const params = [plumberId];
    let paramIndex = 2;
    if (status && status !== 'all') {
      query += ` AND b.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }
    if (date_from) {
      query += ` AND b.booking_date >= $${paramIndex}`;
      params.push(date_from);
      paramIndex++;
    }
    if (date_to) {
      query += ` AND b.booking_date <= $${paramIndex}`;
      params.push(date_to);
      paramIndex++;
    }
    query += ` ORDER BY b.booking_date DESC, b.booking_time DESC`;
    const {
      Client
    } = require('pg');
    const client = new Client({
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL
    });
    try {
      await client.connect();
      const result = await client.query(query, params);
      res.json({
        success: true,
        data: {
          bookings: result.rows
        }
      });
    } finally {
      await client.end();
    }
  } catch (error) {
    console.error('Get plumber bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};
const getBookingStats = async (req, res) => {
  try {
    const plumberId = req.params.plumberId;
    if (!plumberId) {
      return res.status(400).json({
        success: false,
        message: 'Plumber ID is required'
      });
    }
    const result = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
        COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_count,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_count,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
        COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_count,
        COUNT(*) as total_count,
        COALESCE(SUM(total_amount) FILTER (WHERE status = 'completed'), 0) as total_earnings,
        COUNT(*) FILTER (WHERE booking_date = CURRENT_DATE) as today_count,
        COUNT(*) FILTER (WHERE booking_date >= CURRENT_DATE AND booking_date < CURRENT_DATE + INTERVAL '7 days') as week_count
      FROM bookings 
      WHERE plumber_id = ${plumberId}
    `;
    const stats = result.rows?.[0] || result[0] || {
      pending_count: 0,
      confirmed_count: 0,
      in_progress_count: 0,
      completed_count: 0,
      cancelled_count: 0,
      total_count: 0,
      total_earnings: 0,
      today_count: 0,
      week_count: 0
    };
    res.json({
      success: true,
      data: {
        stats
      }
    });
  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking statistics',
      error: error.message
    });
  }
};
const updateBookingStatus = async (req, res) => {
  try {
    const {
      bookingId
    } = req.params;
    const {
      status,
      notes
    } = req.body;
    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }
    const result = await sql`
      UPDATE bookings SET
        status = ${status},
        plumber_notes = COALESCE(${notes}, plumber_notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${bookingId}
      RETURNING *
    `;
    if (!result.rows?.length && !result.length) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    const booking = result.rows?.[0] || result[0];
    if (status === 'completed') {
      await sql`
        UPDATE plumbers SET 
          plumber_completed_jobs = plumber_completed_jobs + 1,
          plumber_total_jobs = plumber_total_jobs + 1
        WHERE id = ${booking.plumber_id}
      `;
    } else if (status === 'cancelled') {
      await sql`
        UPDATE plumbers SET 
          plumber_cancelled_jobs = plumber_cancelled_jobs + 1
        WHERE id = ${booking.plumber_id}
      `;
    }
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: {
        booking
      }
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message
    });
  }
};
const getBookingDetails = async (req, res) => {
  try {
    const {
      bookingId
    } = req.params;
    const result = await sql`
      SELECT 
        b.*,
        u.username as customer_name,
        u.email as customer_email,
        ps.service_name,
        ps.service_description,
        p.full_name as plumber_name,
        p.phone_number as plumber_phone
      FROM bookings b
      LEFT JOIN users u ON b.customer_id = u.id
      LEFT JOIN plumber_services ps ON b.service_id = ps.id
      LEFT JOIN plumbers p ON b.plumber_id = p.id
      WHERE b.id = ${bookingId}
    `;
    if (!result.rows?.length && !result.length) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.json({
      success: true,
      data: {
        booking: result.rows?.[0] || result[0]
      }
    });
  } catch (error) {
    console.error('Get booking details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking details',
      error: error.message
    });
  }
};
const createBooking = async (req, res) => {
  try {
    const {
      customer_id,
      plumber_id,
      service_id,
      booking_date,
      booking_time,
      customer_address,
      customer_phone,
      customer_notes,
      total_amount
    } = req.body;
    if (!customer_id || !plumber_id || !booking_date) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID, Plumber ID, and booking date are required'
      });
    }
    const result = await sql`
      INSERT INTO bookings (
        customer_id, plumber_id, service_id,
        booking_date, booking_time,
        customer_address, customer_phone, customer_notes,
        total_amount, status
      ) VALUES (
        ${customer_id}, ${plumber_id}, ${service_id || null},
        ${booking_date}, ${booking_time || null},
        ${customer_address || null}, ${customer_phone || null}, ${customer_notes || null},
        ${total_amount || null}, 'pending'
      )
      RETURNING *
    `;
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking: result.rows?.[0] || result[0]
      }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};
module.exports = {
  getPlumberBookings,
  getBookingStats,
  updateBookingStatus,
  getBookingDetails,
  createBooking
};
