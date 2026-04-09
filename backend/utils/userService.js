const {
  sql
} = require('./db');
// i block duplicate email and username before insert so the api can return clear errors
const createUser = async userData => {
  try {
    const existingUserByEmail = await sql`
      SELECT * FROM users WHERE LOWER(email) = LOWER(${userData.email})
    `;
    if (existingUserByEmail.rows.length > 0) {
      throw new Error('User with this email already exists');
    }
    const existingUserByUsername = await sql`
      SELECT * FROM users WHERE LOWER(username) = LOWER(${userData.username})
    `;
    if (existingUserByUsername.rows.length > 0) {
      throw new Error('Username is already taken');
    }
    const result = await sql`
      INSERT INTO users (username, email, password, created_at, updated_at)
      VALUES (${userData.username}, LOWER(${userData.email}), ${userData.password}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, username, email, created_at, updated_at
    `;
    return {
      id: result.rows[0].id.toString(),
      username: result.rows[0].username,
      email: result.rows[0].email,
      password: userData.password,
      createdAt: result.rows[0].created_at,
      updatedAt: result.rows[0].updated_at
    };
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('already taken')) {
      throw error;
    }
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }
};
// i normalize email with lower so login matches signup regardless of caps
const findUserByEmail = async email => {
  try {
    const result = await sql`
      SELECT * FROM users WHERE LOWER(email) = LOWER(${email})
    `;
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
};
// i use this for username login paths the same way as email
const findUserByUsername = async username => {
  try {
    const result = await sql`
      SELECT * FROM users WHERE LOWER(username) = LOWER(${username})
    `;
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  } catch (error) {
    console.error('Error finding user by username:', error);
    return null;
  }
};
// i update after bcrypt in the controller so the db never sees plain text
const updateUserPassword = async (email, hashedPassword) => {
  try {
    const result = await sql`
      UPDATE users 
      SET password = ${hashedPassword}, updated_at = CURRENT_TIMESTAMP
      WHERE LOWER(email) = LOWER(${email})
      RETURNING id, username, email, updated_at
    `;
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    const user = result.rows[0];
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      updatedAt: user.updated_at
    };
  } catch (error) {
    console.error('Error updating user password:', error);
    throw error;
  }
};
// i cheap check before signup to avoid a noisy insert error
const emailExists = async email => {
  try {
    const result = await sql`
      SELECT id FROM users WHERE LOWER(email) = LOWER(${email})
    `;
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};
module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUserPassword,
  emailExists
};
