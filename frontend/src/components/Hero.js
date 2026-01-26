import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-6 sm:py-8 pb-16 sm:pb-24 bg-background-alt">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 md:gap-16 items-center">
          <div>
            <div className="inline-block bg-primary text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-[13px] font-semibold tracking-wide uppercase mb-5 sm:mb-7">
              Gas Safe Registered Engineers
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight text-primary mb-4 sm:mb-6 tracking-tight">
              Expert Heating & Plumbing Services
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-text-light mb-8 sm:mb-10 max-w-[600px]">
              We are proud to be Gas Safe Registered heating and plumbing engineers, offering outstanding Domestic Services with 24/7 emergency call out. Our team is dedicated to ensuring your appliances are efficient, providing peace of mind so you can enjoy a comfortable environment year-round.
            </p>
            <div className="flex gap-4 mb-8 sm:mb-12 flex-wrap">
              <a 
                href="tel:+447777998381" 
                className="bg-primary text-white px-6 sm:px-9 py-3 sm:py-4 font-semibold text-sm sm:text-[15px] transition-all hover:bg-secondary hover:-translate-y-0.5 hover:shadow-md inline-block text-center w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaPhone size={16} />
                  <span className="whitespace-nowrap">Call +44 7777 998381</span>
                </span>
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-border pt-6 sm:pt-8">
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-2">
                  Gas Safe
                </div>
                <div className="text-xs sm:text-sm text-text-light font-medium">
                  Registered Engineers
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-2">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-text-light font-medium">
                  Emergency Call Out
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-2">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-text-light font-medium">
                  Quality Guaranteed
                </div>
              </div>
            </div>
          </div>
          <div className="relative order-first md:order-last">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://placehold.co/800x600/f8f8f8/666666?text=Professional+Maintenance" 
                alt="Professional maintenance services" 
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
