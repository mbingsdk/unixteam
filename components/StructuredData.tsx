import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Component untuk menambahkan structured data (JSON-LD) ke halaman
 * Gunakan untuk SEO dan rich snippets di Google Search
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  const BASE_URL = 'https://unixteam.my.id';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UNIX-TEAM',
    url: BASE_URL,
    logo: `${BASE_URL}/apple-icon.png`,
    description: 'UNIX-TEAM adalah komunitas gaming dan teknologi yang membangun pengalaman Roblox, tools, dan script inovatif.',
    sameAs: [
      'https://discord.gg/unix-team',
      'https://twitter.com/unixteam',
      'https://github.com/unix-team',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${BASE_URL}/contact`,
      availableLanguage: ['Indonesian', 'English'],
    },
  };
}

/**
 * Generate BlogPosting schema
 */
export function generateBlogPostingSchema(post: {
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  slug: string;
}) {
  const BASE_URL = 'https://unixteam.my.id';
  const imageUrl = post.image ? `${BASE_URL}${post.image}` : `${BASE_URL}/og-image.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: post.author || 'UNIX-TEAM',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UNIX-TEAM',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/apple-icon.png`,
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * Generate SoftwareApplication schema untuk projects
 */
export function generateProjectSchema(project: {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  status: string;
}) {
  const BASE_URL = 'https://unixteam.my.id';
  const imageUrl = project.image ? `${BASE_URL}${project.image}` : `${BASE_URL}/og-image.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows, macOS, Linux, Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '42',
    },
    image: imageUrl,
    keywords: project.tags.join(', '),
    softwareVersion: project.status === 'In Development' ? 'Beta' : '1.0',
  };
}

/**
 * Generate Person schema untuk team members
 */
export function generatePersonSchema(member: {
  name: string;
  role: string;
  bio: string;
  image?: string;
  social?: Record<string, string>;
}) {
  const BASE_URL = 'https://unixteam.my.id';
  const imageUrl = member.image ? `${BASE_URL}${member.image}` : `${BASE_URL}/apple-icon.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: imageUrl,
    url: `${BASE_URL}/team`,
    sameAs: member.social ? Object.values(member.social) : [],
    worksFor: {
      '@type': 'Organization',
      name: 'UNIX-TEAM',
      url: BASE_URL,
    },
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema() {
  const BASE_URL = 'https://unixteam.my.id';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UNIX-TEAM',
    url: BASE_URL,
    description: 'UNIX-TEAM adalah komunitas gaming dan teknologi yang membangun pengalaman Roblox, tools, dan script inovatif.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
