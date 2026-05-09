'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { Mail, MessageSquare } from 'lucide-react';
import { RobloxIcon, InstagramIcon } from '@/components/ui/SocialIcons';

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@unixteam.my.id',
    href: 'mailto:contact@unixteam.my.id',
  },
  {
    icon: MessageSquare,
    label: 'Discord',
    value: 'Join Discord buat ribut langsung',
    href: 'https://discord.gg/unix-team',
  },
  {
    icon: RobloxIcon,
    label: 'Roblox',
    value: 'UNIX-TEAM Community',
    href: 'https://www.roblox.com/communities/unix-team',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@unixteam',
    href: 'https://instagram.com/unixteam',
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              Hubungi Kita
            </h1>
            <p className="text-foreground/60 text-lg">
              Ada pertanyaan? Atau mau ribut? Atau cuma iseng? Gas aja, kita dengerin. Mungkin.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <div className="glass-effect rounded-lg p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Kirim Pesan (Dibaca Kalau Sempat)
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="Nama lu siapa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Pesan
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                      placeholder="Mau ngomong apa..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 rounded-lg bg-accent text-brand-dark font-semibold hover:bg-accent/90 transition-all duration-300"
                  >
                    {submitted ? 'Pesan Terkirim!' : 'Kirim Pesan'}
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Methods */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Cara Lain Buat Chat
                  </h2>
                </div>

                {contacts.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="glass-effect rounded-lg p-6 flex items-start gap-4 group hover:border-accent/50 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1">
                          {contact.label}
                        </h3>
                        <p className="text-foreground/60 text-sm">
                          {contact.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}