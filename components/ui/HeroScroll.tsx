'use client';

import { useEffect, useState } from 'react';
import InteractiveSphere from './InteractiveSphere';
import TypingText from './TypingText';
import Terminal from './Terminal';

export default function HeroScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const textScale = Math.max(0.85, 1 - scrollY / 3000);
  const textBlur = Math.min(8, scrollY / 150);
  const sphereRotate = scrollY * 0.2;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Terminal */}
      <Terminal />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 w-full">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]"
          style={{
            opacity,
            transform: `scale(${textScale})`,
            filter: `blur(${textBlur}px)`,
            transition: 'filter 0.1s ease-out',
          }}
        >
          {/* Left side - Large text */}
          <div 
            className="space-y-8"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight uppercase">
              <TypingText 
                text="HELLO I'M CHANG LIU"
                speed={100}
                delay={0}
                gradientStart={10}
              />
            </h1>
            <div className="text-lg sm:text-xl text-gray-400">
              <TypingText 
                text="Welcome to my portfolio!"
                speed={100}
                delay={0}
              />
            </div>
            <div className="flex flex-wrap gap-4 pt-6">
              <span className="px-4 py-2 bg-gray-900 text-gray-300 border border-gray-700 text-xs font-medium tracking-wider uppercase">
                Full-Stack Developer
              </span>
              <span className="px-4 py-2 bg-gray-900 text-gray-300 border border-gray-700 text-xs font-medium tracking-wider uppercase">
                HCI/HRI Researcher
              </span>
              <span className="px-4 py-2 bg-gray-900 text-gray-300 border border-gray-700 text-xs font-medium tracking-wider uppercase">
                UI/UX Designer
              </span>
            </div>
          </div>

          {/* Right side - Interactive sphere */}
          <div 
            className="flex items-center justify-center"
            style={{
              transform: `translateY(${scrollY * -0.2}px) rotate(${sphereRotate}deg)`,
              opacity: opacity,
            }}
          >
            <InteractiveSphere />
          </div>
        </div>
      </div>
    </section>
  );
}
