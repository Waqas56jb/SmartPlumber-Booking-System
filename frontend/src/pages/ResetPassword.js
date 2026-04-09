import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaLock, FaArrowLeft, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { Link, useRouter, useLocation } from '../utils/router';
import { authAPI } from '../services/apiService';
// i read email from location state and post new password after otp step
const ResetPassword = () => {
  const location = useLocation();
  const {
    navigate
  } = useRouter();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email] = useState(() => {
    const stateEmail = location.state?.email;
    if (stateEmail) return stateEmail;
    try {
      const stored = sessionStorage.getItem('reset_email');
      return stored || '';
    } catch {
      return '';
    }
  });
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    } else {
      try {
        sessionStorage.setItem('reset_email', email);
      } catch (e) {
        console.warn('Failed to store email:', e);
      }
    }
  }, [email, navigate]);
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };
  const handleOtpSubmit = async e => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;
    setLoading(true);
    try {
      const response = await authAPI.verifyOtp(email, otpValue);
      if (response.success) {
        setStep(2);
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handlePasswordSubmit = async e => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      window.alert('Passwords do not match!');
      return;
    }
    if (formData.newPassword.length < 6) {
      window.alert('Password must be at least 6 characters!');
      return;
    }
    setLoading(true);
    try {
      const otpValue = otp.join('');
      const response = await authAPI.resetPassword(email, otpValue, formData.newPassword, formData.confirmPassword);
      if (response.success) {
        try {
          sessionStorage.removeItem('reset_email');
        } catch (e) {}
        navigate('/login');
      }
    } catch (error) {
      console.error('Password reset failed:', error);
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
          
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 shadow-2xl mt-20 sm:mt-24 lg:mt-0 flex flex-col">
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                {step === 1 ? 'Enter OTP' : 'Reset Password'}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                {step === 1 ? `We sent a code to ${email || 'your email'}` : 'Create your new password'}
              </p>
            </div>

            {}
            {step === 1 ? <form onSubmit={handleOtpSubmit} className="space-y-3.5 sm:space-y-4 md:space-y-5 flex-1 flex flex-col">
                <div className="rounded-lg p-3 sm:p-4 md:p-5" style={{
              background: 'linear-gradient(to right, #F5E6D3, #E8D4B8)',
              border: '1px solid #D2A752'
            }}>
                  <p className="text-xs sm:text-sm text-gray-700 text-center leading-relaxed">
                    <FaEnvelope className="inline-block mr-1.5 sm:mr-2" size={12} style={{
                  color: '#D2A752',
                  fontSize: 'clamp(12px, 2vw, 14px)'
                }} />
                    Please enter the 6-digit verification code sent to your email.
                  </p>
                </div>

                {}
                <div className="w-full overflow-x-hidden">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2.5 sm:mb-3 text-center">
                    Verification Code
                  </label>
                  <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 w-full max-w-full px-1">
                    {otp.map((digit, index) => <input key={index} id={`otp-${index}`} type="text" inputMode="numeric" maxLength="1" value={digit} onChange={e => handleOtpChange(index, e.target.value)} onKeyDown={e => handleOtpKeyDown(index, e)} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 text-center text-base sm:text-lg md:text-xl font-bold border border-gray-200 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 shadow-sm bg-gray-50 touch-manipulation flex-shrink-0" style={{
                  '--tw-ring-color': '#D2A752'
                }} onFocus={e => {
                  e.target.style.boxShadow = '0 0 0 2px #D2A752';
                  e.target.style.borderColor = '#D2A752';
                }} onBlur={e => {
                  e.target.style.boxShadow = '';
                  e.target.style.borderColor = '#E5E7EB';
                }} />)}
                  </div>
                </div>

                {}
                <div className="text-center">
                  <button type="button" className="text-xs sm:text-sm font-medium transition-colors" style={{
                color: '#D2A752'
              }} onMouseEnter={e => e.target.style.color = '#B8943F'} onMouseLeave={e => e.target.style.color = '#D2A752'}>
                    Didn't receive code? <span className="font-semibold">Resend</span>
                  </button>
                </div>

                {}
                <button type="submit" disabled={loading || otp.join('').length !== 6} className="w-full text-white py-3 sm:py-3.5 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation" style={{
              background: '#D2A752'
            }}>
                  {loading ? <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </> : <span>Verify OTP</span>}
                </button>
              </form> : <form onSubmit={handlePasswordSubmit} className="space-y-3.5 sm:space-y-4 md:space-y-5 flex-1 flex flex-col">
                {}
                <div>
                  <label htmlFor="newPassword" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} />
                    </div>
                    <input type={showPassword ? 'text' : 'password'} id="newPassword" name="newPassword" value={formData.newPassword} onChange={handlePasswordChange} placeholder="Enter new password" className="w-full pl-9 sm:pl-10 md:pl-12 pr-9 sm:pr-10 md:pr-12 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm" style={{
                  '--tw-ring-color': '#D2A752'
                }} onFocus={e => {
                  e.target.style.boxShadow = '0 0 0 2px #D2A752';
                  e.target.style.borderColor = '#D2A752';
                }} onBlur={e => {
                  e.target.style.boxShadow = '';
                  e.target.style.borderColor = '#E5E7EB';
                }} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 md:pr-4 flex items-center text-gray-400 transition-colors touch-manipulation" onMouseEnter={e => e.target.style.color = '#D2A752'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                      {showPassword ? <FaEyeSlash size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} /> : <FaEye size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} />}
                    </button>
                  </div>
                </div>

                {}
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} />
                    </div>
                    <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm new password" className="w-full pl-9 sm:pl-10 md:pl-12 pr-9 sm:pr-10 md:pr-12 h-11 sm:h-12 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-900 placeholder:text-gray-400 shadow-sm" style={{
                  '--tw-ring-color': '#D2A752'
                }} onFocus={e => {
                  e.target.style.boxShadow = '0 0 0 2px #D2A752';
                  e.target.style.borderColor = '#D2A752';
                }} onBlur={e => {
                  e.target.style.boxShadow = '';
                  e.target.style.borderColor = '#E5E7EB';
                }} required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 md:pr-4 flex items-center text-gray-400 transition-colors touch-manipulation" onMouseEnter={e => e.target.style.color = '#D2A752'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
                      {showConfirmPassword ? <FaEyeSlash size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} /> : <FaEye size={14} style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }} />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.newPassword === formData.confirmPassword && <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 mt-2">
                      <FaCheckCircle size={12} />
                      <span className="font-medium">Passwords match</span>
                    </div>}
                </div>

                {}
                <button type="submit" disabled={loading} className="w-full text-white py-3 sm:py-3.5 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation" style={{
              background: '#D2A752'
            }}>
                  {loading ? <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting Password...</span>
                    </> : <span>Reset Password</span>}
                </button>

                {}
                <div className="text-center pt-4 mt-auto">
                  <Link to="/login" className="text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-2" style={{
                color: '#D2A752'
              }} onMouseEnter={e => e.target.style.color = '#B8943F'} onMouseLeave={e => e.target.style.color = '#D2A752'}>
                    <FaArrowLeft size={10} />
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </form>}
          </div>
        </div>
      </div>
    </div>;
};
export default ResetPassword;
