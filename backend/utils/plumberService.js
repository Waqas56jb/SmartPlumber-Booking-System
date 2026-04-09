const {
  sql
} = require('./db');
const createPlumber = async plumberData => {
  try {
    const existingPlumberByEmail = await sql`
      SELECT * FROM plumbers WHERE LOWER(plumber_email) = LOWER(${plumberData.plumber_email})
    `;
    if (existingPlumberByEmail.rows.length > 0) {
      throw new Error('Plumber with this email already exists');
    }
    const existingPlumberByUsername = await sql`
      SELECT * FROM plumbers WHERE LOWER(plumber_username) = LOWER(${plumberData.plumber_username})
    `;
    if (existingPlumberByUsername.rows.length > 0) {
      throw new Error('Plumber username is already taken');
    }
    const result = await sql`
      INSERT INTO plumbers (plumber_username, plumber_email, plumber_password, created_at, updated_at)
      VALUES (${plumberData.plumber_username}, LOWER(${plumberData.plumber_email}), ${plumberData.plumber_password}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, plumber_username, plumber_email, created_at, updated_at
    `;
    return {
      id: result.rows[0].id.toString(),
      plumber_username: result.rows[0].plumber_username,
      plumber_email: result.rows[0].plumber_email,
      password: plumberData.plumber_password,
      createdAt: result.rows[0].created_at,
      updatedAt: result.rows[0].updated_at
    };
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('already taken')) {
      throw error;
    }
    console.error('Error creating plumber:', error);
    throw new Error('Error creating plumber account');
  }
};
const findPlumberByEmail = async plumber_email => {
  try {
    const result = await sql`
      SELECT * FROM plumbers WHERE LOWER(plumber_email) = LOWER(${plumber_email})
    `;
    if (result.rows.length === 0) {
      return null;
    }
    const plumber = result.rows[0];
    return {
      id: plumber.id.toString(),
      plumber_username: plumber.plumber_username,
      plumber_email: plumber.plumber_email,
      password: plumber.plumber_password,
      createdAt: plumber.created_at,
      updatedAt: plumber.updated_at
    };
  } catch (error) {
    console.error('Error finding plumber by email:', error);
    return null;
  }
};
const findPlumberByUsername = async plumber_username => {
  try {
    const result = await sql`
      SELECT * FROM plumbers WHERE LOWER(plumber_username) = LOWER(${plumber_username})
    `;
    if (result.rows.length === 0) {
      return null;
    }
    const plumber = result.rows[0];
    return {
      id: plumber.id.toString(),
      plumber_username: plumber.plumber_username,
      plumber_email: plumber.plumber_email,
      password: plumber.plumber_password,
      createdAt: plumber.created_at,
      updatedAt: plumber.updated_at
    };
  } catch (error) {
    console.error('Error finding plumber by username:', error);
    return null;
  }
};
const updatePlumberPassword = async (plumber_email, hashedPassword) => {
  try {
    const result = await sql`
      UPDATE plumbers 
      SET plumber_password = ${hashedPassword}, updated_at = CURRENT_TIMESTAMP
      WHERE LOWER(plumber_email) = LOWER(${plumber_email})
      RETURNING id, plumber_username, plumber_email, updated_at
    `;
    if (result.rows.length === 0) {
      throw new Error('Plumber not found');
    }
    const plumber = result.rows[0];
    return {
      id: plumber.id.toString(),
      plumber_username: plumber.plumber_username,
      plumber_email: plumber.plumber_email,
      updatedAt: plumber.updated_at
    };
  } catch (error) {
    console.error('Error updating plumber password:', error);
    throw error;
  }
};
const plumberEmailExists = async plumber_email => {
  try {
    const result = await sql`
      SELECT id FROM plumbers WHERE LOWER(plumber_email) = LOWER(${plumber_email})
    `;
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking plumber email existence:', error);
    return false;
  }
};
module.exports = {
  createPlumber,
  findPlumberByEmail,
  findPlumberByUsername,
  updatePlumberPassword,
  plumberEmailExists
};
