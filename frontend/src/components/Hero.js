import React from 'react';
import { FaPhone, FaWrench, FaShieldAlt, FaClock, FaCheckCircle, FaTools, FaAward, FaStar } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
// i hero banner with scroll animation hook for fade in
const Hero = () => {
  const sectionRef = useScrollAnimation();
  return <section ref={sectionRef} id="home" className="relative py-6 sm:py-8 md:py-12 pb-16 sm:pb-20 md:pb-28 bg-gradient-to-br from-background-alt via-white to-background-alt overflow-hidden w-full">
      {}
      <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-accent/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-56 sm:w-64 md:w-80 h-56 sm:h-64 md:h-80 bg-primary/5 rounded-full blur-3xl -z-0"></div>
      
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center w-full">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-[10px] sm:text-xs md:text-[13px] font-bold tracking-wide uppercase mb-4 sm:mb-6 md:mb-8 rounded-lg shadow-lg animate-fade-in-up w-full sm:w-auto">
              <FaShieldAlt size={12} className="sm:w-[14px] sm:h-[14px] animate-pulse-slow flex-shrink-0" />
              <span className="whitespace-nowrap">Gas Safe Registered Engineers</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[58px] 2xl:text-[64px] font-extrabold leading-tight text-primary mb-4 sm:mb-5 md:mb-7 tracking-tight animate-fade-in-up break-words" style={{
            animationDelay: '0.1s'
          }}>
              Expert Heating &{' '}
              <span className="text-accent">Plumbing Services</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-text-light mb-6 sm:mb-8 md:mb-10 max-w-full md:max-w-[650px] animate-fade-in-up break-words" style={{
            animationDelay: '0.2s'
          }}>
              We are proud to be <strong className="text-primary">Gas Safe Registered</strong> heating and plumbing engineers, offering outstanding Domestic Services with <strong className="text-primary">24/7 emergency call out</strong>. Our team is dedicated to ensuring your appliances are efficient, providing peace of mind so you can enjoy a comfortable environment year-round.
            </p>
            
            {}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-accent/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-accent/20 hover-lift animate-fade-in-up" style={{
              animationDelay: '0.3s'
            }}>
                <FaCheckCircle className="text-accent flex-shrink-0" size={14} style={{
                fontSize: 'clamp(14px, 2vw, 16px)'
              }} />
                <span className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-accent/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-accent/20 hover-lift animate-fade-in-up" style={{
              animationDelay: '0.4s'
            }}>
                <FaStar className="text-accent flex-shrink-0" size={14} style={{
                fontSize: 'clamp(14px, 2vw, 16px)'
              }} />
                <span className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap">5 Star Rated</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-accent/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-accent/20 hover-lift animate-fade-in-up" style={{
              animationDelay: '0.5s'
            }}>
                <FaAward className="text-accent flex-shrink-0" size={14} style={{
                fontSize: 'clamp(14px, 2vw, 16px)'
              }} />
                <span className="text-xs sm:text-sm font-semibold text-primary whitespace-nowrap">Quality Guaranteed</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-14 w-full">
              <a href="tel:+447777998381" className="bg-primary text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 font-bold text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-secondary hover:-translate-y-1 hover:shadow-xl inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg group animate-fade-in-up hover-lift touch-manipulation w-full sm:w-auto" style={{
              animationDelay: '0.6s'
            }}>
                <FaPhone size={16} className="sm:w-[18px] sm:h-[18px] group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <span className="whitespace-nowrap text-center">Call +44 7777 998381</span>
              </a>
              <a href="#contact" className="bg-accent text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 font-bold text-xs sm:text-sm md:text-base transition-all duration-300 hover:bg-accent-dark hover:-translate-y-1 hover:shadow-xl inline-flex items-center justify-center gap-2 sm:gap-3 rounded-lg group animate-fade-in-up hover-lift touch-manipulation w-full sm:w-auto" style={{
              animationDelay: '0.7s'
            }}>
                <FaTools size={16} className="sm:w-[18px] sm:h-[18px] group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="whitespace-nowrap text-center">Request Service</span>
              </a>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 border-t border-border pt-6 sm:pt-8 md:pt-10 w-full">
              <div className="text-center sm:text-left group">
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors flex-shrink-0">
                    <FaShieldAlt className="text-accent group-hover:text-white" size={18} style={{
                    fontSize: 'clamp(18px, 2.5vw, 20px)'
                  }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary leading-tight break-words">
                      Gas Safe
                    </div>
                    <div className="text-xs sm:text-sm text-text-light font-semibold break-words">
                      Registered Engineers
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors flex-shrink-0">
                    <FaClock className="text-accent group-hover:text-white" size={18} style={{
                    fontSize: 'clamp(18px, 2.5vw, 20px)'
                  }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                      24/7
                    </div>
                    <div className="text-xs sm:text-sm text-text-light font-semibold break-words">
                      Emergency Call Out
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors flex-shrink-0">
                    <FaCheckCircle className="text-accent group-hover:text-white" size={18} style={{
                    fontSize: 'clamp(18px, 2.5vw, 20px)'
                  }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                      100%
                    </div>
                    <div className="text-xs sm:text-sm text-text-light font-semibold break-words">
                      Quality Guaranteed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {}
          <div className="relative order-first md:order-last animate-fade-in-right w-full" style={{
          animationDelay: '0.3s'
        }}>
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl group hover-lift w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 z-10"></div>
              <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop&q=80" alt="Professional plumber working on heating system" className="w-full h-auto block transition-transform duration-700 group-hover:scale-110 object-cover max-w-full" loading="eager" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4 sm:p-5 md:p-6 z-20 animate-fade-in-up">
                <div className="flex items-center gap-2 sm:gap-3 text-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-lg flex items-center justify-center animate-pulse-slow flex-shrink-0">
                    <FaWrench size={18} style={{
                    fontSize: 'clamp(18px, 2.5vw, 20px)'
                  }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs sm:text-sm break-words">Expert Technicians</p>
                    <p className="text-[10px] sm:text-xs text-white/80 break-words">Fully Qualified & Insured</p>
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-accent text-white px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl shadow-xl z-30 flex items-center gap-2 sm:gap-3 animate-bounce-slow hover-lift max-w-[calc(100%-1rem)] sm:max-w-none">
              <FaStar size={16} className="sm:w-5 sm:h-5 animate-pulse-slow flex-shrink-0" style={{
              fontSize: 'clamp(16px, 2.5vw, 20px)'
            }} />
              <div className="min-w-0">
                <p className="font-bold text-xs sm:text-sm whitespace-nowrap">5 Star</p>
                <p className="text-[10px] sm:text-xs whitespace-nowrap">Rated Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
