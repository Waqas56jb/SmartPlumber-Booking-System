import { API_ENDPOINTS } from '../config/api';

// Helper function to make API requests
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      // Create error object with message and validation errors
      const error = new Error(data.message || 'An error occurred');
      error.errors = data.errors; // Include validation errors if present
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    // If it's already our custom error, re-throw it
    if (error.errors || error.status) {
      throw error;
    }
    
    // Handle network errors
    console.error('API Error:', error);
    throw new Error(error.message || 'Network error. Please check your connection.');
  }
};

// Authentication API calls
export const authAPI = {
  // Signup
  signup: async (userData) => {
    return apiRequest(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      })
    });
  },

  // Login
  login: async (credentials) => {
    return apiRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
  },

  // Forgot Password (Send OTP)
  forgotPassword: async (email) => {
    return apiRequest(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Verify OTP
  verifyOtp: async (email, otp) => {
    return apiRequest(API_ENDPOINTS.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({ email, otp })
    });
  },

  // Reset Password
  resetPassword: async (email, otp, newPassword, confirmPassword) => {
    return apiRequest(API_ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        email,
        otp,
        newPassword,
        confirmPassword
      })
    });
  },

  // Health check
  healthCheck: async () => {
    return apiRequest(API_ENDPOINTS.HEALTH, {
      method: 'GET'
    });
  }
};

export default authAPI;
