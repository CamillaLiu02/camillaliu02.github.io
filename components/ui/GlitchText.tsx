'use client';

import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnLoad?: boolean;
  glitchInterval?: number;
}

export default function GlitchText({ 
  text, 
  className = '', 
  glitchOnLoad = false,
  glitchInterval = 5000 
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(glitchOnLoad);
  const [displayText, setDisplayText] = useState(text);

  const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
  
  const glitchText = (originalText: string) => {
    let iterations = 0;
    const maxIterations = 10;
    
    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < iterations) {
              return originalText[index];
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      iterations += 1;

      if (iterations > maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsGlitching(false);
      }
    }, 50);
  };

  useEffect(() => {
    if (glitchOnLoad) {
      glitchText(text);
    }

    const interval = setInterval(() => {
      setIsGlitching(true);
      glitchText(text);
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [text, glitchOnLoad, glitchInterval]);

  return (
    <span 
      className={`glitch-wrapper inline-block ${className}`}
      data-text={displayText}
    >
      <span 
        className={`glitch ${isGlitching ? 'glitching' : ''}`}
        data-text={displayText}
      >
        {displayText}
      </span>
    </span>
  );
}
