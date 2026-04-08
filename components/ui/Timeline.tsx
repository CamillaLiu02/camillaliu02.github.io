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
        <div className="absolute left-[7px] top-6 w-0.5 h-full bg-orange-200" />
      )}

      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0 top-1 h-4 w-4 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 border-[3px] border-white shadow-[0_6px_16px_rgba(251,146,60,0.35)]"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-2xl p-6 transition-all"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500/80 mb-2">{date}</p>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm font-medium text-slate-600 mb-2">{organization}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="liquid-glass-pill inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold text-orange-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-slate-600 text-sm">{description}</p>
      </motion.div>
    </div>
  );
}
