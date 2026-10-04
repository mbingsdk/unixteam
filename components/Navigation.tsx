'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';
import ThemeToggle from './ThemeToggle';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/team', 'Team'],
  ['/projects', 'Projects'],
  ['/blog', 'Blog'],
  ['/documentation', 'Docs'],
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[100] px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto w-full max-w-[1280px] neu-surface rounded-[20px] px-2.5 py-2 sm:rounded-[24px] sm:px-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 pr-2 sm:gap-3 sm:pr-3 cursor-pointer">
            <BrandMark size="sm" priority />
            <div className="min-w-0">
              <div className="truncate text-sm font-bold tracking-[-0.02em] sm:text-base">UNIX-TEAM</div>
              <div className="tech-label hidden sm:block">community node</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-3 xl:ml-4">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={[
                  'cursor-pointer rounded-[14px] px-3 py-2 text-sm font-medium transition-all duration-200',
                  active(href)
                    ? 'text-accent neu-inset'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
          </nav>

          <ThemeToggle className="hidden lg:inline-flex ml-auto" />

          <a
            href="https://discord.gg/Jdqhnyu2dw"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex cursor-pointer rounded-[16px] px-4 py-2 text-sm font-semibold neu-primary transition-all duration-200 hover:-translate-y-0.5"
          >
            Join Discord
          </a>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
            onClick={() => setOpen((v) => !v)}
            className="h-10 w-10 rounded-[14px] neu-button flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden grid grid-cols-2 gap-2 pt-3">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={[
                  'cursor-pointer rounded-[14px] px-3 py-3 text-sm font-medium text-center transition-all duration-200',
                  active(href) ? 'neu-inset text-accent' : 'neu-button',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://discord.gg/Jdqhnyu2dw"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 cursor-pointer rounded-[14px] px-4 py-3 text-center text-sm font-semibold neu-primary"
            >
              Join Discord
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
