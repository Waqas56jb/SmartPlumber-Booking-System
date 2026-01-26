import React from 'react';
import { FaPhone, FaWrench, FaShieldAlt, FaClock, FaCheckCircle, FaTools, FaAward, FaStar } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} id="home" className="relative py-8 sm:py-12 pb-20 sm:pb-28 bg-gradient-to-br from-background-alt via-white to-background-alt overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold tracking-wide uppercase mb-6 sm:mb-8 rounded-lg shadow-lg animate-fade-in-up">
              <FaShieldAlt size={14} className="animate-pulse-slow" />
              <span>Gas Safe Registered Engineers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] xl:text-[64px] font-extrabold leading-tight text-primary mb-5 sm:mb-7 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Expert Heating &{' '}
              <span className="text-accent">Plumbing Services</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-text-light mb-8 sm:mb-10 max-w-[650px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              We are proud to be <strong className="text-primary">Gas Safe Registered</strong> heating and plumbing engineers, offering outstanding Domestic Services with <strong className="text-primary">24/7 emergency call out</strong>. Our team is dedicated to ensuring your appliances are efficient, providing peace of mind so you can enjoy a comfortable environment year-round.
            </p>
            
            {/* Key Features */}
            <div className="flex flex-wrap gap-3 mb-8 sm:mb-10">
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2.5 rounded-lg border border-accent/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <FaCheckCircle className="text-accent" size={16} />
                <span className="text-sm font-semibold text-primary">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2.5 rounded-lg border border-accent/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <FaStar className="text-accent" size={16} />
                <span className="text-sm font-semibold text-primary">5 Star Rated</span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 px-4 py-2.5 rounded-lg border border-accent/20 hover-lift animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <FaAward className="text-accent" size={16} />
                <span className="text-sm font-semibold text-primary">Quality Guaranteed</span>
              </div>
            </div>

            <div className="flex gap-4 mb-10 sm:mb-14 flex-wrap">
              <a 
                href="tel:+447777998381" 
                className="bg-primary text-white px-8 sm:px-10 py-4 sm:py-4.5 font-bold text-sm sm:text-base transition-all duration-300 hover:bg-secondary hover:-translate-y-1 hover:shadow-xl inline-flex items-center justify-center gap-3 rounded-lg group animate-fade-in-up hover-lift"
                style={{ animationDelay: '0.6s' }}
              >
                <FaPhone size={18} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="whitespace-nowrap">Call +44 7777 998381</span>
              </a>
              <a 
                href="#contact" 
                className="bg-accent text-white px-8 sm:px-10 py-4 sm:py-4.5 font-bold text-sm sm:text-base transition-all duration-300 hover:bg-accent-dark hover:-translate-y-1 hover:shadow-xl inline-flex items-center justify-center gap-3 rounded-lg group animate-fade-in-up hover-lift"
                style={{ animationDelay: '0.7s' }}
              >
                <FaTools size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="whitespace-nowrap">Request Service</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-border pt-8 sm:pt-10">
              <div className="text-center sm:text-left group">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                    <FaShieldAlt className="text-accent group-hover:text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
                      Gas Safe
                    </div>
                    <div className="text-xs sm:text-sm text-text-light font-semibold">
                      Registered Engineers
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                    <FaClock className="text-accent group-hover:text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
                      24/7
                    </div>
                    <div className="text-xs sm:text-sm text-text-light font-semibold">
                      Emergency Call Out
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                    <FaCheckCircle className="text-accent group-hover:text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
                      100%
                    </div>
                    <div className="text-xs sm:text-sm text-text-light font-semibold">
                      Quality Guaranteed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative order-first md:order-last animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop&q=80" 
                alt="Professional plumber working on heating system" 
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-110"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 z-20 animate-fade-in-up">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center animate-pulse-slow">
                    <FaWrench size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Expert Technicians</p>
                    <p className="text-xs text-white/80">Fully Qualified & Insured</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-accent text-white px-6 py-4 rounded-xl shadow-xl z-30 flex items-center gap-3 animate-bounce-slow hover-lift">
              <FaStar size={20} className="animate-pulse-slow" />
              <div>
                <p className="font-bold text-sm">5 Star</p>
                <p className="text-xs">Rated Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
