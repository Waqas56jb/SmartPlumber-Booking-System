const nodemailer = require('nodemailer');

// Create transporter using admin email credentials
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASSWORD in .env file.');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER.trim(), // Remove any spaces
      pass: process.env.EMAIL_PASSWORD.trim() // Remove any spaces
    }
  });
};

// Send email (from admin email to user's email)
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    // Validate email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email configuration is missing. Please check your .env file.');
      return false;
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"BP Heating & Plumbing" <${process.env.EMAIL_USER.trim()}>`,
      to: to.trim(),
      subject: subject,
      html: html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const info = await transporter.sendMail(mailOptions);
    if (process.env.DEBUG_LOGS === 'true') {
      console.log(`Email sent successfully to ${to}:`, info.messageId);
    }
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('⚠️  Email configuration is missing. Email functionality will not work.');
      console.warn('   Please set EMAIL_USER and EMAIL_PASSWORD in your .env file.');
      return false;
    }

    const transporter = createTransporter();
    await transporter.verify();
    if (process.env.DEBUG_LOGS === 'true') {
      console.log('✅ Email configuration verified successfully');
      console.log(`   Admin email: ${process.env.EMAIL_USER.trim()}`);
    }
    return true;
  } catch (error) {
    console.error('❌ Email configuration verification failed:', error.message);
    console.error('   Please check your EMAIL_USER and EMAIL_PASSWORD in .env file.');
    return false;
  }
};

module.exports = {
  sendEmail,
  verifyEmailConfig
};
