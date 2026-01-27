const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP, storeOTP, verifyOTP, deleteOTP } = require('../utils/otpService');
const { sendEmail } = require('../utils/emailService');
const { createSeller, findSellerByEmail, findSellerByUsername, updateSellerPassword, sellerEmailExists } = require('../utils/sellerService');

// Seller Signup
const sellerSignup = async (req, res) => {
  try {
    const { seller_username, seller_email, seller_password } = req.body;

    // Check if seller already exists
    const existingSellerByEmail = await findSellerByEmail(seller_email);
    if (existingSellerByEmail) {
      return res.status(400).json({
        success: false,
        message: 'Seller with this email already exists'
      });
    }

    const existingSellerByUsername = await findSellerByUsername(seller_username);
    if (existingSellerByUsername) {
      return res.status(400).json({
        success: false,
        message: 'Seller username is already taken'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(seller_password, 10);

    // Create seller
    const seller = await createSeller({
      seller_username,
      seller_email,
      seller_password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { sellerId: seller.id, seller_email: seller.seller_email, userType: 'seller' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Seller account created successfully',
      data: {
        seller: {
          id: seller.id,
          seller_username: seller.seller_username,
          seller_email: seller.seller_email
        },
        token
      }
    });
  } catch (error) {
    console.error('Seller signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating seller account. Please try again.'
    });
  }
};

// Seller Login
const sellerLogin = async (req, res) => {
  try {
    const { seller_email, seller_password } = req.body;

    // Find seller by email or username
    let seller = await findSellerByEmail(seller_email);
    if (!seller) {
      seller = await findSellerByUsername(seller_email);
    }

    if (!seller) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(seller_password, seller.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { sellerId: seller.id, seller_email: seller.seller_email, userType: 'seller' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Seller login successful',
      data: {
        seller: {
          id: seller.id,
          seller_username: seller.seller_username,
          seller_email: seller.seller_email
        },
        token
      }
    });
  } catch (error) {
    console.error('Seller login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during seller login. Please try again.'
    });
  }
};

// Seller Forgot Password
const sellerForgotPassword = async (req, res) => {
  try {
    const { seller_email } = req.body;

    // First verify that the email exists in the database
    const emailExistsInDb = await sellerEmailExists(seller_email);
    if (!emailExistsInDb) {
      return res.status(404).json({
        success: false,
        message: 'Seller email not found in our database. Please check your email address or sign up first.'
      });
    }

    // Generate and store OTP
    const otp = generateOTP();
    storeOTP(seller_email, otp, 'seller');

    // Send OTP via email
    const emailSent = await sendEmail({
      to: seller_email,
      subject: 'Password Reset OTP - BP Heating & Plumbing (Seller)',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #D2A752;">Password Reset Request - Seller Portal</h2>
          <p>Hello,</p>
          <p>You have requested to reset your seller account password. Please use the following OTP to proceed:</p>
          <div style="background-color: #F5E6D3; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #D2A752; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p><strong>This OTP will expire in 1 minute.</strong></p>
          <p>If you did not request this password reset, please ignore this email.</p>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            Best regards,<br>
            BP Heating & Plumbing Team
          </p>
        </div>
      `
    });

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again later.'
      });
    }

    res.json({
      success: true,
      message: 'OTP sent to your seller email address'
    });
  } catch (error) {
    console.error('Seller forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing request. Please try again.'
    });
  }
};

// Seller Verify OTP
const sellerVerifyOtp = async (req, res) => {
  try {
    const { seller_email, otp } = req.body;

    // Verify OTP
    const isValid = verifyOTP(seller_email, otp, 'seller');
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Seller verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP. Please try again.'
    });
  }
};

// Seller Reset Password
const sellerResetPassword = async (req, res) => {
  try {
    const { seller_email, otp, new_seller_password } = req.body;

    // Verify OTP first
    const isValid = verifyOTP(seller_email, otp, 'seller');
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Check if seller exists
    const seller = await findSellerByEmail(seller_email);
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_seller_password, 10);

    // Update password
    await updateSellerPassword(seller_email, hashedPassword);

    // Delete OTP after successful reset
    deleteOTP(seller_email, 'seller');

    res.json({
      success: true,
      message: 'Seller password reset successfully'
    });
  } catch (error) {
    console.error('Seller reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting seller password. Please try again.'
    });
  }
};

module.exports = {
  sellerSignup,
  sellerLogin,
  sellerForgotPassword,
  sellerVerifyOtp,
  sellerResetPassword
};
