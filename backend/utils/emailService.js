const nodemailer = require('nodemailer');
// i build the gmail smtp client from env because i do not want secrets in code
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASSWORD in .env file.');
  }
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER.trim(),
      pass: process.env.EMAIL_PASSWORD.trim()
    }
  });
};
// i send html or text mail and strip tags for the plain fallback
const sendEmail = async ({
  to,
  subject,
  html,
  text
}) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('email config missing check env');
      return false;
    }
    const transporter = createTransporter();
    const mailOptions = {
      from: `"BP Heating & Plumbing" <${process.env.EMAIL_USER.trim()}>`,
      to: to.trim(),
      subject: subject,
      html: html,
      text: text || html.replace(/<[^>]*>/g, '')
    };
    const info = await transporter.sendMail(mailOptions);
    if (process.env.DEBUG_LOGS === 'true') {
      console.log('email sent', to);
    }
    return true;
  } catch (error) {
    console.error('email send', error.message);
    return false;
  }
};
// i ping smtp on startup so i know otp flows will work before users hit forgot password
const verifyEmailConfig = async () => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email config missing set EMAIL_USER and EMAIL_PASSWORD');
      return false;
    }
    const transporter = createTransporter();
    await transporter.verify();
    if (process.env.DEBUG_LOGS === 'true') {
      console.log('email config ok', process.env.EMAIL_USER.trim());
    }
    return true;
  } catch (error) {
    console.error('email verify failed', error.message);
    return false;
  }
};
module.exports = {
  sendEmail,
  verifyEmailConfig
};
