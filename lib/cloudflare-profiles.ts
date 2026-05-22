import { readFile } from 'fs/promises';
import { extname, join, normalize } from 'path';
import sharp from 'sharp';
import { buildProfileLinkHref, getProfilePlatform } from '@/lib/profile-platforms';
import type { TeamMember, TeamProfilePage } from '@/types';

type CloudflareResult = NonNullable<TeamProfilePage['cloudflare']>;

interface WorkerDomain {
  id: string;
  hostname: string;
  service: string;
  zone_id?: string;
  zone_name?: string;
}

interface CloudflareResponse<T> {
  success: boolean;
  result?: T;
  errors?: { message: string }[];
}

function normalizeSubdomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function workerScriptName(subdomain: string) {
  return `unix-profile-${normalizeSubdomain(subdomain)}`.slice(0, 63);
}

function cfHeaders(contentType = 'application/json') {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) throw new Error('CLOUDFLARE_API_TOKEN belum diset.');

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': contentType,
  };
}

async function cfRequest<T>(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      ...cfHeaders(),
      ...(init.headers ?? {}),
    },
  });

  const json = (await res.json()) as CloudflareResponse<T>;
  if (!res.ok || !json.success) {
    const message = json.errors?.map((error) => error.message).join(', ') || `Cloudflare HTTP ${res.status}`;
    throw new Error(message);
  }

  return json.result as T;
}

async function cfTextRequest(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      ...cfHeaders('application/javascript; charset=utf-8'),
      ...(init.headers ?? {}),
    },
  });

  if (res.ok) return;

  let message = `Cloudflare HTTP ${res.status}`;
  try {
    const json = (await res.json()) as CloudflareResponse<unknown>;
    message = json.errors?.map((error) => error.message).join(', ') || message;
  } catch {
    const text = await res.text();
    if (text) message = text;
  }
  throw new Error(message);
}

function skipped(message: string): CloudflareResult {
  return {
    status: 'skipped',
    message,
    syncedAt: new Date().toISOString(),
  };
}

function errored(message: string): CloudflareResult {
  return {
    status: 'error',
    message,
    syncedAt: new Date().toISOString(),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface RobloxUsernameLookupResponse {
  data?: Array<{
    id?: number;
    name?: string;
    requestedUsername?: string;
  }>;
}

interface MobileLegendsLookupResponse {
  success?: boolean;
  id?: string | number;
  server?: string | number;
  name?: string;
}

interface MobileLegendsProfile {
  userId: string;
  zoneId: string;
  name: string | null;
}

async function resolveRobloxUserId(value: string) {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    const match = trimmed.match(/\/users\/(\d+)/i);
    return match?.[1] ?? null;
  }

  const clean = trimmed.replace(/^@+/, '');
  if (/^\d+$/.test(clean)) {
    return clean;
  }

  try {
    const response = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        usernames: [clean],
        excludeBannedUsers: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Roblox HTTP ${response.status}`);
    }

    const json = (await response.json()) as RobloxUsernameLookupResponse;
    const match = json.data?.find((user) =>
      user.requestedUsername?.toLowerCase() === clean.toLowerCase() ||
      user.name?.toLowerCase() === clean.toLowerCase(),
    );

    if (match?.id) {
      return String(match.id);
    }
  } catch {
    // If Roblox lookup is unavailable, keep a valid fallback instead of breaking sync.
  }

  return null;
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

async function resolveMobileLegendsProfile(value: string, zoneId?: string): Promise<MobileLegendsProfile | null> {
  const userId = value.trim();
  const cleanZoneId = zoneId?.trim() ?? '';
  if (!userId || !cleanZoneId) return null;

  try {
    const response = await fetch(
      `https://api.isan.eu.org/nickname/ml?id=${encodeURIComponent(userId)}&server=${encodeURIComponent(cleanZoneId)}&decode=false`,
    );

    if (!response.ok) {
      throw new Error(`Mobile Legends HTTP ${response.status}`);
    }

    const json = (await response.json()) as MobileLegendsLookupResponse;
    return {
      userId: String(json.id ?? userId),
      zoneId: String(json.server ?? cleanZoneId),
      name: json.success && json.name ? safeDecodeURIComponent(json.name) : null,
    };
  } catch {
    return {
      userId,
      zoneId: cleanZoneId,
      name: null,
    };
  }
}

async function buildWorkerLinkTarget(platformId: string, value: string, robloxUserId?: string | null) {
  if (platformId === 'discord') {
    return {
      copyValue: value.trim(),
    };
  }

  if (platformId === 'roblox') {
    const userId = robloxUserId ?? await resolveRobloxUserId(value);
    if (userId) {
      return {
        href: `roblox://navigation/profile_card?userId=${encodeURIComponent(userId)}`,
        fallbackHref: `https://www.roblox.com/users/${encodeURIComponent(userId)}/profile`,
      };
    }
  }

  return {
    href: buildProfileLinkHref(platformId, value),
  };
}

interface WorkerProfileImage {
  mimeType: string;
  base64: string;
}

function imageMimeType(pathname: string) {
  switch (extname(pathname).toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.png':
      return 'image/png';
    default:
      return null;
  }
}

