// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://smart-plumber-booking-system-7cbo.vercel.app';

export const API_ENDPOINTS = {
  // Authentication
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
