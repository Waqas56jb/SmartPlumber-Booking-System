import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaCheckCircle } from 'react-icons/fa';
import { Link, useRouter } from '../utils/router';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { navigate } = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      login({
        username: formData.username,
        email: formData.email,
      });
      toast.success('Account created successfully!');
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Logo Only (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
          {/* Logo */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <img 
              src="/logo.png" 
              alt="BP Heating & Plumbing Logo" 
              className="w-96 h-96 xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px] object-contain animate-fade-in-up"
            />
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 min-h-screen lg:min-h-0" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
          {/* Mobile Logo */}
          <div className="lg:hidden absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-10">
            <img 
              src="/logo.png" 
              alt="BP Heating & Plumbing Logo" 
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          </div>
          
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-2xl flex flex-col mt-20 sm:mt-24 lg:mt-0">
            <div className="mb-5 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-sm sm:text-base text-gray-600">Join BP Heating & Plumbing today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 flex-1 flex flex-col">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
                    style={{ '--tw-ring-color': '#D2A752' }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px #D2A752';
                      e.target.style.borderColor = '#D2A752';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                      e.target.style.borderColor = '#E5E7EB';
                    }}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
                    style={{ '--tw-ring-color': '#D2A752' }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px #D2A752';
                      e.target.style.borderColor = '#D2A752';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                      e.target.style.borderColor = '#E5E7EB';
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full pl-9 sm:pl-10 md:pl-12 pr-9 sm:pr-10 md:pr-12 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
                    style={{ '--tw-ring-color': '#D2A752' }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px #D2A752';
                      e.target.style.borderColor = '#D2A752';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                      e.target.style.borderColor = '#E5E7EB';
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 md:pr-4 flex items-center text-gray-400 transition-colors touch-manipulation"
                    onMouseEnter={(e) => e.target.style.color = '#D2A752'}
                    onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
                  >
                    {showPassword ? <FaEyeSlash size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} /> : <FaEye size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full pl-9 sm:pl-10 md:pl-12 pr-9 sm:pr-10 md:pr-12 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
                    style={{ '--tw-ring-color': '#D2A752' }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px #D2A752';
                      e.target.style.borderColor = '#D2A752';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '';
                      e.target.style.borderColor = '#E5E7EB';
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#D2A752'}
                    onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
                  >
                    {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 mt-2">
                    <FaCheckCircle size={12} />
                    <span className="font-medium">Passwords match</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3 sm:py-3.5 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
                style={{ background: '#D2A752' }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4 mt-auto">
                <p className="text-xs sm:text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-semibold transition-colors"
                    style={{ color: '#D2A752' }}
                    onMouseEnter={(e) => e.target.style.color = '#B8943F'}
                    onMouseLeave={(e) => e.target.style.color = '#D2A752'}
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
