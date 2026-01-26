import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Services = () => {
  const sectionRef = useScrollAnimation();

  const services = [
    {
      number: '01',
      title: 'Boiler Installations & Servicing',
      description: 'Professional boiler installation and regular servicing to keep your heating system running efficiently.'
    },
    {
      number: '02',
      title: 'Boiler Repairs & Fault Finding',
      description: 'Expert diagnosis and repair of boiler faults to restore your heating quickly and safely.'
    },
    {
      number: '03',
      title: 'Central Heating',
      description: 'Complete central heating system installation, maintenance, and optimization for your home.'
    },
    {
      number: '04',
      title: 'General Plumbing',
      description: 'All plumbing services including taps, showers, sinks, toilets, and more.'
    },
    {
      number: '05',
      title: 'Gas Safety Inspections',
      description: 'Thorough gas safety checks and certification by Gas Safe registered engineers.'
    },
    {
      number: '06',
      title: 'Leak Detection & Repairs',
      description: 'Fast and accurate leak detection with professional repair services to prevent damage.'
    },
    {
      number: '07',
      title: 'Power Flushing',
      description: 'System cleaning to improve heating efficiency and extend the life of your boiler.'
    },
    {
      number: '08',
      title: 'Water Heaters',
      description: 'Professional installation and maintenance of water heating systems.'
    },
    {
      number: '09',
      title: 'Pipe Installation & Repairs',
      description: 'Professional pipe installation and repair services for all plumbing systems.'
    },
    {
      number: '10',
      title: 'Hot Water Cylinders',
      description: 'Installation, repair, and replacement of hot water cylinder systems.'
    },
    {
      number: '11',
      title: 'New Appliances Installations',
      description: 'Expert installation of new heating and plumbing appliances for your home.'
    },
    {
      number: '12',
      title: 'Any Repairs',
      description: 'Comprehensive repair services for all your heating and plumbing needs.'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="text-center mb-18">
          <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-lg text-text-light max-w-[600px] mx-auto leading-relaxed">
            Professional heating and plumbing solutions for your home
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-background-alt p-9 transition-all border-l-[3px] border-transparent hover:bg-white hover:border-l-accent hover:shadow-md hover:translate-x-1"
            >
              <div className="text-sm font-bold text-accent mb-4 tracking-wide">
                {service.number}
              </div>
              <h3 className="text-[22px] font-bold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-text-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
