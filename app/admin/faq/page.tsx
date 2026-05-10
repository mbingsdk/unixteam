'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Check } from 'lucide-react';
import { useAdminData } from '@/hooks/use-admin-data';
import type { FaqItem } from '@/types';

// ── Helpers ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Gabung & Komunitas',
  'Discord & Server',
  'Kegiatan & Event',
  'Lain-lain',
];

const EMPTY_FORM: Omit<FaqItem, 'id'> = {
  question: '',
  answer: '',
  category: CATEGORIES[0],
};

// ── Form ──────────────────────────────────────────────────────────────────

function FaqForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Omit<FaqItem, 'id'>;
  onSave: (d: Omit<FaqItem, 'id'>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const input =
    'w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all';
  const label = 'block text-xs font-medium text-foreground/60 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Category */}
      <div>
        <label className={label}>Kategori</label>
        <select className={input} value={form.category}
          onChange={(e) => set('category', e.target.value)}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Question */}
      <div>
        <label className={label}>Pertanyaan *</label>
        <input className={input} required
          placeholder="Gimana cara gabung UNIX-TEAM?"
          value={form.question}
          onChange={(e) => set('question', e.target.value)} />
      </div>

      {/* Answer */}
      <div>
        <label className={label}>Jawaban *</label>
        <textarea className={`${input} resize-none`} required rows={4}
          placeholder="Jawaban lengkap dan jelas (atau tidak jelas, sesuai budaya UNIX)..."
          value={form.answer}
          onChange={(e) => set('answer', e.target.value)} />
        <p className="text-xs text-foreground/40 mt-1">
          {form.answer.length} karakter
        </p>
      </div>

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

// ── Card ──────────────────────────────────────────────────────────────────

function FaqCard({
  item, onEdit, onDelete, deleting,
}: {
  item: FaqItem;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-lg overflow-hidden">
      <div
        onClick={() => setExpanded((p) => !p)}
        className="w-full p-4 flex items-start gap-4 text-left hover:bg-accent/5 transition-colors cursor-pointer"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
          {item.id}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">{item.question}</p>
          <span className="text-[10px] font-semibold text-accent mt-0.5 inline-block">
            {item.category}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-2 rounded-lg hover:bg-accent/10 text-foreground/50 hover:text-accent transition-colors">
            <Pencil size={13} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            disabled={deleting}
            className="p-2 rounded-lg hover:bg-red-500/10 text-foreground/50 hover:text-red-400 transition-colors disabled:opacity-50">
            {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 pl-16 text-sm text-foreground/60 leading-relaxed border-t border-border/50">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AdminFaqPage() {
  const { items, loading, saving, error, create, update, remove } =
    useAdminData<FaqItem>('faq');

  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editTarget, setEditTarget] = useState<FaqItem | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [filterCat, setFilterCat] = useState<string>('all');

  const handleCreate = async (data: Omit<FaqItem, 'id'>) => {
    const result = await create(data);
    if (result) setMode('list');
  };

  const handleUpdate = async (data: Omit<FaqItem, 'id'>) => {
    if (!editTarget) return;
    const ok = await update(editTarget.id, data);
    if (ok) { setMode('list'); setEditTarget(null); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin hapus FAQ ini?')) return;
    setDeletingId(id);
    await remove(id);
    setDeletingId(null);
  };

  const filtered = useMemo(
    () => filterCat === 'all' ? items : items.filter((i) => i.category === filterCat),
    [items, filterCat],
  );

  // Group by category for summary
  const categoryCount = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of items) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [items]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">FAQ</h1>
            <p className="text-foreground/50 text-sm mt-1">
              {items.length} pertanyaan · <code className="text-accent">data/faq.json</code>
            </p>
          </div>
          {mode === 'list' && (
            <button onClick={() => setMode('add')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-all">
              <Plus size={16} /> Tambah FAQ
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Category summary chips */}
        {mode === 'list' && !loading && items.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilterCat('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterCat === 'all'
                  ? 'bg-accent text-brand-dark'
                  : 'border border-border text-foreground/60 hover:border-accent'
              }`}>
              Semua ({items.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterCat === cat
                    ? 'bg-accent text-brand-dark'
                    : 'border border-border text-foreground/60 hover:border-accent'
                }`}>
                {cat} ({categoryCount[cat] ?? 0})
              </button>
            ))}
          </div>
        )}

        {/* Form panel */}
        <AnimatePresence>
          {(mode === 'add' || mode === 'edit') && (
            <motion.div key="form" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} className="glass-effect rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold text-foreground mb-5">
                {mode === 'add' ? 'Tambah FAQ Baru' : 'Edit FAQ'}
              </h2>
              <FaqForm
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
          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((item) => (
                <FaqCard key={item.id} item={item}
                  onEdit={() => { setEditTarget(item); setMode('edit'); }}
                  onDelete={() => handleDelete(item.id)}
                  deleting={deletingId === item.id} />
              ))}
            </AnimatePresence>
            {filtered.length === 0 && mode === 'list' && (
              <p className="text-center text-foreground/40 py-12 text-sm">
                {items.length === 0
                  ? 'Belum ada FAQ. Klik "Tambah FAQ" buat mulai.'
                  : 'Tidak ada FAQ di kategori ini.'}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}