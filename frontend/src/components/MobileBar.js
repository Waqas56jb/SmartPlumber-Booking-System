import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
const MobileBar = () => {
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border grid grid-cols-4 shadow-lg z-[1000] md:hidden">
      <a href="tel:+447777998381" className="flex flex-col items-center justify-center py-3 gap-1 text-text transition-colors active:bg-background-alt">
        <FaPhone size={20} />
        <span className="text-xs font-semibold">Call</span>
      </a>
      <a href="https://wa.me/447777998381" className="flex flex-col items-center justify-center py-3 gap-1 text-text transition-colors active:bg-background-alt" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={20} />
        <span className="text-xs font-semibold">WhatsApp</span>
      </a>
      <a href="mailto:basitpk4@yahoo.com" className="flex flex-col items-center justify-center py-3 gap-1 text-text transition-colors active:bg-background-alt">
        <FaEnvelope size={20} />
        <span className="text-xs font-semibold">Email</span>
      </a>
      <a href="https://instagram.com/abdulb05" className="flex flex-col items-center justify-center py-3 gap-1 text-text transition-colors active:bg-background-alt" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={20} />
        <span className="text-xs font-semibold">Instagram</span>
      </a>
    </div>;
};
export default MobileBar;
