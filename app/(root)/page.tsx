import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import BlogPreview from '@/components/sections/BlogPreview';
import DiscordSection from '@/components/sections/DiscordSection';

export const metadata: Metadata = {
  title: 'UNIX-TEAM | Gaming-Tech Community',
  description: 'Join UNIX-TEAM - A premium gaming and technology community building innovative Roblox experiences, tools, and frameworks.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <ProjectsPreview />
      <BlogPreview />
      <DiscordSection />
    </main>
  );
}
