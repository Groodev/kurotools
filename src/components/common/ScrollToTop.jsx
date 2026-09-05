import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating claymorphic button that appears on scroll and smoothly returns user to top
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl clay-button clay-button-white border border-purple-100 shadow-clay-card text-clayPurple-dark hover:scale-110 active:scale-95 transition-all duration-300 group ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
      title="Kembali ke atas"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 duration-200" />
    </button>
  );
}
