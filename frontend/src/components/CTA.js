import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const CTA = () => {
  const sectionRef = useScrollAnimation();

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-16 md:py-20 bg-primary text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-5">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 sm:mb-14 max-w-[600px] mx-auto leading-relaxed px-4">
            Contact our Gas Safe registered engineers for reliable heating and plumbing solutions. 24/7 emergency call out available.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-[900px] mx-auto">
            <a
              href="tel:+447777998381"
              className="bg-white p-5 sm:p-7 flex items-center gap-4 sm:gap-5 transition-all hover:-translate-y-1 hover:shadow-lg group"
            >
              <FaPhone className="text-primary flex-shrink-0" size={28} />
              <div className="text-left min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-text-light mb-1 tracking-wide uppercase">
                  Call Direct
                </h3>
                <p className="text-base sm:text-lg font-semibold text-primary break-words">
                  +44 7777 998381
                </p>
              </div>
            </a>
            <a
              href="https://wa.me/447777998381"
              className="bg-white p-5 sm:p-7 flex items-center gap-4 sm:gap-5 transition-all hover:-translate-y-1 hover:shadow-lg group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-whatsapp flex-shrink-0" size={28} />
              <div className="text-left min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-text-light mb-1 tracking-wide uppercase">
                  WhatsApp
                </h3>
                <p className="text-base sm:text-lg font-semibold text-primary">
                  Instant Response
                </p>
              </div>
            </a>
            <a
              href="mailto:basitpk4@yahoo.com"
              className="bg-white p-5 sm:p-7 flex items-center gap-4 sm:gap-5 transition-all hover:-translate-y-1 hover:shadow-lg group"
            >
              <FaEnvelope className="text-primary flex-shrink-0" size={28} />
              <div className="text-left min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-text-light mb-1 tracking-wide uppercase">
                  Email Us
                </h3>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-primary break-all">
                  basitpk4@yahoo.com
                </p>
              </div>
            </a>
            <a
              href="https://instagram.com/abdulb05"
              className="bg-white p-5 sm:p-7 flex items-center gap-4 sm:gap-5 transition-all hover:-translate-y-1 hover:shadow-lg group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-instagram flex-shrink-0" size={28} />
              <div className="text-left min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-text-light mb-1 tracking-wide uppercase">
                  Follow Us
                </h3>
                <p className="text-base sm:text-lg font-semibold text-primary">
                  @abdulb05
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
