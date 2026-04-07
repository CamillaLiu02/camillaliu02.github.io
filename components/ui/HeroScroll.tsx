'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import TypingText from './TypingText';

export default function HeroScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [hasConverged, setHasConverged] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const appearStagger = 0.22;
  const appearStartDelay = 3;
  const neckOffsetPx = 26;
  const orbitItems = useMemo(
    () =>
      (() => {
        const sources = [
        '/images/avatars/LoadAndChaos.png',
        '/images/avatars/ur3e.png',
        '/images/avatars/vr.png',
        '/images/avatars/ux.png',
        '/images/avatars/unity.png',
        '/images/Artwork/17.png',
        '/images/projects/course-enrollment/research/Bullseye Diagram.png',
        '/images/projects/course-enrollment/research/Affinity Diagram.png',
      ];

        const gridColumns = 4;
        const gridRows = 3;
        const xSteps = Array.from({ length: gridColumns }, (_, columnIndex) =>
          -36 + columnIndex * 24,
        );
        const ySteps = Array.from({ length: gridRows }, (_, rowIndex) =>
          -52 + rowIndex * 26,
        );
        const gridCells = xSteps.flatMap((xValue) =>
          ySteps.map((yValue) => ({
            x: `${xValue}vw`,
            y: `${yValue}vh`,
          })),
        );

        const angleStep = 360 / sources.length;
        return sources.map((src, itemIndex) => {
          const cell = gridCells[itemIndex % gridCells.length];
          const baseSize = 124 + (itemIndex % 4) * 6;
          const sizeBoost = src.endsWith('/vr.png')
            ? 32
            : src.endsWith('/unity.png')
              ? 24
              : 0;
          return {
            src,
            angle: Math.round(itemIndex * angleStep),
            size: baseSize + sizeBoost,
            delay: itemIndex * appearStagger,
            gridX: cell.x,
            gridY: cell.y,
          };
        });
      })(),
    [appearStagger],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (event.clientX - centerX) / centerX;
      const offsetY = (event.clientY - centerY) / centerY;
      setMouseOffset({ x: offsetX * 16, y: offsetY * 12 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const convergeDelayMs =
      (appearStartDelay + orbitItems.length * appearStagger) * 1000 + 500;
    const convergeTimer = window.setTimeout(() => {
      setHasConverged(true);
    }, convergeDelayMs);

    return () => window.clearTimeout(convergeTimer);
  }, [appearStartDelay, orbitItems.length, appearStagger]);

  const opacity = Math.max(0, 1 - scrollY / 600);
  const textScale = Math.max(0.85, 1 - scrollY / 3000);
  const textBlur = Math.min(8, scrollY / 150);
  const orbitParallaxY = scrollY * 0.03;
  const avatarParallaxY = scrollY * 0.05;

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="relative min-h-screen w-full pb-24 sm:pb-28 lg:pb-32">
        {/* Centered avatar anchored to bottom */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <div className="relative w-[520px] sm:w-[640px] lg:w-[760px] aspect-[4/5]">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) translateY(${neckOffsetPx}px)`,
              }}
            >
              <div
                className={`relative h-[600px] w-[600px] sm:h-[720px] sm:w-[720px] lg:h-[860px] lg:w-[860px] [--orbit-radius:270px] sm:[--orbit-radius:330px] lg:[--orbit-radius:390px] ${
                  hasConverged ? 'orbit-rotate' : ''
                }`}
                style={{
                  transform: `translate(${mouseOffset.x}px, ${mouseOffset.y + orbitParallaxY}px)`,
                  transition: 'transform 120ms ease-out',
                }}
              >
                {orbitItems.map((item) => (
                  <div
                    key={`${item.src}-${item.angle}`}
                    className={`orbit-item grid-position absolute left-1/2 top-1/2 ${
                      hasConverged ? 'orbit-converge' : ''
                    }`}
                    style={{
                      ['--angle' as any]: `${item.angle}deg`,
                      ['--grid-x' as any]: item.gridX,
                      ['--grid-y' as any]: item.gridY,
                    }}
                  >
                    <div
                      className="grid-appear relative -translate-x-1/2 -translate-y-1/2 bg-transparent p-0 shadow-none"
                      style={{
                        width: `${item.size}px`,
                        height: `${item.size}px`,
                        animationDelay: `${appearStartDelay + item.delay}s`,
                      }}
                    >
                      <div
                        className={`h-full w-full ${hasConverged ? 'orbit-counter-rotate' : ''}`}
                        style={{ position: 'relative' }}
                      >
                        <Image
                          src={item.src}
                          alt="Project preview"
                          fill
                          sizes={`${item.size}px`}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="relative h-full w-full"
              style={{
                transform: `translateY(${avatarParallaxY}px)`,
                transition: 'transform 120ms ease-out',
              }}
            >
              <Image
                src="/images/projects/hero-avatar.png"
                alt="Hero avatar"
                fill
                className="object-contain drop-shadow-[0_30px_80px_rgba(120,119,198,0.25)]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text overlay bottom-center */}
        <div
          className="absolute inset-x-0 bottom-20 sm:bottom-24 lg:bottom-28 flex justify-center z-10"
          style={{
            opacity,
            transform: `scale(${textScale}) translateY(${scrollY * 0.15}px)`,
            filter: `blur(${textBlur}px)`,
            transition: 'filter 0.1s ease-out',
          }}
        >
          <div className="text-center space-y-6 px-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight uppercase text-[#dde5f4] drop-shadow-[0_4px_32px_rgba(99,102,241,0.3)]">
              <span className="relative inline-block">
                <span className="absolute inset-0 text-white/10 scale-[1.04]">
                  <TypingText
                    text="HELLO I'M"
                    speed={100}
                    delay={0}
                    gradientStart={10}
                  />
                </span>
                <span className="relative text-[#dde5f4]">
                  <TypingText
                    text="HELLO I'M"
                    speed={100}
                    delay={0}
                    gradientStart={10}
                  />
                </span>
              </span>
              <span className="relative block mt-3">
                <span className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/15 via-pink-500/15 to-indigo-500/15 bg-clip-text text-transparent scale-[1.04]">
                  <TypingText
                    text="CHANG LIU"
                    speed={100}
                    delay={0}
                    gradientStart={10}
                  />
                </span>
                <span className="relative bg-gradient-to-br from-fuchsia-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(124,58,237,0.35)]">
                  <TypingText
                    text="CHANG LIU"
                    speed={100}
                    delay={0}
                    gradientStart={10}
                  />
                </span>
              </span>
            </h1>
            <div className="text-base sm:text-lg text-slate-200 bg-white/8 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full shadow-sm border border-white/10">
              <TypingText
                text="Welcome to my portfolio!"
                speed={100}
                delay={0}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-5">
              <span className="rounded-full bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-purple-500/30 p-[1px] shadow-[0_10px_30px_rgba(99,102,241,0.25)] transition-transform duration-300 hover:-translate-y-0.5">
                <span className="inline-flex items-center rounded-full bg-white/8 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-200 backdrop-blur-sm">
                  Software Engineer
                </span>
              </span>
              <span className="rounded-full bg-gradient-to-r from-sky-500/30 via-cyan-500/30 to-teal-500/30 p-[1px] shadow-[0_10px_30px_rgba(14,165,233,0.20)] transition-transform duration-300 hover:-translate-y-0.5">
                <span className="inline-flex items-center rounded-full bg-white/8 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200 backdrop-blur-sm">
                  Systems & Backend
                </span>
              </span>
              <span className="rounded-full bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-fuchsia-500/30 p-[1px] shadow-[0_10px_30px_rgba(139,92,246,0.22)] transition-transform duration-300 hover:-translate-y-0.5">
                <span className="inline-flex items-center rounded-full bg-white/8 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-200 backdrop-blur-sm">
                  Robotics & AI
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
