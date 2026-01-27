const { sql } = require('../utils/db');

// Get all services for a plumber
const getPlumberServices = async (req, res) => {
  try {
    const plumberId = req.params.plumberId;
    
    if (!plumberId) {
      return res.status(400).json({
        success: false,
        message: 'Plumber ID is required'
      });
    }

    const result = await sql`
      SELECT * FROM plumber_services 
      WHERE plumber_id = ${plumberId}
      ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      data: {
        services: result.rows || result
      }
    });
  } catch (error) {
    console.error('Get plumber services error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};

// Get single service
const getPlumberService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    
    const result = await sql`
      SELECT * FROM plumber_services WHERE id = ${serviceId}
    `;

    if (!result.rows?.length && !result.length) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: {
        service: result.rows?.[0] || result[0]
      }
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error.message
    });
  }
};

// Create a new service
const createPlumberService = async (req, res) => {
  try {
    const { plumber_id, service_name, service_description, price, price_type, duration_hours, is_active } = req.body;
    
    if (!plumber_id || !service_name) {
      return res.status(400).json({
        success: false,
        message: 'Plumber ID and service name are required'
      });
    }

    const result = await sql`
      INSERT INTO plumber_services (
        plumber_id, service_name, service_description, price, 
        price_type, duration_hours, is_active
      ) VALUES (
        ${plumber_id}, 
        ${service_name}, 
        ${service_description || null}, 
        ${price || null},
        ${price_type || 'hourly'}, 
        ${duration_hours || null}, 
        ${is_active !== undefined ? is_active : true}
      )
      RETURNING *
    `;

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: {
        service: result.rows?.[0] || result[0]
      }
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating service',
      error: error.message
    });
  }
};

// Update a service
const updatePlumberService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { service_name, service_description, price, price_type, duration_hours, is_active } = req.body;
    
    const result = await sql`
      UPDATE plumber_services SET
        service_name = COALESCE(${service_name}, service_name),
        service_description = COALESCE(${service_description}, service_description),
        price = COALESCE(${price}, price),
        price_type = COALESCE(${price_type}, price_type),
        duration_hours = COALESCE(${duration_hours}, duration_hours),
        is_active = COALESCE(${is_active}, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${serviceId}
      RETURNING *
    `;

    if (!result.rows?.length && !result.length) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: {
        service: result.rows?.[0] || result[0]
      }
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
};

// Delete a service
const deletePlumberService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    
    const result = await sql`
      DELETE FROM plumber_services WHERE id = ${serviceId} RETURNING *
    `;

    if (!result.rows?.length && !result.length) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};

// Toggle service active status
const toggleServiceStatus = async (req, res) => {
  try {
    const { serviceId } = req.params;
    
    const result = await sql`
      UPDATE plumber_services 
      SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${serviceId}
      RETURNING *
    `;

    if (!result.rows?.length && !result.length) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const service = result.rows?.[0] || result[0];
    res.json({
      success: true,
      message: `Service ${service.is_active ? 'activated' : 'deactivated'} successfully`,
      data: { service }
    });
  } catch (error) {
    console.error('Toggle service status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling service status',
      error: error.message
    });
  }
};

module.exports = {
  getPlumberServices,
  getPlumberService,
  createPlumberService,
  updatePlumberService,
  deletePlumberService,
  toggleServiceStatus
};
