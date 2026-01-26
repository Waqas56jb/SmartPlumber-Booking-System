const { verifyEmailConfig, sendEmail } = require('../utils/emailService');
require('dotenv').config();

async function testEmail() {
  try {
    console.log('🔍 Testing email configuration...\n');

    // Check if credentials are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ Email credentials not found in .env file');
      console.error('   Please set EMAIL_USER and EMAIL_PASSWORD');
      process.exit(1);
    }

    console.log(`📧 Admin Email: ${process.env.EMAIL_USER.trim()}`);
    console.log(`🔑 App Password: ${'*'.repeat(process.env.EMAIL_PASSWORD.trim().length)}`);
    console.log('');

    // Verify email configuration
    console.log('1️⃣ Verifying email configuration...');
    const verified = await verifyEmailConfig();
    
    if (!verified) {
      console.error('\n❌ Email verification failed. Please check:');
      console.error('   - EMAIL_USER is correct');
      console.error('   - EMAIL_PASSWORD is a valid Gmail App Password');
      console.error('   - 2-Step Verification is enabled on your Google account');
      process.exit(1);
    }

    // Test sending email (optional - uncomment to test)
    /*
    console.log('\n2️⃣ Testing email sending...');
    const testEmail = process.env.EMAIL_USER; // Send to yourself
    const emailSent = await sendEmail({
      to: testEmail,
      subject: 'Test Email - BP Heating & Plumbing',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #D2A752;">Email Test</h2>
          <p>This is a test email from your SmartPlumber backend.</p>
          <p>If you received this, your email configuration is working correctly! ✅</p>
        </div>
      `
    });

    if (emailSent) {
      console.log(`✅ Test email sent successfully to ${testEmail}`);
    } else {
      console.error('❌ Failed to send test email');
    }
    */

    console.log('\n✅ Email configuration is ready!');
    console.log('   Your backend can now send OTP emails for password reset.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Email test failed:', error.message);
    process.exit(1);
  }
}

testEmail();
