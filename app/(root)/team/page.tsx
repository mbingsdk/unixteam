import { Metadata } from 'next';
import TeamGallery from '@/components/sections/TeamGallery';

export const metadata: Metadata = {
  title: 'Team | UNIX-TEAM',
  description: 'Meet the talented developers and creators behind UNIX-TEAM.',
};

export default function TeamPage() {
  return <TeamGallery />;
}
