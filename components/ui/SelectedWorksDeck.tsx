'use client';

import Image from 'next/image';
import { useState } from 'react';

const works = [
  {
    title: 'Selected Work 01',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/01.png',
    summary: 'A visual exploration study focusing on color and form relationships.',
  },
  {
    title: 'Selected Work 02',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/02.png',
    summary: 'Experimental composition balancing texture and tonal contrast.',
  },
  {
    title: 'Selected Work 03',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/03.png',
    summary: 'Layered visual study investigating depth and spatial rhythm.',
  },
  {
    title: 'Selected Work 04',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/04.png',
    summary: 'Color interaction test with luminous highlights.',
  },
  {
    title: 'Selected Work 05',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/05.png',
    summary: 'Structured gradients exploring atmosphere and mood.',
  },
  {
    title: 'Selected Work 06',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/06.png',
    summary: 'Form-driven study emphasizing dynamic focal points.',
  },
  {
    title: 'Selected Work 07',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/07.png',
    summary: 'Gesture-inspired abstraction with energetic movement.',
  },
  {
    title: 'Selected Work 08',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/08.png',
    summary: 'Rhythmic marks and shapes in a focused palette.',
  },
  {
    title: 'Selected Work 09',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/09.png',
    summary: 'Atmospheric textures layered with soft edges.',
  },
  {
    title: 'Selected Work 10',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/10.png',
    summary: 'Minimal structure with amplified contrast for clarity.',
  },
  {
    title: 'Selected Work 11',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/11.png',
    summary: 'Soft gradients blended with crisp geometry.',
  },
  {
    title: 'Selected Work 12',
    medium: 'Visual Exploration',
    year: '2024',
    image: '/images/Artwork/12.png',
    summary: 'Light study focusing on glow and shadow interplay.',
  },
];

export default function SelectedWorksDeck() {
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});

  const handleImageLoad = (src: string) => (image: HTMLImageElement) => {
    const ratio = image.naturalWidth / image.naturalHeight;
    setImageRatios((prev) => (prev[src] ? prev : { ...prev, [src]: ratio }));
  };

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
      {works.map((work) => (
        <div
          key={work.title}
          className="group relative mb-5 break-inside-avoid rounded-2xl bg-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 transition-transform duration-300 hover:-translate-y-2"
        >
          <div
            className="relative overflow-hidden rounded-2xl bg-slate-900/5"
            style={imageRatios[work.image] ? { aspectRatio: `${imageRatios[work.image]}` } : undefined}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-contain"
              onLoadingComplete={handleImageLoad(work.image)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">{work.medium}</p>
              <h3 className="text-lg font-semibold mt-2">{work.title}</h3>
              <p className="text-xs text-white/80 mt-2">{work.year}</p>
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-full flex-col justify-between p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Selected Work</p>
                <h3 className="text-lg font-semibold text-slate-900 mt-2">{work.title}</h3>
                <p className="text-xs text-slate-500 mt-2">{work.medium} · {work.year}</p>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{work.summary}</p>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">View details</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
