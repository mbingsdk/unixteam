import { Metadata } from 'next';
import BlogListing from '@/components/sections/BlogListing';

export const metadata: Metadata = {
  title: 'Blog | UNIX-TEAM',
  description: 'Read the latest articles about Roblox development, tutorials, and community updates.',
};

export default function BlogPage() {
  return <BlogListing />;
}
