'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, Eye, EyeOff, Send, Loader2,
  CheckCircle2, AlertCircle, Info,
} from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import {
  RobloxIcon, InstagramIcon, TikTokIcon, DiscordIcon,
} from '@/components/ui/SocialIcons';

// ── Konfigurasi ────────────────────────────────────────────────────────────
const SECRET_CODE = 'unix2026'; // ganti sesuai keinginan
const WEBHOOK_URL  = 'https://discord.com/api/webhooks/1503165898481991820/Cj2THL0uRh34ZRT0bdJ93GK8Trs41BUVHUmKezX__lAp7qOYv4ahVCIo2_EwmrxAjFZo';

// ── Types ──────────────────────────────────────────────────────────────────
interface FormData {
  nama: string;
  role: string;
  bio: string;
  imageUrl: string;
  robloxUsername: string;
  instagramUsername: string;
  tiktokUsername: string;
  discordUsername: string;
}

const EMPTY: FormData = {
  nama: '', role: '', bio: '', imageUrl: '',
  robloxUsername: '', instagramUsername: '',
  tiktokUsername: '', discordUsername: '',
};

// ── Webhook payload ────────────────────────────────────────────────────────
function buildPayload(f: FormData) {
  const clean = (s: string) => s.replace(/^@/, '');

  const robloxLink =
    f.robloxUsername
      ? f.robloxUsername
      : null;

  const instagramLink =
    f.instagramUsername
      ? `https://instagram.com/${clean(f.instagramUsername)}`
      : null;

  const tiktokLink =
    f.tiktokUsername
      ? `https://tiktok.com/@${clean(f.tiktokUsername)}`
      : null;

  const desc = [
    `Nama \`\`\`${f.nama}\`\`\``,
    `Role \`\`\`${f.role}\`\`\``,
    '',
    `Bio`,
    `\`\`\`${f.bio || '(kosong)'}\`\`\``,
    '',
    f.imageUrl
      ? `Image URL\n\`\`\`${f.imageUrl}\`\`\``
      : null,
    '',
    robloxLink
      ? `Roblox\n\`\`\`${f.robloxUsername}\n${robloxLink}\`\`\``
      : null,
    instagramLink
      ? `Instagram\n\`\`\`@${clean(f.instagramUsername)}\n${instagramLink}\`\`\``
      : null,
    tiktokLink
      ? `TikTok\n\`\`\`@${clean(f.tiktokUsername)}\n${tiktokLink}\`\`\``
      : null,
    f.discordUsername
      ? `Discord \`\`\`${f.discordUsername}\`\`\``
      : null,
  ]
    .filter(Boolean)
    .join('\n\n');

  return {
    embeds: [
      {
        title: 'Form Untuk Team di WEB',
        description: desc,
        color: 0xfc7303,
        thumbnail: f.imageUrl
          ? { url: f.imageUrl }
          : undefined,
        footer: {
          text: `Submitted via UNIX-TEAM Join Form • ${new Date().toLocaleString('id-ID')}`,
        },
      },
    ],
  };
}

// ── Password Gate ──────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [show, setShow]   = useState(false);
  const [error, setError] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === SECRET_CODE) return onUnlock();
    setError(true);
    setValue('');
    setTimeout(() => setError(false), 2500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-lg p-10 w-full max-w-sm"
      >
        <div className="text-center mb-8 space-y-3">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10">
              <Lock className="text-accent" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Akses Terbatas</h1>
          <p className="text-foreground/60 text-sm">
            Halaman khusus pendaftar team.<br />
            Minta kode aksesnya di Discord.
          </p>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Kode akses"
              autoFocus
              className={[
                'w-full px-4 py-2 pr-11 rounded-lg bg-card border text-sm',
                'text-foreground placeholder-foreground/50',
                'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all',
                error ? 'border-red-500 ring-2 ring-red-500/30' : 'border-border',
              ].join(' ')}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
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
                className="text-sm text-red-400 text-center"
              >
                Kode salah. Minta yang bener dulu.
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!value.trim()}
            className="w-full px-6 py-3 rounded-lg bg-accent text-brand-dark font-semibold
                       hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Masuk
          </button>
        </form>
      </motion.div>
    </main>
  );
}

