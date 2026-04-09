import React from 'react';
import { FaPhone, FaEnvelope, FaClock, FaShieldAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
// i bottom call to action strip with phone whatsapp and email links
const CTA = () => {
  const sectionRef = useScrollAnimation();
  return <section ref={sectionRef} id="contact" className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-primary via-secondary to-primary text-white relative overflow-hidden w-full">
      {}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-accent rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-accent rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full overflow-x-hidden">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-lg mb-5">
            <FaClock className="text-accent" size={16} />
            <span className="text-xs font-bold text-accent uppercase tracking-wide">Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 sm:mb-6">
            Ready to Get <span className="text-accent">Started?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-[700px] mx-auto leading-relaxed px-4">
            Contact our <strong>Gas Safe registered engineers</strong> for reliable heating and plumbing solutions. <strong>24/7 emergency call out</strong> available for your peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <FaShieldAlt className="text-accent" size={14} />
              <span className="text-xs sm:text-sm font-semibold">Gas Safe Registered</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <FaCheckCircle className="text-accent" size={14} />
              <span className="text-xs sm:text-sm font-semibold">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <FaClock className="text-accent" size={14} />
              <span className="text-xs sm:text-sm font-semibold">Fast Response Time</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-[1000px] mx-auto">
            <a href="tel:+447777998381" className="bg-white p-6 sm:p-8 flex items-center gap-5 sm:gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group rounded-xl animate-fade-in-up hover-lift" style={{
            animationDelay: '0.1s'
          }}>
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <FaPhone className="text-primary group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-text-light mb-2 tracking-wide uppercase">
                  Call Direct
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-bold text-primary break-words">
                  +44 7777 998381
                </p>
                <p className="text-xs text-text-light mt-1">Available 24/7</p>
              </div>
              <FaArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" size={20} />
            </a>
            <a href="https://wa.me/447777998381" className="bg-white p-6 sm:p-8 flex items-center gap-5 sm:gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group rounded-xl animate-fade-in-up hover-lift" target="_blank" rel="noopener noreferrer" style={{
            animationDelay: '0.2s'
          }}>
              <div className="w-16 h-16 bg-whatsapp/10 rounded-xl flex items-center justify-center group-hover:bg-whatsapp group-hover:scale-110 transition-all duration-300">
                <FaWhatsapp className="text-whatsapp group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-text-light mb-2 tracking-wide uppercase">
                  WhatsApp
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-bold text-primary">
                  Instant Response
                </p>
                <p className="text-xs text-text-light mt-1">Quick & Easy</p>
              </div>
              <FaArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" size={20} />
            </a>
            <a href="mailto:basitpk4@yahoo.com" className="bg-white p-6 sm:p-8 flex items-center gap-5 sm:gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group rounded-xl animate-fade-in-up hover-lift" style={{
            animationDelay: '0.3s'
          }}>
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                <FaEnvelope className="text-primary group-hover:text-white transition-colors" size={28} />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-text-light mb-2 tracking-wide uppercase">
                  Email Us
                </h3>
                <p className="text-sm sm:text-base md:text-lg font-bold text-primary break-all">
                  basitpk4@yahoo.com
                </p>
                <p className="text-xs text-text-light mt-1">Response within 24hrs</p>
              </div>
              <FaArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" size={20} />
            </a>
            <a href="https://instagram.com/abdulb05" className="bg-white p-6 sm:p-8 flex items-center gap-5 sm:gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group rounded-xl animate-fade-in-up hover-lift" target="_blank" rel="noopener noreferrer" style={{
            animationDelay: '0.4s'
          }}>
              <div className="w-16 h-16 bg-instagram/10 rounded-xl flex items-center justify-center group-hover:bg-instagram group-hover:scale-110 transition-all duration-300">
                <FaInstagram className="text-instagram group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-text-light mb-2 tracking-wide uppercase">
                  Follow Us
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-bold text-primary">
                  @abdulb05
                </p>
                <p className="text-xs text-text-light mt-1">See our latest work</p>
              </div>
              <FaArrowRight className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default CTA;
