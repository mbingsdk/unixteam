'use client';

/**
 * components/BottomTabBar.tsx
 *
 * iOS/macOS-style bottom tab bar untuk mobile.
 * Pasang di app/layout.tsx dan tambah padding-bottom di <main>:
 *   <main className="flex-1 pb-24 md:pb-0">
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  FolderGit2,
  FileText,
  Users,
  MessageCircle,
} from 'lucide-react';
import { springSnappy } from '@/lib/motion';

const tabs = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/projects', icon: FolderGit2, label: 'Projects' },
  { href: '/blog', icon: FileText, label: 'Blog' },
  { href: '/team', icon: Users, label: 'Team' },
  { href: '/discord', icon: MessageCircle, label: 'Discord' },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  // Sembunyikan di halaman admin
  if (pathname.startsWith('/admin')) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Tab navigasi utama"
    >
      <div
        className="mx-3 mb-2 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(14, 14, 14, 0.82)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '0.5px solid rgba(255,255,255,0.12)',
          boxShadow:
            '0 -0.5px 0 rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-around px-1 py-1.5">
          {tabs.map(({ href, icon: Icon, label }) => {
            const active =
              href === '/' ? pathname === '/' : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl relative min-w-[56px] select-none"
                aria-current={active ? 'page' : undefined}
              >
                {/* Active background pill */}
                {active && (
                  <motion.div
                    layoutId="tab-active-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(255,184,0,0.12)' }}
                    transition={springSnappy}
                  />
                )}

                {/* Icon */}
                <motion.div
                  animate={active ? { scale: 1.08 } : { scale: 1 }}
                  transition={springSnappy}
                  className="relative z-10"
                >
                  <Icon
                    size={23}
                    strokeWidth={active ? 2.2 : 1.7}
                    className={`transition-colors duration-200 ${
                      active ? 'text-accent' : 'text-foreground/45'
                    }`}
                    aria-hidden
                  />
                </motion.div>

                {/* Label */}
                <span
                  className={`text-[10px] relative z-10 font-medium tracking-tight transition-colors duration-200 leading-none ${
                    active ? 'text-accent' : 'text-foreground/40'
                  }`}
                >
                  {label}
                </span>

                {/* Active dot indicator */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      key="dot"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={springSnappy}
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    />
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}