// ── Form Utama ─────────────────────────────────────────────────────────────
function JoinForm() {
  const [form, setForm]     = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const set = <K extends keyof FormData>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleBio = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, bio: e.target.value.replace(/[\r\n]+/g, ' ') }));

  const trimAt = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value.replace(/^@/, '') }));

  const isValid = form.nama.trim() && form.role.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(form)),
      });
      if (res.ok || res.status === 204) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      setErrMsg('Gagal kirim. Cek webhook URL atau koneksi internet.');
      setStatus('error');
    }
  };

  const input =
    'w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground ' +
    'placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent ' +
    'focus:border-transparent transition-all disabled:opacity-50';

  const label = 'block text-sm font-medium text-foreground mb-2';

  if (status === 'success') {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-lg p-10 w-full max-w-sm text-center space-y-6"
        >
          <CheckCircle2 size={52} className="text-accent mx-auto" />
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Terkirim!</h2>
            <p className="text-foreground/60 text-sm">
              Data lu udah masuk ke Discord admin. Tunggu review 
              bisa cepet, bisa ntar, bisa ga dibalas. Itu namanya UNIX.
            </p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="w-full px-6 py-3 rounded-lg border border-accent/30 text-accent
                       font-semibold hover:bg-accent/5 transition-all"
          >
            Kirim pendaftaran lain
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">

          <ScrollReveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              Daftar Masuk Team
            </h1>
            <p className="text-foreground/60 text-lg">
              Isi data di bawah. Kalau diterima ya syukur, kalau ditolak ya udah.
            </p>
          </ScrollReveal>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Info Dasar */}
            <ScrollReveal delay={0.1}>
              <div className="glass-effect rounded-lg p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={label}>Nama *</label>
                    <input
                      type="text"
                      value={form.nama}
                      onChange={set('nama')}
                      required
                      placeholder="Nama serah lu dah"
                      className={input}
                    />
                  </div>
                  <div>
                    <label className={label}>Role *</label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={set('role')}
                      required
                      placeholder="Tukang Ribut, AFK Master, dll"
                      className={input}
                    />
                  </div>
                </div>

                <div>
                  <label className={label}>Bio *</label>
                  <textarea
                    value={form.bio}
                    onChange={handleBio}
                    required
                    rows={3}
                    placeholder="Cerita dikit tentang diri lu. Newline otomatis jadi spasi."
                    className={`${input} resize-none`}
                  />
                </div>

                <div>
                  <label className={label}>URL Foto / Gambar</label>
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={set('imageUrl')}
                    placeholder="https://i.imgur.com/contoh.jpg"
                    className={input}
                  />
                  <p className="flex items-start gap-1.5 text-xs text-foreground/40 mt-1.5">
                    <Info size={12} className="mt-0.5 shrink-0" />

                    <span className="flex-1">
                      Upload ke{' '}
                      <a
                        href="https://imgur.com/upload"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        imgur.com
                      </a>{' '}
                      dulu, paste link-nya di sini. Atau kosongin aja lalu kirim di Discord deh.
                    </span>
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Social Media */}
            <ScrollReveal delay={0.2}>
              <div className="glass-effect rounded-lg p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div>
                    <label className={label}>
                      <span className="flex items-center gap-2">
                        <RobloxIcon size={15} className="text-accent" />
                        Roblox Username *
                      </span>
                    </label>
                    <input
                      type="text"
                      value={form.robloxUsername}
                      onChange={set('robloxUsername')}
                      required
                      placeholder="Username Roblox Lu"
                      className={input}
                    />
                  </div>

                  <div>
                    <label className={label}>
                      <span className="flex items-center gap-2">
                        <InstagramIcon size={15} className="text-accent" />
                        Instagram Username
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 text-sm select-none">@</span>
                      <input
                        type="text"
                        value={form.instagramUsername}
                        onChange={trimAt('instagramUsername')}
                        placeholder="usernameIG"
                        className={`${input} pl-7`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={label}>
                      <span className="flex items-center gap-2">
                        <TikTokIcon size={15} className="text-accent" />
                        TikTok Username
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 text-sm select-none">@</span>
                      <input
                        type="text"
                        value={form.tiktokUsername}
                        onChange={trimAt('tiktokUsername')}
                        placeholder="usernameTikTok"
                        className={`${input} pl-7`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={label}>
                      <span className="flex items-center gap-2">
                        <DiscordIcon size={15} className="text-accent" />
                        Discord Username *
                      </span>
                    </label>
                    <input
                      type="text"
                      value={form.discordUsername}
                      onChange={set('discordUsername')}
                      placeholder="username (tanpa #)"
                      className={input}
                    />
                  </div>

                </div>
              </div>
            </ScrollReveal>

            {/* Error */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 text-sm text-destructive bg-destructive/10
                           border border-destructive/20 rounded-lg px-4 py-3"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                {errMsg}
              </motion.div>
            )}

            {/* Submit */}
            <ScrollReveal delay={0.3}>
              <motion.button
                type="submit"
                disabled={!isValid || status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 rounded-lg bg-accent text-brand-dark font-bold text-lg
                           hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <><Loader2 size={20} className="animate-spin" /> Mengirim...</>
                ) : (
                  <><Send size={20} /> Kirim Pendaftaran</>
                )}
              </motion.button>
              <p className="text-center text-xs text-foreground/40 mt-4">
                Data dikirim ke Discord admin untuk direview. Ga ada yang bisa jamin kapan diproses.
              </p>
            </ScrollReveal>

          </form>
        </div>
      </section>
    </main>
  );
}

// ── Page Export ────────────────────────────────────────────────────────────
export default function JoinPage() {
  const [unlocked, setUnlocked] = useState(true);
  return unlocked ? <JoinForm /> : <PasswordGate onUnlock={() => setUnlocked(true)} />;
}