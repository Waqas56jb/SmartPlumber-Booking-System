import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaArrowLeft, FaWrench, FaKey, FaCheckCircle } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-br from-background-alt via-white to-background-alt flex items-center justify-center p-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Reset Password Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm animate-pulse-slow">
              {step === 1 ? <FaKey className="text-white" size={28} /> : <FaWrench className="text-white" size={28} />}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
              {step === 1 ? 'Enter OTP' : 'Reset Password'}
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              {step === 1 
                ? `We sent a code to ${email || 'your email'}`
                : 'Create your new password'
              }
            </p>
          </div>

          {/* Form */}
          {step === 1 ? (
            <form onSubmit={handleOtpSubmit} className="p-6 sm:p-8 space-y-5">
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-text-light text-center">
                  Please enter the 6-digit verification code sent to your email.
                </p>
              </div>

              {/* OTP Input */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-primary text-center">
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
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-primary"
                    />
                  ))}
                </div>
              </div>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-accent hover:text-accent-dark font-medium transition-colors"
                >
                  Didn't receive code? <span className="font-semibold">Resend</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full bg-accent text-white py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:bg-accent-dark hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover-lift"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="p-6 sm:p-8 space-y-5">
              {/* New Password Field */}
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-semibold text-primary">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-text-light" size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-primary placeholder:text-text-light"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-light hover:text-accent transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-primary">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-text-light" size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-primary placeholder:text-text-light"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-light hover:text-accent transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                  <div className="flex items-center gap-2 text-sm text-green-600 animate-fade-in">
                    <FaCheckCircle size={14} />
                    <span>Passwords match</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:bg-accent-dark hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover-lift"
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>

              {/* Back to Login Link */}
              <div className="text-center pt-4">
                <Link 
                  to="/login" 
                  className="text-sm text-accent hover:text-accent-dark font-semibold transition-colors inline-flex items-center gap-1"
                >
                  <FaArrowLeft size={12} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
