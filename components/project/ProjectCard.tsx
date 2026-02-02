'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectFrontmatter } from '@/types/project';
import { formatDate } from '@/lib/utils/cn';
import { HiArrowRight } from 'react-icons/hi';

interface ProjectCardProps {
  project: ProjectFrontmatter;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const palettes = [
    {
      bg: 'from-white/65 via-pink-200/40 to-rose-200/35',
      ring: 'ring-white/60',
      chip: 'bg-white/45 text-slate-900 border-white/50',
      button: 'bg-white/55 text-slate-900 border-white/60',
    },
    {
      bg: 'from-white/65 via-sky-200/40 to-indigo-200/35',
      ring: 'ring-white/60',
      chip: 'bg-white/45 text-slate-900 border-white/50',
      button: 'bg-white/55 text-slate-900 border-white/60',
    },
    {
      bg: 'from-white/65 via-amber-200/40 to-yellow-200/35',
      ring: 'ring-white/60',
      chip: 'bg-white/45 text-slate-900 border-white/50',
      button: 'bg-white/55 text-slate-900 border-white/60',
    },
    {
      bg: 'from-white/65 via-emerald-200/40 to-teal-200/35',
      ring: 'ring-white/60',
      chip: 'bg-white/45 text-slate-900 border-white/50',
      button: 'bg-white/55 text-slate-900 border-white/60',
    },
  ];
  const palette = palettes[index % palettes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block font-sans h-full"
      >
        <div
          className={`rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.18)] transition-all duration-300 ring-1 ${palette.ring} bg-gradient-to-br ${palette.bg} hover:-translate-y-1 w-full h-full min-h-[520px] sm:min-h-[560px] backdrop-blur-xl`}
        >
          <div className="p-6 sm:p-7 h-full flex flex-col border border-white/40 bg-white/30 backdrop-blur-2xl">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={project.cardImage || project.heroImage}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>

            <div className="mt-5 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur ${palette.chip}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {project.title}
              </h3>

              <p className="text-slate-700 text-sm mb-5 line-clamp-2">
                {project.shortDescription}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-600">
                  {formatDate(project.date)}
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-sm border backdrop-blur ${palette.button}`}
                >
                  View case
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
