'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import bcrypt from 'bcryptjs';
import ScrollReveal from '@/components/effects/ScrollReveal';

// ── Ganti ini dengan hash dari scripts/generate-hash.mjs ─────────────────────
// Jangan simpan password plaintext di sini
const dskkd = '$2b$12$XoKRU2s8/88lyinG8exq1eTIxaSCsSGIKxEXRRbv.YuJJVCZbKVNC';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  id: string;
  name: string;
  role: string;
  tags: string;
  bio: string;
  image: string;
  roblox: string;
  instagram: string;
  tiktok: string;
  discord: string;
}

const INITIAL: FormData = {
  id: '', name: '', role: '', tags: '', bio: '',
  image: '', roblox: '', instagram: '', tiktok: '', discord: '',
};

function esc(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function generateSnippet(f: FormData): string {
  const tags = f.tags
    ? f.tags.split(',').map((t) => `'${esc(t.trim())}'`).join(', ')
    : '';
  const imagePath =
    f.image || `/images/team/${f.name.toLowerCase().replace(/\s+/g, '-')}.png`;
  const socialLines: string[] = [];
  if (f.roblox)    socialLines.push(`      roblox: '${esc(f.roblox)}',`);
  if (f.instagram) socialLines.push(`      instagram: '${esc(f.instagram)}',`);
  if (f.tiktok)    socialLines.push(`      tiktok: '${esc(f.tiktok)}',`);
  if (f.discord)   socialLines.push(`      discord: '${esc(f.discord)}',`);
  const socialBlock = socialLines.length
    ? `    social: {\n${socialLines.join('\n')}\n    },`
    : `    social: {},`;

  return `  {
    id: '${esc(f.id)}',
    name: '${esc(f.name)}',
    role: '${esc(f.role)}',
    tags: [${tags}],
    bio: '${esc(f.bio)}',
    image: '${esc(imagePath)}',
${socialBlock}
  },`;
}

// ── Password gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    setError(false);

    try {
      // bcrypt.compare — lambat by design (cost factor 12), ini yang bikin brute force susah
      const match = await bcrypt.compare(value, dskkd);

      if (match) {
        onUnlock();
      } else {
        setError(true);
        setValue('');
        setTimeout(() => setError(false), 2500);
      }
    } catch {
      setError(true);
      setValue('');
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
          <p className="text-foreground/50 text-sm">
            Masukkan password buat lanjut
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Password"
              disabled={loading}
              className={`w-full px-4 py-2.5 pr-10 rounded-lg bg-card border text-foreground text-sm
                placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent
                focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed
                ${error ? 'border-red-500 ring-2 ring-red-500/30' : 'border-border'}`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 disabled:pointer-events-none"
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
              <>
                <Loader2 size={15} className="animate-spin" />
                Memverifikasi...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────
function AddMemberForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [copied, setCopied] = useState(false);
  const snippet = generateSnippet(form);
  const set = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [snippet]);

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground ' +
    'placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent ' +
    'focus:border-transparent transition-all text-sm';
  const labelClass = 'block text-xs font-medium text-foreground/60 mb-1.5';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Add Member</h1>
          <p className="text-foreground/60">
            Generator snippet buat tambahin member baru ke{' '}
            <code className="text-accent text-sm">content.ts</code>
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <ScrollReveal>
            <div className="glass-effect rounded-lg p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>ID</label>
                  <input className={inputClass} placeholder="14" value={form.id} onChange={set('id')} />
                </div>
                <div>
                  <label className={labelClass}>Name</label>
                  <input className={inputClass} placeholder="Embul" value={form.name} onChange={set('name')} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Role</label>
                  <input className={inputClass} placeholder="Tukang Ribut" value={form.role} onChange={set('role')} />
                </div>
                <div>
                  <label className={labelClass}>
                    Tags <span className="text-foreground/40 font-normal">(pisah koma)</span>
                  </label>
                  <input className={inputClass} placeholder="CAPABLE, DEV" value={form.tags} onChange={set('tags')} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Gatau pokoknya yang penting ribut"
                  value={form.bio}
                  onChange={set('bio')}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Image path{' '}
                  <span className="text-foreground/40 font-normal">(kosongkan = auto dari nama)</span>
                </label>
                <input
                  className={inputClass}
                  placeholder="/images/team/embul.png"
                  value={form.image}
                  onChange={set('image')}
                />
              </div>

              <div className="space-y-3 pt-1">
                <p className="text-xs font-medium text-foreground/60">Social</p>
                {[
                  { key: 'roblox', label: 'Roblox', placeholder: 'https://www.roblox.com/users/...' },
                  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                  { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/...' },
                  { key: 'discord', label: 'Discord', placeholder: 'username' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-foreground/50 w-20 shrink-0">{label}</span>
                    <input
                      className={inputClass}
                      placeholder={placeholder}
                      value={form[key as keyof FormData]}
                      onChange={set(key as keyof FormData)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Output */}
          <ScrollReveal delay={0.1}>
            <div className="glass-effect rounded-lg p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-foreground/60">Output</p>
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                    copied
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'border-border text-foreground/60 hover:border-accent hover:text-accent'
                  }`}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Disalin!' : 'Salin'}
                </motion.button>
              </div>

              <pre className="flex-1 bg-background rounded-lg p-4 text-xs font-mono text-foreground/80 overflow-x-auto whitespace-pre leading-relaxed border border-border/50">
                {snippet}
              </pre>

              <p className="text-xs text-foreground/40 mt-4 text-center">
                Paste ke array <code className="text-accent">teamMembers</code> di{' '}
                <code className="text-accent">lib/content.ts</code>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ── Page entry point ──────────────────────────────────────────────────────────
export default function AdminAddMemberPage() {
  const [unlocked, setUnlocked] = useState(false);

  return unlocked ? (
    <AddMemberForm />
  ) : (
    <PasswordGate onUnlock={() => setUnlocked(true)} />
  );
}