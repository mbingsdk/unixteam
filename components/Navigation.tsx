'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/documentation', label: 'Docs' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                <span className="text-brand-dark font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline">UNIX-TEAM</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button + Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://discord.gg/unix-team"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-block px-4 py-2 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-colors"
            >
              Join Discord
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-foreground/70 hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://discord.gg/unix-team"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 rounded-lg bg-accent text-brand-dark font-semibold text-sm text-center hover:bg-accent/90 transition-colors mt-4"
                onClick={() => setIsOpen(false)}
              >
                Join Discord
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
