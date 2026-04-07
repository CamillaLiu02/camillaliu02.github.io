'use client';

import { motion } from 'framer-motion';

interface TimelineItemProps {
  date: string;
  title: string;
  organization: string;
  description: string;
  isLast?: boolean;
  tags?: string[];
}

export default function TimelineItem({
  date,
  title,
  organization,
  description,
  isLast = false,
  tags = [],
}: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-8">
      {/* Line */}
      {!isLast && (
        <div className="absolute left-[7px] top-6 w-0.5 h-full bg-white/10" />
      )}

      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-1 h-4 w-4 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 border-[3px] border-[#0a0f1e] shadow-[0_6px_16px_rgba(16,185,129,0.35)]"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/8 bg-white/4 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.3)] backdrop-blur-lg transition-all hover:bg-white/6 hover:border-white/12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80 mb-2">{date}</p>
        <h3 className="text-lg font-bold text-[#dde5f4] mb-1">{title}</h3>
        <p className="text-sm font-medium text-slate-400 mb-2">{organization}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-slate-400 text-sm">{description}</p>
      </motion.div>
    </div>
  );
}
