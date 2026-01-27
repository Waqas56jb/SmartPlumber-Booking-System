const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP, storeOTP, verifyOTP, deleteOTP } = require('../utils/otpService');
const { sendEmail } = require('../utils/emailService');
const { createPlumber, findPlumberByEmail, findPlumberByUsername, updatePlumberPassword, plumberEmailExists } = require('../utils/plumberService');

// Plumber Signup
const plumberSignup = async (req, res) => {
  try {
    const { plumber_username, plumber_email, plumber_password } = req.body;

    // Check if plumber already exists
    const existingPlumberByEmail = await findPlumberByEmail(plumber_email);
    if (existingPlumberByEmail) {
      return res.status(400).json({
        success: false,
        message: 'Plumber with this email already exists'
      });
    }

    const existingPlumberByUsername = await findPlumberByUsername(plumber_username);
    if (existingPlumberByUsername) {
      return res.status(400).json({
        success: false,
        message: 'Plumber username is already taken'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(plumber_password, 10);

    // Create plumber
    const plumber = await createPlumber({
      plumber_username,
      plumber_email,
      plumber_password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { plumberId: plumber.id, plumber_email: plumber.plumber_email, userType: 'plumber' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Plumber account created successfully',
      data: {
        plumber: {
          id: plumber.id,
          plumber_username: plumber.plumber_username,
          plumber_email: plumber.plumber_email
        },
        token
      }
    });
  } catch (error) {
    console.error('Plumber signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating plumber account. Please try again.'
    });
  }
};

// Plumber Login
const plumberLogin = async (req, res) => {
  try {
    const { plumber_email, plumber_password } = req.body;

    // Find plumber by email only
    const plumber = await findPlumberByEmail(plumber_email);

    if (!plumber) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(plumber_password, plumber.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { plumberId: plumber.id, plumber_email: plumber.plumber_email, userType: 'plumber' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Plumber login successful',
      data: {
        plumber: {
          id: plumber.id,
          plumber_username: plumber.plumber_username,
          plumber_email: plumber.plumber_email
        },
        token
      }
    });
  } catch (error) {
    console.error('Plumber login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during plumber login. Please try again.'
    });
  }
};

// Plumber Forgot Password
const plumberForgotPassword = async (req, res) => {
  try {
    const { plumber_email } = req.body;

    // First verify that the email exists in the database
    const emailExistsInDb = await plumberEmailExists(plumber_email);
    if (!emailExistsInDb) {
      return res.status(404).json({
        success: false,
        message: 'Plumber email not found in our database. Please check your email address or sign up first.'
      });
    }

    // Generate and store OTP
    const otp = generateOTP();
    storeOTP(plumber_email, otp, 'plumber');

    // Send OTP via email
    const emailSent = await sendEmail({
      to: plumber_email,
      subject: 'Password Reset OTP - BP Heating & Plumbing (Plumber)',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #D2A752;">Password Reset Request - Plumber Portal</h2>
          <p>Hello,</p>
          <p>You have requested to reset your plumber account password. Please use the following OTP to proceed:</p>
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
      message: 'OTP sent to your plumber email address'
    });
  } catch (error) {
    console.error('Plumber forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing request. Please try again.'
    });
  }
};

// Plumber Verify OTP
const plumberVerifyOtp = async (req, res) => {
  try {
    const { plumber_email, otp } = req.body;

    // Verify OTP
    const isValid = verifyOTP(plumber_email, otp, 'plumber');
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
    console.error('Plumber verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP. Please try again.'
    });
  }
};

// Plumber Reset Password
const plumberResetPassword = async (req, res) => {
  try {
    const { plumber_email, otp, new_plumber_password } = req.body;

    // Verify OTP first
    const isValid = verifyOTP(plumber_email, otp, 'plumber');
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Check if plumber exists
    const plumber = await findPlumberByEmail(plumber_email);
    if (!plumber) {
      return res.status(404).json({
        success: false,
        message: 'Plumber not found'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_plumber_password, 10);

    // Update password
    await updatePlumberPassword(plumber_email, hashedPassword);

    // Delete OTP after successful reset
    deleteOTP(plumber_email, 'plumber');

    res.json({
      success: true,
      message: 'Plumber password reset successfully'
    });
  } catch (error) {
    console.error('Plumber reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting plumber password. Please try again.'
    });
  }
};

module.exports = {
  plumberSignup,
  plumberLogin,
  plumberForgotPassword,
  plumberVerifyOtp,
  plumberResetPassword
};
