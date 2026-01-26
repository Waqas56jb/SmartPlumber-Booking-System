import React, { useState, useEffect, useMemo } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const initialProjects = [
  { id: 0, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+1', alt: 'Completed project', type: 'image' },
  { id: 1, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+2', alt: 'Completed project', type: 'image' },
  { id: 2, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+3', alt: 'Completed project', type: 'image' },
  { id: 3, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+4', alt: 'Completed project', type: 'image' },
  { id: 4, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+5', alt: 'Completed project', type: 'image' },
  { id: 5, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+6', alt: 'Completed project', type: 'image' },
  { id: 6, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+7', alt: 'Completed project', type: 'image' },
  { id: 7, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+8', alt: 'Completed project', type: 'image' },
];

const extraProjects = [
  { id: 8, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+9', alt: 'Additional project', type: 'image' },
  { id: 9, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+10', alt: 'Additional project', type: 'image' },
  { id: 10, src: 'https://placehold.co/600x450/e5e5e5/666666?text=Project+11', alt: 'Additional project', type: 'image' },
  { id: 11, src: 'https://placehold.co/600x450/2d2d2d/c9a961?text=Video+Placeholder', alt: 'Video placeholder', type: 'video' },
  { id: 12, src: 'https://placehold.co/600x450/2d2d2d/c9a961?text=Video+Placeholder', alt: 'Video placeholder', type: 'video' },
  { id: 13, src: 'https://placehold.co/600x450/2d2d2d/c9a961?text=Video+Placeholder', alt: 'Video placeholder', type: 'video' },
  { id: 14, src: 'https://placehold.co/600x450/2d2d2d/c9a961?text=Video+Placeholder', alt: 'Video placeholder', type: 'video' },
  { id: 15, src: 'https://placehold.co/600x450/2d2d2d/c9a961?text=Video+Placeholder', alt: 'Video placeholder', type: 'video' },
  { id: 16, src: 'https://placehold.co/600x450/2d2d2d/c9a961?text=Video+Placeholder', alt: 'Video placeholder', type: 'video' },
  { id: 17, src: 'https://placehold.co/600x450/2d2d2d/c9a961?text=Video+Placeholder', alt: 'Video placeholder', type: 'video' },
];

const Portfolio = () => {
  const sectionRef = useScrollAnimation();
  const [showMore, setShowMore] = useState(false);

  const allItems = useMemo(() => [...initialProjects, ...extraProjects], []);

  useEffect(() => {
    // Dispatch custom event to update lightbox
    window.dispatchEvent(new CustomEvent('galleryUpdated', { detail: allItems }));
  }, [allItems]);

  const handleItemClick = (index) => {
    window.dispatchEvent(new CustomEvent('showLightbox', { detail: index }));
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-background-alt">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12 sm:mb-18">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3 sm:mb-4 tracking-tight">
            Recent Projects
          </h2>
          <p className="text-base sm:text-lg text-text-light max-w-[600px] mx-auto leading-relaxed px-4">
            View our completed work and quality standards
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {initialProjects.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden cursor-pointer aspect-[4/3] bg-black group"
              onClick={() => handleItemClick(project.id)}
            >
              <img
                src={project.src}
                alt={project.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[rgba(26,26,26,0.85)] flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity">
                <span className="text-white text-sm sm:text-base font-semibold tracking-wide uppercase border-2 border-white px-4 sm:px-8 py-2 sm:py-3">
                  View Project
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 py-6 sm:py-8">
          <button
            onClick={toggleShowMore}
            className={`bg-transparent border-2 border-accent text-accent px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold tracking-wide uppercase cursor-pointer rounded inline-flex items-center gap-2 sm:gap-3 transition-all hover:bg-accent hover:text-black hover:-translate-y-0.5 hover:shadow-md ${
              showMore ? 'bg-accent text-black' : ''
            }`}
          >
            <span>{showMore ? 'See Less' : 'See More Projects'}</span>
            <FaChevronDown
              className={`transition-transform ${showMore ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 transition-all duration-500 overflow-hidden ${
            showMore
              ? 'max-h-[5000px] opacity-100 mt-6 sm:mt-8'
              : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          {extraProjects.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden cursor-pointer aspect-[4/3] bg-black group"
              onClick={() => handleItemClick(project.id)}
            >
              <img
                src={project.src}
                alt={project.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[rgba(26,26,26,0.85)] flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity">
                <span className="text-white text-sm sm:text-base font-semibold tracking-wide uppercase border-2 border-white px-4 sm:px-8 py-2 sm:py-3">
                  {project.type === 'video' ? 'Play Video' : 'View Project'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
