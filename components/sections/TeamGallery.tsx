'use client';

import { useMemo, useState } from 'react';
import { CreditCard, ExternalLink, Search, User } from 'lucide-react';
import { toast } from 'sonner';
import { teamMembers } from '@/lib/data';
import { RobloxIcon, InstagramIcon, TikTokIcon, DiscordIcon } from '@/components/ui/SocialIcons';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import KTPModal from './KTPModal';
import { TeamMember } from '@/types/index';

export default function TeamGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [ktpMember, setKtpMember] = useState<TeamMember | null>(null);
  const [isKtpOpen, setIsKtpOpen] = useState(false);

  const tags = [...new Set(teamMembers.flatMap((member) => member.tags ?? []))];

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return teamMembers.filter((member) => {
      const matchText = !q
        || member.name.toLowerCase().includes(q)
        || member.role.toLowerCase().includes(q)
        || member.bio.toLowerCase().includes(q)
        || (member.tags ?? []).some((tag) => tag.toLowerCase().includes(q));
      const matchTag = !selectedTag || (member.tags ?? []).includes(selectedTag);
      return matchText && matchTag;
    });
  }, [searchQuery, selectedTag]);

  const { visibleItems, sentinelRef, hasMore } = useInfiniteScroll(filteredMembers, 8);

  const getSocialIcon = (type: string) => {
    if (type === 'roblox') return RobloxIcon;
    if (type === 'instagram') return InstagramIcon;
    if (type === 'tiktok') return TikTokIcon;
    if (type === 'discord') return DiscordIcon;
    return null;
  };

  const profileSlug = (member: TeamMember) =>
    (member.profilePage?.subdomain || member.name)
      .trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  const copyDiscord = async (username: string) => {
    try {
      await navigator.clipboard.writeText(username);
      toast.success('Discord disalin!', { description: username, duration: 2000 });
    } catch {
      toast.error('Gagal nyalin. Coba manual.');
    }
  };

  return (
    <main className="section-wrap py-12 sm:py-16 lg:py-24">
      <div className="page-intro">
        <div>
          <div className="tech-label mb-4">MEMBER DIRECTORY / TEAM</div>
          <h1 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl">
            Orang-orang
            <span className="block text-accent">aneh.</span>
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Kumpulan individu yang entah gimana berhasil bikin sesuatu di antara sesi ribut, AFK, dan keputusan gameplay yang meragukan.
        </p>
      </div>

      <section className="rounded-[28px] p-5 neu-surface md:p-6">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari member, role, bio, atau tag..."
            className="neu-input pr-12"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"/>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => setSelectedTag(null)} className={`neu-chip cursor-pointer ${!selectedTag ? 'neu-chip-active' : ''}`}>Semua</button>
          {tags.map((tag) => (
            <button key={tag} onClick={() => setSelectedTag(tag)} className={`neu-chip cursor-pointer ${selectedTag === tag ? 'neu-chip-active' : ''}`}>
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {visibleItems.map((member, index) => (
          <article key={member.id} className="overflow-hidden rounded-[28px] neu-surface">
            <div className="relative aspect-[4/3] overflow-hidden rounded-b-none bg-secondary">
              <ImageWithFallback
                src={member.image}
                alt={member.name}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                className="object-cover"
                loading={index < 4 ? 'eager' : 'lazy'}
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <User size={58} className="text-accent/35"/>
                  </div>
                }
              />
              <div className="absolute left-3 top-3 rounded-[12px] px-2.5 py-1.5 neu-surface-sm tech-label">
                NODE {String(index + 1).padStart(2,'0')}
              </div>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold tracking-[-0.025em]">{member.name}</h2>
              <p className="mt-1 text-sm font-semibold text-accent">{member.role}</p>
              <p className="mt-3 line-clamp-3 min-h-[60px] text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

              {member.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.tags.map((tag) => (
                    <button key={tag} onClick={() => setSelectedTag(tag)} className="rounded-[10px] px-2 py-1 text-[11px] font-semibold neu-inset">{tag}</button>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border pt-4">
                <button
                  onClick={() => { setKtpMember(member); setIsKtpOpen(true); }}
                  className="neu-button flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[14px] px-3 py-2 text-xs font-semibold"
                >
                  <CreditCard size={13}/> KTP
                </button>

                {member.profilePage?.enabled && (
                  <a
                    href={`https://${profileSlug(member)}.unixteam.my.id`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-button flex flex-1 items-center justify-center gap-2 rounded-[14px] px-3 py-2 text-xs font-semibold"
                  >
                    <ExternalLink size={13}/> Profile
                  </a>
                )}
              </div>

              {member.social && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(member.social).map(([type, handle]) => {
                    const Icon = getSocialIcon(type);
                    if (!Icon) return null;
                    if (type === 'discord') {
                      return (
                        <button
                          key={type}
                          onClick={() => copyDiscord(handle)}
                          className="neu-button flex h-9 w-9 cursor-pointer items-center justify-center rounded-[12px]"
                          title={`Salin Discord: ${handle}`}
                        >
                          <Icon size={14}/>
                        </button>
                      );
                    }
                    return (
                      <a
                        key={type}
                        href={handle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neu-button flex h-9 w-9 items-center justify-center rounded-[12px]"
                        title={type}
                      >
                        <Icon size={14}/>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {!filteredMembers.length && <div className="mt-8 rounded-[24px] p-8 text-center neu-inset text-muted-foreground">Ga ada orang aneh yang cocok.</div>}
      <div ref={sentinelRef} className="py-8 text-center">{hasMore && <span className="tech-label">LOADING MEMBER NODES...</span>}</div>

      <KTPModal member={ktpMember} isOpen={isKtpOpen} onClose={() => { setIsKtpOpen(false); setTimeout(() => setKtpMember(null), 300); }} />
    </main>
  );
}
