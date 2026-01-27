// In-memory OTP storage (in production, use Redis or database)
const otpStore = new Map();

// OTP expiration time: 1 minute (60000 milliseconds)
const OTP_EXPIRY_TIME = 60 * 1000;

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP with expiration and user type
const storeOTP = (email, otp, userType = 'customer') => {
  const key = `${email.toLowerCase()}_${userType}`;
  const expiryTime = Date.now() + OTP_EXPIRY_TIME;
  otpStore.set(key, {
    otp,
    userType,
    expiresAt: expiryTime,
    attempts: 0
  });

  // Auto-delete expired OTPs
  setTimeout(() => {
    if (otpStore.has(key)) {
      const stored = otpStore.get(key);
      if (stored.expiresAt < Date.now()) {
        otpStore.delete(key);
      }
    }
  }, OTP_EXPIRY_TIME + 1000); // Delete 1 second after expiry

  console.log(`OTP stored for ${email} (${userType}), expires at ${new Date(expiryTime).toISOString()}`);
};

// Verify OTP
const verifyOTP = (email, otp, userType = 'customer') => {
  const key = `${email.toLowerCase()}_${userType}`;
  const stored = otpStore.get(key);

  if (!stored) {
    console.log(`No OTP found for ${email} (${userType})`);
    return false;
  }

  // Check if OTP has expired
  if (Date.now() > stored.expiresAt) {
    console.log(`OTP expired for ${email} (${userType})`);
    otpStore.delete(key);
    return false;
  }

  // Check if OTP matches
  if (stored.otp !== otp) {
    stored.attempts += 1;
    console.log(`Invalid OTP attempt for ${email} (${userType}), attempts: ${stored.attempts}`);
    
    // Delete OTP after 3 failed attempts
    if (stored.attempts >= 3) {
      otpStore.delete(key);
      console.log(`OTP deleted for ${email} (${userType}) due to too many failed attempts`);
    }
    return false;
  }

  // OTP is valid
  console.log(`OTP verified successfully for ${email} (${userType})`);
  return true;
};

// Delete OTP
const deleteOTP = (email, userType = 'customer') => {
  const key = `${email.toLowerCase()}_${userType}`;
  if (otpStore.has(key)) {
    otpStore.delete(key);
    console.log(`OTP deleted for ${email} (${userType})`);
  }
};

// Clean up expired OTPs (run periodically)
const cleanupExpiredOTPs = () => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(email);
      console.log(`Cleaned up expired OTP for ${email}`);
    }
  }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredOTPs, 5 * 60 * 1000);

module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP,
  deleteOTP
};
