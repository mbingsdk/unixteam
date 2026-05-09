import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { docPages } from '@/lib/docPages';

interface DocPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return docPages.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = docPages.find((d) => d.slug === slug);

  if (!doc) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${doc.title} | UNIX-TEAM Documentation`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = docPages.find((d) => d.slug === slug);
  const allDocs = docPages;
  const currentIndex = allDocs.findIndex((d) => d.slug === slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  if (!doc) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h1>
          <p className="text-foreground/60 mb-8">
            The documentation page you're looking for doesn't exist.
          </p>
          <Link
            href="/documentation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-brand-dark font-semibold hover:bg-accent/90 transition-all"
          >
            <ArrowLeft size={20} />
            Back to Documentation
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <Link
            href="/documentation"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8"
          >
            <ArrowLeft size={18} />
            Back to Documentation
          </Link>
        </ScrollReveal>

        <article>
          <ScrollReveal className="mb-8">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="text-accent mt-1" size={24} />
              <div>
                <p className="text-accent text-sm font-semibold">{doc.category}</p>
                <p className="text-foreground/60 text-sm">Step {doc.order} of {allDocs.length}</p>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance text-foreground">
              {doc.title}
            </h1>
            <p className="text-xl text-foreground/70 mt-4">{doc.description}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="prose prose-invert max-w-none my-16">
            <div className="space-y-8 text-foreground/80">
              {doc.sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    {section.content}
                  </p>

                  {section.subsections && section.subsections.length > 0 && (
                    <div className="space-y-4 ml-4">
                      {section.subsections.map((subsection, subIdx) => (
                        <div key={subIdx}>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {subsection.title}
                          </h3>
                          <p className="text-foreground/70 mb-3">
                            {subsection.content}
                          </p>
                          {subsection.code && (
                            <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto mb-4">
                              <code className="text-accent text-sm font-mono">
                                {subsection.code}
                              </code>
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.code && !section.subsections && (
                    <pre className="bg-card border border-border rounded-lg p-4 overflow-x-auto mb-4">
                      <code className="text-accent text-sm font-mono">
                        {section.code}
                      </code>
                    </pre>
                  )}

                  {section.tips && (
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-4">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold text-accent">💡 Tip:</span> {section.tips}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={0.2} className="flex gap-4 mt-20 pt-12 border-t border-border">
            {prevDoc ? (
              <Link
                href={`/documentation/${prevDoc.slug}`}
                className="flex-1 glass-effect rounded-lg p-6 hover:border-accent/50 transition-all group text-left"
              >
                <p className="text-xs text-accent mb-2">← Previous</p>
                <p className="font-bold text-foreground group-hover:text-accent transition-colors">
                  {prevDoc.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextDoc ? (
              <Link
                href={`/documentation/${nextDoc.slug}`}
                className="flex-1 glass-effect rounded-lg p-6 hover:border-accent/50 transition-all group text-right"
              >
                <p className="text-xs text-accent mb-2">Next →</p>
                <p className="font-bold text-foreground group-hover:text-accent transition-colors">
                  {nextDoc.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </ScrollReveal>
        </article>
      </div>
    </main>
  );
}