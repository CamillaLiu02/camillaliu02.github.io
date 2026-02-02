'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollFade from './ScrollFade';

const storyItems = [
  {
    title: 'Human-centered design',
    subtitle: 'Human-centered design informed by research',
    description:
      'User research, interaction design, prototyping, and design systems grounded in usability, accessibility, and real-world constraints.',
  },
  {
    title: 'End-to-end development',
    subtitle: 'End-to-end software development',
    description:
      'Full-stack development across frontend, backend, and APIs, with experience in modern frameworks, data handling, and scalable system design.',
  },
  {
    title: 'Emerging technologies',
    subtitle: 'Applied computing and emerging technologies',
    description:
      'Exploring AR/VR, robotics, and intelligent systems through hands-on experimentation, prototyping, and research-driven development.',
  },
];

export default function StoryTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProgress, setActiveProgress] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.5;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((element, index) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);

      const activeElement = itemRefs.current[closestIndex];
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const progress = (viewportCenter - rect.top) / rect.height;
        const clamped = Math.max(0, Math.min(1, progress));
        setActiveProgress(clamped);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="story-section py-28 bg-[#f7f4ee] border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="story-grid grid grid-cols-1 gap-12">
          <div className="story-text space-y-24">
            {storyItems.map((item, index) => (
              <ScrollFade key={item.title} delay={index * 120}>
                <div
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  className="min-h-[60vh] flex flex-col justify-center"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-4">
                    {item.title}
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-playfair font-bold text-slate-900 mb-5 leading-tight">
                    {item.subtitle}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 font-lora leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .story-section {
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
