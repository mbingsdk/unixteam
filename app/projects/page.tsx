import { Metadata } from 'next';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import StructuredData, { generateProjectSchema, generateBreadcrumbSchema } from '@/components/StructuredData';
import { projects } from '@/lib/content';

const BASE_URL = 'https://unixteam.my.id';

export const metadata: Metadata = {
  title: 'Projects | UNIX-TEAM',
  description: 'Liat semua project aneh dan inovasi gila dari UNIX-TEAM - Roblox games, tools, scripts, dan libraries.',
  keywords: [
    'UNIX-TEAM',
    'projects',
    'Roblox',
    'game development',
    'scripts',
    'tools',
    'libraries',
    'open source',
  ],
  openGraph: {
    title: 'Projects | UNIX-TEAM',
    description: 'Liat semua project aneh dan inovasi gila dari UNIX-TEAM - Roblox games, tools, scripts, dan libraries.',
    url: `${BASE_URL}/projects`,
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'UNIX-TEAM Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | UNIX-TEAM',
    description: 'Liat semua project aneh dan inovasi gila dari UNIX-TEAM',
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <StructuredData data={generateBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Projects', url: `${BASE_URL}/projects` },
      ])} />
      {projects.map((project) => (
        <StructuredData key={project.id} data={generateProjectSchema(project)} />
      ))}
      <ProjectsGrid />
    </>
  );
}