async function readWorkerProfileImage(member: TeamMember): Promise<WorkerProfileImage | null> {
  const imagePath = member.image?.trim();
  if (!imagePath || /^https?:\/\//i.test(imagePath)) return null;

  const mimeType = imageMimeType(imagePath);
  if (!mimeType) return null;

  const publicRoot = join(process.cwd(), 'public');
  const normalizedRelative = normalize(imagePath.replace(/^\/+/, ''));
  const absolutePath = join(publicRoot, normalizedRelative);

  if (!absolutePath.startsWith(publicRoot)) {
    return null;
  }

  try {
    const file = await readFile(absolutePath);
    return {
      mimeType,
      base64: file.toString('base64'),
    };
  } catch {
    return null;
  }
}

function escapeSvgText(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function splitLines(value: string, maxChars: number, maxLines: number) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    if (current) lines.push(current);
    current = word;

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

async function buildWorkerOgImage(
  member: TeamMember,
  profileImage: WorkerProfileImage | null,
): Promise<WorkerProfileImage | null> {
  if (!profileImage) return null;

  const profile = member.profilePage;
  if (!profile) return null;

  const displayName = escapeSvgText(profile.displayName || member.name);
  const role = escapeSvgText(member.role);
  const primaryTag = escapeSvgText(member.tags?.[0] ?? 'UNIX');
  const bioLines = splitLines(profile.bio || member.bio, 52, 3);
  const imageDataUri = `data:${profileImage.mimeType};base64,${profileImage.base64}`;
  const bioSvg = bioLines
    .map((line, index) => `<tspan x="72" dy="${index === 0 ? 0 : 38}">${escapeSvgText(line)}</tspan>`)
    .join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#080808"/>
          <stop offset="1" stop-color="#15100d"/>
        </linearGradient>
        <linearGradient id="accent" x1="0" x2="1">
          <stop stop-color="#ff9f43"/>
          <stop offset="1" stop-color="#ff7a18"/>
        </linearGradient>
        <linearGradient id="fade" x1="0" x2="1">
          <stop stop-color="#080808"/>
          <stop offset=".5" stop-color="#080808" stop-opacity=".2"/>
          <stop offset="1" stop-color="#080808" stop-opacity="0"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#000000" flood-opacity=".44"/>
        </filter>
        <clipPath id="portrait">
          <rect x="792" y="42" width="336" height="546" rx="30"/>
        </clipPath>
        <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0V42" fill="none" stroke="rgba(255,255,255,.06)"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect width="1200" height="630" fill="url(#grid)"/>
      <path d="M0 0h1200v630H0z" fill="none" stroke="rgba(255,255,255,.08)"/>
      <circle cx="112" cy="96" r="7" fill="#ff9f43"/>
      <text x="136" y="103" fill="#ff9f43" font-size="25" font-family="Arial, sans-serif" font-weight="700">UNIX-TEAM</text>
      <text x="72" y="154" fill="rgba(246,243,238,.42)" font-size="18" font-family="Arial, sans-serif" font-weight="700">PLAYER PROFILE</text>
      <text x="72" y="252" fill="#fffaf4" font-size="68" font-family="Arial, sans-serif" font-weight="700">${displayName}</text>
      <text x="72" y="308" fill="#ffae63" font-size="28" font-family="Arial, sans-serif" font-weight="700">${role}</text>
      <text x="72" y="382" fill="rgba(246,243,238,.72)" font-size="26" font-family="Arial, sans-serif">${bioSvg}</text>
      <rect x="72" y="448" width="176" height="44" rx="8" fill="rgba(255,159,67,.12)" stroke="rgba(255,159,67,.4)"/>
      <text x="92" y="477" fill="#ffae63" font-size="20" font-family="Arial, sans-serif" font-weight="700">${primaryTag}</text>
      <rect x="72" y="530" width="250" height="10" rx="5" fill="url(#accent)"/>
      <g filter="url(#shadow)">
        <rect x="792" y="42" width="336" height="546" rx="30" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)"/>
        <image href="${imageDataUri}" x="792" y="42" width="336" height="546" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)"/>
        <rect x="792" y="42" width="336" height="546" rx="30" fill="url(#fade)"/>
      </g>
    </svg>
  `;

  try {
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    return {
      mimeType: 'image/png',
      base64: png.toString('base64'),
    };
  } catch {
    return null;
  }
}

async function renderWorkerHtml(
  member: TeamMember,
  rootDomain: string,
  profileImage: WorkerProfileImage | null,
  ogImage: WorkerProfileImage | null,
) {
  const profile = member.profilePage;
  if (!profile) throw new Error('Profile page belum tersedia.');

  const subdomain = normalizeSubdomain(profile.subdomain || member.name);
  const displayName = escapeHtml(profile.displayName || member.name);
  const bio = escapeHtml(profile.bio || member.bio);
  const shortBio = escapeHtml(
    splitLines(profile.bio || member.bio, 72, 3).join(' '),
  );
  const hasLongBio = bio !== shortBio;
  const role = escapeHtml(member.role);
  const robloxLink = profile.links?.find((link) => link.platform === 'roblox' && link.value.trim());
  const robloxUserId = robloxLink ? await resolveRobloxUserId(robloxLink.value) : null;
  const pageUrl = `https://${subdomain}.${rootDomain}`;
  const image = escapeHtml(
    profileImage
      ? `${pageUrl}/profile-image`
      : `https://${rootDomain}/apple-icon.png`,
  );
  const ogImageUrl = escapeHtml(
    ogImage
      ? `${pageUrl}/og-image.png`
      : image,
  );
  const tags = (member.tags ?? []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  const activeLinks = (profile.links ?? []).filter((link) => link.value.trim());
  const activeCategories = new Set(
    activeLinks
      .map((link) => getProfilePlatform(link.platform)?.category)
      .filter(Boolean),
  );
  const primaryTag = escapeHtml(member.tags?.[0] ?? 'UNIX');
  const dossierCode = escapeHtml(robloxUserId ?? `UNX-${String(member.id).padStart(4, '0')}`);
  const monogram = escapeHtml(
    (profile.displayName || member.name)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'UN',
  );

  const linkEntries = await Promise.all(
    (profile.links ?? []).map(async (link, index) => {
      const platform = getProfilePlatform(link.platform);
      if (!platform || !link.value.trim()) return null;

      const isMobileLegends = platform.id === 'mobile-legends';
      const mobileLegendsProfile = isMobileLegends
        ? await resolveMobileLegendsProfile(link.value, link.zoneId)
        : null;
      const target = isMobileLegends
        ? null
        : await buildWorkerLinkTarget(platform.id, link.value, platform.id === 'roblox' ? robloxUserId : null);
      const href = target && 'href' in target ? escapeHtml(target.href) : '';
      const fallbackHref = target && 'fallbackHref' in target && target.fallbackHref
        ? escapeHtml(target.fallbackHref)
        : '';
      const copyValue = target && 'copyValue' in target && target.copyValue
        ? escapeHtml(target.copyValue)
        : '';
      const name = escapeHtml(
        isMobileLegends
          ? mobileLegendsProfile?.name || link.label || platform.name
          : link.label || platform.name,
      );
      const value = escapeHtml(link.value);
      const mobileLegendsUserId = escapeHtml(mobileLegendsProfile?.userId ?? link.value.trim());
      const mobileLegendsZoneId = escapeHtml(mobileLegendsProfile?.zoneId ?? link.zoneId?.trim() ?? '');
      const mobileLegendsName = escapeHtml(mobileLegendsProfile?.name ?? 'Nickname belum tersedia');
      const mark = escapeHtml(platform.mark);
      const assetUrl = platform.assetPath
        ? `https://${rootDomain}${platform.assetPath}`
        : '';
      const icon = assetUrl
        ? `<img src="${escapeHtml(assetUrl)}" alt="" loading="lazy" onerror="this.remove();this.parentElement.textContent='${mark}'">`
        : platform.workerIcon || mark;

      const categoryCode =
        platform.category === 'social'
          ? 'SOC'
          : platform.category === 'games'
            ? 'GME'
            : platform.category === 'donation'
              ? 'DON'
              : 'COM';

      return {
        category: platform.category,
        item: `${isMobileLegends
          ? `<button class="link link-${platform.category}" style="--i:${index}" type="button" data-ml-open data-ml-name="${mobileLegendsName}" data-ml-user-id="${mobileLegendsUserId}" data-ml-zone-id="${mobileLegendsZoneId}" aria-label="Buka detail Mobile Legends">`
          : copyValue
          ? `<button class="link link-${platform.category}" style="--i:${index}" type="button" data-copy="${copyValue}" aria-label="Salin ${name}">`
          : `<a class="link link-${platform.category}" style="--i:${index}" href="${href}"${fallbackHref ? ` data-fallback="${fallbackHref}" data-deeplink="true"` : ' target="_blank" rel="noopener noreferrer"'}>`}
          <span class="slot">${String(index + 1).padStart(2, '0')}</span>
          <span class="kind">${categoryCode}</span>
          <span class="icon">${icon}</span>
          <span class="copy">
            <strong>${name}</strong>
            ${isMobileLegends
              ? '<span class="copy-row"><small>Mobile Legends</small><span class="hint">Detail</span></span>'
              : copyValue
                ? `<span class="copy-row"><small>${value}</small><span class="hint">Salin</span></span>`
                : `<small>${value}</small>`}
          </span>
          ${copyValue ? '<span class="hint">Salin</span>' : '<span class="arrow">↗</span>'}
        ${isMobileLegends || copyValue ? '</button>' : '</a>'}`,
      };
    }),
  );

  const tiles = linkEntries
    .filter(Boolean)
    .map((entry) => entry?.item)
    .join('');
  const filterButtons = [
    '<button class="filter active" data-filter="all" type="button">All</button>',
    activeCategories.has('social')
      ? '<button class="filter" data-filter="social" type="button">Sosmed</button>'
      : '',
    activeCategories.has('games')
      ? '<button class="filter" data-filter="games" type="button">Game</button>'
      : '',
    activeCategories.has('donation')
      ? '<button class="filter" data-filter="donation" type="button">Donasi</button>'
      : '',
    activeCategories.has('contact')
      ? '<button class="filter" data-filter="contact" type="button">Kontak</button>'
      : '',
  ].join('');

  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${displayName} | UNIX Profile</title>
  <meta name="description" content="${bio}">
  <link rel="canonical" href="${pageUrl}">
  <meta property="og:type" content="profile">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="UNIX-TEAM">
  <meta property="og:locale" content="id_ID">
  <meta property="og:title" content="${displayName} | UNIX Profile">
  <meta property="og:description" content="${bio}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:image:secure_url" content="${ogImageUrl}">
  <meta property="og:image:type" content="${ogImage?.mimeType ?? profileImage?.mimeType ?? 'image/png'}">
  <meta property="og:image:width" content="${ogImage ? '1200' : '630'}">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Profile ${displayName} dari UNIX-TEAM">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${displayName} | UNIX Profile">
  <meta name="twitter:description" content="${bio}">
  <meta name="twitter:image" content="${ogImageUrl}">
  <meta name="twitter:image:alt" content="Profile ${displayName} dari UNIX-TEAM">
  <meta name="theme-color" content="#0b0908">
  <link rel="icon" href="https://${escapeHtml(rootDomain)}/icon.svg" type="image/svg+xml">
  <link rel="icon" href="https://${escapeHtml(rootDomain)}/icon-dark-32x32.png" sizes="32x32" media="(prefers-color-scheme: dark)">
  <link rel="icon" href="https://${escapeHtml(rootDomain)}/icon-light-32x32.png" sizes="32x32" media="(prefers-color-scheme: light)">
  <link rel="shortcut icon" href="https://${escapeHtml(rootDomain)}/favico.ico">
  <link rel="apple-touch-icon" href="https://${escapeHtml(rootDomain)}/apple-icon.png">
  <style>
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    :root{
      --accent:oklch(0.7 0.2 45);
      --accent-strong:oklch(0.75 0.2 45);
      --accent-soft:oklch(0.7 0.2 45 / .16);
      --accent-border:oklch(0.7 0.2 45 / .48);
      --signal:var(--accent-strong);
      --signal-soft:oklch(0.7 0.2 45 / .14);
      --line:rgba(255,255,255,.08);
      --surface:#080808;
    }
    body{margin:0;min-height:100vh;background:var(--surface);color:#f6f3ee;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    body:before{content:"";position:fixed;inset:0;background:
      linear-gradient(135deg,oklch(0.7 0.2 45 / .16),transparent 34%,rgba(255,255,255,.018)),
      linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);
      background-size:auto,44px 44px,44px 44px;pointer-events:none;animation:grid-drift 18s linear infinite}
    main{position:relative;width:min(100%,1160px);margin:0 auto;padding:clamp(14px,2vw,22px)}
    .shell{overflow:hidden;border:1px solid rgba(255,255,255,.09);border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.025));box-shadow:0 24px 70px rgba(0,0,0,.38);backdrop-filter:blur(18px)}
    .hero{position:relative;min-height:min(58vh,590px);display:flex;align-items:flex-end;overflow:hidden;padding:clamp(20px,4vw,42px)}
    .hero:before{content:"";position:absolute;inset:0;z-index:1;background:
      radial-gradient(ellipse at center,transparent 34%,rgba(8,8,8,.14) 56%,rgba(8,8,8,.58) 100%),
      linear-gradient(90deg,rgba(8,8,8,.98) 0%,rgba(8,8,8,.86) 40%,rgba(8,8,8,.5) 72%,rgba(8,8,8,.88) 100%),
      linear-gradient(180deg,rgba(8,8,8,.28),rgba(8,8,8,.96)),
      radial-gradient(circle at 78% 18%,oklch(0.7 0.2 45 / .18),transparent 34%)}
    .hero:after{content:"";position:absolute;inset:0;z-index:1;box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.02),
      inset 0 0 56px rgba(8,8,8,.42),
      inset 0 0 120px rgba(8,8,8,.24)}
    .hero-scan{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:.22;background:
      repeating-linear-gradient(180deg,rgba(255,255,255,.035) 0 1px,transparent 1px 6px)}
    .hero-sweep{position:absolute;inset:-20% -30%;z-index:1;pointer-events:none;background:
      linear-gradient(110deg,transparent 36%,oklch(0.7 0.2 45 / .12) 48%,transparent 60%);
      animation:sweep 7s linear infinite}
    .hero-frame{position:absolute;inset:16px;z-index:1;border:1px solid rgba(255,255,255,.045);clip-path:polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,24px 100%,0 calc(100% - 24px));pointer-events:none}
    .hero-copy{position:relative;z-index:2;width:min(100%,720px);padding:clamp(16px,2.4vw,24px);border-left:1px solid var(--accent-border);background:linear-gradient(90deg,rgba(8,8,8,.46),rgba(8,8,8,.16));backdrop-filter:blur(10px);clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px));animation:dossier-in .65s both}
    .dossier-top{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:16px}
    .brand{display:inline-flex;align-items:center;gap:10px;color:rgba(246,243,238,.72);font-size:12px;font-weight:800;text-transform:uppercase}
    .brand:before{content:"";width:8px;height:8px;border-radius:999px;background:var(--accent);box-shadow:0 0 18px oklch(0.7 0.2 45 / .55)}
    .brand strong{color:var(--accent)}
    .system-pill{display:inline-flex;align-items:center;gap:7px;padding:6px 9px;border:1px solid var(--accent-border);color:var(--signal);font-size:10px;font-weight:800;text-transform:uppercase;background:rgba(8,8,8,.3);clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))}
    .system-pill:before{content:"";width:5px;height:5px;background:var(--signal);box-shadow:0 0 14px oklch(0.7 0.2 45 / .72)}
    .hero-media{position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;object-position:center 28%;animation:cover-drift 16s ease-in-out infinite alternate}
    .monogram{position:absolute;right:clamp(16px,3vw,28px);bottom:-8px;z-index:2;color:rgba(255,255,255,.05);font-size:min(24vw,240px);line-height:.8;font-weight:900;pointer-events:none}
    h1{margin:18px 0 8px;font-size:clamp(36px,5vw,64px);line-height:.94;letter-spacing:0;max-width:620px}
    .typed-wrap{display:inline}
    .cursor{display:inline-block;width:2px;height:.86em;margin-left:.1em;background:var(--accent-strong);vertical-align:-.08em;animation:cursor-blink 1s steps(1,end) infinite;box-shadow:0 0 14px oklch(0.7 0.2 45 / .48)}
    p{margin:0;color:rgba(246,243,238,.62);line-height:1.58}
    .role{color:var(--accent-strong);font-weight:700;font-size:15px}
    .bio{margin-top:16px;font-size:clamp(14px,1.8vw,17px);max-width:620px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
    .bio.expanded{display:block}
    .bio-toggle{appearance:none;border:0;background:transparent;padding:0;margin-top:8px;color:var(--accent-strong);font:inherit;font-size:12px;font-weight:700;cursor:pointer}
    .tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:18px}
    .tags span{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.045);border-radius:8px;padding:6px 8px;font-size:11px;color:rgba(246,243,238,.72);font-weight:700}
    .hud{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
    .hud-item{min-width:92px;padding:10px 12px;border:1px solid rgba(255,255,255,.08);background:rgba(8,8,8,.34);backdrop-filter:blur(12px);clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));animation:hud-cycle 4.8s ease-in-out infinite}
    .hud-item:nth-child(2){animation-delay:1.6s}
    .hud-item:nth-child(3){animation-delay:3.2s}
    .hud-item small,.hud-item strong{display:block}
    .hud-item small{color:rgba(246,243,238,.4);font-size:10px;font-weight:700;text-transform:uppercase}
    .hud-item strong{margin-top:4px;color:#f6f3ee;font-size:18px;line-height:1;font-weight:800}
    .hero-foot{display:flex;justify-content:flex-start;align-items:center;gap:16px;margin-top:24px;color:rgba(246,243,238,.38);font-size:12px}
    .hero-foot span{padding-right:16px;border-right:1px solid rgba(255,255,255,.1)}
    .hero-foot a,.share{color:var(--accent-strong);text-decoration:none}
    .share{appearance:none;border:0;background:transparent;padding:0;font:inherit;cursor:pointer}
    .rail{position:absolute;right:clamp(16px,3vw,28px);top:clamp(18px,3vw,28px);z-index:2;display:grid;gap:10px;width:min(190px,30vw);animation:rail-in .7s .12s both}
    .rail-item{display:flex;justify-content:space-between;gap:10px;padding:9px 10px;border-top:1px solid rgba(255,255,255,.09);color:rgba(246,243,238,.42);font-size:10px;font-weight:800;text-transform:uppercase}
    .rail-item strong{color:var(--signal);font-weight:800}
    .board{position:relative;padding:clamp(18px,3vw,28px);display:flex;flex-direction:column;gap:18px}
    .board:before{content:"";position:absolute;inset:0;background:
      linear-gradient(90deg,transparent,rgba(255,255,255,.03),transparent),
      linear-gradient(180deg,rgba(255,255,255,.02),transparent 38%);
      pointer-events:none}
    .board-head{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}
    .board-head strong{font-size:20px;text-transform:uppercase}
    .board-head span{color:rgba(246,243,238,.38);font-size:12px}
    .board-head strong:before{content:"";display:inline-block;width:16px;height:2px;margin-right:10px;background:var(--accent);vertical-align:middle;box-shadow:0 0 14px oklch(0.7 0.2 45 / .5)}
    .filters{display:flex;flex-wrap:wrap;gap:6px;width:max-content;max-width:100%;padding:5px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.025)}
    .filter{appearance:none;border:1px solid transparent;background:transparent;color:rgba(246,243,238,.62);border-radius:8px;padding:8px 12px;font:inherit;font-size:12px;font-weight:700;cursor:pointer;transition:.18s ease}
    .filter:hover,.filter.active{border-color:var(--accent-border);background:var(--accent-soft);color:var(--accent-strong);box-shadow:0 0 24px oklch(0.7 0.2 45 / .12)}
    .grid{position:relative;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
    .grid:before{content:"";position:absolute;inset:-10px;pointer-events:none;border:1px solid rgba(255,255,255,.035);clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,20px 100%,0 calc(100% - 20px))}
    .link{position:relative;aspect-ratio:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px;padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,.085);background:rgba(255,255,255,.038);color:#f6f3ee;font:inherit;text-align:center;text-decoration:none;transition:.2s ease;cursor:pointer;animation:module-in .55s both;animation-delay:calc(var(--i) * 55ms + .12s)}
    .link:before,.link:after{content:"";position:absolute;width:18px;height:18px;pointer-events:none;opacity:.65}
    .link:before{left:8px;top:8px;border-left:1px solid var(--accent-border);border-top:1px solid var(--accent-border)}
    .link:after{right:8px;bottom:8px;border-right:1px solid var(--accent-border);border-bottom:1px solid var(--accent-border)}
    .link.hidden{display:none}
    .link:hover{transform:translateY(-3px);border-color:var(--accent-border);background:linear-gradient(135deg,oklch(0.7 0.2 45 / .16),rgba(255,255,255,.045));box-shadow:0 14px 28px rgba(0,0,0,.22),0 0 22px oklch(0.7 0.2 45 / .1)}
    .slot{position:absolute;right:10px;top:10px;color:rgba(246,243,238,.28);font-size:9px;font-weight:800}
    .kind{position:absolute;left:10px;top:10px;color:var(--signal);font-size:9px;font-weight:800;text-transform:uppercase}
    .icon{width:46px;height:46px;flex:none;border-radius:12px;display:grid;place-items:center;color:#cbd5e1;font-size:10px;font-weight:900;overflow:hidden}
    .icon svg{width:32px;height:32px;display:block}
    .icon img{width:100%;height:100%;object-fit:contain}
    .copy{min-width:0}
    .copy strong,.copy small{display:block}
    .copy strong{font-size:15px}
    .copy small{margin-top:4px;color:rgba(246,243,238,.46);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .copy-row{display:flex;align-items:center;justify-content:center;gap:8px;min-width:0;margin-top:4px}
    .copy-row small{margin-top:0;max-width:100%}
    .arrow{display:none}
    .hint{flex:none;color:var(--accent-strong);font-size:11px;font-weight:700}
    .link>.hint{display:none}
    .link.copied{animation:copy-pulse .65s ease}
    .empty{display:grid;place-items:center;min-height:220px;color:rgba(246,243,238,.45);border:1px dashed rgba(255,255,255,.12);border-radius:14px}
    .modal{position:fixed;inset:0;z-index:20;display:none;place-items:center;padding:18px;background:rgba(0,0,0,.68);backdrop-filter:blur(10px)}
    .modal.open{display:grid}
    .modal-card{width:min(100%,420px);border:1px solid rgba(255,255,255,.11);border-radius:18px;background:linear-gradient(180deg,rgba(22,16,12,.98),rgba(8,8,8,.98));box-shadow:0 24px 80px rgba(0,0,0,.48);overflow:hidden}
    .modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:18px 18px 14px;border-bottom:1px solid rgba(255,255,255,.08)}
    .modal-head small{display:block;color:var(--accent-strong);font-size:11px;font-weight:800;text-transform:uppercase}
    .modal-head strong{display:block;margin-top:4px;font-size:22px}
    .modal-close{appearance:none;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#f6f3ee;border-radius:10px;width:34px;height:34px;font:inherit;font-size:18px;cursor:pointer}
    .modal-body{display:grid;gap:12px;padding:18px}
    .detail{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 14px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.035)}
    .detail span{display:block;color:rgba(246,243,238,.42);font-size:11px;font-weight:700;text-transform:uppercase}
    .detail strong{display:block;margin-top:4px;font-size:15px}
    .detail-copy{appearance:none;border:1px solid var(--accent-border);background:var(--accent-soft);color:var(--accent-strong);border-radius:10px;padding:8px 10px;font:inherit;font-size:12px;font-weight:700;cursor:pointer}
    @keyframes sweep{
      from{transform:translateX(-34%)}
      to{transform:translateX(34%)}
    }
    @keyframes cover-drift{
      from{transform:scale(1.02)}
      to{transform:scale(1.08)}
    }
    @keyframes grid-drift{
      from{background-position:0 0,0 0,0 0}
      to{background-position:0 0,44px 44px,44px 44px}
    }
    @keyframes copy-pulse{
      0%{box-shadow:0 0 0 rgba(255,255,255,0)}
      30%{box-shadow:0 0 0 1px var(--accent-border),0 0 28px oklch(0.7 0.2 45 / .24)}
      100%{box-shadow:0 0 0 rgba(255,255,255,0)}
    }
    @keyframes hud-cycle{
      0%,26%,100%{border-color:rgba(255,255,255,.08);box-shadow:none}
      10%{border-color:var(--accent-border);box-shadow:0 0 0 1px oklch(0.7 0.2 45 / .12),0 0 22px oklch(0.7 0.2 45 / .16)}
    }
    @keyframes dossier-in{
      from{opacity:0;transform:translateY(14px)}
      to{opacity:1;transform:none}
    }
    @keyframes rail-in{
      from{opacity:0;transform:translateX(12px)}
      to{opacity:1;transform:none}
    }
    @keyframes module-in{
      from{opacity:0;transform:translateY(12px) scale(.98)}
      to{opacity:1;transform:none}
    }
    @keyframes cursor-blink{
      50%{opacity:0}
    }
    @media(max-width:900px){
      main{padding:12px}
      .hero{min-height:440px;padding:18px}
      .hero:before{background:
        radial-gradient(ellipse at center,transparent 28%,rgba(8,8,8,.16) 54%,rgba(8,8,8,.62) 100%),
        linear-gradient(180deg,rgba(8,8,8,.24),rgba(8,8,8,.97)),
        linear-gradient(90deg,rgba(8,8,8,.78),rgba(8,8,8,.3)),
        radial-gradient(circle at 76% 18%,oklch(0.7 0.2 45 / .16),transparent 36%)}
      .hero:after{box-shadow:
        inset 0 0 0 1px rgba(255,255,255,.018),
        inset 0 0 42px rgba(8,8,8,.38),
        inset 0 0 92px rgba(8,8,8,.2)}
      .hero-scan{opacity:.16}
      .hero-media{object-position:center 24%}
      .monogram{font-size:min(28vw,150px)}
      .hud-item{min-width:84px}
      .hero-copy{width:100%}
      .rail{position:static;width:auto;display:flex;flex-wrap:wrap;margin-bottom:14px}
      .rail-item{padding:6px 0;border-top:0;border-bottom:1px solid rgba(255,255,255,.08)}
    }
    @media(max-width:560px){
      .shell{border-radius:14px}
      .board{padding:18px}
      .grid{grid-template-columns:repeat(2,minmax(0,1fr))}
      .link{padding:12px}
      .copy strong{font-size:14px}
      .hero-foot{display:flex;flex-wrap:wrap;gap:10px}
      .hero-foot span{padding-right:0;border-right:0}
      .hero-copy{padding:16px}
      h1{font-size:clamp(30px,9vw,42px);line-height:1.02;overflow-wrap:anywhere}
      .typed-wrap{display:block}
      .cursor{display:none}
    }
    @media(prefers-reduced-motion:reduce){
      body:before,.hero-media,.hero-sweep,.hero-copy,.rail,.link,.hud-item,.cursor{animation:none}
      .link,.filter{transition:none}
    }
  </style>
</head>
<body>
  <main>
    <div class="shell">
      <section class="hero">
        <img class="hero-media" src="${image}" alt="${displayName}">
        <span class="hero-scan"></span>
        <span class="hero-sweep"></span>
        <span class="hero-frame"></span>
        <span class="monogram">${monogram}</span>
        <aside class="rail">
          <span class="rail-item"><span>Node</span><strong>Active</strong></span>
          <span class="rail-item"><span>ID</span><strong>${dossierCode}</strong></span>
          <span class="rail-item"><span>Channels</span><strong>${activeLinks.length}</strong></span>
        </aside>
        <div class="hero-copy">
          <div class="dossier-top">
            <div class="brand"><strong>UNIX-TEAM</strong><span>Profile</span></div>
            <span class="system-pill">Player dossier</span>
          </div>
          <h1><span class="typed-wrap"><span data-typed-name="${displayName}"></span><span class="cursor" aria-hidden="true"></span></span></h1>
          <p class="role">${role}</p>
          <p class="bio" title="${bio}">${shortBio}</p>
          ${hasLongBio ? '<button class="bio-toggle" type="button" data-bio-toggle>Lihat bio</button>' : ''}
          ${tags ? `<div class="tags">${tags}</div>` : ''}
          <div class="hud">
            <span class="hud-item"><small>Links</small><strong>${activeLinks.length}</strong></span>
            <span class="hud-item"><small>Mode</small><strong>${activeCategories.size}</strong></span>
            <span class="hud-item"><small>Class</small><strong>${primaryTag}</strong></span>
          </div>
          <div class="hero-foot">
            <span>${escapeHtml(subdomain)}.${escapeHtml(rootDomain)}</span>
            <a href="#channels">Lihat link</a>
            <button class="share" type="button" data-share="${pageUrl}">Bagikan</button>
          </div>
        </div>
      </section>
      <section class="board">
        <div class="board-head">
          <strong>Channels</strong>
          <span>${escapeHtml(subdomain)} / node online</span>
        </div>
        <div class="filters">
          ${filterButtons}
        </div>
        <div id="channels" class="grid">${tiles || '<div class="empty">Belum ada link aktif.</div>'}</div>
      </section>
    </div>
  </main>
  <div class="modal" data-ml-modal aria-hidden="true">
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="ml-title">
      <div class="modal-head">
        <div>
          <small>Mobile Legends</small>
          <strong id="ml-title" data-ml-field="name">Nickname belum tersedia</strong>
        </div>
        <button class="modal-close" type="button" data-ml-close aria-label="Tutup">×</button>
      </div>
      <div class="modal-body">
        <div class="detail">
          <div>
            <span>User ID</span>
            <strong data-ml-field="userId">-</strong>
          </div>
          <button class="detail-copy" type="button" data-ml-copy>Salin</button>
        </div>
        <div class="detail">
          <div>
            <span>Zone ID</span>
            <strong data-ml-field="zoneId">-</strong>
          </div>
          <button class="detail-copy" type="button" data-ml-copy-field="zoneId">Salin</button>
        </div>
      </div>
    </div>
  </div>
  <script>
    for (const link of document.querySelectorAll('[data-deeplink="true"]')) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const fallback = link.dataset.fallback;
        const startedAt = Date.now();
        window.location.href = link.href;
        window.setTimeout(() => {
          if (document.visibilityState === 'visible' && Date.now() - startedAt < 1800 && fallback) {
            window.location.href = fallback;
          }
        }, 900);
      });
    }

    const filters = document.querySelectorAll('[data-filter]');
    const links = document.querySelectorAll('.link');
    for (const filter of filters) {
      filter.addEventListener('click', () => {
        const active = filter.dataset.filter;
        for (const button of filters) {
          button.classList.toggle('active', button === filter);
        }
        for (const link of links) {
          link.classList.toggle('hidden', active !== 'all' && !link.classList.contains('link-' + active));
        }
      });
    }

    for (const button of document.querySelectorAll('[data-copy]')) {
      button.addEventListener('click', async () => {
        const value = button.dataset.copy;
        if (!value) return;
        try {
          await navigator.clipboard.writeText(value);
          const hint = button.querySelector('.hint');
          if (hint) {
            const previous = hint.textContent;
            hint.textContent = 'Tersalin';
            button.classList.add('copied');
            window.setTimeout(() => {
              hint.textContent = previous;
              button.classList.remove('copied');
            }, 1200);
          }
        } catch {
          window.prompt('Salin nilai ini:', value);
        }
      });
    }

    const mobileLegendsModal = document.querySelector('[data-ml-modal]');
    const mobileLegendsName = document.querySelector('[data-ml-field="name"]');
    const mobileLegendsUserId = document.querySelector('[data-ml-field="userId"]');
    const mobileLegendsZoneId = document.querySelector('[data-ml-field="zoneId"]');
    const mobileLegendsCopy = document.querySelector('[data-ml-copy]');
    for (const button of document.querySelectorAll('[data-ml-open]')) {
      button.addEventListener('click', () => {
        if (!mobileLegendsModal || !mobileLegendsName || !mobileLegendsUserId || !mobileLegendsZoneId) return;
        mobileLegendsName.textContent = button.dataset.mlName || 'Nickname belum tersedia';
        mobileLegendsUserId.textContent = button.dataset.mlUserId || '-';
        mobileLegendsZoneId.textContent = button.dataset.mlZoneId || '-';
        mobileLegendsModal.classList.add('open');
        mobileLegendsModal.setAttribute('aria-hidden', 'false');
      });
    }

    const closeMobileLegendsModal = () => {
      if (!mobileLegendsModal) return;
      mobileLegendsModal.classList.remove('open');
      mobileLegendsModal.setAttribute('aria-hidden', 'true');
    };

    document.querySelector('[data-ml-close]')?.addEventListener('click', closeMobileLegendsModal);
    mobileLegendsModal?.addEventListener('click', (event) => {
      if (event.target === mobileLegendsModal) closeMobileLegendsModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMobileLegendsModal();
    });
    const copyMobileLegendsField = async (value, button, promptLabel) => {
      if (!value || value === '-') return;
      try {
        await navigator.clipboard.writeText(value);
        const previous = button.textContent;
        button.textContent = 'Tersalin';
        window.setTimeout(() => {
          button.textContent = previous;
        }, 1200);
      } catch {
        window.prompt(promptLabel, value);
      }
    };

    mobileLegendsCopy?.addEventListener('click', async () => {
      await copyMobileLegendsField(
        mobileLegendsUserId?.textContent,
        mobileLegendsCopy,
        'Salin User ID Mobile Legends:',
      );
    });
    document.querySelector('[data-ml-copy-field="zoneId"]')?.addEventListener('click', async (event) => {
      await copyMobileLegendsField(
        mobileLegendsZoneId?.textContent,
        event.currentTarget,
        'Salin Zone ID Mobile Legends:',
      );
    });

    for (const button of document.querySelectorAll('[data-share]')) {
      button.addEventListener('click', async () => {
        const url = button.dataset.share;
        if (!url) return;
        try {
          if (navigator.share) {
            await navigator.share({ title: document.title, url });
            return;
          }
          await navigator.clipboard.writeText(url);
          const previous = button.textContent;
          button.textContent = 'Tersalin';
          window.setTimeout(() => {
            button.textContent = previous;
          }, 1200);
        } catch {
          window.prompt('Salin URL profile ini:', url);
        }
      });
    }

    const typedName = document.querySelector('[data-typed-name]');
    if (typedName) {
      const text = typedName.dataset.typedName || '';
      const mobile = window.matchMedia('(max-width: 560px)');
      let index = 0;
      let deleting = false;

      const tick = () => {
        if (mobile.matches) {
          typedName.textContent = text;
          return;
        }

        typedName.textContent = text.slice(0, index);

        if (!deleting && index < text.length) {
          index += 1;
          window.setTimeout(tick, 90);
          return;
        }

        if (!deleting && index === text.length) {
          deleting = true;
          window.setTimeout(tick, 1400);
          return;
        }

        if (deleting && index > 0) {
          index -= 1;
          window.setTimeout(tick, 55);
          return;
        }

        deleting = false;
        window.setTimeout(tick, 500);
      };

      tick();

      mobile.addEventListener('change', () => {
        if (mobile.matches) {
          typedName.textContent = text;
        } else {
          index = 0;
          deleting = false;
          tick();
        }
      });
    }

    const bioToggle = document.querySelector('[data-bio-toggle]');
    const bio = document.querySelector('.bio');
    if (bioToggle && bio) {
      bioToggle.addEventListener('click', () => {
        const expanded = bio.classList.toggle('expanded');
        bio.textContent = expanded ? ${JSON.stringify(profile.bio || member.bio)} : ${JSON.stringify(splitLines(profile.bio || member.bio, 72, 3).join(' '))};
        bioToggle.textContent = expanded ? 'Tutup bio' : 'Lihat bio';
      });
    }
  </script>
