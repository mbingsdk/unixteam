import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, FileText } from 'lucide-react';
import { docPages } from '@/lib/data';

const BASE_URL = 'https://unixteam.my.id';

export const metadata: Metadata = {
  title: 'Dokumentasi | UNIX-TEAM',
  description: 'Dokumentasi resmi tidak resmi UNIX-TEAM. Panduan bertahan, budaya, dan hal-hal absurd lainnya.',
  alternates: { canonical: `${BASE_URL}/documentation` },
};

export default function DocumentationPage() {
  const categories = [...new Set(docPages.map((doc) => doc.category))];

  return (
    <main className="section-wrap py-16 md:py-24">
      <div className="page-intro">
        <div>
          <div className="tech-label mb-4">KNOWLEDGE BASE / DOCS</div>
          <h1 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl">
            Documentation.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Semua yang perlu kamu tahu tentang UNIX, ditulis oleh orang-orang yang mungkin lagi gabut tapi cukup niat untuk bikin dokumentasi.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category, categoryIndex) => {
          const docsInCategory = docPages
            .filter((doc) => doc.category === category)
            .sort((a,b) => a.order - b.order);

          return (
            <section key={category}>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] neu-inset">
                  <BookOpen size={17} className="text-accent" />
                </div>
                <div>
                  <div className="tech-label">CATEGORY {String(categoryIndex + 1).padStart(2,'0')}</div>
                  <h2 className="text-2xl font-bold tracking-[-0.03em]">{category}</h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {docsInCategory.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/documentation/${doc.slug}`}
                    className="group rounded-[24px] p-5 neu-surface transition-all duration-200 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[15px] neu-inset">
                        <FileText size={18} className="text-accent" />
                      </div>
                      <span className="tech-label">STEP {doc.order}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold tracking-[-0.025em] group-hover:text-accent">{doc.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Baca <ArrowUpRight size={15}/>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-14 rounded-[28px] p-6 neu-inset">
        <div className="tech-label mb-4">QUICK ROUTES</div>
        <div className="flex flex-wrap gap-3">
          {[
            ['Artikel Blog','/blog'],
            ['FAQ','/faq'],
            ['Discord','https://discord.gg/Jdqhnyu2dw'],
          ].map(([label,href]) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="neu-chip"
            >
              {label}
              <ArrowUpRight size={13}/>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
