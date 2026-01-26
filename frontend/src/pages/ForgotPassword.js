import React, { useState } from 'react';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { Link, useRouter } from '../utils/router';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast.success('OTP sent to your email!');
      setLoading(false);
      navigate('/reset-password', { email });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side - Logo Only */}
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

        {/* Right Side - Forgot Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 min-h-screen lg:min-h-0" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
          <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">Enter your email to receive OTP</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="rounded-lg p-4 sm:p-5" style={{ background: 'linear-gradient(to right, #F5E6D3, #E8D4B8)', border: '1px solid #D2A752' }}>
                <p className="text-xs sm:text-sm text-gray-700 text-center leading-relaxed">
                  <FaEnvelope className="inline-block mr-2" size={14} style={{ color: '#D2A752' }} />
                  We'll send a verification code to your email address to reset your password securely.
                </p>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" size={16} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3.5 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: '#D2A752' }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <span>Send OTP</span>
                )}
              </button>

              {/* Back to Login Link */}
              <div className="text-center pt-4">
                <Link 
                  to="/login" 
                  className="text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2"
                  style={{ color: '#D2A752' }}
                  onMouseEnter={(e) => e.target.style.color = '#B8943F'}
                  onMouseLeave={(e) => e.target.style.color = '#D2A752'}
                >
                  <FaArrowRight className="rotate-180" size={10} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
