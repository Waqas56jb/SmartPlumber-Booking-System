import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaArrowLeft, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { Link, useRouter, useLocation } from '../utils/router';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const location = useLocation();
  const { navigate } = useRouter();
  const [step, setStep] = useState(1); // 1: OTP, 2: New Password
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email] = useState(location.state?.email || '');

  useEffect(() => {
    if (!email) {
      toast.error('Please enter your email first');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }
    // Simulate OTP verification
    setLoading(true);
    setTimeout(() => {
      toast.success('OTP verified successfully!');
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Password reset successfully!');
      setLoading(false);
      navigate('/login');
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

        {/* Right Side - Reset Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 min-h-screen lg:min-h-0" style={{ background: 'linear-gradient(to bottom, #FEFEFE, #F5E6D3)' }}>
          <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {step === 1 ? 'Enter OTP' : 'Reset Password'}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                {step === 1 
                  ? `We sent a code to ${email || 'your email'}`
                  : 'Create your new password'
                }
              </p>
            </div>

            {/* Form */}
            {step === 1 ? (
              <form onSubmit={handleOtpSubmit} className="space-y-5 sm:space-y-6">
                <div className="rounded-lg p-4 sm:p-5" style={{ background: 'linear-gradient(to right, #F5E6D3, #E8D4B8)', border: '1px solid #D2A752' }}>
                  <p className="text-xs sm:text-sm text-gray-700 text-center leading-relaxed">
                    <FaEnvelope className="inline-block mr-2" size={14} style={{ color: '#D2A752' }} />
                    Please enter the 6-digit verification code sent to your email.
                  </p>
                </div>

                {/* OTP Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
                    Verification Code
                  </label>
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 shadow-sm bg-gray-50"
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

                {/* Resend OTP */}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full text-white py-3.5 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              <form onSubmit={handlePasswordSubmit} className="space-y-5 sm:space-y-6">
                {/* New Password Field */}
                <div>
                  <label htmlFor="newPassword" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
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
                      className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 transition-colors"
                      onMouseEnter={(e) => e.target.style.color = '#D2A752'}
                      onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" size={16} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
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
                  {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
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
                  className="w-full text-white py-3.5 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: '#D2A752' }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting Password...</span>
                    </>
                  ) : (
                    <span>Reset Password</span>
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
                    <FaArrowLeft size={10} />
                    <span>Back to Sign In</span>
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

export default ResetPassword;
