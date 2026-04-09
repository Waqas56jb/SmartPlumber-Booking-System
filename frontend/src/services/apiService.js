import { API_ENDPOINTS } from '../config/api';
// i normalize fetch errors so pages can show message or field errors from the api
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
// i group all customer auth calls behind one object so imports stay tidy
export const authAPI = {
  // i send signup payload so server can hash password and check confirm match
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
  // i post credentials and expect token or field errors back from the api
  login: async credentials => {
    return apiRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
  },
  // i trigger otp email when user forgets password
  forgotPassword: async email => {
    return apiRequest(API_ENDPOINTS.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    });
  },
  // i confirm the six digit code before we allow reset
  verifyOtp: async (email, otp) => {
    return apiRequest(API_ENDPOINTS.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({
        email,
        otp
      })
    });
  },
  // i set new password after otp checks pass on the server
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
  // i ping health for deploy smoke or connection banner
  healthCheck: async () => {
    return apiRequest(API_ENDPOINTS.HEALTH, {
      method: 'GET'
    });
  }
};
// i mirror auth and jobs endpoints for the plumber dashboard
export const plumberAPI = {
  // i register plumber with duplicate email checks on backend
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
  // i log plumber in with email password pair
  plumberLogin: async credentials => {
    return apiRequest(API_ENDPOINTS.PLUMBER_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        plumber_email: credentials.plumber_email,
        plumber_password: credentials.plumber_password
      })
    });
  },
  // i start plumber password recovery same as customer flow
  plumberForgotPassword: async plumber_email => {
    return apiRequest(API_ENDPOINTS.PLUMBER_FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        plumber_email
      })
    });
  },
  // i validate plumber otp before reset form unlocks
  plumberVerifyOtp: async (plumber_email, otp) => {
    return apiRequest(API_ENDPOINTS.PLUMBER_VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({
        plumber_email,
        otp
      })
    });
  },
  // i finish plumber password reset with matching confirm field
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
  // i fetch public or self profile by id for edit forms
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
  // i build query string from filters for service detail plumber picker
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
  // i list every service row for one plumber on their manage page
  getPlumberServices: async plumberId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICES}/${plumberId}`, {
      method: 'GET'
    });
  },
  // i load single service for edit modal
  getPlumberService: async serviceId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICE}/${serviceId}`, {
      method: 'GET'
    });
  },
  // i create a new offered service with pricing and description
  createPlumberService: async serviceData => {
    return apiRequest(API_ENDPOINTS.PLUMBER_SERVICES, {
      method: 'POST',
      body: JSON.stringify(serviceData)
    });
  },
  // i patch existing service when plumber tweaks rates or text
  updatePlumberService: async (serviceId, serviceData) => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICES}/${serviceId}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData)
    });
  },
  // i remove a service line from the plumber catalog
  deletePlumberService: async serviceId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICES}/${serviceId}`, {
      method: 'DELETE'
    });
  },
  // i flip active flag without deleting history
  togglePlumberServiceStatus: async serviceId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_SERVICES}/${serviceId}/toggle`, {
      method: 'PATCH'
    });
  },
  // i filter bookings by status or date range for the jobs table
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
  // i pull counts for dashboard cards
  getBookingStats: async plumberId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_BOOKINGS}/${plumberId}/stats`, {
      method: 'GET'
    });
  },
  // i open one booking for detail drawer or modal
  getBookingDetails: async bookingId => {
    return apiRequest(`${API_ENDPOINTS.PLUMBER_BOOKING}/${bookingId}`, {
      method: 'GET'
    });
  },
  // i move booking through workflow and attach optional note
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
// i cover seller auth and shop profile same shape as plumber module
export const sellerAPI = {
  // i create seller account with shop credentials
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
  // i authenticate seller against seller table
  sellerLogin: async credentials => {
    return apiRequest(API_ENDPOINTS.SELLER_LOGIN, {
      method: 'POST',
      body: JSON.stringify({
        seller_email: credentials.seller_email,
        seller_password: credentials.seller_password
      })
    });
  },
  // i email otp for seller password recovery
  sellerForgotPassword: async seller_email => {
    return apiRequest(API_ENDPOINTS.SELLER_FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({
        seller_email
      })
    });
  },
  // i check seller otp before showing reset fields
  sellerVerifyOtp: async (seller_email, otp) => {
    return apiRequest(API_ENDPOINTS.SELLER_VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({
        seller_email,
        otp
      })
    });
  },
  // i finalize seller password after otp ok
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
  // i read seller shop card data for header or edit form
  getSellerProfile: async sellerId => {
    return apiRequest(`${API_ENDPOINTS.SELLER_PROFILE}/${sellerId || ''}`, {
      method: 'GET'
    });
  },
  // i persist seller profile changes from settings page
  updateSellerProfile: async (sellerId, profileData) => {
    return apiRequest(`${API_ENDPOINTS.SELLER_PROFILE}/${sellerId || ''}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }
};
// i expose catalog crud for storefront and seller inventory screens
export const productAPI = {
  // i pass filters as query for search category and seller scoped lists
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
  // i load one product for detail page or edit
  getProductById: async productId => {
    return apiRequest(`${API_ENDPOINTS.PRODUCTS}/${productId}`, {
      method: 'GET'
    });
  },
  // i slice catalog by category slug for filtered grids
  getProductsByCategory: async category => {
    return apiRequest(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}/${category}`, {
      method: 'GET'
    });
  },
  // i create listing from seller dashboard form
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
  // i remove product when seller delists it
  deleteProduct: async productId => {
    return apiRequest(`${API_ENDPOINTS.PRODUCTS}/${productId}`, {
      method: 'DELETE'
    });
  }
};
// i tiny helper for marketing pages that only need service names
export const publicAPI = {
  // i fetch distinct active service names for home category tiles
  getAvailableServices: async () => {
    return apiRequest(API_ENDPOINTS.PUBLIC_SERVICES, {
      method: 'GET'
    });
  }
};
// i default export auth for pages that only import customer api
export default authAPI;
