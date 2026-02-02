'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const roles = [
  { label: 'Developer', emoji: '💻' },
  { label: 'Researcher', emoji: '🔬' },
  { label: 'Designer', emoji: '🫟' },
];

export default function RotatingRoles() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roles.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex align-baseline">
      <span className="inline-flex h-[1.3em] w-[8.5em] items-center justify-center overflow-hidden rounded-full border border-black/20 bg-gradient-to-r from-amber-100/70 via-rose-100/70 to-indigo-100/70 px-3 text-center font-bold">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[activeIndex].label}
            initial={{ opacity: 0, y: 12, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1"
          >
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              {roles[activeIndex].label}
            </span>
            <span className="text-black">{roles[activeIndex].emoji}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
