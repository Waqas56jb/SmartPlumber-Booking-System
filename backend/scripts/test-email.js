const {
  verifyEmailConfig
} = require('../utils/emailService');
require('dotenv').config();
// i sanity check gmail app password before deploying forgot password
async function testEmail() {
  try {
    console.log('test email');
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('missing EMAIL_USER or EMAIL_PASSWORD in env');
      process.exit(1);
    }
    console.log('email', process.env.EMAIL_USER.trim());
    console.log('password length', process.env.EMAIL_PASSWORD.trim().length);
    const verified = await verifyEmailConfig();
    if (!verified) {
      console.error('verify failed check user password and gmail app password');
      process.exit(1);
    }
    console.log('email ok');
    process.exit(0);
  } catch (error) {
    console.error('test failed', error.message);
    process.exit(1);
  }
}
testEmail();
