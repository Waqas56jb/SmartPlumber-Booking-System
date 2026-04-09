import { API_ENDPOINTS } from '../config/api';
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
      const error = new Error(data.message || 'An error occurred');
      error.errors = data.errors;
      error.status = response.status;
      throw error;
    }
    return data;
  } catch (error) {
    if (error.errors || error.status) {
      throw error;
    }
    console.error('API Error:', error);
    throw new Error(error.message || 'Network error. Please check your connection.');
  }
};
export const authAPI = {
  signup: async userData => {
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
  login: async credentials => {
    return apiRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
  },
  forgotPassword: async email => {
    return apiRequest(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    });
  },
  verifyOtp: async (email, otp) => {
    return apiRequest(API_ENDPOINTS.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({
        email,
        otp
      })
    });
  },
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
  healthCheck: async () => {
    return apiRequest(API_ENDPOINTS.HEALTH, {
      method: 'GET'
    });
  }
};
export const plumberAPI = {
  plumberSignup: async plumberData => {
    return apiRequest(API_ENDPOINTS.PLUMBER_SIGNUP, {
      method: 'POST',
      body: JSON.stringify({
        plumber_username: plumberData.plumber_username,
        plumber_email: plumberData.plumber_email,
        plumber_password: plumberData.plumber_password,
        confirm_plumber_password: plumberData.confirm_plumber_password
      })
    });
  },
  plumberLogin: async credentials => {
    return apiRequest(API_ENDPOINTS.PLUMBER_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        plumber_email: credentials.plumber_email,
        plumber_password: credentials.plumber_password
      })
    });
  },
  plumberForgotPassword: async plumber_email => {
    return apiRequest(API_ENDPOINTS.PLUMBER_FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        plumber_email
      })
    });
  },
  plumberVerifyOtp: async (plumber_email, otp) => {
    return apiRequest(API_ENDPOINTS.PLUMBER_VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({
        plumber_email,
        otp
      })
    });
  },
  plumberResetPassword: async (plumber_email, otp, new_plumber_password, confirm_plumber_password) => {
    return apiRequest(API_ENDPOINTS.PLUMBER_RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        plumber_email,
        otp,
        new_plumber_password,
        confirm_plumber_password
      })
    });
  },
  getPlumberProfile: async plumberId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_PROFILE}/${plumberId || ''}`, {
      method: 'GET'
    });
  },
  updatePlumberProfile: async (plumberId, profileData) => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_PROFILE}/${plumberId || ''}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },
  getAllPlumbers: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.city) params.append('city', filters.city);
    if (filters.is_available) params.append('is_available', filters.is_available);
    if (filters.specialization) params.append('specialization', filters.specialization);
    const queryString = params.toString();
    const url = queryString ? `${API_ENDPOINTS.ALL_PLUMBERS}?${queryString}` : API_ENDPOINTS.ALL_PLUMBERS;
    return apiRequest(url, {
      method: 'GET'
    });
  },
  getPlumberServices: async plumberId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICES}/${plumberId}`, {
      method: 'GET'
    });
  },
  getPlumberService: async serviceId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICE}/${serviceId}`, {
      method: 'GET'
    });
  },
  createPlumberService: async serviceData => {
    return apiRequest(API_ENDPOINTS.PLUMBER_SERVICES, {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  },
  updatePlumberService: async (serviceId, serviceData) => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICES}/${serviceId}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  },
  deletePlumberService: async serviceId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICES}/${serviceId}`, {
      method: 'DELETE'
    });
  },
  togglePlumberServiceStatus: async serviceId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICES}/${serviceId}/toggle`, {
      method: 'PATCH'
    });
  },
  getPlumberBookings: async (plumberId, filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.date_from) queryParams.append('date_from', filters.date_from);
    if (filters.date_to) queryParams.append('date_to', filters.date_to);
    const queryString = queryParams.toString();
    const url = queryString ? `${API_ENDPOINTS.PLUMBER_BOOKINGS}/${plumberId}?${queryString}` : `${API_ENDPOINTS.PLUMBER_BOOKINGS}/${plumberId}`;
    return apiRequest(url, {
      method: 'GET'
    });
  },
  getBookingStats: async plumberId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_BOOKINGS}/${plumberId}/stats`, {
      method: 'GET'
    });
  },
  getBookingDetails: async bookingId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_BOOKING}/${bookingId}`, {
      method: 'GET'
    });
  },
  updateBookingStatus: async (bookingId, status, notes) => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_BOOKING}/${bookingId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({
        status,
        notes
      })
    });
  }
};
export const sellerAPI = {
  sellerSignup: async sellerData => {
    return apiRequest(API_ENDPOINTS.SELLER_SIGNUP, {
      method: 'POST',
      body: JSON.stringify({
        seller_username: sellerData.seller_username,
        seller_email: sellerData.seller_email,
        seller_password: sellerData.seller_password,
        confirm_seller_password: sellerData.confirm_seller_password
      })
    });
  },
  sellerLogin: async credentials => {
    return apiRequest(API_ENDPOINTS.SELLER_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        seller_email: credentials.seller_email,
        seller_password: credentials.seller_password
      })
    });
  },
  sellerForgotPassword: async seller_email => {
    return apiRequest(API_ENDPOINTS.SELLER_FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        seller_email
      })
    });
  },
  sellerVerifyOtp: async (seller_email, otp) => {
    return apiRequest(API_ENDPOINTS.SELLER_VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({
        seller_email,
        otp
      })
    });
  },
  sellerResetPassword: async (seller_email, otp, new_seller_password, confirm_seller_password) => {
    return apiRequest(API_ENDPOINTS.SELLER_RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        seller_email,
        otp,
        new_seller_password,
        confirm_seller_password
      })
    });
  },
  getSellerProfile: async sellerId => {
    return apiRequest(`${API_ENDPOINTS.SELLER_PROFILE}/${sellerId || ''}`, {
      method: 'GET'
    });
  },
  updateSellerProfile: async (sellerId, profileData) => {
    return apiRequest(`${API_ENDPOINTS.SELLER_PROFILE}/${sellerId || ''}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }
};
export const productAPI = {
  getAllProducts: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.seller_id) queryParams.append('seller_id', filters.seller_id);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.is_active !== undefined) queryParams.append('is_active', filters.is_active);
    if (filters.search) queryParams.append('search', filters.search);
    const queryString = queryParams.toString();
    const url = queryString ? `${API_ENDPOINTS.PRODUCTS}?${queryString}` : API_ENDPOINTS.PRODUCTS;
    return apiRequest(url, {
      method: 'GET'
    });
  },
  getProductById: async productId => {
    return apiRequest(`${API_ENDPOINTS.PRODUCTS}/${productId}`, {
      method: 'GET'
    });
  },
  getProductsByCategory: async category => {
    return apiRequest(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}/${category}`, {
      method: 'GET'
    });
  },
  createProduct: async productData => {
    return apiRequest(API_ENDPOINTS.PRODUCTS, {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },
  updateProduct: async (productId, productData) => {
    return apiRequest(`${API_ENDPOINTS.PRODUCTS}/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },
  deleteProduct: async productId => {
    return apiRequest(`${API_ENDPOINTS.PRODUCTS}/${productId}`, {
      method: 'DELETE'
    });
  }
};
export const publicAPI = {
  getAvailableServices: async () => {
    return apiRequest(API_ENDPOINTS.PUBLIC_SERVICES, {
      method: 'GET'
    });
  }
};
export default authAPI;
