import React, { useState } from 'react';
import { FaEnvelope, FaArrowRight, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Link, useRouter } from '../utils/router';
import { authAPI } from '../services/apiService';
// i trigger customer otp email and pass email forward through router state
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    text: ''
  });
  const {
    navigate
  } = useRouter();
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({
      type: '',
      text: ''
    });
    try {
      const response = await authAPI.forgotPassword(email);
      if (response.success) {
        try {
          sessionStorage.setItem('reset_email', email);
        } catch (e) {
          console.warn('Failed to store email:', e);
        }
        setMessage({
          type: 'success',
          text: 'OTP sent to your email!'
        });
        setTimeout(() => navigate('/reset-password'), 1000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to send OTP. Please try again.'
      });
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
          {}
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
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">Forgot Password?</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Enter your email to receive OTP</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 md:space-y-5">
              {}
              {message.text && <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                  {message.text}
                </div>}
              
              <div className="rounded-lg p-3 sm:p-4 md:p-5" style={{
              background: 'linear-gradient(to right, #F5E6D3, #E8D4B8)',
              border: '1px solid #D2A752'
            }}>
                <p className="text-xs sm:text-sm text-gray-700 text-center leading-relaxed">
                  <FaEnvelope className="inline-block mr-1.5 sm:mr-2" size={12} style={{
                  color: '#D2A752',
                  fontSize: 'clamp(12px, 2vw, 14px)'
                }} />
                  We'll send a verification code to your email address to reset your password securely.
                </p>
              </div>

              {}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} />
                  </div>
                  <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm" style={{
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
                <Link to="/login" className="text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2" style={{
                color: '#D2A752'
              }} onMouseEnter={e => e.target.style.color = '#B8943F'} onMouseLeave={e => e.target.style.color = '#D2A752'}>
                  <FaArrowRight className="rotate-180" size={10} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default ForgotPassword;
