'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Check, X, Star } from 'lucide-react';
import { useAdminData } from '@/hooks/use-admin-data';
import type { Project, ProjectStatus } from '@/types';

// ── Helpers ───────────────────────────────────────────────────────────────

const CATEGORIES = ['Tool', 'Library', 'Game', 'Script', 'Other'];
const STATUSES: ProjectStatus[] = ['Active', 'In Development', 'Archived'];

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const EMPTY_FORM: Omit<Project, 'id'> = {
  slug: '',
  title: '',
  description: '',
  category: CATEGORIES[0],
  status: 'Active',
  tags: [],
  featured: false,
  image: '',
  demoUrl: '',
  repoUrl: '',
};

// ── Tag Input ─────────────────────────────────────────────────────────────

function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (t: string[]) => void;
}) {
  const [input, setInput] = useState('');

  const add = () => {
    const t = input.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setInput('');
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          placeholder="Tambah tag (Enter)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); add(); }
          }}
        />
        <button type="button" onClick={add}
          className="px-3 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-all">
          + Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span key={t}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs">
              {t}
              <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))}>
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────

function ProjectForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Omit<Project, 'id'>;
  onSave: (d: Omit<Project, 'id'>) => void;
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
      demoUrl: form.demoUrl || undefined,
      repoUrl: form.repoUrl || undefined,
      image: form.image || undefined,
    });
  };

  const input =
    'w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all';
  const label = 'block text-xs font-medium text-foreground/60 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className={label}>Nama Project *</label>
        <input className={input} required placeholder="SumbingWeatherCompanion"
          value={form.title}
          onChange={(e) => {
            set('title', e.target.value);
            if (!form.slug) set('slug', toSlug(e.target.value));
          }} />
      </div>

      {/* Slug */}
      <div>
        <label className={label}>
          Slug <span className="text-foreground/40 font-normal">(auto dari nama)</span>
        </label>
        <input className={input} placeholder="sumbing-weather-companion" value={form.slug}
          onChange={(e) => set('slug', e.target.value)} />
      </div>

      {/* Category + Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Kategori</label>
          <select className={input} value={form.category}
            onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Status</label>
          <select className={input} value={form.status}
            onChange={(e) => set('status', e.target.value as ProjectStatus)}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={label}>Deskripsi *</label>
        <textarea className={`${input} resize-none`} required rows={3}
          placeholder="Deskripsi singkat project..." value={form.description}
          onChange={(e) => set('description', e.target.value)} />
      </div>

      {/* Tags */}
      <div>
        <label className={label}>Tags / Tech Stack</label>
        <TagInput tags={form.tags} onChange={(t) => set('tags', t)} />
      </div>

      {/* Image */}
      <div>
        <label className={label}>Image path</label>
        <input className={input} placeholder="/images/projects/nama-project.png"
          value={form.image ?? ''} onChange={(e) => set('image', e.target.value)} />
      </div>

      {/* URLs */}
      <div className="space-y-3">
        <div>
          <label className={label}>Demo URL</label>
          <input className={input} placeholder="https://github.com/..."
            value={form.demoUrl ?? ''} onChange={(e) => set('demoUrl', e.target.value)} />
        </div>
        <div>
          <label className={label}>Repo URL</label>
          <input className={input} placeholder="https://github.com/..."
            value={form.repoUrl ?? ''} onChange={(e) => set('repoUrl', e.target.value)} />
        </div>
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <div
          onClick={() => set('featured', !form.featured)}
          className={`w-9 h-5 rounded-full border transition-all flex items-center px-0.5 ${
            form.featured ? 'bg-accent border-accent' : 'bg-card border-border'
          }`}>
          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
            form.featured ? 'translate-x-4' : 'translate-x-0'
          }`} />
        </div>
        <span className="text-sm text-foreground/70">Tampilkan di halaman utama (Featured)</span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg border border-border text-foreground/70 text-sm font-medium hover:border-accent transition-all">
          Batal
        </button>
        <button type="submit" disabled={saving}
          className="flex-1 py-2.5 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
          {saving
            ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</>
            : <><Check size={14} /> Simpan</>}
        </button>
      </div>
    </form>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProjectStatus }) {
  const colors: Record<ProjectStatus, string> = {
    Active:           'bg-green-500/10 text-green-400',
    'In Development': 'bg-yellow-500/10 text-yellow-400',
    Archived:         'bg-gray-500/10 text-gray-400',
  };
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${colors[status]}`}>
      {status}
    </span>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────

function ProjectCard({
  project, onEdit, onDelete, deleting,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-lg p-4 flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
        {project.id}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <p className="font-bold text-foreground text-sm">{project.title}</p>
          <StatusBadge status={project.status} />
          {project.featured && <Star size={11} className="text-accent" />}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-accent">{project.category}</span>
          {project.tags.length > 0 && (
            <>
              <span className="text-xs text-foreground/40">·</span>
              <span className="text-xs text-foreground/40">{project.tags.join(', ')}</span>
            </>
          )}
        </div>
        <p className="text-xs text-foreground/50 line-clamp-1">{project.description}</p>
        <p className="text-xs text-foreground/30 mt-0.5 font-mono">/projects/{project.slug}</p>
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

export default function AdminProjectsPage() {
  const { items, loading, saving, error, create, update, remove } =
    useAdminData<Project>('projects');

  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreate = async (data: Omit<Project, 'id'>) => {
    const result = await create(data);
    if (result) setMode('list');
  };

  const handleUpdate = async (data: Omit<Project, 'id'>) => {
    if (!editTarget) return;
    const ok = await update(editTarget.id, data);
    if (ok) { setMode('list'); setEditTarget(null); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin hapus project ini?')) return;
    setDeletingId(id);
    await remove(id);
    setDeletingId(null);
  };

  // Group by status for display
  const grouped: Record<string, Project[]> = {};
  for (const p of items) {
    if (!grouped[p.status]) grouped[p.status] = [];
    grouped[p.status].push(p);
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-foreground/50 text-sm mt-1">
              {items.length} project · <code className="text-accent">data/projects.json</code>
            </p>
          </div>
          {mode === 'list' && (
            <button onClick={() => setMode('add')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-all">
              <Plus size={16} /> Tambah Project
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
                {mode === 'add' ? 'Tambah Project Baru' : `Edit: ${editTarget?.title}`}
              </h2>
              <ProjectForm
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
              {items.map((project) => (
                <ProjectCard key={project.id} project={project}
                  onEdit={() => { setEditTarget(project); setMode('edit'); }}
                  onDelete={() => handleDelete(project.id)}
                  deleting={deletingId === project.id} />
              ))}
            </AnimatePresence>
            {items.length === 0 && mode === 'list' && (
              <p className="text-center text-foreground/40 py-12 text-sm">
                Belum ada project. Klik "Tambah Project" buat mulai.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}