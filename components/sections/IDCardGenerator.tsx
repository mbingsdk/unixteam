'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Loader2 } from 'lucide-react';
import { teamMembers } from '@/lib/data';
import { TeamMember } from '@/types/index';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { RobloxIcon, InstagramIcon, TikTokIcon, DiscordIcon } from '@/components/ui/SocialIcons';

interface TeamMemberWithUsername extends TeamMember {
  robloxUsername?: string;
}

interface SocialInfo {
  type: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  value: string;
}

function extractSocialInfo(social: Record<string, string>): SocialInfo[] {
  const socials: SocialInfo[] = [];

  // Roblox
  if (social.roblox) {
    const match = social.roblox.match(/\/users\/(\d+)/);
    if (match) {
      socials.push({
        type: 'roblox',
        icon: RobloxIcon,
        value: match[1], // akan di-fetch
      });
    }
  }

  // Instagram
  if (social.instagram && social.instagram !== 'https://instagram.com') {
    const match = social.instagram.match(/instagram\.com\/([^/?]+)/);
    if (match) {
      socials.push({
        type: 'instagram',
        icon: InstagramIcon,
        value: match[1],
      });
    }
  }

  // TikTok
  if (social.tiktok && social.tiktok !== 'https://www.tiktok.com') {
    const match = social.tiktok.match(/tiktok\.com\/@([^/?]+)|tiktok\.com\/([^/?]+)/);
    if (match) {
      socials.push({
        type: 'tiktok',
        icon: TikTokIcon,
        value: match[1] || match[2],
      });
    }
  }

  // Discord
  if (social.discord) {
    socials.push({
      type: 'discord',
      icon: DiscordIcon,
      value: social.discord,
    });
  }

  return socials;
}

function IDCard({ member, index }: { member: TeamMemberWithUsername; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [robloxUsername, setRobloxUsername] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');

  const socials = extractSocialInfo(member.social || {});

  // Set date on client side to avoid hydration mismatch
  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    );
  }, []);

  useEffect(() => {
    const fetchRobloxUsername = async () => {
      const robloxUrl = member.social?.roblox;
      if (!robloxUrl) return;

      const match = robloxUrl.match(/\/users\/(\d+)/);
      if (!match) return;

      const userId = match[1];
      setLoading(true);

      try {
        const response = await fetch(
          `https://discord.mbingsdk.my.id/api/roblox/current-room?id=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setRobloxUsername(data.username || data.data?.username || userId);
        } else {
          setRobloxUsername(userId);
        }
      } catch (error) {
        console.error('[sdkdev] Roblox username fetch error:', error);
        setRobloxUsername(userId);
      } finally {
        setLoading(false);
      }
    };

    fetchRobloxUsername();
  }, [member.social?.roblox]);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `KTP-${member.name.replace(/\s+/g, '-')}.png`;
      link.click();
    } catch (error) {
      console.error('[sdkdev] Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="space-y-4"
    >
      {/* ID Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm mx-auto aspect-[16/10] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700/50 p-6 flex flex-col justify-between"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)
          `,
        }}
      >
        {/* Header - "KTP" Title with Logo */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
              KARTU TANDA
            </h2>
            <p className="text-xs text-cyan-300/80 font-semibold tracking-wider">
              PASIEN UNIX-TEAM
            </p>
          </div>
          {/* Logo */}
          <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-cyan-400/30 bg-slate-700/50">
            <Image
              src="/apple-icon.png"
              alt="UNIX Logo"
              fill
              className="object-cover"
              sizes="48px"
              priority
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-4" />

        {/* Main Content */}
        <div className="flex gap-4 mb-4">
          <div className="w-20 flex-shrink-0 space-y-2">
            {/* Photo */}
            <div className="relative h-20 w-20 rounded-lg overflow-hidden border-2 border-cyan-400/40 bg-slate-700/50">
              <ImageWithFallback
                src={member.image}
                alt={member.name}
                className="object-cover"
                fallback={<div className="text-3xl">👤</div>}
              />
            </div>
            {member.tags && member.tags.length > 0 && (
              <div
                className="text-[10px] px-1.5 py-1 bg-cyan-400/20 text-cyan-300 rounded border border-cyan-400/30 font-semibold text-center leading-tight break-words"
                title={member.tags[0]}
              >
                {member.tags[0]}
              </div>
            )}
          </div>

          {/* Member Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate">
              {member.name}
            </h3>
            <p className="text-xs text-cyan-300 font-semibold mb-1">
              {member.role}
            </p>

          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-3" />

        {/* Social Links */}
        {socials.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {socials.map((social) => {
              const Icon = social.icon;
              const displayValue =
                social.type === 'roblox'
                  ? robloxUsername || 'Loading...'
                  : social.value;

              return (
                <div
                  key={social.type}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-700/50 border border-cyan-400/20 group hover:border-cyan-400/50 transition-all"
                >
                  <Icon size={14} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-[10px] text-cyan-100 font-medium truncate max-w-xs group-hover:text-cyan-300 transition-colors">
                    {displayValue}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer - ID Number & Date */}
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span className="font-mono">ID: {member.id.toString().padStart(4, '0')}</span>
          <span className="font-mono">{currentDate || '--/--/----'}</span>
        </div>
      </div>

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={downloadCard}
        disabled={downloading || loading}
        className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {downloading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Downloading...
          </>
        ) : (
          <>
            <Download size={16} />
            Download KTP
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

export default function IDCardGenerator() {
  const membersWithRoblox: TeamMemberWithUsername[] = teamMembers;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-accent/5">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mb-4"
          >
            Kartu Tanda Pasien UNIX-TEAM
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 text-lg max-w-2xl mx-auto"
          >
            ID Card generator untuk team members. Download sebagai gambar dan kumpulkan semua!
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {membersWithRoblox.map((member, index) => (
            <IDCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

