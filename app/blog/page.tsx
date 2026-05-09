import { Metadata } from 'next';
import BlogListing from '@/components/sections/BlogListing';

export const metadata: Metadata = {
  title: 'Blog | UNIX-TEAM',
  description: 'Artikel-artikel random tentang Roblox, tutorial, dan update komunitas dari UNIX-TEAM.',
};

export default function BlogPage() {
  return <BlogListing />;
}