</body>
</html>`;
}

async function renderWorkerScript(member: TeamMember, rootDomain: string) {
  const profileImage = await readWorkerProfileImage(member);
  const ogImage = await buildWorkerOgImage(member, profileImage);
  const html = await renderWorkerHtml(member, rootDomain, profileImage, ogImage);
  return `const HTML = ${JSON.stringify(html)};
const ROOT_DOMAIN = ${JSON.stringify(rootDomain)};
const PROFILE_IMAGE = ${JSON.stringify(profileImage)};
const OG_IMAGE = ${JSON.stringify(ogImage)};

function decodeBase64Image(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === '/favicon.ico') {
    event.respondWith(Response.redirect('https://' + ROOT_DOMAIN + '/favico.ico', 302));
    return;
  }

  if (url.pathname === '/profile-image' && PROFILE_IMAGE) {
    event.respondWith(new Response(decodeBase64Image(PROFILE_IMAGE.base64), {
      headers: {
        'content-type': PROFILE_IMAGE.mimeType,
        'cache-control': 'public, max-age=31536000, immutable'
      }
    }));
    return;
  }

  if (url.pathname === '/og-image.png' && OG_IMAGE) {
    event.respondWith(new Response(decodeBase64Image(OG_IMAGE.base64), {
      headers: {
        'content-type': OG_IMAGE.mimeType,
        'cache-control': 'public, max-age=31536000, immutable'
      }
    }));
    return;
  }

  event.respondWith(new Response(HTML, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=120',
      'x-robots-tag': 'index, follow'
    }
  }));
});`;
}

async function uploadWorker(scriptName: string, script: string) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  await cfTextRequest(`/accounts/${accountId}/workers/scripts/${scriptName}`, {
    method: 'PUT',
    body: script,
  });
}

async function deleteWorker(scriptName: string) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  await cfRequest(`/accounts/${accountId}/workers/scripts/${scriptName}`, {
    method: 'DELETE',
  });
}

async function listWorkerDomains() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  return cfRequest<WorkerDomain[]>(`/accounts/${accountId}/workers/domains`);
}

async function findWorkerDomain(hostname: string) {
  const domains = await listWorkerDomains();
  return domains.find((domain) => domain.hostname === hostname);
}

async function detachWorkerDomain(hostname: string) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const existing = await findWorkerDomain(hostname);
  if (!existing) return;
  await cfRequest(`/accounts/${accountId}/workers/domains/${existing.id}`, {
    method: 'DELETE',
  });
}

async function attachWorkerDomain(hostname: string, scriptName: string, zoneId: string) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const existing = await findWorkerDomain(hostname);
  const payload = {
    hostname,
    service: scriptName,
    zone_id: zoneId,
  };

  if (existing?.service === scriptName) return existing;

  return cfRequest<WorkerDomain>(`/accounts/${accountId}/workers/domains`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function profileUrl(subdomain: string) {
  const rootDomain = process.env.CLOUDFLARE_ROOT_DOMAIN?.trim() || 'unixteam.my.id';
  const slug = normalizeSubdomain(subdomain);
  return `https://${slug}.${rootDomain}`;
}

