import React from 'react';
import { FaWrench, FaUser, FaStore, FaStar, FaCheckCircle, FaClock, FaShieldAlt, FaCreditCard, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight, FaHandshake } from 'react-icons/fa';
import { Link, useRouter } from '../utils/router';
import { useAuth } from '../contexts/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const { navigate } = useRouter();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      // Redirect based on user role (for now, just go to home)
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <FaWrench className="text-4xl" />,
      title: "Expert Plumbers",
      description: "Find certified and experienced plumbers in your area. Verified professionals ready to help."
    },
    {
      icon: <FaStore className="text-4xl" />,
      title: "Sanitary Products",
      description: "Browse and purchase high-quality sanitary goods from trusted sellers. Fast delivery available."
    },
    {
      icon: <FaClock className="text-4xl" />,
      title: "24/7 Availability",
      description: "Emergency services available round the clock. Get help when you need it most."
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Secure Payments",
      description: "Pay securely online or choose cash on delivery. Your payment is always protected."
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl" />,
      title: "Location Based",
      description: "Find plumbers and services near you. Quick response times in your area."
    },
    {
      icon: <FaStar className="text-4xl" />,
      title: "Verified Reviews",
      description: "Read authentic reviews from real customers. Make informed decisions."
    }
  ];

  const benefits = [
    "Quick and easy booking process",
    "Multiple payment options (Online & COD)",
    "Real-time order tracking",
    "Professional and verified service providers",
    "Competitive pricing",
    "24/7 customer support"
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Expert Plumbers" },
    { number: "50+", label: "Sanitary Sellers" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      rating: 5,
      text: "Excellent service! The plumber arrived on time and fixed the issue quickly. Highly recommended!"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      rating: 5,
      text: "Great platform for finding reliable plumbers. The booking process is smooth and payment is secure."
    },
    {
      name: "Emma Williams",
      role: "Property Manager",
      rating: 5,
      text: "I use this platform regularly for my properties. Always professional service and fair pricing."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEFEFE] to-[#F5E6D3]">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center">
              <img src="/logo.png" alt="BP Heating & Plumbing" className="h-10 sm:h-12 w-auto" />
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-gray-900 hidden sm:inline">
                BP Heating & Plumbing
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/login"
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#D2A752] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ background: '#D2A752' }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Your Complete
                <span className="block" style={{ color: '#D2A752' }}>Plumbing Solution</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Connect with expert plumbers, shop for sanitary products, and manage all your plumbing needs in one place. 
                Fast, reliable, and secure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white rounded-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2"
                  style={{ background: '#D2A752' }}
                >
                  Get Started <FaArrowRight />
                </Link>
                <Link
                  to="/login"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold border-2 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  style={{ borderColor: '#D2A752', color: '#D2A752' }}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop"
                alt="Professional Plumber"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D2A752' }}>
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Platforms Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Platform
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Three integrated platforms working together to serve all your plumbing needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Customer Platform */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 sm:mb-6 mx-auto" style={{ background: '#F5E6D3' }}>
                <FaUser className="text-3xl" style={{ color: '#D2A752' }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Customer</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 mb-6">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Book plumbers instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Shop sanitary products</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Track orders in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Secure payment options</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Read verified reviews</span>
                </li>
              </ul>
              <Link
                to="/login"
                className="block w-full text-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ background: '#D2A752' }}
              >
                Login as Customer
              </Link>
            </div>

            {/* Plumber Platform */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 sm:mb-6 mx-auto" style={{ background: '#F5E6D3' }}>
                <FaWrench className="text-3xl" style={{ color: '#D2A752' }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Plumber</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 mb-6">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Create professional profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Upload bio and credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Manage bookings & orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Set availability schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Earn from your expertise</span>
                </li>
              </ul>
              <Link
                to="/plumber-login"
                className="block w-full text-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ background: '#D2A752' }}
              >
                Login as Plumber
              </Link>
            </div>

            {/* Sanitary Seller Platform */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 sm:mb-6 mx-auto" style={{ background: '#F5E6D3' }}>
                <FaStore className="text-3xl" style={{ color: '#D2A752' }} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Sanitary Seller</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600 mb-6">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Sell sanitary goods online</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Manage product catalog</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Process orders efficiently</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Track sales & revenue</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: '#D2A752' }} />
                  <span>Reach more customers</span>
                </li>
              </ul>
              <Link
                to="/seller-login"
                  className="block w-full text-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ background: '#D2A752' }}
              >
                Login as Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for all your plumbing requirements in one integrated platform
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-[#FEFEFE] to-[#F5E6D3] rounded-xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ background: '#D2A752', color: 'white' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#F5E6D3] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
                alt="Plumbing Services"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Benefits of Our Platform
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="mt-1 flex-shrink-0 text-xl" style={{ color: '#D2A752' }} />
                    <span className="text-base sm:text-lg text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Flexible Payment Options
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the payment method that works best for you
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#FEFEFE] to-[#F5E6D3] rounded-xl p-6 sm:p-8 text-center">
              <FaCreditCard className="text-5xl mx-auto mb-4" style={{ color: '#D2A752' }} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Online Payment</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Pay securely online using credit cards, debit cards, or digital wallets. Fast and secure transactions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#FEFEFE] to-[#F5E6D3] rounded-xl p-6 sm:p-8 text-center">
              <FaHandshake className="text-5xl mx-auto mb-4" style={{ color: '#D2A752' }} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Cash on Delivery</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Pay when you receive the service or product. No upfront payment required. Convenient and trusted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Real reviews from satisfied customers who trust our platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
                <div className="flex items-center gap-1 mb-4" style={{ color: '#D2A752' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-lg" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-4 italic">"{review.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#D2A752] to-[#B8943F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
            Join thousands of satisfied customers, plumbers, and sellers on our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold bg-white text-[#D2A752] rounded-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2"
            >
              Create Account <FaArrowRight />
            </Link>
            <Link
              to="/login"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold border-2 border-white text-white rounded-lg transition-all duration-300 hover:bg-white hover:text-[#D2A752] flex items-center justify-center gap-2"
            >
              Login Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.png" alt="BP Heating & Plumbing" className="h-10 w-auto" />
                <span className="ml-2 font-bold">BP Heating & Plumbing</span>
              </div>
              <p className="text-sm text-gray-400">
                Your trusted partner for all plumbing needs. Quality service, reliable professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/login" className="hover:text-[#D2A752] transition-colors">Login</Link></li>
                <li><Link to="/signup" className="hover:text-[#D2A752] transition-colors">Sign Up</Link></li>
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#D2A752] transition-colors text-left">About Us</button></li>
                <li><button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="hover:text-[#D2A752] transition-colors text-left">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platforms</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/login" className="hover:text-[#D2A752] transition-colors">Customer Portal</Link></li>
                <li><Link to="/plumber-login" className="hover:text-[#D2A752] transition-colors">Plumber Portal</Link></li>
                <li><Link to="/seller-login" className="hover:text-[#D2A752] transition-colors">Seller Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <FaPhone className="text-[#D2A752]" />
                  <span>+44 7777 998381</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-[#D2A752]" />
                  <span>info@bpheating.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 BP Heating & Plumbing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
