const otpStore = new Map();
const OTP_EXPIRY_TIME = 60 * 1000;
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const storeOTP = (email, otp, userType = 'customer') => {
  const key = `${email.toLowerCase()}_${userType}`;
  const expiryTime = Date.now() + OTP_EXPIRY_TIME;
  otpStore.set(key, {
    otp,
    userType,
    expiresAt: expiryTime,
    attempts: 0
  });
  setTimeout(() => {
    if (otpStore.has(key)) {
      const stored = otpStore.get(key);
      if (stored.expiresAt < Date.now()) {
        otpStore.delete(key);
      }
    }
  }, OTP_EXPIRY_TIME + 1000);
  if (process.env.DEBUG_LOGS === 'true') {
    console.log('otp stored', email, userType);
  }
};
const verifyOTP = (email, otp, userType = 'customer') => {
  const key = `${email.toLowerCase()}_${userType}`;
  const stored = otpStore.get(key);
  if (!stored) {
    if (process.env.DEBUG_LOGS === 'true') {
      console.log('no otp', email);
    }
    return false;
  }
  if (Date.now() > stored.expiresAt) {
    if (process.env.DEBUG_LOGS === 'true') {
      console.log('otp expired', email);
    }
    otpStore.delete(key);
    return false;
  }
  if (stored.otp !== otp) {
    stored.attempts += 1;
    if (process.env.DEBUG_LOGS === 'true') {
      console.log('bad otp', email, stored.attempts);
    }
    if (stored.attempts >= 3) {
      otpStore.delete(key);
      if (process.env.DEBUG_LOGS === 'true') {
        console.log('otp removed max tries', email);
      }
    }
    return false;
  }
  if (process.env.DEBUG_LOGS === 'true') {
    console.log('otp ok', email);
  }
  return true;
};
const deleteOTP = (email, userType = 'customer') => {
  const key = `${email.toLowerCase()}_${userType}`;
  if (otpStore.has(key)) {
    otpStore.delete(key);
    if (process.env.DEBUG_LOGS === 'true') {
      console.log('otp deleted', email);
    }
  }
};
const cleanupExpiredOTPs = () => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(email);
      if (process.env.DEBUG_LOGS === 'true') {
        console.log('otp cleanup', email);
      }
    }
  }
};
setInterval(cleanupExpiredOTPs, 5 * 60 * 1000);
module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP,
  deleteOTP
};
