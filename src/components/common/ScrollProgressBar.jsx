import React, { useState, useEffect } from 'react';

/**
 * Sleek progress bar tracking the user's scroll percentage along the page
 */
export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-claySlate-100/40 backdrop-blur-xs"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-clayPurple via-purple-500 to-clayBlue shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
