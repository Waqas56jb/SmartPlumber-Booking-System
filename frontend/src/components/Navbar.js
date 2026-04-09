import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone, FaWrench, FaTools, FaShieldAlt, FaCheckCircle, FaEnvelope, FaWhatsapp, FaInstagram, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/router';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    isAuthenticated,
    logout
  } = useAuth();
  const {
    navigate
  } = useRouter();
  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const position = section.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };
  const navLinks = [{
    label: 'Home',
    id: 'home'
  }, {
    label: 'Services',
    id: 'services'
  }, {
    label: 'Portfolio',
    id: 'portfolio'
  }, {
    label: 'About',
    id: 'about'
  }, {
    label: 'Contact',
    id: 'contact'
  }];
  return <>
      {}
      <nav className={`bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg border-gray-200 bg-white/98' : 'shadow-sm border-gray-100'}`}>
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full overflow-x-hidden">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20 gap-2 sm:gap-3">
            {}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group cursor-pointer min-w-0" onClick={() => scrollToSection('home')}>
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-dark rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent via-accent to-accent-dark rounded-lg sm:rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                  <FaWrench className="text-white" size={18} style={{
                  fontSize: 'clamp(18px, 2.5vw, 20px)'
                }} />
                </div>
              </div>
              <div className="min-w-0 hidden xs:block">
                <div className="text-sm sm:text-base md:text-lg font-extrabold text-gray-900 leading-tight flex items-center gap-1 sm:gap-2 flex-wrap">
                  <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent whitespace-nowrap">
                    BP
                  </span>
                  <FaShieldAlt className="text-accent flex-shrink-0" size={12} style={{
                  fontSize: 'clamp(12px, 2vw, 14px)'
                }} />
                  <span className="text-[10px] sm:text-xs font-semibold text-accent bg-accent/10 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                    Heating & Plumbing
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" size={8} style={{
                  fontSize: 'clamp(8px, 1.5vw, 10px)'
                }} />
                  <span className="text-[8px] sm:text-[9px] text-gray-600 font-semibold uppercase tracking-wide whitespace-nowrap">
                    Gas Safe Registered
                  </span>
                </div>
              </div>
            </div>

            {}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => <button key={link.id} onClick={() => scrollToSection(link.id)} className="relative text-sm font-semibold text-gray-700 hover:text-accent transition-all duration-300 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-accent/5 hover:to-accent/10 group">
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-dark group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                </button>)}
            </div>

            {}
            <div className="flex items-center gap-3">
              {}
              <div className="hidden xl:flex items-center gap-2 mr-2">
                <a href="tel:+447777998381" className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group overflow-hidden" aria-label="Call us">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaPhone size={15} className="relative z-10" />
                </a>
                <a href="https://wa.me/447777998381" className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-green-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group overflow-hidden" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaWhatsapp size={15} className="relative z-10" />
                </a>
                <a href="https://instagram.com/abdulb05" className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center text-pink-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group overflow-hidden" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaInstagram size={15} className="relative z-10" />
                </a>
              </div>
              
              {}
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
                {}
                <button onClick={() => scrollToSection('contact')} className="relative px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-accent via-accent to-accent-dark rounded-lg sm:rounded-xl hover:from-accent-dark hover:via-accent-dark hover:to-accent transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group overflow-hidden touch-manipulation min-h-[44px]">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaTools size={12} className="sm:w-[14px] sm:h-[14px] relative z-10 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span className="hidden sm:inline relative z-10 whitespace-nowrap">Request Service</span>
                  <span className="sm:hidden relative z-10 whitespace-nowrap">Request</span>
                </button>
                
                {}
                {isAuthenticated && <button onClick={handleLogout} className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 touch-manipulation min-h-[44px]" title="Logout">
                    <FaSignOutAlt size={12} className="sm:w-[13px] sm:h-[13px] flex-shrink-0" />
                    <span className="hidden sm:inline whitespace-nowrap">Logout</span>
                  </button>}
              </div>
              
              {}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-gray-700 p-2.5 sm:p-3 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation flex items-center justify-center min-w-[44px] min-h-[44px]" aria-label="Toggle menu">
                {mobileMenuOpen ? <FaTimes size={20} className="w-5 h-5" /> : <FaBars size={20} className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {}
        <div className={`lg:hidden bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-200 backdrop-blur-sm transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4">
            <div className="flex flex-col gap-1.5">
              {navLinks.map(link => <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-left text-base font-semibold text-gray-700 hover:text-accent hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent/5 transition-all duration-300 py-3 px-4 rounded-xl hover:translate-x-1">
                  {link.label}
                </button>)}
              
              {}
              <div className="border-t border-gray-200 my-3"></div>
              
              {}
              {isAuthenticated && <button onClick={handleLogout} className="text-left text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50/50 transition-all duration-300 py-3 px-4 rounded-xl flex items-center gap-2 hover:translate-x-1">
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </button>}
              
              {}
              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <a href="tel:+447777998381" className="flex items-center gap-2.5 text-gray-700 hover:text-accent transition-all duration-300 hover:scale-105 font-semibold">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <FaPhone size={16} className="text-accent" />
                    </div>
                    <span className="font-semibold text-sm">+44 7777 998381</span>
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://wa.me/447777998381" className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-green-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group overflow-hidden" target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaWhatsapp size={17} className="relative z-10" />
                  </a>
                  <a href="https://instagram.com/abdulb05" className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center text-pink-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group overflow-hidden" target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaInstagram size={17} className="relative z-10" />
                  </a>
                  <a href="mailto:basitpk4@yahoo.com" className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaEnvelope size={17} className="relative z-10" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>;
};
export default Navbar;
