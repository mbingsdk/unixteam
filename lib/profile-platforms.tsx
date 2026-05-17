import type { ComponentType, SVGProps } from 'react';
import {
  Github,
  Globe2,
  Mail,
  Music2,
  Send,
} from 'lucide-react';
import {
  DiscordIcon,
  InstagramIcon,
  TikTokIcon,
  TwitchBrandIcon,
  XIcon,
  YouTubeBrandIcon,
} from '@/components/ui/SocialIcons';

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

export type ProfilePlatformCategory = 'social' | 'games' | 'donation' | 'contact';

export interface ProfilePlatform {
  id: string;
  name: string;
  category: ProfilePlatformCategory;
  inputLabel: string;
  placeholder: string;
  color: string;
  mark: string;
  icon?: ComponentType<IconProps>;
  assetPath?: string;
  workerIcon: string;
  buildUrl: (value: string) => string;
}

export const PROFILE_PLATFORM_CATEGORIES: {
  id: ProfilePlatformCategory;
  label: string;
}[] = [
  { id: 'social', label: 'Sosmed' },
  { id: 'games', label: 'Game' },
  { id: 'donation', label: 'Donasi' },
  { id: 'contact', label: 'Kontak & Link' },
];

function cleanHandle(value: string) {
  return value.trim().replace(/^@+/, '');
}

function encode(value: string) {
  return encodeURIComponent(cleanHandle(value));
}

function fullUrlOr(value: string, fallback: (clean: string) => string) {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return fallback(cleanHandle(trimmed));
}

function searchUrl(query: string, value: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${query} ${cleanHandle(value)}`)}`;
}

type BadgeVariant = 'spark' | 'slash' | 'diamond' | 'coin' | 'cube' | 'wave';

