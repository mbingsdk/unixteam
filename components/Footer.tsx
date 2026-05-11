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
    <footer className="relative border-t border-white/[0.06] bg-background/50 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div 
                className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center"
                style={{
                  boxShadow: '0 4px 12px -2px rgba(255, 184, 0, 0.3)'
                }}
              >
                <span className="text-accent-foreground font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl tracking-tight">UNIX-TEAM</span>
            </div>
            <p className="text-foreground/45 text-sm leading-relaxed">
              Komunitas game tidak sehat dan sangat menyesatkan. Bukan tentang menang, tapi tentang ribut bersama.
            </p>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-foreground mb-4 tracking-tight">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/45 hover:text-accent text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-foreground/45 hover:text-accent text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-foreground/40 text-sm"
          >
            © {new Date().getFullYear()} UNIX-TEAM. Hak cipta diabaikan bersama.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl hover:bg-white/[0.06] transition-all duration-200 text-foreground/50 hover:text-accent"
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
