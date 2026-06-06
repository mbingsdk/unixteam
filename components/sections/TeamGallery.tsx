'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { teamMembers } from '@/lib/data';
import { Loader2, CreditCard, Search, User, ExternalLink } from 'lucide-react';
import { RobloxIcon, InstagramIcon, TikTokIcon, DiscordIcon } from '@/components/ui/SocialIcons';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { toast } from 'sonner';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import KTPModal from './KTPModal';
import { TeamMember } from '@/types/index';

export default function TeamGallery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedBio, setExpandedBio] = useState<Set<string>>(new Set());
  const [ktpMember, setKtpMember] = useState<TeamMember | null>(null);
  const [isKtpOpen, setIsKtpOpen] = useState(false);

  const allTags = [...new Set(teamMembers.flatMap((member) => member.tags ?? []))];

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.tags ?? []).some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesTag =
        !selectedTag || (member.tags ?? []).includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const { visibleItems, sentinelRef, hasMore } = useInfiniteScroll(
    filteredMembers,
    8,
  );

  const toggleBio = (memberId: string) => {
    setExpandedBio((prev) => {
      const next = new Set(prev);
      if (next.has(memberId)) next.delete(memberId);
      else next.add(memberId);
      return next;
    });
  };

  const isBioLong = (bio: string) => bio.length > 65;

  const handleCopyDiscord = async (username: string) => {
    try {
      await navigator.clipboard.writeText(username);
      toast.success(`Discord disalin!`, {
        description: username,
        duration: 2000,
      });
    } catch {
      toast.error('Gagal nyalin. Coba manual ya.');
    }
  };

  const handleOpenKTP = (member: TeamMember) => {
    setKtpMember(member);
    setIsKtpOpen(true);
  };

  const handleCloseKTP = () => {
    setIsKtpOpen(false);
    setTimeout(() => setKtpMember(null), 300);
  };

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'roblox':
        return RobloxIcon;
      case 'instagram':
        return InstagramIcon;
      case 'tiktok':
        return TikTokIcon;
      case 'discord':
        return DiscordIcon;
      default:
        return null;
    }
  };

  const profileSlug = (member: TeamMember) =>
    (member.profilePage?.subdomain || member.name)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-4">
            Orang-Orang Aneh di Balik UNIX
          </h1>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto font-medium">
            Kumpulan individu yang entah gimana berhasil bikin sesuatu, di
            antara sesi ribut dan AFK berkepanjangan
          </p>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1} className="mb-12">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari member..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all backdrop-blur-xl text-sm"
                style={{
                  boxShadow: '0 2px 12px -2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                }}
              />
              <Search
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/35 pointer-events-none"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !selectedTag
                    ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20'
                    : 'bg-white/[0.04] border border-white/[0.08] text-foreground/70 hover:bg-white/[0.08] hover:text-foreground'
                }`}
              >
                Semua
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20'
                      : 'bg-white/[0.04] border border-white/[0.08] text-foreground/70 hover:bg-white/[0.08] hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleItems.map((member, index) => (
            <ScrollReveal key={member.id} delay={(index % 8) * 0.05}>
              <motion.div
                className="rounded-3xl overflow-hidden group transition-all duration-300"
                whileHover={{ y: -6 }}
                layout
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Avatar */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/15 to-accent/5 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading={index < 4 ? 'eager' : 'lazy'}
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <User
                          size={64}
                          className="text-accent/25 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    }
                  />

                  {/* Tags */}
                  {member.tags && member.tags.length > 0 && (
                    <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                      {member.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() =>
                            setSelectedTag(selectedTag === tag ? null : tag)
                          }
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xl border transition-all duration-200 leading-tight
                            ${selectedTag === tag
                              ? 'bg-accent border-accent text-accent-foreground'
                              : 'bg-accent/20 border-accent/40 text-accent hover:bg-accent/40 hover:border-accent'
                            }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-foreground mb-0.5 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs text-accent font-semibold mb-2">
                    {member.role}
                  </p>

                  <div className="mb-3">
                    <div
                      className={
                        expandedBio.has(String(member.id)) ? '' : 'h-[40px] overflow-hidden'
                      }
                    >
                      <p className="text-foreground/50 text-xs leading-[20px]">
                        {expandedBio.has(String(member.id)) || !isBioLong(member.bio)
                          ? member.bio
                          : member.bio.slice(0, 65) + '...'}
                      </p>
                    </div>
                    <div className="h-4 mt-0.5">
                      {isBioLong(member.bio) && (
                        <button
                          onClick={() => toggleBio(String(member.id))}
                          className="text-accent text-xs font-medium hover:underline"
                        >
                          {expandedBio.has(String(member.id))
                            ? 'Tutup'
                            : 'Lihat lebih'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Social Links + KTP Button */}
                  <div className="flex items-center gap-1.5 pt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleOpenKTP(member)}
                      className="flex-1 px-2 py-1.5 rounded-lg bg-accent/10 border border-accent/30 hover:bg-accent hover:text-accent-foreground text-accent text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <CreditCard size={13} />
                      KTP
                    </button>
                    {member.profilePage?.enabled && (
                      <a
                        href={`https://${profileSlug(member)}.unixteam.my.id`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-foreground/70 hover:text-accent text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink size={13} />
                        Profile
                      </a>
                    )}
                    {member.social && (
                      <div className="flex gap-0.5">
                        {Object.entries(member.social).map(([type, handle]) => {
                          const Icon = getSocialIcon(type);
                          if (!Icon) return null;

                          // try get value from profilePage.links matching the platform type
                          const displayHandle =
                            member.profilePage?.links?.find((l: any) => l.platform === type)
                              ?.value ?? handle;

                          if (type === 'discord') {
                            return (
                              <motion.button
                                key={type}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCopyDiscord(handle)}
                                className="p-2 rounded-lg hover:bg-white/[0.06] text-foreground/50 hover:text-accent transition-all duration-200"
                                title={`Salin username Discord: ${handle}`}
                              >
                                <Icon size={15} />
                              </motion.button>
                            );
                          }

                          return (
                            <motion.a
                              key={type}
                              href={handle}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg hover:bg-white/[0.06] text-foreground/50 hover:text-accent transition-all duration-200"
                              title={`${type}: ${displayHandle}`}
                            >
                              <Icon size={15} />
                            </motion.a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* No Results */}
        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-foreground/50 text-base">
              Ga ada orang aneh yang cocok sama filter lu.
            </p>
          </motion.div>
        )}

        {/* Sentinel + loading spinner */}
        <div ref={sentinelRef} className="py-8 flex justify-center">
          {hasMore && (
            <Loader2 size={22} className="animate-spin text-accent/50" />
          )}
        </div>
      </div>

      {/* KTP Modal */}
      <KTPModal member={ktpMember} isOpen={isKtpOpen} onClose={handleCloseKTP} />
    </section>
  );
}
