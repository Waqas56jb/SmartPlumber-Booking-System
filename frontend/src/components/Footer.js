import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaInstagram, FaWrench, FaShieldAlt, FaAward, FaCheckCircle, FaTools, FaCertificate, FaStar, FaHome, FaUser, FaBriefcase, FaImages } from 'react-icons/fa';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const services = [{
    name: 'Boiler Installations',
    href: '#services'
  }, {
    name: 'Boiler Repairs',
    href: '#services'
  }, {
    name: 'Central Heating',
    href: '#services'
  }, {
    name: 'General Plumbing',
    href: '#services'
  }, {
    name: 'Gas Safety Inspections',
    href: '#services'
  }, {
    name: 'Leak Detection',
    href: '#services'
  }, {
    name: 'Power Flushing',
    href: '#services'
  }, {
    name: 'Water Heaters',
    href: '#services'
  }];
  const quickLinks = [{
    name: 'Home',
    href: '#home'
  }, {
    name: 'About Us',
    href: '#about'
  }, {
    name: 'Services',
    href: '#services'
  }, {
    name: 'Portfolio',
    href: '#portfolio'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  const socialLinks = [{
    icon: FaWhatsapp,
    href: 'https://wa.me/447777998381',
    color: 'hover:text-whatsapp'
  }, {
    icon: FaInstagram,
    href: 'https://instagram.com/abdulb05',
    color: 'hover:text-instagram'
  }, {
    icon: FaFacebook,
    href: '#',
    color: 'hover:text-blue-600'
  }, {
    icon: FaTwitter,
    href: '#',
    color: 'hover:text-blue-400'
  }, {
    icon: FaLinkedin,
    href: '#',
    color: 'hover:text-blue-700'
  }];
  return <footer className="bg-gradient-to-br from-primary via-secondary to-primary text-white/90 relative overflow-hidden w-full">
      {}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 border-2 border-accent rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-accent rounded-full animate-pulse-slow" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-accent rounded-full animate-pulse-slow" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute top-40 right-1/4 w-24 h-24 border border-accent/50 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 border border-accent/50 rounded-full"></div>
      </div>

      {}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24 relative z-10 w-full overflow-x-hidden">
        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {}
          <div className="lg:col-span-2 animate-fade-in-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-slow hover-lift">
                <FaWrench className="text-accent" size={32} />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-wide flex items-center gap-2">
                  <span className="text-accent">BP</span> HEATING & PLUMBING
                  <FaShieldAlt className="text-accent" size={20} />
                </h3>
                <div className="w-20 h-1 bg-accent mb-4"></div>
                <p className="text-sm sm:text-base leading-relaxed text-white/80 mb-6 max-w-2xl">
                  Professional maintenance and technical solutions for residential and commercial properties across the UK. Gas Safe registered engineers delivering excellence in heating and plumbing services with over 15 years of combined experience. We pride ourselves on quality workmanship, reliable service, and customer satisfaction.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover-lift animate-fade-in-up" style={{
                  animationDelay: '0.1s'
                }}>
                    <FaCertificate className="text-accent" size={16} />
                    <span className="text-xs sm:text-sm font-semibold">Gas Safe Registered</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover-lift animate-fade-in-up" style={{
                  animationDelay: '0.2s'
                }}>
                    <FaAward className="text-accent" size={16} />
                    <span className="text-xs sm:text-sm font-semibold">15+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover-lift animate-fade-in-up" style={{
                  animationDelay: '0.3s'
                }}>
                    <FaStar className="text-accent" size={16} />
                    <span className="text-xs sm:text-sm font-semibold">5 Star Rated</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center text-white/80 ${social.color} transition-all duration-300 hover:bg-accent hover:scale-110 hover:text-white shadow-lg hover-lift animate-fade-in-up`} style={{
                    animationDelay: `${0.4 + index * 0.1}s`
                  }}>
                        <Icon size={18} />
                      </a>;
                })}
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl hover-lift animate-fade-in-up" style={{
          animationDelay: '0.2s'
        }}>
            <h4 className="text-lg font-bold text-white mb-5 tracking-wide uppercase flex items-center gap-2">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <FaPhone className="text-accent" size={18} />
              </div>
              Quick Contact
            </h4>
            <div className="space-y-4">
              <a href="tel:+447777998381" className="flex items-center gap-3 text-white/90 hover:text-accent transition-all duration-300 group animate-fade-in-left hover-lift p-3 rounded-lg hover:bg-white/5" style={{
              animationDelay: '0.5s'
            }}>
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <FaPhone className="text-accent group-hover:text-white transition-colors duration-300" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60 mb-1 uppercase tracking-wide font-semibold">Phone</p>
                  <p className="text-base font-bold">+44 7777 998381</p>
                  <p className="text-xs text-white/50 mt-1">24/7 Emergency Available</p>
                </div>
              </a>
              <a href="mailto:basitpk4@yahoo.com" className="flex items-center gap-3 text-white/90 hover:text-accent transition-all duration-300 group animate-fade-in-left hover-lift p-3 rounded-lg hover:bg-white/5" style={{
              animationDelay: '0.6s'
            }}>
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <FaEnvelope className="text-accent group-hover:text-white transition-colors duration-300" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60 mb-1 uppercase tracking-wide font-semibold">Email</p>
                  <p className="text-sm font-bold break-all">basitpk4@yahoo.com</p>
                  <p className="text-xs text-white/50 mt-1">Response within 24hrs</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">

          {}
          <div className="animate-fade-in-up" style={{
          animationDelay: '0.2s'
        }}>
            <h4 className="text-base sm:text-lg font-bold text-white mb-5 tracking-wide uppercase relative pb-3 flex items-center gap-2">
              <FaTools className="text-accent" size={16} />
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="flex flex-col gap-3 sm:gap-3.5 list-none">
              {services.map((service, index) => <li key={index} className="animate-fade-in-left" style={{
              animationDelay: `${0.3 + index * 0.05}s`
            }}>
                  <a href={service.href} className="text-sm sm:text-[15px] text-white/70 hover:text-accent transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                    <FaCheckCircle className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" size={12} />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service.name}
                  </a>
                </li>)}
            </ul>
          </div>

          {}
          <div className="animate-fade-in-up" style={{
          animationDelay: '0.3s'
        }}>
            <h4 className="text-base sm:text-lg font-bold text-white mb-5 tracking-wide uppercase relative pb-3 flex items-center gap-2">
              <FaHome className="text-accent" size={16} />
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="flex flex-col gap-3 sm:gap-3.5 list-none">
              {quickLinks.map((link, index) => {
              const icons = [FaHome, FaUser, FaBriefcase, FaImages, FaEnvelope];
              const Icon = icons[index] || FaHome;
              return <li key={index} className="animate-fade-in-left" style={{
                animationDelay: `${0.4 + index * 0.05}s`
              }}>
                    <a href={link.href} className="text-sm sm:text-[15px] text-white/70 hover:text-accent transition-all duration-300 flex items-center gap-3 group hover:translate-x-1">
                      <Icon className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" size={12} />
                      <span className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </a>
                  </li>;
            })}
            </ul>
          </div>

          {}
          <div className="animate-fade-in-up" style={{
          animationDelay: '0.4s'
        }}>
            <h4 className="text-base sm:text-lg font-bold text-white mb-5 tracking-wide uppercase relative pb-3 flex items-center gap-2">
              <FaEnvelope className="text-accent" size={16} />
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="flex flex-col gap-4 sm:gap-5 list-none">
              <li className="flex items-start gap-3 group animate-fade-in-left hover-lift" style={{
              animationDelay: '0.5s'
            }}>
                <div className="w-11 h-11 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <FaPhone className="text-accent group-hover:text-white transition-colors duration-300" size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1 uppercase tracking-wide">Phone</p>
                  <a href="tel:+447777998381" className="text-sm sm:text-[15px] text-white/90 hover:text-accent transition-colors font-bold block">
                    +44 7777 998381
                  </a>
                  <p className="text-xs text-white/50 mt-1">24/7 Emergency Available</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group animate-fade-in-left hover-lift" style={{
              animationDelay: '0.6s'
            }}>
                <div className="w-11 h-11 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <FaEnvelope className="text-accent group-hover:text-white transition-colors duration-300" size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1 uppercase tracking-wide">Email</p>
                  <a href="mailto:basitpk4@yahoo.com" className="text-sm sm:text-[15px] text-white/90 hover:text-accent transition-colors font-bold break-all block">
                    basitpk4@yahoo.com
                  </a>
                  <p className="text-xs text-white/50 mt-1">Response within 24hrs</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group animate-fade-in-left hover-lift" style={{
              animationDelay: '0.7s'
            }}>
                <div className="w-11 h-11 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <FaClock className="text-accent group-hover:text-white transition-colors duration-300" size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1 uppercase tracking-wide">Working Hours</p>
                  <p className="text-sm sm:text-[15px] text-white/90 font-bold">
                    Mon-Fri: 9AM - 5PM
                  </p>
                  <p className="text-sm sm:text-[15px] text-white/90 font-bold">
                    Sat-Sun: Emergency Only
                  </p>
                  <p className="text-xs text-white/50 mt-1">24/7 Emergency Service</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group animate-fade-in-left hover-lift" style={{
              animationDelay: '0.8s'
            }}>
                <div className="w-11 h-11 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <FaMapMarkerAlt className="text-accent group-hover:text-white transition-colors duration-300" size={18} />
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1 uppercase tracking-wide">Service Area</p>
                  <p className="text-sm sm:text-[15px] text-white/90 font-bold">
                    UK Wide Coverage
                  </p>
                  <p className="text-xs text-white/50 mt-1">Residential & Commercial</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {}
      <div className="border-t border-white/20 bg-primary/90 backdrop-blur-md relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <FaWrench className="text-accent" size={14} />
                </div>
                <p className="text-xs sm:text-sm text-white/80 text-center sm:text-left font-semibold">
                  &copy; {currentYear} BP Heating And Plumbing
                </p>
              </div>
              <div className="flex items-center gap-2 bg-accent/20 px-3 py-1.5 rounded-lg">
                <FaShieldAlt className="text-accent" size={12} />
                <span className="text-xs text-white/90 font-bold">Gas Safe Registered</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 text-xs sm:text-sm">
              <button onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })} className="text-white/70 hover:text-accent transition-all duration-300 font-medium flex items-center gap-1 bg-transparent border-none cursor-pointer hover:translate-y-[-2px]">
                <span>Privacy Policy</span>
              </button>
              <span className="text-white/30">|</span>
              <button onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })} className="text-white/70 hover:text-accent transition-all duration-300 font-medium flex items-center gap-1 bg-transparent border-none cursor-pointer hover:translate-y-[-2px]">
                <span>Terms of Service</span>
              </button>
              <span className="text-white/30">|</span>
              <button onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })} className="text-white/70 hover:text-accent transition-all duration-300 font-medium flex items-center gap-1 bg-transparent border-none cursor-pointer hover:translate-y-[-2px]">
                <span>Cookie Policy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
