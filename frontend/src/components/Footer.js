import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white/80 py-10 sm:py-12 md:py-15 pt-12 sm:pt-14 md:pt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-9 mb-8 sm:mb-9">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-white mb-3 sm:mb-3.5 tracking-wide">
              BP HEATING AND PLUMBING
            </h3>
            <p className="text-sm sm:text-[15px] leading-relaxed text-white/70">
              Professional maintenance and technical solutions for residential and commercial properties across the UK.
            </p>
          </div>
          <div>
            <h4 className="text-sm sm:text-[15px] font-bold text-white mb-3 sm:mb-3.5 tracking-wide uppercase">
              Services
            </h4>
            <ul className="flex flex-col gap-2 sm:gap-3 list-none">
              <li>
                <a href="#services" className="text-sm sm:text-[15px] text-white/70 hover:text-accent transition-colors">
                  Boiler Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm sm:text-[15px] text-white/70 hover:text-accent transition-colors">
                  Central Heating
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm sm:text-[15px] text-white/70 hover:text-accent transition-colors">
                  General Plumbing
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm sm:text-[15px] text-white/70 hover:text-accent transition-colors">
                  Gas Safety Inspections
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm sm:text-[15px] font-bold text-white mb-3 sm:mb-3.5 tracking-wide uppercase">
              Contact
            </h4>
            <ul className="flex flex-col gap-2 sm:gap-3 list-none">
              <li>
                <a href="tel:+447777998381" className="text-sm sm:text-[15px] text-white/70 hover:text-white transition-colors break-all">
                  +44 7777 998381
                </a>
              </li>
              <li>
                <a href="mailto:basitpk4@yahoo.com" className="text-sm sm:text-[15px] text-white/70 hover:text-white transition-colors break-all">
                  basitpk4@yahoo.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm sm:text-[15px] font-bold text-white mb-3 sm:mb-3.5 tracking-wide uppercase">
              Working Hours
            </h4>
            <ul className="flex flex-col gap-2 sm:gap-3 list-none">
              <li className="text-xs sm:text-sm text-white/60">
                Monday - Friday: 9:00 AM - 5:00 PM
              </li>
              <li className="text-xs sm:text-sm text-white/60">
                Saturday - Sunday: Emergency Services Only
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-white/50">
            &copy; 2026 BP Heating And Plumbing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
