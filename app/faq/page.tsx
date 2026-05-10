import { Metadata } from 'next';
import FAQAccordion from '@/components/sections/FAQAccordion';

const BASE_URL = 'https://unixteam.my.id';

export const metadata: Metadata = {
  title: 'FAQ | UNIX-TEAM',
  description: 'Pertanyaan-pertanyaan random tentang UNIX-TEAM yang mungkin ada, mungkin juga ga ada jawabannya. Cari jawaban di sini.',
  keywords: [
    'UNIX-TEAM',
    'FAQ',
    'pertanyaan',
    'bantuan',
    'help',
    'Discord',
    'komunitas',
    'teknologi',
    'gaming',
    'Roblox',
  ],
  openGraph: {
    title: 'FAQ | UNIX-TEAM',
    description: 'Pertanyaan-pertanyaan random tentang UNIX-TEAM yang mungkin ada, mungkin juga ga ada jawabannya.',
    url: `${BASE_URL}/faq`,
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'UNIX-TEAM FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | UNIX-TEAM',
    description: 'Pertanyaan-pertanyaan random tentang UNIX-TEAM',
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
};

export default function FAQPage() {
  return <FAQAccordion />;
}