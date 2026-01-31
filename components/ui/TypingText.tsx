'use client';

import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  gradientStart?: number; // Character index where gradient should start
}

export default function TypingText({ 
  text, 
  className = '', 
  speed = 100,
  delay = 0,
  gradientStart 
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        setIsComplete(true);
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, speed, delay]);

  if (gradientStart !== undefined) {
    const beforeGradient = displayText.slice(0, gradientStart);
    const gradientText = displayText.slice(gradientStart);
    
    return (
      <span className={className}>
        {beforeGradient}
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          {gradientText}
        </span>
        {!isComplete && <span className="animate-pulse text-white">|</span>}
      </span>
    );
  }

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}
