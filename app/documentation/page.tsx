import { Metadata } from 'next';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { docPages } from '@/lib/docPages';

const BASE_URL = 'https://unixteam.my.id';

export const metadata: Metadata = {
  title: 'Dokumentasi | UNIX-TEAM',
  description: 'Dokumentasi resmi tidak resmi UNIX-TEAM. Panduan bertahan, budaya, dan hal-hal absurd lainnya.',
  keywords: [
    'UNIX-TEAM',
    'dokumentasi',
    'docs',
    'panduan',
    'tutorial',
    'Roblox',
    'Luau',
  ],
  openGraph: {
    title: 'Dokumentasi | UNIX-TEAM',
    description: 'Dokumentasi resmi tidak resmi UNIX-TEAM. Panduan bertahan, budaya, dan hal-hal absurd lainnya.',
    url: `${BASE_URL}/documentation`,
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'UNIX-TEAM Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dokumentasi | UNIX-TEAM',
    description: 'Dokumentasi resmi tidak resmi UNIX-TEAM',
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${BASE_URL}/documentation`,
  },
};

export default function DocumentationPage() {
  const categories = [...new Set(docPages.map(doc => doc.category))];

  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              Documentation
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Semua yang perlu kamu tahu tentang UNIX, ditulis oleh orang-orang yang mungkin lagi gabut
            </p>
          </ScrollReveal>

          {/* Documentation by Category */}
          {categories.map((category, categoryIndex) => {
            const docsInCategory = docPages.filter(doc => doc.category === category);
            return (
              <ScrollReveal key={category} delay={categoryIndex * 0.1} className="mb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-8">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {docsInCategory
                      .sort((a, b) => a.order - b.order)
                      .map((doc, index) => (
                        <Link
                          key={doc.id}
                          href={`/documentation/${doc.slug}`}
                          className="glass-effect rounded-lg p-6 hover:border-accent/50 transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded bg-accent/10 group-hover:bg-accent/20 transition-colors flex-shrink-0 mt-0.5">
                              <span className="text-accent font-bold text-sm">{doc.order}</span>
                            </div>
                            <BookOpen className="text-accent mt-1 flex-shrink-0" size={20} />
                          </div>
                          
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {doc.title}
                          </h3>
                          
                          <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                            {doc.description}
                          </p>
                          
                          <div className="flex items-center gap-2 text-accent text-sm font-medium">
                            Baca Selengkapnya
                            <ArrowRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {/* Quick Links */}
          <ScrollReveal delay={0.3} className="mt-16">
            <div className="glass-effect rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Link Penting (Mungkin)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Artikel Blog', href: '/blog' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Discord buat ribut', href: 'https://discord.gg/unix-team' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-accent text-foreground hover:text-accent transition-all duration-200 group"
                  >
                    {link.label}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}