export async function syncTeamProfilePage(
  previous: TeamMember | undefined,
  next: TeamMember,
): Promise<TeamMember> {
  if (!next.profilePage) return next;

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const rootDomain = process.env.CLOUDFLARE_ROOT_DOMAIN?.trim();
  const currentSubdomain = normalizeSubdomain(next.profilePage.subdomain);
  const previousSubdomain = normalizeSubdomain(previous?.profilePage?.subdomain ?? '');
  const currentScriptName = workerScriptName(currentSubdomain || next.name);
  const previousScriptName = previousSubdomain ? workerScriptName(previousSubdomain) : previous?.profilePage?.cloudflare?.workerScriptName;
  const currentHostname = currentSubdomain && rootDomain ? `${currentSubdomain}.${rootDomain}` : '';
  const previousHostname = previousSubdomain && rootDomain ? `${previousSubdomain}.${rootDomain}` : '';

  if (!token || !accountId || !zoneId || !rootDomain) {
    return {
      ...next,
      profilePage: {
        ...next.profilePage,
        subdomain: currentSubdomain,
        cloudflare: skipped('Cloudflare env belum lengkap. Butuh token, account id, zone id, dan root domain.'),
      },
    };
  }

  try {
    if (!next.profilePage.enabled || !currentSubdomain) {
      if (previousHostname) await detachWorkerDomain(previousHostname);
      if (previousScriptName) {
        await deleteWorker(previousScriptName);
      }

      return {
        ...next,
        profilePage: {
          ...next.profilePage,
          subdomain: currentSubdomain,
          cloudflare: {
            status: 'synced',
            message: 'Worker profile dinonaktifkan dan route lama dibersihkan.',
            syncedAt: new Date().toISOString(),
          },
        },
      };
    }

    if (previousSubdomain && previousSubdomain !== currentSubdomain) {
      if (previousHostname) await detachWorkerDomain(previousHostname);
      if (previousScriptName) await deleteWorker(previousScriptName);
    }

    await uploadWorker(currentScriptName, await renderWorkerScript(next, rootDomain));
    const domain = await attachWorkerDomain(currentHostname, currentScriptName, zoneId);

    return {
      ...next,
      profilePage: {
        ...next.profilePage,
        subdomain: currentSubdomain,
        cloudflare: {
          workerScriptName: currentScriptName,
          workerDomainId: domain.id,
          status: 'synced',
          message: `${currentScriptName} aktif di https://${currentHostname}`,
          syncedAt: new Date().toISOString(),
        },
      },
    };
  } catch (error) {
    return {
      ...next,
      profilePage: {
        ...next.profilePage,
        subdomain: currentSubdomain,
        cloudflare: errored(error instanceof Error ? error.message : 'Gagal sinkron Cloudflare Worker.'),
      },
    };
  }
}
