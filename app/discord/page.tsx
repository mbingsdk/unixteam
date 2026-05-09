import { Metadata } from 'next';
import DiscordContent from '@/components/sections/DiscordContent';

export const metadata: Metadata = {
  title: 'Discord | UNIX-TEAM',
  description: 'Gabung tempat di mana gas berarti males banget, ntar berarti brisik lu, dan diam berarti lagi nyimak buat ribut nanti.',
};

export default function DiscordPage() {
  return <DiscordContent />;
}
