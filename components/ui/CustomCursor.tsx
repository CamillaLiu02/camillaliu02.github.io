'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  // Function to determine if background is dark or light
  const getBackgroundLuminance = (x: number, y: number): boolean => {
    // Get the element at cursor position
    let element = document.elementFromPoint(x, y);
    if (!element) return true;

    // Walk up the DOM tree to find actual background color (skip transparent elements)
    let bgColor = 'transparent';
    let currentElement = element as HTMLElement;
    let depth = 0;

    while (depth < 20 && currentElement && currentElement !== document.documentElement) {
      const computed = window.getComputedStyle(currentElement);
      const color = computed.backgroundColor;
      
      // If we find a non-transparent background, use it
      if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') {
        bgColor = color;
        break;
      }
      
      currentElement = currentElement.parentElement as HTMLElement;
      depth++;
    }

    // Fallback to html element background if nothing found
    if (bgColor === 'transparent' || !bgColor) {
      bgColor = window.getComputedStyle(document.documentElement).backgroundColor || 'rgb(10, 10, 10)';
    }

    // Parse RGB values
    const rgbMatch = bgColor.match(/\d+/g);
    if (!rgbMatch || rgbMatch.length < 3) return true;

    const [r, g, b] = rgbMatch.map(Number);
    
    // Calculate luminance using relative luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return true if dark (luminance < 0.5), false if light
    return luminance < 0.5;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }

      // Check background luminance at cursor position
      const isDark = getBackgroundLuminance(e.clientX, e.clientY);
      setIsDarkBackground(isDark);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer ring with pulse animation */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{
          width: '32px',
          height: '32px',
          border: `2px solid ${isDarkBackground ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 30, 30, 0.8)'}`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'border-color 200ms ease-out, transform 150ms ease-out',
          animation: isHovering ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[9999] transition-all duration-100 ${
          isClicking ? 'scale-150' : 'scale-100'
        }`}
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: isDarkBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 30, 30, 0.9)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 200ms ease-out, transform 100ms ease-out',
        }}
      />
      
      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}
