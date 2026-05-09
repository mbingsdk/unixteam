import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import BlogPreview from '@/components/sections/BlogPreview';
import DiscordSection from '@/components/sections/DiscordSection';

export const metadata: Metadata = {
  title: 'UNIX-TEAM | Komunitas Game Tidak Sehat',
  description: 'Komunitas game tidak sehat dan sangat menyesatkan. Ribut bareng, saling bully, dan nikmatin kekacauan terstruktur.',
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
