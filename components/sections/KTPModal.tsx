'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { TeamMember } from '@/types/index';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { RobloxIcon, InstagramIcon, TikTokIcon, DiscordIcon } from '@/components/ui/SocialIcons';
import html2canvas from 'html2canvas-pro';

interface KTPModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ExtractedSocial {
  type: string;
  handle: string;
  icon: React.FC<{ size?: number }>;
}

function extractSocialInfo(social: Record<string, string>): ExtractedSocial[] {
  const result: ExtractedSocial[] = [];

  if (!social || typeof social !== 'object') return result;

  Object.entries(social).forEach(([type, url]) => {
    if (!url || typeof url !== 'string') return;

    const urlLower = url.toLowerCase();

    if (type === 'roblox' || urlLower.includes('roblox')) {
      const match = url.match(/user[s]?[/=](\d+)/i) || url.match(/\/([^/]+)$/);
      if (match && match[1]) {
        result.push({
          type: 'roblox',
          handle: match[1],
          icon: RobloxIcon,
        });
      }
    } else if (type === 'instagram' || urlLower.includes('instagram')) {
      const match =
        url.match(/instagram\.com\/([^/?]+)/) || url.match(/^@?([^@/]+)$/);
      if (match && match[1] && !match[1].match(/^(www|http)/i)) {
        result.push({
          type: 'instagram',
          handle: match[1],
          icon: InstagramIcon,
        });
      }
    } else if (type === 'tiktok' || urlLower.includes('tiktok')) {
      const match = url.match(/tiktok\.com\/@?([^/?]+)/) || url.match(/^@?([^@/]+)$/);
      if (match && match[1] && !match[1].match(/^(www|http)/i)) {
        result.push({
          type: 'tiktok',
          handle: match[1],
          icon: TikTokIcon,
        });
      }
    } else if (type === 'discord' || urlLower.includes('discord')) {
      if (url && !url.match(/^(https?:\/\/)?(www\.)?discord\.(com|gg)$/i)) {
        result.push({
          type: 'discord',
          handle: url,
          icon: DiscordIcon,
        });
      }
    }
  });

  return result;
}

export default function KTPModal({ member, isOpen, onClose }: KTPModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [robloxUsername, setRobloxUsername] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');

  const socials = member ? extractSocialInfo(member.social || {}) : [];
  const robloxSocial = socials.find((social) => social.type === 'roblox');
  const robloxUserId = robloxSocial?.handle || '';

  // Fetch Roblox username
  useEffect(() => {
    if (!isOpen || !member || !robloxUserId) return;

    const fetchRobloxUsername = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://discord.mbingsdk.my.id/api/roblox/current-room?id=${robloxUserId}`
        );
        if (response.ok) {
          const data = await response.json();
          setRobloxUsername(data.username || data.data?.username || robloxUserId);
        } else {
          setRobloxUsername(robloxUserId);
        }
      } catch (error) {
        console.error('Error fetching Roblox username:', error);
        setRobloxUsername(robloxUserId);
      } finally {
        setLoading(false);
      }
    };

    fetchRobloxUsername();
  }, [isOpen, member, robloxUserId]);

  useEffect(() => {
    setRobloxUsername('');
  }, [member?.id, isOpen]);

  // Set date on client side to avoid hydration mismatch
  useEffect(() => {
    if (isOpen) {
      setCurrentDate(
        new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      );
    }
  }, [isOpen]);

  const handleDownload = async () => {
    if (!cardRef.current || !member) return;

    try {
      setDownloading(true);
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `KTP-${member.name.replace(/\s+/g, '-')}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading KTP:', error);
    } finally {
      setDownloading(false);
    }
  };

  if (!isOpen || !member) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-xl overflow-hidden max-w-md w-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Kartu Tanda Pasien</h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* KTP Card */}
        <div className="p-6 flex flex-col items-center gap-6">
          {/* Card Container - Premium Dark Design */}
          <div
            ref={cardRef}
            className="w-full aspect-[3.5/2.2] rounded-2xl overflow-hidden p-6 flex flex-col justify-between relative shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgb(10 10 10) 0%, rgb(20 20 20) 100%)',
              border: '2px solid rgb(38 38 38)',
            }}
          >
            {/* Top Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="relative h-10 w-10 rounded-md overflow-hidden border border-accent/30 bg-card/40 flex-shrink-0">
                  <Image
                    src="/apple-icon.png"
                    alt="UNIX Logo"
                    fill
                    className="object-cover"
                    sizes="40px"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] tracking-widest font-bold text-accent mb-1 uppercase opacity-80">
                    Kartu Tanda Pasien
                  </div>
                  <div className="text-sm font-bold text-accent tracking-wide uppercase">
                    UNIX-TEAM
                  </div>
                </div>
              </div>
              {/* ID Badge */}
              <div className="text-right flex-shrink-0">
                <div className="text-[9px] text-foreground/50 font-mono">ID</div>
                <div className="text-lg font-bold font-mono text-accent">
                  {member.id.toString().padStart(4, '0')}
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div className="h-px bg-gradient-to-r from-accent/40 to-transparent" />

            {/* Main Content */}
            <div className="flex items-center gap-5">
              {/* Photo */}
              <div className="w-24 flex-shrink-0 space-y-2">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-lg border-2 border-accent/30 bg-card">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                  fallback={
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-card/50">
                      👤
                    </div>
                  }
                />
                </div>
                {member.tags && member.tags.length > 0 && (
                  <div
                    className="text-[10px] leading-tight px-2 py-1 rounded-md bg-accent/15 text-accent border border-accent/30 font-semibold text-center break-words"
                    title={member.tags[0]}
                  >
                    {member.tags[0]}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground leading-tight mb-1 truncate">
                  {member.name}
                </h3>
                <p className="text-xs text-accent font-semibold mb-3 truncate">
                  {member.role}
                </p>

                {/* Social Badges Grid */}
                <div className="flex flex-wrap gap-2">
                  {robloxUsername && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-card/60 border border-accent/30 group">
                      <RobloxIcon size={14} className="text-accent flex-shrink-0" />
                      <span className="text-[10px] leading-tight font-semibold text-foreground/80 max-w-[120px] line-clamp-2 break-all" title={robloxUsername}>
                        {robloxUsername}
                      </span>
                    </div>
                  )}
                  {socials
                    .filter((social) => social.type !== 'roblox')
                    .slice(0, 4)
                    .map((social) => {
                    const Icon = social.icon;
                    return (
                      <div
                        key={social.type}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-card/60 border border-accent/30"
                        title={social.handle}
                      >
                        <Icon size={14} className="text-accent flex-shrink-0" />
                        <span className="text-[10px] leading-tight font-semibold text-foreground/80 max-w-[120px] line-clamp-2 break-all">
                          {social.handle}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[9px] text-foreground/50 font-mono">
              <span>Issued: {currentDate || '--/--/----'}</span>
              <span className="text-accent font-semibold">Valid Member</span>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-brand-dark font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {downloading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={18} />
                Download KTP
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
