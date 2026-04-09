import React, { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// i listen for gallery custom events and overlay fullscreen media
const Lightbox = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  useEffect(() => {
    const handleGalleryUpdate = e => {
      setGalleryItems(e.detail);
    };
    const handleShowLightbox = e => {
      setCurrentIndex(e.detail);
      setIsActive(true);
      document.body.style.overflow = 'hidden';
    };
    window.addEventListener('galleryUpdated', handleGalleryUpdate);
    window.addEventListener('showLightbox', handleShowLightbox);
    return () => {
      window.removeEventListener('galleryUpdated', handleGalleryUpdate);
      window.removeEventListener('showLightbox', handleShowLightbox);
    };
  }, []);
  const hideLightbox = useCallback(() => {
    setIsActive(false);
    document.body.style.overflow = '';
  }, []);
  const nextImage = useCallback(() => {
    setCurrentIndex(prev => {
      if (galleryItems.length > 0) {
        return (prev + 1) % galleryItems.length;
      }
      return prev;
    });
  }, [galleryItems.length]);
  const prevImage = useCallback(() => {
    setCurrentIndex(prev => {
      if (galleryItems.length > 0) {
        return (prev - 1 + galleryItems.length) % galleryItems.length;
      }
      return prev;
    });
  }, [galleryItems.length]);
  useEffect(() => {
    const handleKeyDown = e => {
      if (isActive) {
        if (e.key === 'Escape') {
          hideLightbox();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, hideLightbox, nextImage, prevImage]);
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      hideLightbox();
    }
  };
  if (!isActive || galleryItems.length === 0) return null;
  const currentItem = galleryItems[currentIndex];
  return <div className={`fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-5 ${isActive ? 'flex' : 'hidden'}`} onClick={handleBackdropClick}>
      <button onClick={hideLightbox} className="absolute top-2 right-2 sm:top-5 sm:right-5 bg-white/95 border-none text-primary w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer transition-all text-xl sm:text-2xl font-bold rounded-full shadow-lg hover:bg-accent hover:text-white z-10" aria-label="Close">
        <FaTimes />
      </button>
      <button onClick={prevImage} className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 bg-white/95 border-none text-primary w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer transition-all text-xl sm:text-2xl font-bold rounded-full shadow-lg hover:bg-accent hover:text-white z-10" aria-label="Previous">
        <FaChevronLeft />
      </button>
      <button onClick={nextImage} className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 bg-white/95 border-none text-primary w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer transition-all text-xl sm:text-2xl font-bold rounded-full shadow-lg hover:bg-accent hover:text-white z-10" aria-label="Next">
        <FaChevronRight />
      </button>
      <div className="max-w-[95%] sm:max-w-[90%] max-h-[85vh] sm:max-h-[80vh] flex items-center justify-center">
        {currentItem && <img src={currentItem.src} alt={currentItem.alt} className="max-w-full max-h-[85vh] sm:max-h-[80vh] object-contain rounded-lg" />}
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 text-primary px-4 py-2 sm:px-6 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-full shadow-lg pointer-events-none">
        {currentIndex + 1} / {galleryItems.length}
      </div>
    </div>;
};
export default Lightbox;
