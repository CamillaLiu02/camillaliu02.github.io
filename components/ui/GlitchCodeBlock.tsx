'use client';

import { useEffect, useState } from 'react';

interface GlitchCodeBlockProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export default function GlitchCodeBlock({ position }: GlitchCodeBlockProps) {
  const [binaryText, setBinaryText] = useState('');

  const positionClasses = {
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-right': 'bottom-8 right-8',
  };

  const generateBinary = () => {
    const lines = 2;
    const charsPerLine = 32;
    let binary = '';
    
    for (let i = 0; i < lines; i++) {
      for (let j = 0; j < charsPerLine; j++) {
        binary += Math.random() > 0.5 ? '1' : '0';
        if (j % 8 === 7 && j < charsPerLine - 1) {
          binary += ' ';
        }
      }
      if (i < lines - 1) binary += '\n';
    }
    
    return binary;
  };

  useEffect(() => {
    const updateBinary = () => {
      setBinaryText(generateBinary());
    };

    updateBinary();
    const interval = setInterval(updateBinary, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-10 pointer-events-none hidden lg:block`}
    >
      <div 
        className={`glitch relative font-mono text-xs text-green-400 bg-black/80 px-4 py-3 border border-green-500/30 backdrop-blur-sm whitespace-pre leading-tight`}
        data-text={binaryText}
        style={{
          textShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
        }}
      >
        {binaryText}
      </div>
    </div>
  );
}
