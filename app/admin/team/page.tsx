'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe2,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useAdminData } from '@/hooks/use-admin-data';
import {
  PROFILE_PLATFORM_CATEGORIES,
  PROFILE_PLATFORMS,
  getProfilePlatform,
} from '@/lib/profile-platforms';
import type { ProfilePlatform } from '@/lib/profile-platforms';
import type { ProfilePageLink, TeamMember, TeamProfilePage } from '@/types';

const AVAILABLE_TAGS = ['DEV', 'CEO-UNIX', 'UNIX-INT', 'CAPABLE', 'SKILLED', 'SEASONED', 'ADVANCED BEGINNER'];

const EMPTY_PROFILE: TeamProfilePage = {
  enabled: false,
  subdomain: '',
  displayName: '',
  bio: '',
  links: [],
};

const EMPTY_FORM: Omit<TeamMember, 'id'> = {
  name: '',
  role: '',
  tags: [],
  bio: '',
  image: '',
  social: { roblox: '', instagram: '', tiktok: '', discord: '' },
  profilePage: EMPTY_PROFILE,
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function toImagePath(name: string) {
  const slug = slugify(name);
  return slug ? `/images/team/${slug}.png` : '';
}

function PlatformMark({
  platform,
  size = 'sm',
}: {
  platform: ProfilePlatform;
  size?: 'xs' | 'sm';
}) {
  if (platform.assetPath) {
    return (
      <span
        className={`shrink-0 grid place-items-center overflow-hidden ${
          size === 'xs' ? 'h-5 w-5' : 'h-6 w-6'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={platform.assetPath}
          alt=""
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </span>
    );
  }

  const Icon = platform.icon;
  if (Icon) return <Icon size={size === 'xs' ? 14 : 15} className="shrink-0" />;

  return (
    <span
      className={`shrink-0 grid place-items-center rounded bg-gradient-to-br ${platform.color} text-white font-black leading-none ${
        size === 'xs'
          ? 'h-5 min-w-6 px-1 text-[8px]'
          : 'h-6 min-w-7 px-1.5 text-[9px]'
      }`}
    >
      {platform.mark}
    </span>
  );
}

function normalizeInitial(initial: Omit<TeamMember, 'id'>) {
  return {
    ...initial,
    profilePage: {
      ...EMPTY_PROFILE,
      displayName: initial.name,
      bio: initial.bio,
      ...initial.profilePage,
      links: initial.profilePage?.links ?? [],
    },
  };
}

function profileLinkFor(profile: TeamProfilePage | undefined, platformId: string) {
  return profile?.links.find((link) => link.platform === platformId);
}

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
  const [form, setForm] = useState(() => normalizeInitial(initial));
  const [tagInput, setTagInput] = useState('');
  const [openProfile, setOpenProfile] = useState(Boolean(initial.profilePage?.enabled));
  const [activeCategory, setActiveCategory] = useState(PROFILE_PLATFORM_CATEGORIES[0].id);

  const selectedPlatforms = useMemo(
    () => new Set((form.profilePage?.links ?? []).map((link) => link.platform)),
    [form.profilePage?.links],
  );

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setSocial = (key: keyof TeamMember['social'], value: string) =>
    setForm((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }));

  const setProfile = (patch: Partial<TeamProfilePage>) =>
    setForm((prev) => ({
      ...prev,
      profilePage: {
        ...EMPTY_PROFILE,
        ...prev.profilePage,
        displayName: prev.profilePage?.displayName || prev.name,
        bio: prev.profilePage?.bio || prev.bio,
        ...patch,
      },
    }));

  const toggleProfile = (enabled: boolean) => {
    setOpenProfile(enabled);
    setProfile({
      enabled,
      subdomain: form.profilePage?.subdomain || slugify(form.name),
      displayName: form.profilePage?.displayName || form.name,
      bio: form.profilePage?.bio || form.bio,
    });
  };

  const toggleTag = (tag: string) =>
    set('tags', form.tags.includes(tag)
      ? form.tags.filter((t) => t !== tag)
      : [...form.tags, tag]);

  const addCustomTag = () => {
    const t = tagInput.trim().toUpperCase();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const toggleProfilePlatform = (platformId: string) => {
    const links = form.profilePage?.links ?? [];
    if (links.some((link) => link.platform === platformId)) {
      setProfile({ links: links.filter((link) => link.platform !== platformId) });
      return;
    }

    setProfile({ links: [...links, { platform: platformId, value: '' }] });
  };

  const setProfileLink = (
    platformId: string,
    patch: Partial<Pick<ProfilePageLink, 'value' | 'zoneId'>>,
  ) => {
    const links = form.profilePage?.links ?? [];
    const nextLinks = links.some((link) => link.platform === platformId)
      ? links.map((link) => link.platform === platformId ? { ...link, ...patch } : link)
      : [...links, { platform: platformId, value: '', ...patch }];
    setProfile({ links: nextLinks });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = {
      ...EMPTY_PROFILE,
      ...form.profilePage,
      subdomain: slugify(form.profilePage?.subdomain || form.name),
      displayName: (form.profilePage?.displayName || form.name).trim(),
      bio: (form.profilePage?.bio || form.bio).trim(),
      links: (form.profilePage?.links ?? [])
        .map((link): ProfilePageLink => ({
          platform: link.platform,
          value: link.value.trim(),
          zoneId: link.zoneId?.trim() || undefined,
          label: link.label?.trim() || undefined,
        }))
        .filter((link) => link.value),
    };

    onSave({
      ...form,
      image: form.image || toImagePath(form.name),
      profilePage: profile,
    });
  };

  const input = 'w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-sm placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all disabled:opacity-60';
  const label = 'block text-xs font-medium text-foreground/60 mb-1.5';
  const filteredPlatforms = PROFILE_PLATFORMS.filter((platform) => platform.category === activeCategory);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="flex gap-2">
          <input className={`${input} flex-1`} placeholder="Tag custom"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag(); } }} />
          <button type="button" onClick={addCustomTag}
            className="px-3 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20">
            Add
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

      <div>
        <label className={label}>Bio *</label>
        <textarea className={`${input} resize-none`} required rows={3}
          placeholder="Deskripsi singkat member..."
          value={form.bio} onChange={(e) => set('bio', e.target.value)} />
      </div>

      <div>
        <label className={label}>
          Image path
          <span className="text-foreground/40 font-normal ml-1">
            kosong = {toImagePath(form.name) || '/images/team/....png'}
          </span>
        </label>
        <input className={input} placeholder="/images/team/mbing-sdk.png"
          value={form.image} onChange={(e) => set('image', e.target.value)} />
      </div>

      <div>
        <label className={`${label} mb-2`}>Social Links lama</label>
        <div className="space-y-2">
          {(
            [
              { key: 'roblox', label: 'Roblox URL', placeholder: 'https://www.roblox.com/users/...' },
              { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
              { key: 'tiktok', label: 'TikTok URL', placeholder: 'https://tiktok.com/@...' },
              { key: 'discord', label: 'Discord Username', placeholder: 'username' },
            ] as const
          ).map(({ key, label: lbl, placeholder }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-foreground/50 w-28 shrink-0">{lbl}</span>
              <input className={`${input} flex-1`} placeholder={placeholder}
                value={form.social?.[key] ?? ''}
                onChange={(e) => setSocial(key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenProfile((value) => !value)}
          className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-white/[0.03] transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className={`h-9 w-9 rounded-lg flex items-center justify-center ${form.profilePage?.enabled ? 'bg-accent text-accent-foreground' : 'bg-white/[0.06] text-foreground/50'}`}>
              <Globe2 size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">Profile page dengan subdomain</p>
              <p className="text-xs text-foreground/45 truncate">
                {form.profilePage?.enabled
                  ? `${slugify(form.profilePage.subdomain || form.name)}.unixteam.my.id`
                  : 'Aktifkan untuk bikin halaman profil link modern.'}
              </p>
            </div>
          </div>
          {openProfile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence initial={false}>
          {openProfile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 space-y-4 border-t border-white/[0.06]">
                <label className="flex items-center justify-between gap-4 rounded-lg bg-card/70 border border-border p-3">
                  <span>
                    <span className="block text-sm font-semibold text-foreground">Aktifkan profile page</span>
                    <span className="block text-xs text-foreground/45">Saat disimpan, API admin akan bikin/update Worker dan Custom Domain untuk subdomain ini.</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={Boolean(form.profilePage?.enabled)}
                    onChange={(e) => toggleProfile(e.target.checked)}
                    className="h-5 w-5 accent-[var(--accent)]"
                  />
                </label>

                {form.profilePage?.enabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={label}>Subdomain *</label>
                        <div className="flex rounded-lg border border-border bg-card focus-within:ring-2 focus-within:ring-accent">
                          <input
                            className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none"
                            required={form.profilePage.enabled}
                            placeholder="mbing"
                            value={form.profilePage.subdomain}
                            onChange={(e) => setProfile({ subdomain: slugify(e.target.value) })}
                          />
                          <span className="px-3 py-2 text-xs text-foreground/40 border-l border-border whitespace-nowrap">.unixteam.my.id</span>
                        </div>
                      </div>
                      <div>
                        <label className={label}>Display Name *</label>
                        <input
                          className={input}
                          required={form.profilePage.enabled}
                          placeholder="Mbing SDK"
                          value={form.profilePage.displayName}
                          onChange={(e) => setProfile({ displayName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={label}>Bio profile *</label>
                      <textarea
                        className={`${input} resize-none`}
                        required={form.profilePage.enabled}
                        rows={2}
                        placeholder="Bio singkat untuk halaman profile..."
                        value={form.profilePage.bio}
                        onChange={(e) => setProfile({ bio: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className={`${label} mb-2`}>Pilih link profile</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {PROFILE_PLATFORM_CATEGORIES.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              activeCategory === category.id
                                ? 'bg-accent text-accent-foreground border-accent'
                                : 'border-border text-foreground/55 hover:text-foreground hover:border-accent/50'
                            }`}
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {filteredPlatforms.map((platform) => {
                          const selected = selectedPlatforms.has(platform.id);
                          return (
                            <button
                              type="button"
                              key={platform.id}
                              onClick={() => toggleProfilePlatform(platform.id)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left border transition-all min-w-0 ${
                                selected
                                  ? 'bg-accent/15 border-accent/60 text-accent'
                                  : 'bg-card border-border text-foreground/65 hover:border-accent/40 hover:text-foreground'
                              }`}
                            >
                              <PlatformMark platform={platform} />
                              <span className="text-xs font-medium truncate">{platform.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {(form.profilePage.links ?? []).length > 0 && (
                      <div className="space-y-2">
                        <label className={label}>Username / ID link aktif</label>
                        {form.profilePage.links.map((link) => {
                          const platform = getProfilePlatform(link.platform);
                          if (!platform) return null;
                          const profileLink = profileLinkFor(form.profilePage, platform.id);
                          const isMobileLegends = platform.id === 'mobile-legends';
                          return (
                            <div key={link.platform} className="flex items-start gap-2">
                              <span className="w-36 shrink-0 flex items-center gap-2 text-xs text-foreground/65">
                                <PlatformMark platform={platform} size="xs" />
                                {platform.name}
                              </span>
                              {isMobileLegends ? (
                                <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    className={input}
                                    placeholder="User ID"
                                    value={profileLink?.value ?? ''}
                                    onChange={(e) => setProfileLink(platform.id, { value: e.target.value })}
                                  />
                                  <input
                                    className={input}
                                    placeholder="Zone ID"
                                    value={profileLink?.zoneId ?? ''}
                                    onChange={(e) => setProfileLink(platform.id, { zoneId: e.target.value })}
                                  />
                                </div>
                              ) : (
                                <input
                                  className={`${input} flex-1`}
                                  placeholder={platform.placeholder}
                                  value={profileLink?.value ?? ''}
                                  onChange={(e) => setProfileLink(platform.id, { value: e.target.value })}
                                />
                              )}
                              <button
                                type="button"
                                onClick={() => toggleProfilePlatform(platform.id)}
                                className="p-2 rounded-lg text-foreground/45 hover:text-red-400 hover:bg-red-500/10"
                                aria-label={`Hapus ${platform.name}`}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
  const profile = member.profilePage;
  const profileSlug = profile?.enabled ? slugify(profile.subdomain || member.name) : '';
  const cloudflareStatus = profile?.cloudflare?.status;

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-lg p-4 flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
        {member.id}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <p className="font-bold text-foreground text-sm">{member.name}</p>
          {member.tags.map((t) => (
            <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-accent/10 text-accent">{t}</span>
          ))}
          {profile?.enabled && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300">
              PROFILE
            </span>
          )}
        </div>
        <p className="text-xs text-accent mb-1">{member.role}</p>
        <p className="text-xs text-foreground/50 line-clamp-1">{member.bio}</p>
        <p className="text-xs text-foreground/30 mt-0.5">{member.image || toImagePath(member.name)}</p>
        {profile?.enabled && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <a
              href={`https://${profileSlug}.unixteam.my.id`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
              rel="noreferrer"
            >
              <ExternalLink size={12} />
              {profileSlug}.unixteam.my.id
            </a>
            {cloudflareStatus && (
              <>
                <span
                  title={profile.cloudflare?.message}
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    cloudflareStatus === 'synced'
                      ? 'bg-emerald-500/10 text-emerald-300'
                      : cloudflareStatus === 'error'
                        ? 'bg-red-500/10 text-red-300'
                        : 'bg-white/[0.06] text-foreground/45'
                  }`}
                >
                  Worker {cloudflareStatus}
                </span>
                {cloudflareStatus === 'error' && profile.cloudflare?.message && (
                  <span className="text-[10px] text-red-300/80">
                    {profile.cloudflare.message}
                  </span>
                )}
              </>
            )}
          </div>
        )}
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

export default function AdminTeamPage() {
  const { items, loading, saving, error, create, update, remove } =
    useAdminData<TeamMember>('team');

  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editTarget, setEditTarget] = useState<TeamMember | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [focusMemberId, setFocusMemberId] = useState<number | null>(null);
  const memberRefs = useRef(new Map<number, HTMLDivElement>());

  useEffect(() => {
    if (focusMemberId === null) return;

    const timer = window.setTimeout(() => {
      memberRefs.current.get(focusMemberId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setFocusMemberId(null);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [focusMemberId]);

  const handleCreate = async (data: Omit<TeamMember, 'id'>) => {
    const result = await create(data);
    if (result) setMode('list');
  };

  const handleUpdate = async (data: Omit<TeamMember, 'id'>) => {
    if (!editTarget) return;
    const ok = await update(editTarget.id, data);
    if (ok) {
      setFocusMemberId(editTarget.id);
      setMode('list');
      setEditTarget(null);
    }
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

  const editInitial = editTarget
    ? (({ id: _id, ...rest }) => normalizeInitial(rest))(editTarget)
    : EMPTY_FORM;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
            <p className="text-foreground/50 text-sm mt-1">
              {items.length} member · Data tersimpan di <code className="text-accent">data/team.json</code>
            </p>
          </div>
          {mode === 'list' && (
            <button onClick={() => setMode('add')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-brand-dark font-semibold text-sm hover:bg-accent/90 transition-all shrink-0">
              <Plus size={16} />
              Tambah Member
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <AnimatePresence>
          {mode === 'add' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-effect rounded-lg p-6 mb-6"
            >
              <h2 className="text-lg font-bold text-foreground mb-5">
                Tambah Member Baru
              </h2>
              <MemberForm
                initial={EMPTY_FORM}
                onSave={handleCreate}
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
              {items.map((member) => (
                <motion.div
                  key={member.id}
                  ref={(node) => {
                    if (node) memberRefs.current.set(member.id, node);
                    else memberRefs.current.delete(member.id);
                  }}
                  layout
                  className="space-y-3 scroll-mt-24"
                >
                  <MemberCard
                    member={member}
                    onEdit={() => startEdit(member)}
                    onDelete={() => handleDelete(member.id)}
                    deleting={deletingId === member.id}
                  />

                  <AnimatePresence>
                    {mode === 'edit' && editTarget?.id === member.id && (
                      <motion.div
                        key={`edit-${member.id}`}
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        className="overflow-hidden"
                      >
                        <div className="glass-effect rounded-lg p-6">
                          <h2 className="text-lg font-bold text-foreground mb-5">
                            Edit: {member.name}
                          </h2>
                          <MemberForm
                            initial={editInitial}
                            onSave={handleUpdate}
                            onCancel={() => { setMode('list'); setEditTarget(null); }}
                            saving={saving}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
