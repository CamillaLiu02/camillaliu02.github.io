'use client';

import { useEffect, useRef, useState } from 'react';

export default function InteractiveSphere() {
  const sphereRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sphereRef.current) {
        const rect = sphereRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const deltaX = (e.clientX - centerX) / 10;
        const deltaY = (e.clientY - centerY) / 10;
        
        setPosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={sphereRef}
        className="relative w-[500px] h-[500px] rounded-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Main gradient sphere */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.8) 0%, rgba(59, 130, 246, 0.6) 35%, rgba(147, 51, 234, 0.4) 60%, transparent 100%)',
            filter: 'blur(60px)',
            animation: 'pulse-slow 4s ease-in-out infinite',
          }}
        />
        
        {/* Secondary gradient layer */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(217, 70, 239, 0.6) 0%, rgba(99, 102, 241, 0.4) 40%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'pulse-slow 3s ease-in-out infinite reverse',
          }}
        />

        {/* Center glow */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-purple-300 to-blue-200 opacity-80"
          style={{
            filter: 'blur(20px)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />

        {/* Outer ring */}
        <div 
          className="absolute inset-0 rounded-full border border-purple-400/30"
          style={{
            animation: 'rotate 20s linear infinite',
          }}
        />
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
