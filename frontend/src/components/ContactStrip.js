import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

const ContactStrip = () => {
  return (
    <div className="bg-primary text-white py-3 text-sm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6 flex-wrap">
            <a 
              href="tel:+447777998381" 
              className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors"
            >
              <FaPhone className="flex-shrink-0" size={16} />
              <span>+44 7777 998381</span>
            </a>
          </div>
          <div className="flex gap-6 flex-wrap">
            <a 
              href="mailto:basitpk4@yahoo.com" 
              className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors"
            >
              <FaEnvelope className="flex-shrink-0" size={16} />
              <span>basitpk4@yahoo.com</span>
            </a>
            <a 
              href="https://wa.me/447777998381" 
              className="flex items-center gap-2 text-white/90 hover:text-whatsapp transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="flex-shrink-0" size={16} />
              <span>WhatsApp</span>
            </a>
            <a 
              href="https://instagram.com/abdulb05" 
              className="flex items-center gap-2 text-white/90 hover:text-instagram transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="flex-shrink-0" size={16} />
              <span>@abdulb05</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStrip;
