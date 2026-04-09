import React, { useState } from 'react';
import { FaEnvelope, FaArrowRight, FaWrench } from 'react-icons/fa';
import { Link, useRouter } from '../utils/router';
import { plumberAPI } from '../services/apiService';
// i start plumber otp reset using plumber email field endpoints
const PlumberForgotPassword = () => {
  const [plumber_email, setPlumberEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    navigate
  } = useRouter();
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await plumberAPI.plumberForgotPassword(plumber_email);
      if (response.success) {
        try {
          sessionStorage.setItem('plumber_reset_email', plumber_email);
        } catch (e) {
          console.warn('Failed to store email:', e);
        }
        navigate('/plumber-reset-password');
      }
    } catch (error) {
      console.error('Failed to send OTP:', error);
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-col">
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
          
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-2xl mt-20 sm:mt-24 lg:mt-0">
            <div className="mb-4 sm:mb-5 md:mb-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center" style={{
                background: '#F5E6D3'
              }}>
                  <FaWrench className="text-2xl sm:text-3xl" style={{
                  color: '#D2A752'
                }} />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">Forgot Plumber Password?</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Enter your plumber email to receive OTP</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 md:space-y-5">
              <div className="rounded-lg p-3 sm:p-4 md:p-5" style={{
              background: 'linear-gradient(to right, #F5E6D3, #E8D4B8)',
              border: '1px solid #D2A752'
            }}>
                <p className="text-xs sm:text-sm text-gray-700 text-center leading-relaxed">
                  <FaEnvelope className="inline-block mr-1.5 sm:mr-2" size={12} style={{
                  color: '#D2A752',
                  fontSize: 'clamp(12px, 2vw, 14px)'
                }} />
                  We'll send a verification code to your plumber email address to reset your password securely.
                </p>
              </div>

              {}
              <div>
                <label htmlFor="plumber_email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Plumber Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} />
                  </div>
                  <input type="email" id="plumber_email" name="plumber_email" value={plumber_email} onChange={e => setPlumberEmail(e.target.value)} placeholder="Enter your plumber email address" className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm" style={{
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
              <button type="submit" disabled={loading} className="w-full text-white py-3 sm:py-3.5 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation" style={{
              background: '#D2A752'
            }}>
                {loading ? <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending OTP...</span>
                  </> : <span>Send OTP</span>}
              </button>

              {}
              <div className="text-center pt-4">
                <Link to="/plumber-login" className="text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2" style={{
                color: '#D2A752'
              }} onMouseEnter={e => e.target.style.color = '#B8943F'} onMouseLeave={e => e.target.style.color = '#D2A752'}>
                  <FaArrowRight className="rotate-180" size={10} />
                  <span>Back to Plumber Sign In</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default PlumberForgotPassword;
