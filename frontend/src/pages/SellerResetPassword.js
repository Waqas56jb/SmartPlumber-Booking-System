import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaArrowLeft, FaCheckCircle, FaEnvelope, FaStore } from 'react-icons/fa';
import { Link, useRouter } from '../utils/router';
import { toast } from 'react-toastify';
import { sellerAPI } from '../services/apiService';

const SellerResetPassword = () => {
  const { navigate } = useRouter();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    new_seller_password: '',
    confirm_seller_password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seller_email] = useState(() => {
    try {
      const stored = sessionStorage.getItem('seller_reset_email');
      return stored || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    if (!seller_email) {
      toast.error('Please enter your seller email first');
      navigate('/seller-forgot-password');
    } else {
      try {
        sessionStorage.setItem('seller_reset_email', seller_email);
      } catch (e) {
        console.warn('Failed to store email:', e);
      }
    }
  }, [seller_email, navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`seller-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`seller-otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }
    
    setLoading(true);
    try {
      const response = await sellerAPI.sellerVerifyOtp(seller_email, otpValue);
      if (response.success) {
        toast.success(response.message || 'OTP verified successfully!');
        setStep(2);
      }
    } catch (error) {
      toast.error(error.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.new_seller_password !== formData.confirm_seller_password) {
      toast.error('Seller passwords do not match!');
      return;
    }

    if (formData.new_seller_password.length < 6) {
      toast.error('Seller password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    
    try {
      const otpValue = otp.join('');
      const response = await sellerAPI.sellerResetPassword(
        seller_email,
        otpValue,
        formData.new_seller_password,
        formData.confirm_seller_password
      );

      if (response.success) {
        try {
          sessionStorage.removeItem('seller_reset_email');
        } catch (e) {}
        
        toast.success(response.message || 'Seller password reset successfully!');
        navigate('/seller-login');
      }
    } catch (error) {
      if (error.message.includes('Validation failed') || error.errors) {
        const errorMessage = error.errors?.[0]?.message || error.message;
        toast.error(errorMessage);
      } else {
        toast.error(error.message || 'Failed to reset seller password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <img 
              src="/logo.png" 
              alt="BP Heating & Plumbing Logo" 
              className="w-96 h-96 xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px] object-contain animate-fade-in-up"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 min-h-screen lg:min-h-0" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
          <div className="lg:hidden absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-10">
            <img 
              src="/logo.png" 
              alt="BP Heating & Plumbing Logo" 
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            />
          </div>
          
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-2xl mt-20 sm:mt-24 lg:mt-0 flex flex-col">
            <div className="mb-4 sm:mb-5 md:mb-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center" style={{ background: '#F5E6D3' }}>
                  <FaStore className="text-2xl sm:text-3xl" style={{ color: '#D2A752' }} />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                {step === 1 ? 'Enter OTP' : 'Reset Seller Password'}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {step === 1 
                  ? `We sent a code to ${seller_email || 'your seller email'}`
                  : 'Create your new seller password'
                }
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleOtpSubmit} className="space-y-3.5 sm:space-y-4 md:space-y-5 flex-1 flex flex-col">
                <div className="rounded-lg p-3 sm:p-4 md:p-5" style={{ background: 'linear-gradient(to right, #F5E6D3, #E8D4B8)', border: '1px solid #D2A752' }}>
                  <p className="text-xs sm:text-sm text-gray-700 text-center leading-relaxed">
                    <FaEnvelope className="inline-block mr-1.5 sm:mr-2" size={12} style={{ color: '#D2A752', fontSize: 'clamp(12px, 2vw, 14px)' }} />
                    Please enter the 6-digit verification code sent to your seller email.
                  </p>
                </div>

                <div className="w-full overflow-x-hidden">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2.5 sm:mb-3 text-center">
                    Verification Code
                  </label>
                  <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 w-full max-w-full px-1">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`seller-otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 text-center text-base sm:text-lg md:text-xl font-bold border border-gray-200 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 shadow-sm bg-gray-50 touch-manipulation flex-shrink-0"
                        style={{ '--tw-ring-color': '#D2A752' }}
                        onFocus={(e) => {
                          e.target.style.boxShadow = '0 0 0 2px #D2A752';
                          e.target.style.borderColor = '#D2A752';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '';
                          e.target.style.borderColor = '#E5E7EB';
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-xs sm:text-sm font-medium transition-colors"
                    style={{ color: '#D2A752' }}
                    onMouseEnter={(e) => e.target.style.color = '#B8943F'}
                    onMouseLeave={(e) => e.target.style.color = '#D2A752'}
                  >
                    Didn't receive code? <span className="font-semibold">Resend</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full text-white py-3 sm:py-3.5 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
                  style={{ background: '#D2A752' }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Verify OTP</span>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-3.5 sm:space-y-4 md:space-y-5 flex-1 flex flex-col">
                <div>
                  <label htmlFor="new_seller_password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    New Seller Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="new_seller_password"
                      name="new_seller_password"
                      value={formData.new_seller_password}
                      onChange={handlePasswordChange}
                      placeholder="Enter new seller password"
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

                <div>
                  <label htmlFor="confirm_seller_password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Seller Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm_seller_password"
                      name="confirm_seller_password"
                      value={formData.confirm_seller_password}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new seller password"
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
                      className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 md:pr-4 flex items-center text-gray-400 transition-colors touch-manipulation"
                      onMouseEnter={(e) => e.target.style.color = '#D2A752'}
                      onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
                    >
                      {showConfirmPassword ? <FaEyeSlash size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} /> : <FaEye size={14} style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />}
                    </button>
                  </div>
                  {formData.confirm_seller_password && formData.new_seller_password === formData.confirm_seller_password && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 mt-2">
                      <FaCheckCircle size={12} />
                      <span className="font-medium">Seller passwords match</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-3 sm:py-3.5 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
                  style={{ background: '#D2A752' }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting Seller Password...</span>
                    </>
                  ) : (
                    <span>Reset Seller Password</span>
                  )}
                </button>

                <div className="text-center pt-4 mt-auto">
                  <Link 
                    to="/seller-login" 
                    className="text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2"
                    style={{ color: '#D2A752' }}
                    onMouseEnter={(e) => e.target.style.color = '#B8943F'}
                    onMouseLeave={(e) => e.target.style.color = '#D2A752'}
                  >
                    <FaArrowLeft size={10} />
                    <span>Back to Seller Sign In</span>
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerResetPassword;
