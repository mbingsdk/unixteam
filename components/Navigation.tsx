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
  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.08] transition-all duration-200 text-foreground/70 hover:text-foreground flex-shrink-0 cursor-pointer"
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
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
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
      {/* Floating Nav Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={[
          'fixed top-3 left-1/2 -translate-x-1/2 z-50',
          'flex items-center',
          'rounded-2xl',
          'transition-all duration-500 ease-out',
          scrolled
            ? 'bg-background/80 backdrop-blur-2xl shadow-2xl shadow-black/30 border border-white/[0.08]'
            : 'bg-background/60 backdrop-blur-xl shadow-xl shadow-black/20 border border-white/[0.06]',
        ].join(' ')}
        style={{
          maxWidth: 'calc(100vw - 1.5rem)',
          WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'blur(24px) saturate(150%)',
          backdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'blur(24px) saturate(150%)',
          padding: '6px 8px',
          gap: '2px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-white/[0.06] active:bg-white/[0.08] transition-all duration-200 mr-1"
        >
          <div className="relative h-7 w-7 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-white/10">
            <Image
              src="/apple-icon.png"
              alt="UNIX-TEAM"
              fill
              className="object-cover p-0.5"
              priority
            />
          </div>
          <span className="font-semibold text-[13px] text-foreground whitespace-nowrap tracking-tight">
            UNIX-TEAM
          </span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-white/[0.08] mx-1 flex-shrink-0" />

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'relative text-[12.5px] px-2.5 py-1.5 rounded-lg transition-all duration-200',
                isActive(link.href)
                  ? 'text-accent font-medium'
                  : 'text-foreground/60 hover:text-foreground hover:bg-white/[0.06]',
              ].join(' ')}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-white/[0.08] mx-1 flex-shrink-0" />

        {/* Desktop: Theme + Discord */}
        <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
          <ThemeToggle />
          <a
            href="https://discord.gg/unix-team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-[12.5px] font-semibold hover:bg-accent/90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-accent/20"
          >
            <DiscordIcon size={13} />
            Discord
          </a>
        </div>

        {/* Mobile: Theme + Hamburger */}
        <div className="flex md:hidden items-center gap-1 ml-1">
          <ThemeToggle />
          <button
            onClick={() => setDrawerOpen((v) => !v)}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] active:bg-white/[0.12] transition-all duration-200 text-foreground/70 flex-shrink-0"
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
                {drawerOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ y: '100%', opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 32, stiffness: 400 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
              <div
                className="bg-background/85 backdrop-blur-2xl border-t border-white/[0.08] rounded-t-3xl overflow-hidden"
                style={{
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  paddingBottom: 'env(safe-area-inset-bottom)',
                }}
              >
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-9 h-1 rounded-full bg-white/20" />
                </div>

                {/* Links */}
                <nav className="px-3 py-2">
                  <div className="grid grid-cols-2 gap-1.5">
                    {drawerLinks.map((link, i) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.2 }}
                        >
                          <Link
                            href={link.href}
                            className={[
                              'flex items-center gap-2.5 px-3 py-3 rounded-2xl',
                              'text-[14px] font-medium transition-all duration-200',
                              active
                                ? 'bg-accent/15 text-accent'
                                : 'text-foreground/65 hover:bg-white/[0.06] hover:text-foreground',
                            ].join(' ')}
                          >
                            <div className={`p-1.5 rounded-lg flex-shrink-0 ${active ? 'bg-accent/20' : 'bg-white/[0.06]'}`}>
                              <Icon size={15} />
                            </div>
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Discord CTA */}
                <div className="px-3 pt-1 pb-4">
                  <a
                    href="https://discord.gg/unix-team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-accent text-accent-foreground font-semibold text-[14px] hover:bg-accent/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-accent/20"
                  >
                    <DiscordIcon size={16} />
                    Join Discord Buat Ribut
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}