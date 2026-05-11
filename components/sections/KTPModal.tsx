'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { TeamMember } from '@/types/index';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { RobloxIcon, InstagramIcon, TikTokIcon, DiscordIcon } from '@/components/ui/SocialIcons';
import html2canvas from 'html2canvas-pro';
import QRCode from 'qrcode';

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
        result.push({ type: 'roblox', handle: match[1], icon: RobloxIcon });
      }
    } else if (type === 'instagram' || urlLower.includes('instagram')) {
      const match = url.match(/instagram\.com\/([^/?]+)/) || url.match(/^@?([^@/]+)$/);
      if (match && match[1] && !match[1].match(/^(www|http)/i)) {
        result.push({ type: 'instagram', handle: match[1], icon: InstagramIcon });
      }
    } else if (type === 'tiktok' || urlLower.includes('tiktok')) {
      const match = url.match(/tiktok\.com\/@?([^/?]+)/) || url.match(/^@?([^@/]+)$/);
      if (match && match[1] && !match[1].match(/^(www|http)/i)) {
        result.push({ type: 'tiktok', handle: match[1], icon: TikTokIcon });
      }
    } else if (type === 'discord' || urlLower.includes('discord')) {
      if (url && !url.match(/^(https?:\/\/)?(www\.)?discord\.(com|gg)$/i)) {
        result.push({ type: 'discord', handle: url, icon: DiscordIcon });
      }
    }
  });

  return result;
}

