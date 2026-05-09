import { MetadataRoute } from 'next';

const BASE_URL = 'https://unixteam.my.id';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Blokir path yang ga perlu diindex (sesuaikan kalau ada)
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}