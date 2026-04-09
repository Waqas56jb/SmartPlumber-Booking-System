import React from 'react';
import { FaWrench, FaTools, FaShieldAlt, FaFire, FaTint, FaCog, FaCheckCircle, FaCertificate, FaBolt, FaHome, FaPlug, FaWater } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from '../utils/router';
import { publicAPI } from '../services/apiService';
// i grey out cards when no plumber listed that service name from the api
const Services = () => {
  const sectionRef = useScrollAnimation();
  const [availableNames, setAvailableNames] = React.useState(null);
  React.useEffect(() => {
    let isMounted = true;
    publicAPI.getAvailableServices().then(response => {
      if (!isMounted) return;
      if (response.success && response.data?.serviceNames) {
        const normalized = response.data.serviceNames.map(n => n.toLowerCase());
        setAvailableNames(normalized);
      } else {
        setAvailableNames([]);
      }
    }).catch(() => {
      setAvailableNames(null);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const services = [{
    number: '01',
    title: 'Boiler Installations & Servicing',
    description: 'Professional boiler installation and regular servicing to keep your heating system running efficiently.',
    icon: FaFire,
    slug: 'boiler-installations',
    match: name => name.includes('boiler') && (name.includes('install') || name.includes('service'))
  }, {
    number: '02',
    title: 'Boiler Repairs & Fault Finding',
    description: 'Expert diagnosis and repair of boiler faults to restore your heating quickly and safely.',
    icon: FaWrench,
    slug: 'boiler-repairs',
    match: name => name.includes('boiler') && (name.includes('repair') || name.includes('fault'))
  }, {
    number: '03',
    title: 'Central Heating',
    description: 'Complete central heating system installation, maintenance, and optimization for your home.',
    icon: FaHome,
    slug: 'central-heating',
    match: name => name.includes('central heating') || (name.includes('heating') && name.includes('install'))
  }, {
    number: '04',
    title: 'General Plumbing',
    description: 'All plumbing services including taps, showers, sinks, toilets, and more.',
    icon: FaTint,
    slug: 'general-plumbing',
    match: name => name.includes('plumbing') || name.includes('plumber')
  }, {
    number: '05',
    title: 'Gas Safety Inspections',
    description: 'Thorough gas safety checks and certification by Gas Safe registered engineers.',
    icon: FaShieldAlt,
    slug: 'gas-safety',
    match: name => name.includes('gas') && (name.includes('safety') || name.includes('check'))
  }, {
    number: '06',
    title: 'Leak Detection & Repairs',
    description: 'Fast and accurate leak detection with professional repair services to prevent damage.',
    icon: FaWater,
    slug: 'leak-detection',
    match: name => name.includes('leak')
  }, {
    number: '07',
    title: 'Power Flushing',
    description: 'System cleaning to improve heating efficiency and extend the life of your boiler.',
    icon: FaBolt,
    slug: 'power-flushing',
    match: name => name.includes('power flushing') || (name.includes('flush') && name.includes('system'))
  }, {
    number: '08',
    title: 'Water Heaters',
    description: 'Professional installation and maintenance of water heating systems.',
    icon: FaCog,
    slug: 'water-heaters',
    match: name => name.includes('water heater')
  }, {
    number: '09',
    title: 'Pipe Installation & Repairs',
    description: 'Professional pipe installation and repair services for all plumbing systems.',
    icon: FaTools,
    slug: 'pipe-installation',
    match: name => name.includes('pipe')
  }, {
    number: '10',
    title: 'Hot Water Cylinders',
    description: 'Installation, repair, and replacement of hot water cylinder systems.',
    icon: FaPlug,
    slug: 'hot-water-cylinders',
    match: name => name.includes('cylinder')
  }, {
    number: '11',
    title: 'New Appliances Installations',
    description: 'Expert installation of new heating and plumbing appliances for your home.',
    icon: FaCertificate,
    slug: 'appliances-installation',
    match: name => name.includes('appliance')
  }, {
    number: '12',
    title: 'Any Repairs',
    description: 'Comprehensive repair services for all your heating and plumbing needs.',
    icon: FaCheckCircle,
    slug: 'any-repairs',
    match: name => name.includes('repair')
  }];
  let visibleServices = services;
  if (Array.isArray(availableNames) && availableNames.length > 0) {
    visibleServices = services.filter(service => typeof service.match === 'function' && availableNames.some(n => service.match(n)));
  }
  return <section ref={sectionRef} id="services" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-background-alt to-white relative overflow-hidden w-full">
      {}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-accent rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 border-2 border-accent rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full overflow-x-hidden">
        <div className="text-center mb-14 sm:mb-18 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg mb-5">
            <FaTools className="text-accent" size={16} />
            <span className="text-xs font-bold text-accent uppercase tracking-wide">What We Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 sm:mb-5 tracking-tight">
            Our Professional <span className="text-accent">Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-light max-w-[700px] mx-auto leading-relaxed px-4">
            Comprehensive heating and plumbing solutions delivered by Gas Safe registered engineers. Quality service you can trust.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
          {visibleServices.map((service, index) => {
          const Icon = service.icon;
          return <Link key={index} to={`/service/${service.slug}`} className="group bg-white p-7 sm:p-8 md:p-9 transition-all duration-300 border-2 border-transparent hover:border-accent hover:shadow-xl hover:-translate-y-2 rounded-xl relative overflow-hidden animate-fade-in-up hover-lift cursor-pointer block" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                {}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-xs sm:text-sm font-bold text-accent tracking-wide">
                      {service.number}
                    </div>
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="text-accent group-hover:text-white transition-colors duration-300" size={24} />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-primary mb-3 sm:mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-text-light mb-4">
                    {service.description}
                  </p>
                  <div className="text-sm font-semibold text-accent group-hover:underline">
                    View products
                  </div>
                </div>
              </Link>;
        })}
        </div>
      </div>
    </section>;
};
export default Services;
