// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://smart-plumber-booking-system-7cbo.vercel.app';

export const API_ENDPOINTS = {
  // Customer Authentication
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  
  // Plumber Authentication
  PLUMBER_SIGNUP: `${API_BASE_URL}/api/plumber/signup`,
  PLUMBER_LOGIN: `${API_BASE_URL}/api/plumber/login`,
  PLUMBER_FORGOT_PASSWORD: `${API_BASE_URL}/api/plumber/forgot-password`,
  PLUMBER_VERIFY_OTP: `${API_BASE_URL}/api/plumber/verify-otp`,
  PLUMBER_RESET_PASSWORD: `${API_BASE_URL}/api/plumber/reset-password`,
  
  // Seller Authentication
  SELLER_SIGNUP: `${API_BASE_URL}/api/seller/signup`,
  SELLER_LOGIN: `${API_BASE_URL}/api/seller/login`,
  SELLER_FORGOT_PASSWORD: `${API_BASE_URL}/api/seller/forgot-password`,
  SELLER_VERIFY_OTP: `${API_BASE_URL}/api/seller/verify-otp`,
  SELLER_RESET_PASSWORD: `${API_BASE_URL}/api/seller/reset-password`,
  
  // Plumber Profile
  PLUMBER_PROFILE: `${API_BASE_URL}/api/plumber/profile`,
  ALL_PLUMBERS: `${API_BASE_URL}/api/plumber/all`,
  
  // Plumber Services
  PLUMBER_SERVICES: `${API_BASE_URL}/api/plumber/services`,
  PLUMBER_SERVICE: `${API_BASE_URL}/api/plumber/service`,
  
  // Plumber Bookings
  PLUMBER_BOOKINGS: `${API_BASE_URL}/api/plumber/bookings`,
  PLUMBER_BOOKING: `${API_BASE_URL}/api/plumber/booking`,
  
  // Seller Profile
  SELLER_PROFILE: `${API_BASE_URL}/api/seller/profile`,
  
  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCTS_BY_CATEGORY: `${API_BASE_URL}/api/products/category`,
  
  // Public services summary (for landing "Our Professional Services")
  PUBLIC_SERVICES: `${API_BASE_URL}/api/services/available`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
