'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { teamMembers } from '@/lib/data';
import { Loader2, CreditCard } from 'lucide-react';
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
            Orang-Orang Aneh di Balik UNIX
          </h1>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Kumpulan individu yang entah gimana berhasil bikin sesuatu, di
            antara sesi ribut dan AFK berkepanjangan
          </p>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1} className="mb-12">
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari member..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/40">
                🔍
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  !selectedTag
                    ? 'bg-accent text-brand-dark'
                    : 'bg-card border border-border text-foreground hover:border-accent'
                }`}
              >
                Semua
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-accent text-brand-dark'
                      : 'bg-card border border-border text-foreground hover:border-accent'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleItems.map((member, index) => (
            <ScrollReveal key={member.id} delay={(index % 8) * 0.05}>
              <motion.div
                className="glass-effect rounded-lg overflow-hidden group hover:border-accent/50 transition-all duration-300"
                whileHover={{ y: -8 }}
                layout
              >
                {/* Avatar — tags overlay top-right */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    loading={index < 4 ? 'eager' : 'lazy'}
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                          👤
                        </div>
                      </div>
                    }
                  />

                  {/* Tags — pojok kanan atas */}
                  {member.tags && member.tags.length > 0 && (
                    <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                      {member.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() =>
                            setSelectedTag(selectedTag === tag ? null : tag)
                          }
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm border transition-all duration-200 leading-tight
                            ${selectedTag === tag
                              ? 'bg-accent border-accent text-brand-dark'
                              : 'bg-accent/25 border-accent/50 text-accent hover:bg-accent/50 hover:border-accent hover:text-accent'
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
                  <h3 className="text-lg font-bold text-foreground mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-sm text-accent font-medium mb-2">
                    {member.role}
                  </p>

                  <div className="mb-2">
                    <div
                      className={
                        expandedBio.has(member.id) ? '' : 'h-[42px] overflow-hidden'
                      }
                    >
                      <p className="text-foreground/60 text-sm leading-[21px]">
                        {expandedBio.has(member.id) || !isBioLong(member.bio)
                          ? member.bio
                          : member.bio.slice(0, 65) + '...'}
                      </p>
                    </div>
                    <div className="h-4 mt-0.5">
                      {isBioLong(member.bio) && (
                        <button
                          onClick={() => toggleBio(member.id)}
                          className="text-accent text-xs font-medium hover:underline"
                        >
                          {expandedBio.has(member.id)
                            ? 'Tutup'
                            : 'Lihat lebih'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Social Links + KTP Button */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                    <button
                      onClick={() => handleOpenKTP(member)}
                      className="flex-1 px-3 py-2 rounded-lg bg-accent/10 border border-accent/50 hover:bg-accent hover:text-brand-dark text-accent text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <CreditCard size={16} />
                      KTP
                    </button>
                    {member.social && (
                      <div className="flex gap-1.5">
                        {Object.entries(member.social).map(([type, handle]) => {
                          const Icon = getSocialIcon(type);
                          if (!Icon) return null;

                          if (type === 'discord') {
                            return (
                              <motion.button
                                key={type}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCopyDiscord(handle)}
                                className="p-2 rounded-lg hover:bg-accent/10 text-foreground/60 hover:text-accent transition-all duration-200"
                                title={`Salin username Discord: ${handle}`}
                              >
                                <Icon size={18} />
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
                              className="p-2 rounded-lg hover:bg-accent/10 text-foreground/60 hover:text-accent transition-all duration-200"
                              title={`${type}: ${handle}`}
                            >
                              <Icon size={18} />
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
            <p className="text-foreground/60 text-lg">
              Ga ada orang aneh yang cocok sama filter lu.
            </p>
          </motion.div>
        )}

        {/* Sentinel + loading spinner */}
        <div ref={sentinelRef} className="py-8 flex justify-center">
          {hasMore && (
            <Loader2 size={24} className="animate-spin text-accent/50" />
          )}
        </div>
      </div>

      {/* KTP Modal */}
      <KTPModal member={ktpMember} isOpen={isKtpOpen} onClose={handleCloseKTP} />
    </section>
  );
}
