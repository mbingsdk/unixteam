import { Metadata } from 'next';
import DiscordContent from '@/components/sections/DiscordContent';

export const metadata: Metadata = {
  title: 'Discord | UNIX-TEAM',
  description: 'Join the UNIX-TEAM Discord community. Connect with developers and stay updated.',
};

export default function DiscordPage() {
  return <DiscordContent />;
}
