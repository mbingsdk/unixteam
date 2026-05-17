'use client';

/**
 * app/admin/layout.tsx
 *
 * Password gate yang di-share ke semua halaman admin.
 * State unlock disimpan di sessionStorage supaya ga perlu re-enter
 * setiap pindah halaman admin.
 */

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Eye,
  EyeOff,
  FileText,
  FolderGit2,
  HelpCircle,
  Loader2,
  Lock,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import bcrypt from 'bcryptjs';

// Ganti dengan hash dari: node -e "require('bcryptjs').hash('password',12).then(console.log)"
const ADMIN_HASH = '$2b$12$XoKRU2s8/88lyinG8exq1eTIxaSCsSGIKxEXRRbv.YuJJVCZbKVNC';

const SESSION_KEY = 'unix_admin_unlocked_45456546';

const navItems = [
  { href: '/admin/team',     label: 'Team',     icon: Users },
  { href: '/admin/blog',     label: 'Blog',     icon: FileText },
  { href: '/admin/docs',     label: 'Docs',     icon: BookOpen },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/admin/faq',      label: 'FAQ',      icon: HelpCircle },
];

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || loading) return;
    setLoading(true);
    setError(false);

    try {
      const match = await bcrypt.compare(value, ADMIN_HASH);
      if (match) {
        sessionStorage.setItem(SESSION_KEY, '1');
        onUnlock();
      } else {
        setError(true);
        setValue('');
        setTimeout(() => setError(false), 2500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-lg p-8 w-full max-w-sm space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
              <Lock size={22} className="text-accent" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground">Admin Area</h1>
          <p className="text-foreground/50 text-sm">Dev-only  jangan di-deploy ke production</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Password"
              disabled={loading}
              autoFocus
              className={[
                'w-full px-4 py-2.5 pr-10 rounded-lg bg-card border text-sm',
                'text-foreground placeholder-foreground/40',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
                'transition-all disabled:opacity-60',
                error ? 'border-red-500 ring-2 ring-red-500/30' : 'border-border',
              ].join(' ')}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs text-center"
              >
                Password salah. Coba lagi.
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="w-full py-2.5 rounded-lg bg-accent text-brand-dark font-semibold text-sm
                       hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 size={15} className="animate-spin" /> Memverifikasi...</>
            ) : (
              'Masuk'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <aside className="hidden md:block fixed left-4 top-24 z-30 w-52">
        <div className="glass-effect rounded-lg p-3">
          <div className="flex items-center gap-2 px-2 py-2 border-b border-white/[0.06]">
            <ShieldCheck size={15} className="text-accent" />
            <span className="text-xs font-semibold text-accent">Admin Area</span>
          </div>

          <nav className="pt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                    active
                      ? 'bg-accent/10 text-accent'
                      : 'text-foreground/60 hover:text-foreground hover:bg-card',
                  ].join(' ')}
                >
                  <Icon size={15} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="md:pl-60">
        <div className="md:hidden px-4 sm:px-6 lg:px-8 pt-4">
          <div className="glass-effect rounded-lg p-2 overflow-x-auto">
            <nav className="flex min-w-max gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                      active
                        ? 'bg-accent/10 text-accent'
                        : 'text-foreground/60 hover:text-foreground hover:bg-card',
                    ].join(' ')}
                  >
                    <Icon size={14} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    // Check session
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === '1');
  }, []);

  // Avoid flash
  if (unlocked === null) return null;

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return <AdminShell>{children}</AdminShell>;
}
