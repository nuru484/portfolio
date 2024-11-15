import React, { useRef, useEffect } from 'react';

const MomentumScroll = ({ children, className = '' }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;
    let startY = 0;
    let scrollTop = 0;
    let velocity = 0;
    let rafId = null;

    const handleTouchStart = (e) => {
      isScrolling = true;
      startY = e.touches[0].clientY;
      scrollTop = container.scrollTop;
      velocity = 0;

      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleTouchMove = (e) => {
      if (!isScrolling) return;

      const y = e.touches[0].clientY;
      const delta = startY - y;

      container.scrollTop = scrollTop + delta;
      velocity = delta / 8; // Adjust this value to change momentum strength

      startY = y;
      scrollTop = container.scrollTop;
    };

    const handleTouchEnd = () => {
      if (!isScrolling) return;
      isScrolling = false;

      const momentumScroll = () => {
        if (Math.abs(velocity) < 0.1) {
          cancelAnimationFrame(rafId);
          return;
        }

        container.scrollTop += velocity;
        velocity *= 0.95; // Decay factor - adjust to change how quickly scrolling slows down
        rafId = requestAnimationFrame(momentumScroll);
      };

      rafId = requestAnimationFrame(momentumScroll);
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className={`overflow-auto overscroll-contain ${className}`}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
      }}
    >
      {children}
    </div>
  );
};

export default MomentumScroll;
