'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Check, X, Star, StarOff } from 'lucide-react';
import { useAdminData } from '@/hooks/use-admin-data';
import type { BlogPost, BlogSection } from '@/types';

// ── Helpers ───────────────────────────────────────────────────────────────

const CATEGORIES = ['Community', 'Tutorial', 'Strategi', 'Lore', 'Chaos', 'Development', 'Design', 'Other'];

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

const EMPTY_SECTION: BlogSection = { title: '', content: '', code: '', subsections: [] };

const EMPTY_FORM: Omit<BlogPost, 'id'> = {
  slug: '',
  title: '',
  description: '',
  date: today(),
  readingTime: '',
  category: CATEGORIES[0],
  author: 'UNIX-TEAM',
  featured: false,
  image: '',
  sections: [],
};

// ── Sub-components ────────────────────────────────────────────────────────

function SectionEditor({
  sections,
  onChange,
}: {
  sections: BlogSection[];
  onChange: (s: BlogSection[]) => void;
}) {
  const update = (i: number, patch: Partial<BlogSection>) =>
    onChange(sections.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  const addSubsection = (i: number) =>
    update(i, {
      subsections: [...(sections[i].subsections ?? []), { title: '', content: '', code: '' }],
    });

  const updateSub = (si: number, subIdx: number, patch: object) =>
    update(si, {
      subsections: sections[si].subsections?.map((sub, j) =>
        j === subIdx ? { ...sub, ...patch } : sub,
      ),
    });

  const removeSub = (si: number, subIdx: number) =>
    update(si, { subsections: sections[si].subsections?.filter((_, j) => j !== subIdx) });

  const input =
    'w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all';

  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <div key={i} className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-accent">Section {i + 1}</span>
            <button
              type="button"
              onClick={() => onChange(sections.filter((_, idx) => idx !== i))}
              className="text-foreground/40 hover:text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          <input className={input} placeholder="Judul section" value={section.title}
            onChange={(e) => update(i, { title: e.target.value })} />

          <textarea className={`${input} resize-none`} rows={3} placeholder="Konten section"
            value={section.content} onChange={(e) => update(i, { content: e.target.value })} />

          <textarea className={`${input} resize-none font-mono text-xs`} rows={2}
            placeholder="Code block (opsional)" value={section.code ?? ''}
            onChange={(e) => update(i, { code: e.target.value })} />

          {/* Subsections */}
          {section.subsections && section.subsections.length > 0 && (
            <div className="space-y-3 ml-4 border-l border-border pl-4">
              {section.subsections.map((sub, j) => (
                <div key={j} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-foreground/50">Sub {j + 1}</span>
                    <button type="button" onClick={() => removeSub(i, j)}
                      className="text-foreground/40 hover:text-red-400 transition-colors">
                      <X size={12} />
                    </button>
                  </div>
                  <input className={input} placeholder="Judul subsection" value={sub.title}
                    onChange={(e) => updateSub(i, j, { title: e.target.value })} />
                  <textarea className={`${input} resize-none`} rows={2} placeholder="Konten subsection"
                    value={sub.content} onChange={(e) => updateSub(i, j, { content: e.target.value })} />
                  <textarea className={`${input} resize-none font-mono text-xs`} rows={1}
                    placeholder="Code (opsional)" value={sub.code ?? ''}
                    onChange={(e) => updateSub(i, j, { code: e.target.value })} />
                </div>
              ))}
            </div>
          )}

          <button type="button" onClick={() => addSubsection(i)}
            className="text-xs text-accent hover:underline">
            + Tambah subsection
          </button>
        </div>
      ))}

      <button type="button"
        onClick={() => onChange([...sections, { ...EMPTY_SECTION }])}
        className="w-full py-2 rounded-lg border border-dashed border-accent/40 text-accent text-sm hover:bg-accent/5 transition-all">
        + Tambah Section
      </button>
    </div>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────

function BlogForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Omit<BlogPost, 'id'>;
  onSave: (d: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      slug: form.slug || toSlug(form.title),
      sections: form.sections?.map((s) => ({
        ...s,
        code: s.code || undefined,
        subsections: s.subsections?.map((sub) => ({
          ...sub,
          code: sub.code || undefined,
        })),
      })),
    });
  };

  const input =
    'w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all';
  const label = 'block text-xs font-medium text-foreground/60 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title + Slug */}
      <div>
        <label className={label}>Judul *</label>
        <input className={input} required placeholder="Judul artikel..."
          value={form.title}
          onChange={(e) => {
            set('title', e.target.value);
            if (!form.slug) set('slug', toSlug(e.target.value));
          }} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>
            Slug <span className="text-foreground/40 font-normal">(auto dari judul)</span>
          </label>
          <input className={input} placeholder="judul-artikel" value={form.slug}
            onChange={(e) => set('slug', e.target.value)} />
        </div>
        <div>
          <label className={label}>Tanggal</label>
          <input type="date" className={input} value={form.date}
            onChange={(e) => set('date', e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Kategori</label>
          <select className={input} value={form.category}
            onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Author</label>
          <input className={input} placeholder="UNIX-TEAM" value={form.author ?? ''}
            onChange={(e) => set('author', e.target.value)} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={label}>Deskripsi *</label>
        <textarea className={`${input} resize-none`} required rows={2}
          placeholder="Deskripsi singkat artikel..." value={form.description}
          onChange={(e) => set('description', e.target.value)} />
      </div>

      {/* Image */}
      <div>
        <label className={label}>Image path</label>
        <input className={input} placeholder="/images/blog/nama-artikel.png"
          value={form.image ?? ''} onChange={(e) => set('image', e.target.value)} />
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div
            onClick={() => set('featured', !form.featured)}
            className={`w-9 h-5 rounded-full border transition-all flex items-center px-0.5 ${
              form.featured ? 'bg-accent border-accent' : 'bg-card border-border'
            }`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${form.featured ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
          <span className="text-sm text-foreground/70">Featured</span>
        </label>
      </div>

      {/* Sections */}
      <div>
        <label className={`${label} mb-3`}>Sections</label>
        <SectionEditor
          sections={form.sections ?? []}
          onChange={(s) => set('sections', s)}
        />
      </div>

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

// ── Card ──────────────────────────────────────────────────────────────────

function BlogCard({
  post, onEdit, onDelete, deleting,
}: {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-lg p-4 flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
        {post.id}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-bold text-foreground text-sm truncate">{post.title}</p>
          {post.featured && <Star size={12} className="text-accent shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-accent">{post.category}</span>
          <span className="text-xs text-foreground/40">·</span>
          <span className="text-xs text-foreground/40">{post.date}</span>
          <span className="text-xs text-foreground/40">·</span>
          <span className="text-xs text-foreground/40">{post.author}</span>
        </div>
        <p className="text-xs text-foreground/50 line-clamp-1">{post.description}</p>
        <p className="text-xs text-foreground/30 mt-0.5 font-mono">/blog/{post.slug}</p>
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

export default function AdminBlogPage() {
  const { items, loading, saving, error, create, update, remove } =
    useAdminData<BlogPost>('blog');

  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editTarget, setEditTarget] = useState<BlogPost | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreate = async (data: Omit<BlogPost, 'id'>) => {
    const result = await create(data);
    if (result) setMode('list');
  };

  const handleUpdate = async (data: Omit<BlogPost, 'id'>) => {
    if (!editTarget) return;
    const ok = await update(editTarget.id, data);
    if (ok) { setMode('list'); setEditTarget(null); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin hapus post ini?')) return;
    setDeletingId(id);
    await remove(id);
    setDeletingId(null);
  };

  const sorted = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-foreground/50 text-sm mt-1">
              {items.length} artikel · <code className="text-accent">data/blog.json</code>
            </p>
          </div>
          {mode === 'list' && (
            <button onClick={() => setMode('add')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-all">
              <Plus size={16} /> Tambah Post
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <AnimatePresence>
          {(mode === 'add' || mode === 'edit') && (
            <motion.div key="form" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} className="glass-effect rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-foreground mb-5">
                {mode === 'add' ? 'Tambah Post Baru' : `Edit: ${editTarget?.title}`}
              </h2>
              <BlogForm
                initial={editTarget ? { ...editTarget } : EMPTY_FORM}
                onSave={mode === 'add' ? handleCreate : handleUpdate}
                onCancel={() => { setMode('list'); setEditTarget(null); }}
                saving={saving}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-foreground/40 gap-2">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Memuat data...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {sorted.map((post) => (
                <BlogCard key={post.id} post={post}
                  onEdit={() => { setEditTarget(post); setMode('edit'); }}
                  onDelete={() => handleDelete(post.id)}
                  deleting={deletingId === post.id} />
              ))}
            </AnimatePresence>
            {items.length === 0 && mode === 'list' && (
              <p className="text-center text-foreground/40 py-12 text-sm">
                Belum ada post. Klik "Tambah Post" buat mulai.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}