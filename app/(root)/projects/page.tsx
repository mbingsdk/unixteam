import { Metadata } from 'next';
import ProjectsGrid from '@/components/sections/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects | UNIX-TEAM',
  description: 'Browse all UNIX-TEAM projects including Roblox games, tools, scripts, and libraries.',
};

export default function ProjectsPage() {
  return <ProjectsGrid />;
}
