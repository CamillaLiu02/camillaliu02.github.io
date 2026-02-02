'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { name: 'Home', href: '/#top' },
  { name: 'Me', href: '/#intro' },
  { name: 'Projects/Works', href: '/#projects' },
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-[#f7f4ee]/90 backdrop-blur-lg shadow-sm border-b border-stone-200'
          : 'bg-transparent'
      )}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left */}
          <Link
            href="/"
            className="flex items-center gap-0.5 text-lg font-apple font-bold text-slate-900 hover:text-fuchsia-600 transition-colors whitespace-nowrap"
          >
            <span className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-slate-200">
              <Image
                src="/images/avatars/dd.png"
                alt="Chang Liu avatar"
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            Chang Liu
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-apple font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 text-white shadow-[0_10px_25px_rgba(147,197,253,0.45)]'
                    : 'text-slate-600 hover:bg-slate-900 hover:text-white'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-stone-200 bg-[#f7f4ee]"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-apple font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 text-white shadow-[0_10px_25px_rgba(147,197,253,0.45)]'
                      : 'text-slate-600 hover:bg-slate-900 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
