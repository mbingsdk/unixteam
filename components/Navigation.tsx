'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Home, Info, Users, FolderGit2,
  BookOpen, FileText, HelpCircle, Sun, Moon,
} from 'lucide-react';
import { DiscordIcon } from './ui/SocialIcons';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/',              label: 'Home' },
  { href: '/about',         label: 'About' },
  { href: '/team',          label: 'Team' },
  { href: '/projects',      label: 'Projects' },
  { href: '/blog',          label: 'Blog' },
  { href: '/faq',           label: 'FAQ' },
  { href: '/documentation', label: 'Docs' },
];

const drawerLinks = [
  { href: '/',              label: 'Home',         icon: Home },
  { href: '/about',         label: 'About',        icon: Info },
  { href: '/team',          label: 'Team',         icon: Users },
  { href: '/projects',      label: 'Projects',     icon: FolderGit2 },
  { href: '/blog',          label: 'Blog',         icon: FileText },
  { href: '/faq',           label: 'FAQ',          icon: HelpCircle },
  { href: '/documentation', label: 'Docs',         icon: BookOpen },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] active:bg-white/[0.12] transition-all duration-200 text-foreground/70 hover:text-foreground flex-shrink-0 cursor-pointer"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

export default function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* macOS-style Floating Dock */}
      <motion.nav
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={[
          'fixed top-4 left-1/2 -translate-x-1/2 z-50',
          'flex items-center gap-1',
          'rounded-4xl',
          'px-2 py-2',
          'transition-all duration-500 ease-out',
          scrolled
            ? 'bg-background/70 backdrop-blur-2xl shadow-2xl shadow-black/30 border border-white/[0.08]'
            : 'bg-background/50 backdrop-blur-xl shadow-xl shadow-black/20 border border-white/[0.06]',
        ].join(' ')}
        style={{ 
          maxWidth: 'calc(100vw - 2rem)',
          WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'blur(24px) saturate(150%)',
          backdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'blur(24px) saturate(150%)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/[0.06] active:bg-white/[0.08] transition-all duration-200"
        >
          <div className="relative h-9 w-9 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-white/10">
            <Image
              src="/apple-icon.png"
              alt="UNIX-TEAM"
              fill
              className="object-cover p-0.5"
              priority
            />
          </div>
          <span className="font-semibold text-sm text-foreground whitespace-nowrap tracking-tight">
            UNIX-TEAM
          </span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-white/[0.08] mx-1 flex-shrink-0" />

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'relative text-[13px] px-3 py-1.5 rounded-full transition-all duration-200',
                isActive(link.href)
                  ? 'text-accent font-medium'
                  : 'text-foreground/60 hover:text-foreground hover:bg-white/[0.06]',
              ].join(' ')}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-white/[0.08] mx-1 flex-shrink-0" />

        {/* Desktop: Theme Toggle + Discord CTA */}
        <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
          <ThemeToggle />
          <a
            href="https://discord.gg/unix-team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-accent text-accent-foreground text-[13px] font-semibold hover:bg-accent/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-accent/20"
          >
            <DiscordIcon size={14} />
            Discord
          </a>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-1 ml-1">
          <ThemeToggle />
          <button
            onClick={() => setDrawerOpen((v) => !v)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:bg-white/[0.12] transition-all duration-200 text-foreground/70 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={drawerOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {drawerOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer - macOS Sheet Style */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ y: '100%', opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 32, stiffness: 400 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
              <div 
                className="bg-background/80 backdrop-blur-2xl border-t border-white/[0.08] rounded-t-3xl overflow-hidden pb-safe"
                style={{ 
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                }}
              >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 rounded-full bg-white/20" />
                </div>

                {/* Nav items */}
                <nav className="px-4 pb-3">
                  {drawerLinks.map((link, i) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <Link
                          href={link.href}
                          className={[
                            'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl mb-1',
                            'text-[15px] font-medium transition-all duration-200',
                            active
                              ? 'bg-accent/15 text-accent'
                              : 'text-foreground/70 hover:bg-white/[0.06] active:bg-white/[0.08] hover:text-foreground',
                          ].join(' ')}
                        >
                          <div className={`p-2 rounded-xl ${active ? 'bg-accent/20' : 'bg-white/[0.06]'}`}>
                            <Icon size={18} className="flex-shrink-0" />
                          </div>
                          {link.label}
                          {active && (
                            <div className="ml-auto w-2 h-2 rounded-full bg-accent" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Discord CTA */}
                <div className="px-4 pt-2 pb-6">
                  <a
                    href="https://discord.gg/unix-team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-accent text-accent-foreground font-semibold text-[15px] hover:bg-accent/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-accent/20"
                  >
                    <DiscordIcon size={18} />
                    Join Discord Buat Ribut
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}