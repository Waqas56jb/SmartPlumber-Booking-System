import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaWrench, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Link, useRouter } from '../utils/router';
import { useAuth } from '../contexts/AuthContext';
import { plumberAPI } from '../services/apiService';
const PlumberLogin = () => {
  const [formData, setFormData] = useState({
    plumber_email: '',
    plumber_password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    text: ''
  });
  const {
    login
  } = useAuth();
  const {
    navigate
  } = useRouter();
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (message.text) setMessage({
      type: '',
      text: ''
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({
      type: '',
      text: ''
    });
    try {
      const response = await plumberAPI.plumberLogin({
        plumber_email: formData.plumber_email,
        plumber_password: formData.plumber_password
      });
      if (response.success) {
        login({
          id: response.data.plumber.id,
          plumber_username: response.data.plumber.plumber_username,
          plumber_email: response.data.plumber.plumber_email,
          userType: 'plumber'
        }, response.data.token);
        setMessage({
          type: 'success',
          text: 'Login successful! Redirecting...'
        });
        setTimeout(() => navigate('/home'), 500);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col lg:flex-row">
        {}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{
        background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)'
      }}>
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <img src="/logo.png" alt="BP Heating & Plumbing Logo" className="w-96 h-96 xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px] object-contain animate-fade-in-up" />
          </div>
        </div>

        {}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 min-h-screen lg:min-h-0" style={{
        background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)'
      }}>
          {}
          <div className="lg:hidden absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-10">
            <img src="/logo.png" alt="BP Heating & Plumbing Logo" className="w-32 h-32 sm:w-40 sm:h-40 object-contain" />
          </div>
          
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-2xl flex flex-col mt-20 sm:mt-24 lg:mt-0">
            <div className="mb-5 sm:mb-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center" style={{
                background: '#F5E6D3'
              }}>
                  <FaWrench className="text-2xl sm:text-3xl" style={{
                  color: '#D2A752'
                }} />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Plumber Portal</h2>
              <p className="text-sm sm:text-base text-gray-600">Sign in to your plumber account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 flex-1 flex flex-col">
              {}
              {message.text && <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                  {message.text}
                </div>}

              {}
              <div>
                <label htmlFor="plumber_email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" size={16} />
                  </div>
                  <input type="email" id="plumber_email" name="plumber_email" value={formData.plumber_email} onChange={handleChange} placeholder="Enter your email address" className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm" style={{
                  '--tw-ring-color': '#D2A752'
                }} onFocus={e => {
                  e.target.style.boxShadow = '0 0 0 2px #D2A752';
                  e.target.style.borderColor = '#D2A752';
                }} onBlur={e => {
                  e.target.style.boxShadow = '';
                  e.target.style.borderColor = '#E5E7EB';
                }} required />
                </div>
              </div>

              {}
              <div>
                <label htmlFor="plumber_password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} />
                  </div>
                  <input type={showPassword ? 'text' : 'password'} id="plumber_password" name="plumber_password" value={formData.plumber_password} onChange={handleChange} placeholder="Enter your password" className="w-full pl-9 sm:pl-10 md:pl-12 pr-9 sm:pr-10 md:pr-12 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm" style={{
                  '--tw-ring-color': '#D2A752'
                }} onFocus={e => {
                  e.target.style.boxShadow = '0 0 0 2px #D2A752';
                  e.target.style.borderColor = '#D2A752';
                }} onBlur={e => {
                  e.target.style.boxShadow = '';
                  e.target.style.borderColor = '#E5E7EB';
                }} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 transition-colors" onMouseEnter={e => e.target.style.color = '#D2A752'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              {}
              <div className="flex items-center justify-end">
                <Link to="/plumber-forgot-password" className="text-xs sm:text-sm font-medium transition-colors" style={{
                color: '#D2A752'
              }} onMouseEnter={e => e.target.style.color = '#B8943F'} onMouseLeave={e => e.target.style.color = '#D2A752'}>
                  Forgot Password?
                </Link>
              </div>

              {}
              <button type="submit" disabled={loading} className="w-full text-white py-3 sm:py-3.5 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation" style={{
              background: '#D2A752'
            }}>
                {loading ? <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </> : <span>Sign In as Plumber</span>}
              </button>

              {}
              <div className="text-center pt-4 mt-auto">
                <p className="text-xs sm:text-sm text-gray-500">
                  Don't have a plumber account?{' '}
                  <Link to="/plumber-signup" className="font-semibold transition-colors" style={{
                  color: '#D2A752'
                }} onMouseEnter={e => e.target.style.color = '#B8943F'} onMouseLeave={e => e.target.style.color = '#D2A752'}>
                    Sign Up
                  </Link>
                </p>
              </div>

              {}
              <div className="text-center">
                <Link to="/" className="text-xs sm:text-sm text-gray-500 hover:text-[#D2A752] transition-colors">
                  Back to home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default PlumberLogin;
