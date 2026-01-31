'use client';

import { useEffect, useState } from 'react';

export default function ScrollAnimations() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity and scale based on scroll
  const opacity = Math.max(0, 1 - scrollY / 800);
  const scale = Math.max(0.8, 1 - scrollY / 2000);
  const blur = Math.min(10, scrollY / 100);

  return (
    <>
      {/* Background gradient that changes on scroll */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% ${Math.min(100, scrollY / 5)}%, rgba(168, 85, 247, ${0.1 * opacity}) 0%, transparent 50%)`,
          transition: 'background 0.3s ease-out',
        }}
      />
      
      {/* Ambient particles */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          opacity: opacity * 0.3,
          filter: `blur(${blur}px)`,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 60% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 30%)
          `,
          transform: `translateY(${scrollY * 0.5}px) scale(${scale})`,
        }}
      />
    </>
  );
}
