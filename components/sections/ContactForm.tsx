'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Info, Mail, MessageSquare, Send } from 'lucide-react';
import { RobloxIcon, InstagramIcon } from '@/components/ui/SocialIcons';

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null;

type Status = 'idle' | 'loading' | 'success' | 'error';

const contacts = [
  [Mail, 'Email', 'contact@unixteam.my.id', 'mailto:contact@unixteam.my.id'],
  [MessageSquare, 'Discord', 'Join Discord buat ribut langsung', 'https://discord.gg/Jdqhnyu2dw'],
  [RobloxIcon, 'Roblox', 'UNIX-TEAM Community', 'https://www.roblox.com/communities/unix-team'],
  [InstagramIcon, 'Instagram', '@unixteam', 'https://instagram.com/mbingsdk'],
] as const;

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error');
      setErrorMsg('Form belum terhubung ke server. Hubungi kita lewat Discord atau email.');
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
        setErrorMsg(data?.error || 'Gagal kirim pesan. Coba lagi.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Koneksi bermasalah. Cek internet lalu coba lagi.');
      setStatus('error');
    }
  };

  return (
    <main className="section-wrap py-12 sm:py-16 lg:py-24">
      <div className="page-intro">
        <div>
          <div className="tech-label mb-4">CONTACT BUS / INPUT</div>
          <h1 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl">
            Hubungi kita.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Ada pertanyaan, mau ribut, mau kirim sesuatu, atau cuma pengen memastikan situs ini masih dijaga manusia.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[24px] p-5 neu-surface sm:rounded-[30px] sm:p-6 md:p-8">
          <div className="tech-label mb-5">MESSAGE TERMINAL</div>

          {!FORMSPREE_ENDPOINT && status === 'idle' && (
            <div className="mb-5 flex gap-3 rounded-[18px] p-4 neu-inset">
              <Info size={17} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-muted-foreground">Form pengiriman belum dikonfigurasi. Gunakan kontak langsung di sebelah kanan.</p>
            </div>
          )}

          {status === 'success' ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full neu-inset">
                <CheckCircle2 size={28} className="text-green-600"/>
              </div>
              <h2 className="mt-6 text-2xl font-bold">Pesan terkirim.</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">Kita udah terima pesanmu. Balas? Ntar. Kalau sempat.</p>
              <button onClick={() => setStatus('idle')} className="neu-button mt-6 cursor-pointer rounded-[16px] px-4 py-3 text-sm font-semibold">Kirim lagi</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">Nama</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={status === 'loading'}
                  className="neu-input"
                  placeholder="Nama lu siapa"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={status === 'loading'}
                  className="neu-input"
                  placeholder="email@contoh.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Pesan</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  disabled={status === 'loading'}
                  rows={7}
                  className="neu-input resize-y"
                  placeholder="Tulis aja..."
                />
              </div>

              {status === 'error' && (
                <div className="flex gap-3 rounded-[18px] p-4 text-sm text-red-700 neu-inset">
                  <AlertCircle size={17} className="mt-0.5 shrink-0"/>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="neu-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-[18px] px-6 py-4 font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={17}/>
                {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          )}
        </section>

        <aside className="space-y-4">
          <div className="rounded-[26px] p-6 neu-inset">
            <div className="tech-label mb-2">DIRECT CHANNELS</div>
            <h2 className="text-2xl font-bold tracking-[-0.03em]">Jalur alternatif.</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Kalau form lagi males hidup, kontak langsung biasanya lebih cepat.</p>
          </div>

          {contacts.map(([Icon,label,value,href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex cursor-pointer items-center gap-4 rounded-[22px] p-5 neu-surface transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] neu-inset">
                <Icon size={19} className="text-accent"/>
              </div>
              <div className="min-w-0">
                <div className="tech-label">{label}</div>
                <div className="mt-1 truncate text-sm font-semibold">{value}</div>
              </div>
            </a>
          ))}
        </aside>
      </div>
    </main>
  );
}