export default function KTPModal({ member, isOpen, onClose }: KTPModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [robloxUsername, setRobloxUsername] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const socials = member ? extractSocialInfo(member.social || {}) : [];
  const robloxSocial = socials.find((social) => social.type === 'roblox');
  const robloxUserId = robloxSocial?.handle || '';
  const robloxProfileUrl = robloxUserId
    ? `https://www.roblox.com/users/${robloxUserId}/profile`
    : '';

  useEffect(() => {
    const generateQr = async () => {
      if (!robloxProfileUrl) {
        setQrDataUrl('');
        return;
      }

      try {
        const dataUrl = await QRCode.toDataURL(robloxProfileUrl, {
          width: 220,
          quality: 0.3,
          margin: 2,
          errorCorrectionLevel: 'M',
          color: {
            dark: '#ffb800',
            light: '#000000',
          },
        });
        setQrDataUrl(dataUrl);
      } catch (error) {
        console.error('Error generating QR:', error);
        setQrDataUrl('');
      }
    };

    generateQr();
  }, [robloxProfileUrl]);

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
    setIsFlipped(false);
  }, [member?.id, isOpen]);

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
      const activeSide = isFlipped ? backRef.current : frontRef.current;
      if (!activeSide) return;

      const rect = activeSide.getBoundingClientRect();
      const exportNode = activeSide.cloneNode(true) as HTMLDivElement;
      exportNode.style.position = 'fixed';
      exportNode.style.left = '-99999px';
      exportNode.style.top = '0';
      exportNode.style.width = `${rect.width}px`;
      exportNode.style.height = `${rect.height}px`;
      exportNode.style.transform = 'none';
      exportNode.style.backfaceVisibility = 'visible';
      exportNode.style.webkitBackfaceVisibility = 'visible';
      document.body.appendChild(exportNode);

      const canvas = await html2canvas(exportNode, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      document.body.removeChild(exportNode);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      const sideLabel = isFlipped ? 'back' : 'front';
      link.download = `KTP-${member.name.replace(/\s+/g, '-')}-${sideLabel}.png`;
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
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Kartu Tanda Pasien</h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center gap-6">
          <div className="w-full aspect-[3.5/2.2] [perspective:1200px]">
            <motion.div
              ref={cardRef}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="relative h-full w-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                ref={frontRef}
                className="absolute inset-0 rounded-2xl overflow-hidden p-3 sm:p-6 flex flex-col justify-between shadow-2xl [backface-visibility:hidden]"
                style={{
                  background: 'linear-gradient(135deg, rgb(10 10 10) 0%, rgb(20 20 20) 100%)',
                  border: '2px solid rgb(38 38 38)',
                }}
              >
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                    <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-md overflow-hidden border border-accent/30 bg-card/40 flex-shrink-0">
                      <Image
                        src="/apple-icon.png"
                        alt="UNIX Logo"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 32px, 40px"
                        priority
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[8px] sm:text-[10px] tracking-[0.16em] sm:tracking-widest font-bold text-accent mb-0.5 sm:mb-1 uppercase opacity-80">
                        Kartu Tanda Pasien
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-accent tracking-wide uppercase">
                        UNIX-TEAM
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[8px] sm:text-[9px] text-foreground/50 font-mono">ID</div>
                    <div className="text-sm sm:text-lg font-bold font-mono text-accent">
                      {robloxUserId.toString().padStart(4, '0')}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-accent/40 to-transparent" />

                <div className="flex items-start gap-3 sm:gap-5">
                  <div className="w-20 sm:w-24 flex-shrink-0 space-y-1.5 sm:space-y-2">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-lg border-2 border-accent/30 bg-card">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="object-cover w-full h-full"
                        loading="eager"
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

                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-sm sm:text-lg font-bold text-foreground leading-tight mb-1 truncate">
                      {member.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-accent font-semibold mb-2 sm:mb-3 truncate">
                      {member.role}
                    </p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {robloxUsername && (
                        <div className="flex items-center justify-start gap-1 px-1.5 sm:px-2 py-1 rounded-md bg-card/60 border border-accent/30 group max-w-full">
                          <RobloxIcon size={12} className="text-accent flex-shrink-0 sm:size-[14px]" />
                          <span className="text-[9px] sm:text-[10px] leading-tight font-semibold text-foreground/80 max-w-[92px] sm:max-w-[120px] truncate" title={robloxUsername}>
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
                              className="flex items-center justify-start gap-1 px-1.5 sm:px-2 py-1 rounded-md bg-card/60 border border-accent/30 max-w-full"
                              title={social.handle}
                            >
                              <Icon size={12} className="text-accent flex-shrink-0 sm:size-[14px]" />
                              <span className="text-[9px] sm:text-[10px] leading-tight font-semibold text-foreground/80 max-w-[92px] sm:max-w-[120px] truncate">
                                {social.handle}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-foreground/50 font-mono">
                  <span>Issued: {currentDate || '--/--/----'}</span>
                  <span className="text-accent font-semibold text-[8px] sm:text-[9px]">Valid Member</span>
                </div>
              </div>

              <div
                ref={backRef}
                className="absolute inset-0 rounded-2xl overflow-hidden p-3 sm:p-6 flex flex-col justify-between shadow-2xl [backface-visibility:hidden]"
                style={{
                  background: 'linear-gradient(135deg, rgb(10 10 10) 0%, rgb(20 20 20) 100%)',
                  border: '2px solid rgb(38 38 38)',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <div>
                    <div className="text-[8px] sm:text-[10px] tracking-[0.16em] sm:tracking-widest font-bold text-accent mb-0.5 sm:mb-1 uppercase opacity-80">
                      Pasien Resmi
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-accent tracking-wide uppercase">UNIX-TEAM</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] sm:text-[9px] text-foreground/50 font-mono">Status</div>
                    <div className="text-xs sm:text-sm font-bold text-accent">AKTIF</div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-accent/40 to-transparent" />

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative h-18 w-18 sm:h-24 sm:w-24 rounded-lg overflow-hidden border border-accent/40 bg-slate-900 p-1.5 flex-shrink-0 shadow-[0_0_18px_rgba(255,184,0,0.25)]">
                    {qrDataUrl ? (
                      <Image src={qrDataUrl} alt="QR Roblox Profile" fill className="object-cover rounded-sm" sizes="(max-width: 640px) 80px, 96px" unoptimized />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-[9px] text-foreground/60">QR</div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] sm:text-[9px] text-foreground/80 leading-relaxed">
                      Komunitas game yang ribut mulu, saling bully, sangat kacau dan menyesatkan.
                    </p>
                    <ul className="mt-1 sm:mt-1.5 space-y-0.5 text-[8px] sm:text-[9px] text-foreground/80">
                      <li>- Tidak ada jabatan: kalau ada ketua, semua adalah ketua.</li>
                      <li>- Bebas berekspresi, berkarya, berinovasi, dan berinteraksi.</li>
                      <li>- Silent leave is our culture: bosan, tinggal cabut.</li>
                      <li>- Bikin nyesel: sudah pasti, gw juga nyesel kok.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-foreground/50 font-mono">
                  <span>UNIX-TEAM COMMUNITY CARD</span>
                  <span className="text-accent font-semibold">BACK SIDE</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full flex gap-2">
            <button
              onClick={() => setIsFlipped((prev) => !prev)}
              className="flex-1 px-4 py-3 rounded-lg border border-accent/40 text-accent font-semibold text-sm hover:bg-accent/10 transition-colors"
            >
              {isFlipped ? 'Lihat Depan' : 'Lihat Belakang'}
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-brand-dark font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
