import Link from 'next/link';
import { Github, Instagram } from 'lucide-react';
import BrandMark from './BrandMark';
import { DiscordIcon, RobloxIcon } from './ui/SocialIcons';

const groups = [
  {
    title: 'Navigate',
    links: [['About','/about'],['Team','/team'],['Projects','/projects'],['Blog','/blog']],
  },
  {
    title: 'Resources',
    links: [['Documentation','/documentation'],['FAQ','/faq'],['Contact','/contact']],
  },
] as const;

export default function Footer() {
  return (
    <footer className="section-wrap pb-8 pt-10">
      <div className="rounded-[24px] p-5 neu-surface sm:rounded-[32px] sm:p-6 md:p-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-4">
              <BrandMark size="md" />
              <div>
                <div className="text-xl font-bold tracking-[-0.03em]">UNIX-TEAM</div>
                <div className="tech-label mt-1">community system</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Komunitas game tidak sehat, project aneh, dan tempat beberapa keputusan questionable berubah jadi fitur.
            </p>
            <div className="mt-6 flex gap-2">
              <a href="https://discord.gg/Jdqhnyu2dw" target="_blank" rel="noopener noreferrer" className="neu-button flex h-10 w-10 items-center justify-center rounded-[14px]" aria-label="Discord"><DiscordIcon size={16}/></a>
              <a href="https://www.roblox.com/communities/unix-team" target="_blank" rel="noopener noreferrer" className="neu-button flex h-10 w-10 items-center justify-center rounded-[14px]" aria-label="Roblox"><RobloxIcon size={16}/></a>
              <a href="https://instagram.com/mbingsdk" target="_blank" rel="noopener noreferrer" className="neu-button flex h-10 w-10 items-center justify-center rounded-[14px]" aria-label="Instagram"><Instagram size={16}/></a>
              <a href="https://github.com/mbingsdk/unixteam" target="_blank" rel="noopener noreferrer" className="neu-button flex h-10 w-10 items-center justify-center rounded-[14px]" aria-label="GitHub"><Github size={16}/></a>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <div className="tech-label mb-4">{group.title}</div>
              <ul className="space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 UNIX-TEAM. Hak cipta diabaikan bersama.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-accent">Privacy</Link>
            <Link href="/terms" className="hover:text-accent">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-accent">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
