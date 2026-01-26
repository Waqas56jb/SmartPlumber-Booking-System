import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-8 pb-24 bg-background-alt">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div>
            <div className="inline-block bg-primary text-white px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase mb-7">
              Gas Safe Registered Engineers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight text-primary mb-6 tracking-tight">
              Expert Heating & Plumbing Services
            </h1>
            <p className="text-lg leading-relaxed text-text-light mb-10 max-w-[600px]">
              We are proud to be Gas Safe Registered heating and plumbing engineers, offering outstanding Domestic Services with 24/7 emergency call out. Our team is dedicated to ensuring your appliances are efficient, providing peace of mind so you can enjoy a comfortable environment year-round.
            </p>
            <div className="flex gap-4 mb-12 flex-wrap">
              <a 
                href="tel:+447777998381" 
                className="bg-primary text-white px-9 py-4 font-semibold text-[15px] transition-all hover:bg-secondary hover:-translate-y-0.5 hover:shadow-md inline-block text-center"
              >
                <span className="flex items-center gap-2">
                  <FaPhone size={16} />
                  Call +44 7777 998381
                </span>
              </a>
            </div>
            <div className="grid grid-cols-3 gap-8 border-t border-border pt-8">
              <div>
                <div className="text-4xl font-extrabold text-primary leading-tight mb-2">
                  Gas Safe
                </div>
                <div className="text-sm text-text-light font-medium">
                  Registered Engineers
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-primary leading-tight mb-2">
                  24/7
                </div>
                <div className="text-sm text-text-light font-medium">
                  Emergency Call Out
                </div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-primary leading-tight mb-2">
                  100%
                </div>
                <div className="text-sm text-text-light font-medium">
                  Quality Guaranteed
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden">
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
