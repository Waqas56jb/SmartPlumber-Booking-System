const {
  sql
} = require('./db');
// i keep seller email and shop username unique like the other roles
const createSeller = async sellerData => {
  try {
    const existingSellerByEmail = await sql`
      SELECT * FROM sellers WHERE LOWER(seller_email) = LOWER(${sellerData.seller_email})
    `;
    if (existingSellerByEmail.rows.length > 0) {
      throw new Error('Seller with this email already exists');
    }
    const existingSellerByUsername = await sql`
      SELECT * FROM sellers WHERE LOWER(seller_username) = LOWER(${sellerData.seller_username})
    `;
    if (existingSellerByUsername.rows.length > 0) {
      throw new Error('Seller username is already taken');
    }
    const result = await sql`
      INSERT INTO sellers (seller_username, seller_email, seller_password, created_at, updated_at)
      VALUES (${sellerData.seller_username}, LOWER(${sellerData.seller_email}), ${sellerData.seller_password}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, seller_username, seller_email, created_at, updated_at
    `;
    return {
      id: result.rows[0].id.toString(),
      seller_username: result.rows[0].seller_username,
      seller_email: result.rows[0].seller_email,
      password: sellerData.seller_password,
      createdAt: result.rows[0].created_at,
      updatedAt: result.rows[0].updated_at
    };
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('already taken')) {
      throw error;
    }
    console.error('Error creating seller:', error);
    throw new Error('Error creating seller account');
  }
};
// i load seller row for login by email
const findSellerByEmail = async seller_email => {
  try {
    const result = await sql`
      SELECT * FROM sellers WHERE LOWER(seller_email) = LOWER(${seller_email})
    `;
    if (result.rows.length === 0) {
      return null;
    }
    const seller = result.rows[0];
    return {
      id: seller.id.toString(),
      seller_username: seller.seller_username,
      seller_email: seller.seller_email,
      password: seller.seller_password,
      createdAt: seller.created_at,
      updatedAt: seller.updated_at
    };
  } catch (error) {
    console.error('Error finding seller by email:', error);
    return null;
  }
};
// i load seller row when they sign in with username
const findSellerByUsername = async seller_username => {
  try {
    const result = await sql`
      SELECT * FROM sellers WHERE LOWER(seller_username) = LOWER(${seller_username})
    `;
    if (result.rows.length === 0) {
      return null;
    }
    const seller = result.rows[0];
    return {
      id: seller.id.toString(),
      seller_username: seller.seller_username,
      seller_email: seller.seller_email,
      password: seller.seller_password,
      createdAt: seller.created_at,
      updatedAt: seller.updated_at
    };
  } catch (error) {
    console.error('Error finding seller by username:', error);
    return null;
  }
};
// i patch password after seller completes reset flow
const updateSellerPassword = async (seller_email, hashedPassword) => {
  try {
    const result = await sql`
      UPDATE sellers 
      SET seller_password = ${hashedPassword}, updated_at = CURRENT_TIMESTAMP
      WHERE LOWER(seller_email) = LOWER(${seller_email})
      RETURNING id, seller_username, seller_email, updated_at
    `;
    if (result.rows.length === 0) {
      throw new Error('Seller not found');
    }
    const seller = result.rows[0];
    return {
      id: seller.id.toString(),
      seller_username: seller.seller_username,
      seller_email: seller.seller_email,
      updatedAt: seller.updated_at
    };
  } catch (error) {
    console.error('Error updating seller password:', error);
    throw error;
  }
};
// i boolean check for duplicate email on register
const sellerEmailExists = async seller_email => {
  try {
    const result = await sql`
      SELECT id FROM sellers WHERE LOWER(seller_email) = LOWER(${seller_email})
    `;
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking seller email existence:', error);
    return false;
  }
};
module.exports = {
  createSeller,
  findSellerByEmail,
  findSellerByUsername,
  updateSellerPassword,
  sellerEmailExists
};
