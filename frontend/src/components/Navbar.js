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
    <nav className={`bg-white border-b border-border py-5 sticky top-0 z-50 transition-shadow ${
      scrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <div className="text-[22px] font-extrabold tracking-wide text-primary leading-tight">
                BP HEATING & PLUMBING
              </div>
              <div className="text-[11px] text-primary font-medium tracking-widest uppercase mt-1">
                Gas Safe Registered
              </div>
            </div>
          </div>
          <button 
            onClick={scrollToContact}
            className="bg-accent text-white px-8 py-3.5 font-semibold text-[15px] cursor-pointer transition-all hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-md tracking-wide"
          >
            Request Service
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
