import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb } from 'lucide-react';
import ReadingProgress from '@/components/effects/ReadingProgress';
import { docPages } from '@/lib/data';

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return docPages.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = docPages.find((d) => d.slug === slug);
  if (!doc) return { title: 'Page Not Found' };
  return {
    title: `${doc.title} | UNIX-TEAM Documentation`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = docPages.find((d) => d.slug === slug);
  const currentIndex = docPages.findIndex((d) => d.slug === slug);
  const prevDoc = currentIndex > 0 ? docPages[currentIndex - 1] : null;
  const nextDoc = currentIndex < docPages.length - 1 ? docPages[currentIndex + 1] : null;

  if (!doc) {
    return (
      <main className="section-wrap py-24 text-center">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="mt-3 text-muted-foreground">Dokumentasi yang kamu cari tidak ada.</p>
        <Link href="/documentation" className="neu-primary mt-7 inline-flex items-center gap-2 rounded-[18px] px-5 py-3 font-semibold">
          <ArrowLeft size={16}/> Back to Documentation
        </Link>
      </main>
    );
  }

  return (
    <>
      <ReadingProgress />
      <main className="section-wrap py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Link href="/documentation" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent">
            <ArrowLeft size={15}/> Back to Documentation
          </Link>

          <header className="rounded-[30px] p-6 neu-surface md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] neu-inset">
                <BookOpen size={20} className="text-accent"/>
              </div>
              <div>
                <div className="tech-label">{doc.category} / STEP {doc.order} OF {docPages.length}</div>
                <h1 className="mt-3 text-4xl font-bold tracking-[-0.045em] md:text-6xl">{doc.title}</h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{doc.description}</p>
              </div>
            </div>
          </header>

          <article className="mt-8 space-y-6">
            {doc.sections.map((section, idx) => (
              <section key={idx} className="rounded-[28px] p-6 neu-surface md:p-7">
                <div className="tech-label mb-3">SECTION {String(idx + 1).padStart(2,'0')}</div>
                <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">{section.title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{section.content}</p>

                {section.subsections?.length ? (
                  <div className="mt-6 space-y-4">
                    {section.subsections.map((subsection, subIdx) => (
                      <div key={subIdx} className="rounded-[20px] p-5 neu-inset">
                        <h3 className="font-semibold">{subsection.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subsection.content}</p>
                        {subsection.code && <pre className="neu-code mt-4"><code>{subsection.code}</code></pre>}
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.code && !section.subsections && <pre className="neu-code mt-5"><code>{section.code}</code></pre>}

                {section.tips && (
                  <div className="mt-5 flex gap-3 rounded-[18px] p-4 neu-inset">
                    <Lightbulb size={17} className="mt-0.5 shrink-0 text-accent"/>
                    <p className="text-sm leading-relaxed text-muted-foreground">{section.tips}</p>
                  </div>
                )}
              </section>
            ))}
          </article>

          <nav className="mt-10 grid gap-4 md:grid-cols-2">
            {prevDoc ? (
              <Link href={`/documentation/${prevDoc.slug}`} className="rounded-[22px] p-5 neu-surface transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent"><ArrowLeft size={14}/> Previous</div>
                <div className="mt-2 font-bold">{prevDoc.title}</div>
              </Link>
            ) : <div />}
            {nextDoc ? (
              <Link href={`/documentation/${nextDoc.slug}`} className="rounded-[22px] p-5 text-right neu-surface transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-end gap-2 text-sm font-semibold text-accent">Next <ArrowRight size={14}/></div>
                <div className="mt-2 font-bold">{nextDoc.title}</div>
              </Link>
            ) : <div />}
          </nav>
        </div>
      </main>
    </>
  );
}
