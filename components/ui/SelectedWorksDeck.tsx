'use client';

import Image from 'next/image';
import { useState } from 'react';

const works = [
  {
    title: 'Form Study01-Portrait',
    medium: 'Charcoal on Paper',
    image: '/images/Artwork/01.png',
    summary: 'A charcoal portrait study exploring human facial structure',
  },
  {
    title: 'Form Study02-Portrait',
    medium: 'Charcoal on Paper',
    image: '/images/Artwork/03.png',
    summary: 'A charcoal portrait study exploring emotional weight through exaggerated shadows and fragmented facial structure, emphasizing vulnerability and psychological depth.',
  },
  {
    title: 'Form Study03-Portrait',
    medium: 'Charcoal on Paper',
    image: '/images/Artwork/06.png',
    summary: 'A study of the human eye framed within rigid geometric boundaries.',
  },
  {
    title: 'Form Study04-Digital Format',
    medium: 'Digital Tools',
    image: '/images/Artwork/08.png',
    summary: '',
  },
  {
    title: 'Material Study05-Paper and value',
    medium: 'Paper',
    image: '/images/Artwork/13.png',
    summary: 'A symmetrical architectural silhouette inspired by traditional Chinese forms, centered around the concept of balance through positive and negative space.',
  },
  {
    title: 'Material Study06-Woodblock and value',
    medium: 'woodblock, Ink',
    image: '/images/Artwork/14.png',
    summary: 'A carved woodblock print capturing the motion of waves through layered lines and textures, emphasizing rhythm and natural flow.',
  },
  {
    title: 'Material Study07-Relief',
    medium: 'Relief Print with Ink',
    image: '/images/Artwork/15.png',
    summary: 'A continuation of wave studies using higher contrast and bolder marks to amplify movement and the physicality of the printing process.',
  },
  {
    title: 'Form Study07-Origins Grid',
    medium: 'Oil Pastel and Ink on Paper',
    image: '/images/Artwork/20.png',
    summary: 'A grid-based visual narrative combining symbolic forms and organic shapes, reflecting themes of growth, evolution, and interconnected systems through color and repetition.',
  },
  {
    title: 'Form Study09-Visual Noise',
    medium: 'Ink on Sketchbook Paper',
    image: '/images/Artwork/18.png',
    summary: 'A dense ink drawing composed of symbols, patterns, and personal references, exploring information overload, memory fragments, and the chaotic layering of everyday thoughts.',
  },
  {
    title: 'Form Study10-Color',
    medium: 'Marker and Colored Pencil on Sketchbook Paper',
    image: '/images/Artwork/19.png',
    summary: 'An abstract composition built from layered patterns, gradients, and rhythmic shapes, exploring how color, texture, and movement interact within a confined space.',
  },
  {
    title: 'Material Study11-Relief and Print',
    medium: 'Relief Print with Ink',
    image: '/images/Artwork/16.png',
    summary: 'A mirrored portrait print exploring identity and emotional duality, using limited color to suggest contrast between internal states.',
  },
  {
    title: 'Form Study12-Objects',
    medium: 'Graphite and Charcoal on Paper',
    image: '/images/Artwork/04.png',
    summary: 'A detailed observational drawing of a worn sneaker with loosened laces, focusing on material texture, structure, and the quiet tension between motion and stillness.',
  },
  {
    title: 'Form Study13-Objects',
    medium: 'Charcoal on grid Paper',
    image: '/images/Artwork/09.png',
    summary: 'A scaled design sketch for a wooden deer sculpture, detailing proportions, measurements, and material considerations while balancing playful form with structural clarity.',
  },
  {
    title: 'Figure Study14-Objects',
    medium: 'Charcoal on Paper',
    image: '/images/Artwork/10.png',
    summary: 'An observational study of a wooden mannequin focusing on proportion, joint structure, and light-shadow relationships to understand the mechanics of the human form.',
  },
  {
    title: 'Form Study15-Paints',
    medium: 'Acrylic Paint on Paper',
    image: '/images/Artwork/12.png',
    summary: 'A landscape study capturing the transition between day and night, using layered color gradients and silhouette to convey depth, atmosphere, and stillness.',
  },
];

export default function SelectedWorksDeck() {
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const [activeWork, setActiveWork] = useState<(typeof works)[number] | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const minZoom = 0.5;
  const maxZoom = 3;
  const zoomStep = 0.2;

  const clampZoom = (value: number) => Math.min(maxZoom, Math.max(minZoom, value));
  const updateZoom = (delta: number) => {
    setZoomLevel((prev) => clampZoom(Number((prev + delta).toFixed(2))));
  };

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
          onClick={() => {
            setZoomLevel(1);
            setActiveWork(work);
          }}
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
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-full flex-col justify-between p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Selected Work</p>
                <h3 className="text-lg font-semibold text-slate-900 mt-2">{work.title}</h3>
                <p className="text-xs text-slate-500 mt-2">{work.medium}</p>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{work.summary}</p>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-400">View details</div>
            </div>
          </div>
        </div>
      ))}
      {activeWork ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => {
              setActiveWork(null);
                setZoomLevel(1);
            }}
            aria-label="Close enlarged view"
          />
          <div className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[calc(100vh-3rem)]">
            <div
              className="relative w-full flex-1 overflow-hidden bg-slate-950/5"
              style={imageRatios[activeWork.image] ? { aspectRatio: `${imageRatios[activeWork.image]}` } : undefined}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative h-full w-full cursor-zoom-in"
                  style={{ transform: `scale(${zoomLevel})` }}
                  onClick={() => updateZoom(zoomLevel > minZoom ? -zoomStep : zoomStep)}
                  onWheel={(event) => {
                    event.preventDefault();
                    updateZoom(event.deltaY > 0 ? -zoomStep : zoomStep);
                  }}
                >
                  <Image
                    src={activeWork.image}
                    alt={activeWork.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{activeWork.medium}</p>
                <h3 className="text-lg font-semibold text-slate-900 mt-2">{activeWork.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1 text-xs uppercase tracking-[0.3em] text-slate-600">
                  <button
                    type="button"
                    className="rounded-full px-2 py-1 transition hover:text-slate-900 disabled:opacity-40"
                    onClick={() => updateZoom(-zoomStep)}
                    disabled={zoomLevel <= minZoom}
                  >
                    -
                  </button>
                  <span className="px-1">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    type="button"
                    className="rounded-full px-2 py-1 transition hover:text-slate-900 disabled:opacity-40"
                    onClick={() => updateZoom(zoomStep)}
                    disabled={zoomLevel >= maxZoom}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                  onClick={() => {
                    setActiveWork(null);
                    setZoomLevel(1);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
