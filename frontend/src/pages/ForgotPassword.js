import React, { useState } from 'react';
import { FaEnvelope, FaArrowLeft, FaWrench, FaArrowRight } from 'react-icons/fa';
import { Link, useRouter } from '../utils/router';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { navigate } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('OTP sent to your email!');
      setLoading(false);
      navigate('/reset-password', { email });
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

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm animate-pulse-slow">
              <FaWrench className="text-white" size={28} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Forgot Password?</h1>
            <p className="text-white/80 text-sm sm:text-base">Enter your email to receive OTP</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-text-light text-center">
                We'll send a verification code to your email address to reset your password.
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-primary">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-text-light" size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-primary placeholder:text-text-light"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:bg-accent-dark hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover-lift flex items-center justify-center gap-2"
            >
              {loading ? 'Sending OTP...' : (
                <>
                  <span>Send OTP</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </>
              )}
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
