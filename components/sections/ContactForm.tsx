'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { Mail, MessageSquare, Loader2, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { RobloxIcon, InstagramIcon } from '@/components/ui/SocialIcons';

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null;

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
    href: 'https://discord.gg/Jdqhnyu2dw',
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
    href: 'https://instagram.com/mbingsdk',
  },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    // ✅ Kalau Formspree belum di-setup, arahkan ke Discord/email  jangan fake success
    if (!FORMSPREE_ENDPOINT) {
      setStatus('error');
      setErrorMsg(
        'Form belum terhubung ke server. Hubungi kita langsung via Discord atau email di bawah ya.'
      );
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await res.json();
        setErrorMsg(data?.error || 'Gagal kirim pesan. Coba lagi ya.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Koneksi bermasalah. Cek internet terus coba lagi.');
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground ' +
    'placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent ' +
    'focus:border-transparent transition-all disabled:opacity-50';

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

                {/* Banner kalau Formspree belum dikonfigurasi */}
                {!FORMSPREE_ENDPOINT && status === 'idle' && (
                  <div className="flex items-start gap-2 text-sm bg-accent/10 border border-accent/20 rounded-lg px-4 py-3 mb-5">
                    <Info size={16} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-foreground/70">
                      Form pengiriman belum dikonfigurasi. Gunakan kontak langsung di sebelah kanan.
                    </p>
                  </div>
                )}

                {/* Success */}
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <CheckCircle2 className="text-accent" size={48} />
                    <h3 className="text-xl font-bold text-foreground">Pesan Terkirim!</h3>
                    <p className="text-foreground/60 text-sm max-w-xs">
                      Kita udah terima pesanmu. Balas? Ntar. Kalau sempat.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-accent text-sm hover:underline"
                    >
                      Kirim pesan lain
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nama</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={status === 'loading'}
                        className={inputClass}
                        placeholder="Nama lu siapa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={status === 'loading'}
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        disabled={status === 'loading'}
                        rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder="Mau ngomong apa..."
                      />
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                      >
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        {errorMsg}
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'loading' || !FORMSPREE_ENDPOINT}
                      whileHover={{ scale: status === 'loading' || !FORMSPREE_ENDPOINT ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'loading' || !FORMSPREE_ENDPOINT ? 1 : 0.98 }}
                      className="w-full px-6 py-3 rounded-lg bg-accent text-brand-dark font-semibold
                                 hover:bg-accent/90 transition-all duration-300
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        'Kirim Pesan'
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Methods */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Cara Lain Buat Chat</h2>
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
                        <h3 className="font-bold text-foreground mb-1">{contact.label}</h3>
                        <p className="text-foreground/60 text-sm">{contact.value}</p>
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