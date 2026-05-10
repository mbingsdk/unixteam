import { MetadataRoute } from 'next';
import { blogPosts, docPages, projects } from '@/lib/data';

const BASE_URL = 'https://unixteam.my.id';

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/team`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/projects`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/faq`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/documentation`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/discord`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  // ✅ server-status dihapus dari sitemap — kontennya hardcoded, ga dinamis,
  //    ga perlu diindex mesin pencari
  {
    url: `${BASE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  },
];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const docRoutes = docPages.map((doc) => ({
    url: `${BASE_URL}/documentation/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...docRoutes, ...projectRoutes];
}