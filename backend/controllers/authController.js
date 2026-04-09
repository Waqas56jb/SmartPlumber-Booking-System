const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  generateOTP,
  storeOTP,
  verifyOTP,
  deleteOTP
} = require('../utils/otpService');
const {
  sendEmail
} = require('../utils/emailService');
const {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUserPassword,
  emailExists
} = require('../utils/userService');
const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    const existingUserByEmail = await findUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    const existingUserByUsername = await findUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      email,
      password: hashedPassword
    });
    const token = jwt.sign({
      userId: user.id,
      email: user.email
    }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating account. Please try again.'
    });
  }
};
const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    const token = jwt.sign({
      userId: user.id,
      email: user.email
    }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login. Please try again.'
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const {
      email
    } = req.body;
    const emailExistsInDb = await emailExists(email);
    if (!emailExistsInDb) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our database. Please check your email address or sign up first.'
      });
    }
    const otp = generateOTP();
    storeOTP(email, otp, 'customer');
    const emailSent = await sendEmail({
      to: email,
      subject: 'Password Reset OTP - BP Heating & Plumbing',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #D2A752;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
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
      message: 'OTP sent to your email address'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing request. Please try again.'
    });
  }
};
const verifyOtp = async (req, res) => {
  try {
    const {
      email,
      otp
    } = req.body;
    const isValid = verifyOTP(email, otp, 'customer');
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
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP. Please try again.'
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const {
      email,
      otp,
      newPassword
    } = req.body;
    const isValid = verifyOTP(email, otp, 'customer');
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(email, hashedPassword);
    deleteOTP(email, 'customer');
    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password. Please try again.'
    });
  }
};
module.exports = {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword
};
