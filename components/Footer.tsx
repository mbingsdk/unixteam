'use client';

import Link from 'next/link';
import { RobloxIcon, InstagramIcon, DiscordIcon } from '@/components/ui/SocialIcons';
import { motion } from 'framer-motion';

const footerLinks = [
  {
    title: 'Komunitas',
    links: [
      { label: 'Discord', href: 'https://discord.gg/unix-team' },
      { label: 'Roblox', href: 'https://www.roblox.com/communities/unix-team' },
      { label: 'Instagram', href: 'https://instagram.com/mbingsdk' },
    ],
  },
  {
    title: 'Sumber Daya',
    links: [
      { label: 'Dokumentasi', href: '/documentation' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Tentang Kami',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const socialLinks = [
  {
    icon: RobloxIcon,
    href: 'https://www.roblox.com/communities/unix-team',
    label: 'Roblox',
  },
  {
    icon: InstagramIcon,
    href: 'https://instagram.com/mbingsdk',
    label: 'Instagram',
  },
  {
    icon: DiscordIcon,
    href: 'https://discord.gg/unix-team',
    label: 'Discord',
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                <span className="text-brand-dark font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl">UNIX-TEAM</span>
            </div>
            <p className="text-foreground/60 text-sm">
              Komunitas game tidak sehat dan sangat menyesatkan. Bukan tentang menang, tapi tentang ribut bersama.
            </p>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-foreground mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-foreground/60 hover:text-accent text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-foreground/60 text-sm"
          >
            © {new Date().getFullYear()} UNIX-TEAM. Hak cipta diabaikan bersama.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-card transition-colors duration-200 text-foreground/60 hover:text-accent"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
