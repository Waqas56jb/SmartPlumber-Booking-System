import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white/80 py-15 pt-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mb-9">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-3.5 tracking-wide">
              BP HEATING AND PLUMBING
            </h3>
            <p className="text-[15px] leading-relaxed text-white/70">
              Professional maintenance and technical solutions for residential and commercial properties across the UK.
            </p>
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-white mb-3.5 tracking-wide uppercase">
              Services
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              <li>
                <a href="#services" className="text-[15px] text-white/70 hover:text-accent transition-colors">
                  Boiler Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-[15px] text-white/70 hover:text-accent transition-colors">
                  Central Heating
                </a>
              </li>
              <li>
                <a href="#services" className="text-[15px] text-white/70 hover:text-accent transition-colors">
                  General Plumbing
                </a>
              </li>
              <li>
                <a href="#services" className="text-[15px] text-white/70 hover:text-accent transition-colors">
                  Gas Safety Inspections
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-white mb-3.5 tracking-wide uppercase">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              <li>
                <a href="tel:+447777998381" className="text-[15px] text-white/70 hover:text-white transition-colors">
                  +44 7777 998381
                </a>
              </li>
              <li>
                <a href="mailto:basitpk4@yahoo.com" className="text-[15px] text-white/70 hover:text-white transition-colors">
                  basitpk4@yahoo.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-white mb-3.5 tracking-wide uppercase">
              Working Hours
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              <li className="text-sm text-white/60">
                Monday - Friday: 9:00 AM - 5:00 PM
              </li>
              <li className="text-sm text-white/60">
                Saturday - Sunday: Emergency Services Only
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            &copy; 2026 BP Heating And Plumbing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
