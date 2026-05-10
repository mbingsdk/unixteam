'use client';

/**
 * app/admin/team/page.tsx
 *
 * CRUD lengkap untuk Team Members.
 * Pattern yang sama bisa diduplikasi untuk Blog, Docs, Projects, FAQ.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useAdminData } from '@/hooks/use-admin-data';
import type { TeamMember } from '@/types';

// ── Konstanta ────────────────────────────────────────────────────────────

const AVAILABLE_TAGS = ['DEV', 'CEO-UNIX', 'UNIX-INT', 'CAPABLE', 'SKILLED', 'SEASONED', 'ADVANCED BEGINNER'];

const EMPTY_FORM: Omit<TeamMember, 'id'> = {
  name: '',
  role: '',
  tags: [],
  bio: '',
  image: '',
  social: { roblox: '', instagram: '', tiktok: '', discord: '' },
};

// ── Slug generator ────────────────────────────────────────────────────────

function toImagePath(name: string) {
  if (!name) return '';
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `/images/team/${slug}.png`;
}

// ── Form ──────────────────────────────────────────────────────────────────

function MemberForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Omit<TeamMember, 'id'>;
  onSave: (data: Omit<TeamMember, 'id'>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [tagInput, setTagInput] = useState('');

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setSocial = (key: keyof TeamMember['social'], value: string) =>
    setForm((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));

  const toggleTag = (tag: string) =>
    set('tags', form.tags.includes(tag)
      ? form.tags.filter((t) => t !== tag)
      : [...form.tags, tag]);

  const addCustomTag = () => {
    const t = tagInput.trim().toUpperCase();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, image: form.image || toImagePath(form.name) };
    onSave(data);
  };

  const input = 'w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all disabled:opacity-60';
  const label = 'block text-xs font-medium text-foreground/60 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Nama *</label>
          <input className={input} required placeholder="Mbing SDK"
            value={form.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div>
          <label className={label}>Role *</label>
          <input className={input} required placeholder="Bukan Ketua"
            value={form.role} onChange={(e) => set('role', e.target.value)} />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className={label}>Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {AVAILABLE_TAGS.map((tag) => (
            <button key={tag} type="button" onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                form.tags.includes(tag)
                  ? 'bg-accent text-brand-dark border-accent'
                  : 'border-border text-foreground/60 hover:border-accent'
              }`}>
              {tag}
            </button>
          ))}
        </div>
        {/* Custom tag */}
        <div className="flex gap-2">
          <input className={`${input} flex-1`} placeholder="Tag custom (Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag(); } }} />
          <button type="button" onClick={addCustomTag}
            className="px-3 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20">
            + Add
          </button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {form.tags.map((t) => (
              <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
                {t}
                <button type="button" onClick={() => toggleTag(t)}><X size={10} /></button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bio */}
      <div>
        <label className={label}>Bio *</label>
        <textarea className={`${input} resize-none`} required rows={3}
          placeholder="Deskripsi singkat member..."
          value={form.bio} onChange={(e) => set('bio', e.target.value)} />
      </div>

      {/* Image */}
      <div>
        <label className={label}>
          Image path
          <span className="text-foreground/40 font-normal ml-1">
            (kosong = auto dari nama: {toImagePath(form.name) || '/images/team/....png'})
          </span>
        </label>
        <input className={input} placeholder="/images/team/mbing-sdk.png"
          value={form.image} onChange={(e) => set('image', e.target.value)} />
      </div>

      {/* Social */}
      <div>
        <label className={`${label} mb-2`}>Social Links</label>
        <div className="space-y-2">
          {(
            [
              { key: 'roblox',    label: 'Roblox URL',    placeholder: 'https://www.roblox.com/users/...' },
              { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
              { key: 'tiktok',    label: 'TikTok URL',    placeholder: 'https://tiktok.com/@...' },
              { key: 'discord',   label: 'Discord Username', placeholder: 'username (bukan link)' },
            ] as const
          ).map(({ key, label: lbl, placeholder }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-foreground/50 w-24 shrink-0">{lbl}</span>
              <input className={`${input} flex-1`} placeholder={placeholder}
                value={form.social?.[key] ?? ''}
                onChange={(e) => setSocial(key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg border border-border text-foreground/70 text-sm font-medium hover:border-accent transition-all">
          Batal
        </button>
        <button type="submit" disabled={saving}
          className="flex-1 py-2.5 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
          {saving ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</> : <><Check size={14} /> Simpan</>}
        </button>
      </div>
    </form>
  );
}

// ── Member Card ───────────────────────────────────────────────────────────

function MemberCard({
  member,
  onEdit,
  onDelete,
  deleting,
}: {
  member: TeamMember;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-lg p-4 flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
        {member.id}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-bold text-foreground text-sm">{member.name}</p>
          {member.tags.map((t) => (
            <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent/10 text-accent">{t}</span>
          ))}
        </div>
        <p className="text-xs text-accent mb-1">{member.role}</p>
        <p className="text-xs text-foreground/50 line-clamp-1">{member.bio}</p>
        <p className="text-xs text-foreground/30 mt-0.5">{member.image || toImagePath(member.name)}</p>
      </div>
      <div className="flex gap-1.5 shrink-0">
        <button onClick={onEdit}
          className="p-2 rounded-lg hover:bg-accent/10 text-foreground/50 hover:text-accent transition-colors">
          <Pencil size={14} />
        </button>
        <button onClick={onDelete} disabled={deleting}
          className="p-2 rounded-lg hover:bg-red-500/10 text-foreground/50 hover:text-red-400 transition-colors disabled:opacity-50">
          {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AdminTeamPage() {
  const { items, loading, saving, error, create, update, remove } =
    useAdminData<TeamMember>('team');

  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editTarget, setEditTarget] = useState<TeamMember | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreate = async (data: Omit<TeamMember, 'id'>) => {
    const result = await create(data);
    if (result) setMode('list');
  };

  const handleUpdate = async (data: Omit<TeamMember, 'id'>) => {
    if (!editTarget) return;
    const ok = await update(editTarget.id, data);
    if (ok) { setMode('list'); setEditTarget(null); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin hapus member ini?')) return;
    setDeletingId(id);
    await remove(id);
    setDeletingId(null);
  };

  const startEdit = (member: TeamMember) => {
    setEditTarget(member);
    setMode('edit');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
            <p className="text-foreground/50 text-sm mt-1">
              {items.length} member · Data tersimpan di <code className="text-accent">data/team.json</code>
            </p>
          </div>
          {mode === 'list' && (
            <button onClick={() => setMode('add')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-all">
              <Plus size={16} />
              Tambah Member
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form panel */}
        <AnimatePresence>
          {(mode === 'add' || mode === 'edit') && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-effect rounded-lg p-6 mb-6"
            >
              <h2 className="text-lg font-bold text-foreground mb-5">
                {mode === 'add' ? 'Tambah Member Baru' : `Edit: ${editTarget?.name}`}
              </h2>
              <MemberForm
                initial={editTarget ? { ...editTarget } : EMPTY_FORM}
                onSave={mode === 'add' ? handleCreate : handleUpdate}
                onCancel={() => { setMode('list'); setEditTarget(null); }}
                saving={saving}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-foreground/40 gap-2">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Memuat data...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onEdit={() => startEdit(member)}
                  onDelete={() => handleDelete(member.id)}
                  deleting={deletingId === member.id}
                />
              ))}
            </AnimatePresence>
            {items.length === 0 && mode === 'list' && (
              <p className="text-center text-foreground/40 py-12 text-sm">
                Belum ada member. Klik "Tambah Member" buat mulai.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}