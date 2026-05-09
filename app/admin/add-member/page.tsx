'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';

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
  id: '',
  name: '',
  role: '',
  tags: '',
  bio: '',
  image: '',
  roblox: '',
  instagram: '',
  tiktok: '',
  discord: '',
};

function esc(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function generateSnippet(f: FormData): string {
  const tags = f.tags
    ? f.tags.split(',').map((t) => `'${esc(t.trim())}'`).join(', ')
    : '';

  const imagePath = f.image || `/images/team/${f.name.toLowerCase().replace(/\s+/g, '-')}.png`;

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

export default function AddMemberForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const snippet = generateSnippet(form);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [snippet]);

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm';
  const labelClass = 'block text-xs font-medium text-foreground/60 mb-1.5';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-4xl">

        <ScrollReveal className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Add Member</h1>
          <p className="text-foreground/60">Generator snippet buat tambahin member baru ke <code className="text-accent text-sm">content.ts</code></p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Form */}
          <ScrollReveal>
            <div className="glass-effect rounded-lg p-6 space-y-5">

              {/* ID & Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>ID</label>
                  <input className={inputClass} placeholder="6" value={form.id} onChange={set('id')} />
                </div>
                <div>
                  <label className={labelClass}>Name</label>
                  <input className={inputClass} placeholder="Embul" value={form.name} onChange={set('name')} />
                </div>
              </div>

              {/* Role & Tags */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Role</label>
                  <input className={inputClass} placeholder="Tukang Ribut" value={form.role} onChange={set('role')} />
                </div>
                <div>
                  <label className={labelClass}>Tags <span className="text-foreground/40 font-normal">(pisah koma)</span></label>
                  <input className={inputClass} placeholder="CAPABLE, AFK Legend" value={form.tags} onChange={set('tags')} />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Gatau pokoknya yang penting ribut, kadang suka ngilang tiba-tiba"
                  value={form.bio}
                  onChange={set('bio')}
                />
              </div>

              {/* Image */}
              <div>
                <label className={labelClass}>
                  Image path <span className="text-foreground/40 font-normal">(kosongkan = auto dari nama)</span>
                </label>
                <input
                  className={inputClass}
                  placeholder="/images/team/embul.png"
                  value={form.image}
                  onChange={set('image')}
                />
              </div>

              {/* Social */}
              <div className="space-y-3 pt-1">
                <p className="text-xs font-medium text-foreground/60">Social</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground/50 w-20 shrink-0">Roblox</span>
                  <input className={inputClass} placeholder="https://www.roblox.com/users/..." value={form.roblox} onChange={set('roblox')} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground/50 w-20 shrink-0">Instagram</span>
                  <input className={inputClass} placeholder="https://instagram.com/..." value={form.instagram} onChange={set('instagram')} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground/50 w-20 shrink-0">TikTok</span>
                  <input className={inputClass} placeholder="https://tiktok.com/..." value={form.tiktok} onChange={set('tiktok')} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-foreground/50 w-20 shrink-0">Discord</span>
                  <input className={inputClass} placeholder="mbingsdk" value={form.discord} onChange={set('discord')} />
                </div>
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
                Paste ke array <code className="text-accent">teamMembers</code> di <code className="text-accent">lib/content.ts</code>
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}