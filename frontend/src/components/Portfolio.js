import React, { useState, useEffect, useMemo } from 'react';
import { FaChevronDown, FaImages, FaEye, FaPlay, FaCheckCircle, FaTimes, FaWrench, FaCalendar, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
const initialProjects = [{
  id: 0,
  src: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop&q=90',
  alt: 'Professional boiler installation',
  type: 'image',
  title: 'Boiler Installation & Setup',
  description: 'Complete boiler replacement and installation for a 3-bedroom residential property. New energy-efficient condensing boiler with smart thermostat integration.',
  requirements: 'Customer required full boiler replacement, new pipework installation, and integration with existing heating system. Gas Safe certification provided.',
  location: 'London, UK',
  date: 'January 2024',
  duration: '2 Days'
}, {
  id: 1,
  src: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop&q=90',
  alt: 'Central heating system',
  type: 'image',
  title: 'Central Heating System Overhaul',
  description: 'Complete central heating system installation including radiators, pipework, and boiler connection for new build property.',
  requirements: 'New build property required full central heating installation. All radiators positioned for optimal heat distribution. System pressure tested and certified.',
  location: 'Manchester, UK',
  date: 'December 2023',
  duration: '5 Days'
}, {
  id: 2,
  src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=90',
  alt: 'Plumbing repair work',
  type: 'image',
  title: 'Emergency Plumbing Repairs',
  description: 'Urgent repair of burst pipe and water damage restoration. Quick response time with complete system restoration.',
  requirements: 'Emergency call-out for burst pipe in kitchen. Required immediate isolation, pipe replacement, and water damage assessment. Completed within 4 hours.',
  location: 'Birmingham, UK',
  date: 'November 2023',
  duration: '4 Hours'
}, {
  id: 3,
  src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop&q=90',
  alt: 'Water heater installation',
  type: 'image',
  title: 'Water Heater Installation',
  description: 'New unvented water heater installation with expansion vessel and pressure relief system for improved hot water supply.',
  requirements: 'Customer needed upgraded hot water system for larger household. Installed 200L unvented cylinder with all safety systems. G3 certification provided.',
  location: 'Leeds, UK',
  date: 'October 2023',
  duration: '1 Day'
}, {
  id: 4,
  src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=90',
  alt: 'Pipe installation project',
  type: 'image',
  title: 'Complete Pipework Replacement',
  description: 'Full house repipe with modern PEX piping system. All old lead and copper pipes replaced with new efficient system.',
  requirements: 'Property required complete pipework replacement due to aging infrastructure. New PEX system installed throughout with isolation valves. Minimal disruption to property.',
  location: 'Liverpool, UK',
  date: 'September 2023',
  duration: '3 Days'
}, {
  id: 5,
  src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=90',
  alt: 'Bathroom plumbing work',
  type: 'image',
  title: 'Bathroom Renovation Plumbing',
  description: 'Complete bathroom plumbing installation including new fixtures, shower system, and waste connections for modern bathroom design.',
  requirements: 'Bathroom renovation required new plumbing layout. Installed mixer shower, new toilet, basin with modern fixtures. All waste connections properly vented.',
  location: 'Sheffield, UK',
  date: 'August 2023',
  duration: '2 Days'
}, {
  id: 6,
  src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop&q=90',
  alt: 'Kitchen plumbing service',
  type: 'image',
  title: 'Kitchen Plumbing Installation',
  description: 'New kitchen plumbing installation with dishwasher connection, filtered water system, and modern tap installation.',
  requirements: 'Kitchen refit required new plumbing for appliances. Installed dishwasher connection, water filter system, and premium mixer tap. All connections tested.',
  location: 'Bristol, UK',
  date: 'July 2023',
  duration: '1 Day'
}, {
  id: 7,
  src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=90',
  alt: 'Gas safety inspection',
  type: 'image',
  title: 'Gas Safety Inspection & Certification',
  description: 'Comprehensive gas safety check and certification for rental property. All appliances tested and certified safe.',
  requirements: 'Landlord required annual gas safety certificate. Full inspection of boiler, gas cooker, and all gas appliances. CP12 certificate issued.',
  location: 'Newcastle, UK',
  date: 'June 2023',
  duration: '2 Hours'
}];
const extraProjects = [{
  id: 8,
  src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&q=90',
  alt: 'Leak detection service',
  type: 'image',
  title: 'Advanced Leak Detection',
  description: 'Professional leak detection using thermal imaging and acoustic equipment. Located hidden leak without property damage.',
  requirements: 'Customer reported water bill increase. Used advanced detection equipment to locate leak under floorboards. Minimal disruption repair completed.',
  location: 'Edinburgh, UK',
  date: 'May 2023',
  duration: '3 Hours'
}, {
  id: 9,
  src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=90',
  alt: 'Power flushing service',
  type: 'image',
  title: 'Power Flushing & System Clean',
  description: 'Complete heating system power flush to remove sludge and improve efficiency. System performance significantly improved.',
  requirements: 'Heating system losing efficiency. Power flushed entire system including radiators and pipework. Added inhibitor and system rebalanced.',
  location: 'Cardiff, UK',
  date: 'April 2023',
  duration: '1 Day'
}, {
  id: 10,
  src: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop&q=90',
  alt: 'Hot water cylinder installation',
  type: 'image',
  title: 'Hot Water Cylinder Replacement',
  description: 'Replacement of old hot water cylinder with new insulated model. Improved efficiency and hot water capacity.',
  requirements: 'Old cylinder failing and inefficient. Replaced with modern insulated cylinder, new immersion heater, and updated controls. Improved hot water supply.',
  location: 'Glasgow, UK',
  date: 'March 2023',
  duration: '1 Day'
}, {
  id: 11,
  src: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop&q=90',
  alt: 'Commercial plumbing project',
  type: 'image',
  title: 'Commercial Plumbing Installation',
  description: 'Large-scale commercial plumbing installation for office building. Multiple bathrooms, kitchen facilities, and water systems.',
  requirements: 'New office building required complete plumbing installation. Installed multiple bathroom facilities, kitchen plumbing, and water distribution system. All to commercial standards.',
  location: 'Birmingham, UK',
  date: 'February 2023',
  duration: '10 Days'
}, {
  id: 12,
  src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=90',
  alt: 'Emergency repair service',
  type: 'image',
  title: '24/7 Emergency Boiler Repair',
  description: 'Emergency boiler breakdown repair on Christmas Eve. Quick response and repair to restore heating.',
  requirements: 'Boiler breakdown on Christmas Eve. Emergency call-out within 2 hours. Diagnosed and repaired faulty PCB. Heating restored same day.',
  location: 'London, UK',
  date: 'December 2023',
  duration: '3 Hours'
}, {
  id: 13,
  src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop&q=90',
  alt: 'Radiator installation',
  type: 'image',
  title: 'Radiator Installation & Balancing',
  description: 'New radiator installation and system balancing for optimal heat distribution throughout property.',
  requirements: 'Customer added extension requiring new radiators. Installed 3 new radiators, extended pipework, and balanced entire system for even heating.',
  location: 'Manchester, UK',
  date: 'November 2023',
  duration: '1 Day'
}, {
  id: 14,
  src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=90',
  alt: 'Bathroom renovation plumbing',
  type: 'image',
  title: 'Luxury Bathroom Plumbing',
  description: 'High-end bathroom plumbing installation with premium fixtures, underfloor heating, and smart controls.',
  requirements: 'Luxury bathroom renovation required premium plumbing installation. Installed underfloor heating, premium shower system, and smart controls. All to highest standards.',
  location: 'Leeds, UK',
  date: 'October 2023',
  duration: '3 Days'
}, {
  id: 15,
  src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&q=90',
  alt: 'Kitchen sink installation',
  type: 'image',
  title: 'Kitchen Sink & Waste Installation',
  description: 'New kitchen sink installation with waste disposal unit connection and filtered water tap.',
  requirements: 'Kitchen upgrade required new sink installation. Fitted premium sink, waste disposal unit, and filtered water system. All connections properly sealed.',
  location: 'Birmingham, UK',
  date: 'September 2023',
  duration: '4 Hours'
}, {
  id: 16,
  src: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop&q=90',
  alt: 'Underfloor heating system',
  type: 'image',
  title: 'Underfloor Heating Installation',
  description: 'Complete underfloor heating system installation for ground floor. Modern wet system with smart controls.',
  requirements: 'Customer wanted underfloor heating for ground floor. Installed wet system with manifold, controls, and integration with existing boiler. Efficient and comfortable heating.',
  location: 'Liverpool, UK',
  date: 'August 2023',
  duration: '4 Days'
}, {
  id: 17,
  src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=90',
  alt: 'Pipe replacement project',
  type: 'image',
  title: 'Complete Property Repipe',
  description: 'Full property repipe project replacing all old pipework with modern materials. Minimal disruption approach.',
  requirements: 'Property required complete repipe due to old lead pipes. Replaced all pipework with modern materials. Used minimal disruption techniques. Water quality significantly improved.',
  location: 'Sheffield, UK',
  date: 'July 2023',
  duration: '5 Days'
}];
const Portfolio = () => {
  const sectionRef = useScrollAnimation();
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const allItems = useMemo(() => [...initialProjects, ...extraProjects], []);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('galleryUpdated', {
      detail: allItems
    }));
  }, [allItems]);
  const handleItemClick = projectId => {
    const project = allItems.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
    window.dispatchEvent(new CustomEvent('showLightbox', {
      detail: projectId
    }));
  };
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const closeProjectDetail = () => {
    setSelectedProject(null);
  };
  return <section ref={sectionRef} id="portfolio" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-background-alt via-white to-background-alt relative overflow-hidden w-full">
      {}
      <div className="absolute top-0 right-0 w-full h-full opacity-5">
        <div className="absolute top-40 left-10 w-56 h-56 border-2 border-accent rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 border-2 border-accent rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full overflow-x-hidden">
        <div className="text-center mb-14 sm:mb-18 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg mb-5">
            <FaImages className="text-accent" size={16} />
            <span className="text-xs font-bold text-accent uppercase tracking-wide">Our Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 sm:mb-5 tracking-tight">
            Recent <span className="text-accent">Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-light max-w-[700px] mx-auto leading-relaxed px-4">
            View our completed work and quality standards. Every project is completed with precision and professionalism.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7">
          {initialProjects.map((project, index) => <div key={project.id} className="relative overflow-hidden cursor-pointer aspect-[4/3] bg-black group rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up hover-lift" onClick={() => handleItemClick(project.id)} style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <img src={project.src} alt={project.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop&q=90';
          }} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-500">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center animate-pulse-slow">
                    <FaEye className="text-white" size={20} />
                  </div>
                  <span className="text-white text-sm sm:text-base font-bold tracking-wide uppercase px-4 sm:px-8 py-2 sm:py-3 border-2 border-white rounded-lg">
                    View Details
                  </span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm">
                <FaCheckCircle size={10} />
                <span>Completed</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-primary/90 backdrop-blur-sm text-white p-3 rounded-lg">
                  <h4 className="font-bold text-sm mb-1 line-clamp-1">{project.title || project.alt}</h4>
                  <p className="text-xs text-white/80 line-clamp-2">{project.description || 'Professional plumbing and heating service'}</p>
                </div>
              </div>
            </div>)}
        </div>

        <div className="text-center mt-10 sm:mt-14 py-8 sm:py-10">
          <button onClick={toggleShowMore} className={`border-2 border-accent px-8 sm:px-12 py-4 sm:py-4.5 text-sm sm:text-base font-bold tracking-wide uppercase cursor-pointer rounded-xl inline-flex items-center gap-3 transition-all hover:-translate-y-1 hover:shadow-xl ${showMore ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-transparent text-accent hover:bg-accent hover:text-white'}`}>
            <FaImages size={16} className={showMore ? 'text-white' : 'text-accent'} />
            <span className={showMore ? 'text-white' : 'text-accent'}>{showMore ? 'See Less Projects' : 'See More Projects'}</span>
            <FaChevronDown className={`transition-transform duration-300 ${showMore ? 'rotate-180 text-white' : 'text-accent'}`} />
          </button>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 transition-all duration-700 overflow-hidden ${showMore ? 'max-h-[5000px] opacity-100 mt-8 sm:mt-10' : 'max-h-0 opacity-0 mt-0'}`}>
          {extraProjects.map((project, index) => <div key={project.id} className="relative overflow-hidden cursor-pointer aspect-[4/3] bg-black group rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up hover-lift" onClick={() => handleItemClick(project.id)} style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <img src={project.src} alt={project.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=600&fit=crop&q=90';
          }} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-500">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center animate-pulse-slow">
                    {project.type === 'video' ? <FaPlay className="text-white ml-1" size={20} /> : <FaEye className="text-white" size={20} />}
                  </div>
                  <span className="text-white text-sm sm:text-base font-bold tracking-wide uppercase px-4 sm:px-8 py-2 sm:py-3 border-2 border-white rounded-lg">
                    {project.type === 'video' ? 'Play Video' : 'View Details'}
                  </span>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-sm">
                <FaCheckCircle size={10} />
                <span>Completed</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-primary/90 backdrop-blur-sm text-white p-3 rounded-lg">
                  <h4 className="font-bold text-sm mb-1 line-clamp-1">{project.title || project.alt}</h4>
                  <p className="text-xs text-white/80 line-clamp-2">{project.description || 'Professional plumbing and heating service'}</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {}
      {selectedProject && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={closeProjectDetail}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedProject.src} alt={selectedProject.alt} className="w-full h-64 sm:h-80 object-cover" />
              <button onClick={closeProjectDetail} className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaTimes className="text-primary" size={20} />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FaWrench className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                    {selectedProject.title || selectedProject.alt}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-text-light">
                    {selectedProject.location && <div className="flex items-center gap-1">
                        <FaMapMarkerAlt size={12} />
                        <span>{selectedProject.location}</span>
                      </div>}
                    {selectedProject.date && <div className="flex items-center gap-1">
                        <FaCalendar size={12} />
                        <span>{selectedProject.date}</span>
                      </div>}
                    {selectedProject.duration && <div className="flex items-center gap-1">
                        <FaUser size={12} />
                        <span>{selectedProject.duration}</span>
                      </div>}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent"></span>
                    Project Description
                  </h4>
                  <p className="text-base text-text-light leading-relaxed">
                    {selectedProject.description || 'Professional plumbing and heating service completed to the highest standards.'}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="w-1 h-6 bg-accent"></span>
                    Requirements & Scope
                  </h4>
                  <p className="text-base text-text-light leading-relaxed">
                    {selectedProject.requirements || 'Customer requirements and project scope details.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                    <FaCheckCircle className="text-accent" size={14} />
                    <span className="text-sm font-semibold text-primary">Gas Safe Certified</span>
                  </div>
                  <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                    <FaCheckCircle className="text-accent" size={14} />
                    <span className="text-sm font-semibold text-primary">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                    <FaCheckCircle className="text-accent" size={14} />
                    <span className="text-sm font-semibold text-primary">Fully Insured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </section>;
};
export default Portfolio;
