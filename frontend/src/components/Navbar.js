import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const position = contactSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`bg-white border-b border-border py-3 sm:py-5 sticky top-0 z-50 transition-shadow ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center min-w-0">
            <div className="min-w-0">
              <div className="text-base sm:text-lg md:text-[22px] font-extrabold tracking-wide text-primary leading-tight truncate">
                BP HEATING & PLUMBING
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-[11px] text-primary font-medium tracking-widest uppercase mt-0.5 sm:mt-1">
                Gas Safe Registered
              </div>
            </div>
          </div>
          <button 
            onClick={scrollToContact}
            className="bg-accent text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-3.5 font-semibold text-xs sm:text-sm md:text-[15px] cursor-pointer transition-all hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-md tracking-wide whitespace-nowrap flex-shrink-0"
          >
            <span className="hidden sm:inline">Request Service</span>
            <span className="sm:hidden">Request</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