function badgeSvg(mark: string, from: string, to: string, variant: BadgeVariant = 'spark') {
  const accent =
    variant === 'slash' ? '<path d="M54 8 22 56h12L66 8z" fill="rgba(255,255,255,.38)"/>' :
    variant === 'diamond' ? '<path d="M36 8 62 32 36 56 10 32z" fill="rgba(255,255,255,.22)"/>' :
    variant === 'coin' ? '<circle cx="36" cy="32" r="21" fill="rgba(255,255,255,.2)"/><path d="M24 32h24" stroke="rgba(255,255,255,.42)" stroke-width="5" stroke-linecap="round"/>' :
    variant === 'cube' ? '<path d="M18 22 36 12l18 10v20L36 52 18 42z" fill="rgba(255,255,255,.18)"/><path d="M18 22 36 32l18-10M36 32v20" stroke="rgba(255,255,255,.28)" stroke-width="4"/>' :
    variant === 'wave' ? '<path d="M8 40c12-16 25 10 39-5 5-5 9-11 17-12" fill="none" stroke="rgba(255,255,255,.38)" stroke-width="7" stroke-linecap="round"/>' :
    '<path d="M16 44 31 8l5 20 20-8-16 36-5-20z" fill="rgba(255,255,255,.24)"/>';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 64" role="img" aria-hidden="true"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="72" height="64" rx="16" fill="url(#g)"/>${accent}<text x="36" y="38" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="${mark.length > 3 ? 14 : 18}" font-weight="900" fill="white" letter-spacing="-.5">${mark}</text></svg>`;
}

function makeBadgeIcon(mark: string, from: string, to: string, variant: BadgeVariant = 'spark'): ComponentType<IconProps> {
  return function BrandBadgeIcon({ size = 24, width, height, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72 64"
        width={width ?? size}
        height={height ?? size}
        role="img"
        aria-hidden="true"
        {...props}
      >
        <defs>
          <linearGradient id={`g-${mark}`} x1="0" x2="1" y1="0" y2="1">
            <stop stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width="72" height="64" rx="16" fill={`url(#g-${mark})`} />
        {variant === 'slash' && <path d="M54 8 22 56h12L66 8z" fill="rgba(255,255,255,.38)" />}
        {variant === 'diamond' && <path d="M36 8 62 32 36 56 10 32z" fill="rgba(255,255,255,.22)" />}
        {variant === 'coin' && (
          <>
            <circle cx="36" cy="32" r="21" fill="rgba(255,255,255,.2)" />
            <path d="M24 32h24" stroke="rgba(255,255,255,.42)" strokeWidth="5" strokeLinecap="round" />
          </>
        )}
        {variant === 'cube' && (
          <>
            <path d="M18 22 36 12l18 10v20L36 52 18 42z" fill="rgba(255,255,255,.18)" />
            <path d="M18 22 36 32l18-10M36 32v20" stroke="rgba(255,255,255,.28)" strokeWidth="4" />
          </>
        )}
        {variant === 'wave' && <path d="M8 40c12-16 25 10 39-5 5-5 9-11 17-12" fill="none" stroke="rgba(255,255,255,.38)" strokeWidth="7" strokeLinecap="round" />}
        {variant === 'spark' && <path d="M16 44 31 8l5 20 20-8-16 36-5-20z" fill="rgba(255,255,255,.24)" />}
        <text
          x="36"
          y="38"
          textAnchor="middle"
          fontFamily="Inter, Arial, sans-serif"
          fontSize={mark.length > 3 ? 14 : 18}
          fontWeight="900"
          fill="white"
          letterSpacing="-.5"
        >
          {mark}
        </text>
      </svg>
    );
  };
}

const workerSocialIcons = {
  instagram:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#cbd5e1" stroke="none"/></svg>',
  tiktok:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#cbd5e1"><path d="M18.54 7.5a5.75 5.75 0 0 1-3.72-1.64v8.73a5.89 5.89 0 1 1-5.88-5.88c.34 0 .67.03.99.09v3.21a2.74 2.74 0 1 0 1.86 2.59V2h3.1a5.8 5.8 0 0 0 3.65 4.16z"/></svg>',
  x:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#cbd5e1"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zm-1.292 19.494h2.039L6.486 3.24H4.298z"/></svg>',
  youtube:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#cbd5e1" d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.14C19.49 3.55 12 3.55 12 3.55s-7.49 0-9.37.51A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.14c1.88.51 9.37.51 9.37.51s7.49 0 9.37-.51a3.02 3.02 0 0 0 2.13-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8Z"/><path fill="#080808" d="m9.6 15.6 6.23-3.6L9.6 8.4z"/></svg>',
  twitch:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#cbd5e1"><path d="M11.57 4.71h1.72v5.15h-1.72zm4.72 0H18v5.15h-1.71zM6 0 1.71 4.29v15.42h5.15V24l4.28-4.29h3.43L22.29 12V0zm14.57 11.14-3.43 3.43h-3.43l-3 3v-3H6.86V1.71h13.71z"/></svg>',
  discord:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="#cbd5e1"><path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.7 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.31 68.42 68.42 0 0 1-10.84-5.18c.91-.66 1.8-1.34 2.66-2.04a75.35 75.35 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2.04a68.68 68.68 0 0 1-10.85 5.19 77 77 0 0 0 6.89 11.3 105.25 105.25 0 0 0 32.19-16.14c2.63-27.38-4.49-51.12-18.93-72.15ZM42.45 65.69C36.18 65.69 31 59.98 31 52.95s5-12.74 11.43-12.74c6.48 0 11.57 5.76 11.46 12.74 0 7.03-5.03 12.74-11.44 12.74Zm42.24 0c-6.27 0-11.43-5.71-11.43-12.74s5-12.74 11.43-12.74c6.48 0 11.57 5.76 11.46 12.74 0 7.03-5.02 12.74-11.46 12.74Z"/></svg>',
};

export const PROFILE_PLATFORMS: ProfilePlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    inputLabel: 'Username',
    placeholder: 'unixteam',
    color: 'from-pink-500 to-orange-400',
    mark: 'IG',
    icon: InstagramIcon,
    workerIcon: workerSocialIcons.instagram,
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://instagram.com/${encodeURIComponent(clean)}`),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'social',
    inputLabel: 'Username',
    placeholder: '@unixteam',
    color: 'from-cyan-400 to-rose-500',
    mark: 'TT',
    icon: TikTokIcon,
    workerIcon: workerSocialIcons.tiktok,
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://www.tiktok.com/@${encodeURIComponent(clean)}`),
  },
  {
    id: 'x',
    name: 'X / Twitter',
    category: 'social',
    inputLabel: 'Username',
    placeholder: 'unixteam',
    color: 'from-zinc-200 to-zinc-500',
    mark: 'X',
    icon: XIcon,
    workerIcon: workerSocialIcons.x,
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://x.com/${encodeURIComponent(clean)}`),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'social',
    inputLabel: 'Handle / URL',
    placeholder: '@unixteam',
    color: 'from-red-500 to-red-700',
    mark: 'YT',
    icon: YouTubeBrandIcon,
    workerIcon: workerSocialIcons.youtube,
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://www.youtube.com/${clean.startsWith('@') ? clean : `@${encodeURIComponent(clean)}`}`),
  },
  {
    id: 'twitch',
    name: 'Twitch',
    category: 'social',
    inputLabel: 'Username',
    placeholder: 'unixteam',
    color: 'from-violet-500 to-purple-700',
    mark: 'TW',
    icon: TwitchBrandIcon,
    workerIcon: workerSocialIcons.twitch,
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://www.twitch.tv/${encodeURIComponent(clean)}`),
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'social',
    inputLabel: 'Username / invite',
    placeholder: 'unixteam atau discord.gg/...',
    color: 'from-indigo-400 to-blue-600',
    mark: 'DC',
    icon: DiscordIcon,
    workerIcon: workerSocialIcons.discord,
    buildUrl: (value) => fullUrlOr(value, (clean) => clean.includes('discord.gg') ? `https://${clean}` : `https://discord.com/users/${encodeURIComponent(clean)}`),
  },
  {
    id: 'roblox',
    name: 'Roblox',
    category: 'games',
    inputLabel: 'User ID / username',
    placeholder: '8737968881 atau username',
    color: 'from-zinc-100 to-zinc-500',
    mark: 'RBX',
    assetPath: '/svgicons/roblox.svg',
    workerIcon: badgeSvg('RBX', '#f5f5f5', '#737373', 'diamond'),
    buildUrl: (value) => fullUrlOr(value, (clean) => /^\d+$/.test(clean) ? `https://www.roblox.com/users/${clean}/profile` : `https://www.roblox.com/search/users?keyword=${encodeURIComponent(clean)}`),
  },
  {
    id: 'mobile-legends',
    name: 'Mobile Legends',
    category: 'games',
    inputLabel: 'Nickname / ID',
    placeholder: 'nickname atau 12345678',
    color: 'from-sky-400 to-blue-700',
    mark: 'MLBB',
    assetPath: '/svgicons/mobile-legends.svg',
    icon: makeBadgeIcon('MLBB', '#38bdf8', '#1d4ed8', 'diamond'),
    workerIcon: badgeSvg('MLBB', '#38bdf8', '#1d4ed8', 'diamond'),
    buildUrl: (value) => searchUrl('Mobile Legends profile', value),
  },
  {
    id: 'point-blank',
    name: 'Point Blank',
    category: 'games',
    inputLabel: 'Nickname',
    placeholder: 'nickname PB',
    color: 'from-amber-400 to-red-700',
    mark: 'PB',
    assetPath: '/svgicons/point-blank.svg',
    icon: makeBadgeIcon('PB', '#f59e0b', '#b91c1c', 'slash'),
    workerIcon: badgeSvg('PB', '#f59e0b', '#b91c1c', 'slash'),
    buildUrl: (value) => searchUrl('Point Blank player', value),
  },
  {
    id: 'free-fire',
    name: 'Free Fire',
    category: 'games',
    inputLabel: 'Nickname / UID',
    placeholder: 'nickname atau UID',
    color: 'from-orange-400 to-yellow-600',
    mark: 'FF',
    assetPath: '/svgicons/free-fire.svg',
    icon: makeBadgeIcon('FF', '#fb923c', '#ca8a04', 'spark'),
    workerIcon: badgeSvg('FF', '#fb923c', '#ca8a04', 'spark'),
    buildUrl: (value) => searchUrl('Free Fire player', value),
  },
  {
    id: 'valorant',
    name: 'Valorant',
    category: 'games',
    inputLabel: 'Riot ID',
    placeholder: 'name#tag',
    color: 'from-rose-500 to-red-700',
    mark: 'V',
    assetPath: '/svgicons/valorant.svg',
    icon: makeBadgeIcon('V', '#ff4655', '#991b1b', 'slash'),
    workerIcon: badgeSvg('V', '#ff4655', '#991b1b', 'slash'),
    buildUrl: (value) => searchUrl('Valorant tracker', value),
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    category: 'games',
    inputLabel: 'UID',
    placeholder: '800000000',
    color: 'from-cyan-300 to-teal-600',
    mark: 'GI',
    assetPath: '/svgicons/genshin-impact.svg',
    icon: makeBadgeIcon('GI', '#67e8f9', '#0f766e', 'spark'),
    workerIcon: badgeSvg('GI', '#67e8f9', '#0f766e', 'spark'),
    buildUrl: (value) => searchUrl('Genshin Impact UID', value),
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    category: 'games',
    inputLabel: 'Username',
    placeholder: 'username',
    color: 'from-emerald-400 to-lime-700',
    mark: 'MC',
    assetPath: '/svgicons/minecraft.svg',
    icon: makeBadgeIcon('MC', '#34d399', '#4d7c0f', 'cube'),
    workerIcon: badgeSvg('MC', '#34d399', '#4d7c0f', 'cube'),
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://namemc.com/profile/${encodeURIComponent(clean)}`),
  },
  {
    id: 'steam',
    name: 'Steam',
    category: 'games',
    inputLabel: 'Custom ID / URL',
    placeholder: 'unixteam atau full URL',
    color: 'from-slate-300 to-slate-700',
    mark: 'ST',
    assetPath: '/svgicons/steam.svg',
    icon: makeBadgeIcon('ST', '#cbd5e1', '#334155', 'wave'),
    workerIcon: badgeSvg('ST', '#cbd5e1', '#334155', 'wave'),
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://steamcommunity.com/id/${encodeURIComponent(clean)}`),
  },
  {
    id: 'saweria',
    name: 'Saweria',
    category: 'donation',
    inputLabel: 'Username',
    placeholder: 'unixteam',
    color: 'from-yellow-300 to-orange-500',
    mark: 'SW',
    assetPath: '/svgicons/saweria.svg',
    icon: makeBadgeIcon('SW', '#fde047', '#f97316', 'coin'),
    workerIcon: badgeSvg('SW', '#fde047', '#f97316', 'coin'),
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://saweria.co/${encodeURIComponent(clean)}`),
  },
  {
    id: 'sociabuzz',
    name: 'SociaBuzz',
    category: 'donation',
    inputLabel: 'Username',
    placeholder: 'unixteam',
    color: 'from-orange-400 to-red-500',
    mark: 'SB',
    assetPath: '/svgicons/sociabuzz.svg',
    icon: makeBadgeIcon('SB', '#fb923c', '#ef4444', 'wave'),
    workerIcon: badgeSvg('SB', '#fb923c', '#ef4444', 'wave'),
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://sociabuzz.com/${encodeURIComponent(clean)}`),
  },
  {
    id: 'website',
    name: 'Website',
    category: 'contact',
    inputLabel: 'URL',
    placeholder: 'https://example.com',
    color: 'from-cyan-300 to-blue-600',
    mark: 'WEB',
    icon: Globe2,
    workerIcon: badgeSvg('WEB', '#67e8f9', '#2563eb', 'wave'),
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://${clean}`),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'contact',
    inputLabel: 'Username',
    placeholder: 'unixteam',
    color: 'from-zinc-200 to-zinc-700',
    mark: 'GH',
    icon: Github,
    workerIcon: badgeSvg('GH', '#e5e7eb', '#3f3f46', 'diamond'),
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://github.com/${encodeURIComponent(clean)}`),
  },
  {
    id: 'email',
    name: 'Email',
    category: 'contact',
    inputLabel: 'Email',
    placeholder: 'hello@example.com',
    color: 'from-lime-300 to-emerald-600',
    mark: 'MAIL',
    icon: Mail,
    workerIcon: badgeSvg('MAIL', '#bef264', '#059669', 'wave'),
    buildUrl: (value) => value.trim().startsWith('mailto:') ? value.trim() : `mailto:${value.trim()}`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'contact',
    inputLabel: 'Nomor',
    placeholder: '628xxxxxxxxxx',
    color: 'from-green-400 to-emerald-700',
    mark: 'WA',
    icon: Send,
    workerIcon: badgeSvg('WA', '#4ade80', '#047857', 'wave'),
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://wa.me/${clean.replace(/\D/g, '')}`),
  },
  {
    id: 'music',
    name: 'Music',
    category: 'contact',
    inputLabel: 'URL playlist',
    placeholder: 'Spotify / Apple Music URL',
    color: 'from-emerald-300 to-teal-700',
    mark: 'MUSIC',
    icon: Music2,
    workerIcon: badgeSvg('MUSIC', '#6ee7b7', '#0f766e', 'wave'),
    buildUrl: (value) => fullUrlOr(value, (clean) => `https://${clean}`),
  },
];

export function getProfilePlatform(id: string) {
  return PROFILE_PLATFORMS.find((platform) => platform.id === id);
}

export function buildProfileLinkHref(platformId: string, value: string) {
  const platform = getProfilePlatform(platformId);
  if (!platform || !value.trim()) return '#';
  return platform.buildUrl(value);
}
