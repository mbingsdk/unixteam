import type { Metadata } from 'next';

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '/'
): Metadata {
  const url = `https://unix-team.com${path}`;

  return {
    title: `${title} | UNIX-TEAM`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: `${title} | UNIX-TEAM`,
      description,
      siteName: 'UNIX-TEAM',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | UNIX-TEAM`,
      description,
    },
  };
}

export function generateBlogMetadata(
  title: string,
  description: string,
  slug: string,
  author: string,
  date: string
): Metadata {
  const url = `https://unix-team.com/blog/${slug}`;

  return {
    title: `${title} | UNIX-TEAM Blog`,
    description,
    alternates: {
      canonical: url,
    },
    authors: [{ name: author }],
    openGraph: {
      type: 'article',
      url,
      title: `${title} | UNIX-TEAM`,
      description,
      siteName: 'UNIX-TEAM',
      publishedTime: date,
      authors: [author],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | UNIX-TEAM`,
      description,
    },
  };
}

export function generateStructuredData(type: string, data: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
}

export function generateOrganizationSchema() {
  return generateStructuredData('Organization', {
    name: 'UNIX-TEAM',
    description: 'Premium gaming and technology community',
    url: 'https://unix-team.com',
    logo: 'https://unix-team.com/logo.png',
    sameAs: [
      'https://discord.gg/unix-team',
      'https://twitter.com/unixteam',
      'https://github.com/unix-team',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://unix-team.com/contact',
    },
  });
}
