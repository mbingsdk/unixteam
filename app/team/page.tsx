import { Metadata } from 'next';
import TeamGallery from '@/components/sections/TeamGallery';
import StructuredData, { generatePersonSchema, generateBreadcrumbSchema } from '@/components/StructuredData';
import { teamMembers } from '@/lib/content';

const BASE_URL = 'https://unixteam.my.id';

export const metadata: Metadata = {
  title: 'Team | UNIX-TEAM',
  description: 'Kenalan sama orang-orang aneh di balik kekacauan terstruktur UNIX-TEAM.',
  keywords: [
    'UNIX-TEAM',
    'team',
    'members',
    'developers',
    'contributors',
  ],
  openGraph: {
    title: 'Team | UNIX-TEAM',
    description: 'Kenalan sama orang-orang aneh di balik kekacauan terstruktur UNIX-TEAM.',
    url: `${BASE_URL}/team`,
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'UNIX-TEAM Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team | UNIX-TEAM',
    description: 'Kenalan sama orang-orang aneh di balik kekacauan terstruktur',
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${BASE_URL}/team`,
  },
};

export default function TeamPage() {
  return (
    <>
      <StructuredData data={generateBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Team', url: `${BASE_URL}/team` },
      ])} />
      {teamMembers.map((member) => (
        <StructuredData key={member.id} data={generatePersonSchema(member)} />
      ))}
      <TeamGallery />
    </>
  );
}