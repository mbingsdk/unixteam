import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Tag, Package, Zap } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import ReadingProgress from '@/components/effects/ReadingProgress';
import { projects } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import StructuredData, { generateBreadcrumbSchema } from '@/components/StructuredData';

const BASE_URL = 'https://unixteam.my.id';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  const description = project.description.slice(0, 155);
  const imageUrl = project.image ? `${BASE_URL}${project.image}` : `${BASE_URL}/og-image.png`;

  return {
    title: `${project.title} | UNIX-TEAM Projects`,
    description,
    keywords: ['UNIX-TEAM', project.title, project.category, ...project.tags],
    alternates: { canonical: `${BASE_URL}/projects/${project.slug}` },
    openGraph: {
      type: 'website',
      url: `${BASE_URL}/projects/${project.slug}`,
      title: `${project.title} | UNIX-TEAM`,
      description,
      siteName: 'UNIX-TEAM',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | UNIX-TEAM`,
      description,
      images: [imageUrl],
    },
  };
}

function generateProjectDetailSchema(project: (typeof projects)[number]) {
  const imageUrl = project.image ? `${BASE_URL}${project.image}` : `${BASE_URL}/og-image.png`;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/projects/${project.slug}`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows, macOS, Linux, Android, iOS',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    image: imageUrl,
    keywords: project.tags.join(', '),
    softwareVersion: project.status === 'In Development' ? 'Beta' : '1.0',
    author: { '@type': 'Organization', name: 'UNIX-TEAM', url: BASE_URL },
  };
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: 'bg-green-500/15 text-green-400 border-green-500/30',
    'In Development': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Archived: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30',
  };
  const dots: Record<string, string> = {
    Active: 'bg-green-400',
    'In Development': 'bg-amber-400',
    Archived: 'bg-neutral-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${styles[status] ?? styles.Archived}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] ?? 'bg-neutral-400'} ${status === 'Active' ? 'animate-pulse' : ''}`} />
      {status}
    </span>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Project Not Found</h1>
          <p className="text-foreground/60">
            Project yang kamu cari ga ada. Mungkin belum dibuat, atau udah dihapus.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
          >
            <ArrowLeft size={18} />
            Kembali ke Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <StructuredData data={generateProjectDetailSchema(project)} />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BASE_URL },
          { name: 'Projects', url: `${BASE_URL}/projects` },
          { name: project.title, url: `${BASE_URL}/projects/${project.slug}` },
        ])}
      />

      <ReadingProgress />

      <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Back link */}
          <ScrollReveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors mb-10"
            >
              <ArrowLeft size={16} />
              Kembali ke Projects
            </Link>
          </ScrollReveal>

          {/* Hero Image */}
          <ScrollReveal className="mb-10">
            <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden bg-gradient-to-br from-accent/15 to-accent/5">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                loading="eager"
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl font-black text-accent/15">{project.title[0]}</span>
                  </div>
                }
              />
              {/* Overlay gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              {/* Status badge on image */}
              <div className="absolute top-4 left-4">
                <StatusBadge status={project.status} />
              </div>
            </div>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal className="mb-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-accent/20 bg-accent/10 text-accent">
                  {project.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-foreground/60 leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>
          </ScrollReveal>

          {/* Info cards + CTA row */}
          <ScrollReveal delay={0.1} className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Tags card */}
              <div
                className="sm:col-span-2 rounded-2xl p-5"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-3">
                  <Tag size={11} />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div
                className="rounded-2xl p-5 flex flex-col justify-between gap-3"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground/40 uppercase tracking-wider">
                  <Zap size={11} />
                  Links
                </p>
                <div className="flex flex-col gap-2">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 transition-all"
                    >
                      <ExternalLink size={14} />
                      Download / Demo
                    </a>
                  ) : (
                    <span className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] text-foreground/30 text-sm select-none">
                      <ExternalLink size={14} />
                      Belum tersedia
                    </span>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] text-foreground/70 hover:text-accent hover:border-accent/40 text-sm font-medium transition-all"
                    >
                      <Github size={14} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Description / About section */}
          <ScrollReveal delay={0.15} className="mb-10">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <Package size={18} className="text-accent" />
                Tentang Project
              </h2>
              <p className="text-foreground/65 leading-relaxed">
                {project.description}
              </p>

              {/* Category detail */}
              <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-foreground/40 mb-1">Kategori</p>
                  <p className="text-sm font-semibold text-foreground">{project.category}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/40 mb-1">Status</p>
                  <StatusBadge status={project.status} />
                </div>
                <div>
                  <p className="text-xs text-foreground/40 mb-1">Tech</p>
                  <p className="text-sm font-semibold text-foreground">{project.tags.slice(0, 2).join(', ')}{project.tags.length > 2 ? '…' : ''}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Prev / Next navigation */}
          <ScrollReveal delay={0.2}>
            <div className="flex gap-3 pt-10 border-t border-white/[0.06]">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="flex-1 rounded-2xl p-5 hover:border-accent/40 transition-all duration-200 group text-left"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p className="flex items-center gap-1 text-xs text-accent mb-2">
                    <ArrowLeft size={12} /> Sebelumnya
                  </p>
                  <p className="font-bold text-foreground group-hover:text-accent transition-colors text-sm line-clamp-2">
                    {prevProject.title}
                  </p>
                  <p className="text-xs text-foreground/40 mt-1">{prevProject.category}</p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="flex-1 rounded-2xl p-5 hover:border-accent/40 transition-all duration-200 group text-right"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p className="flex items-center gap-1 text-xs text-accent mb-2 justify-end">
                    Berikutnya <ArrowRight size={12} />
                  </p>
                  <p className="font-bold text-foreground group-hover:text-accent transition-colors text-sm line-clamp-2">
                    {nextProject.title}
                  </p>
                  <p className="text-xs text-foreground/40 mt-1">{nextProject.category}</p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </ScrollReveal>

          {/* Related projects */}
          {(() => {
            const related = projects
              .filter((p) => p.category === project.category && p.id !== project.id)
              .slice(0, 2);
            if (!related.length) return null;
            return (
              <ScrollReveal delay={0.25} className="mt-10 pt-10 border-t border-white/[0.06]">
                <h3 className="text-xl font-bold text-foreground mb-5">Project Sejenis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/projects/${rel.slug}`}
                      className="rounded-2xl p-5 hover:border-accent/40 transition-all duration-200 group"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <StatusBadge status={rel.status} />
                      <h4 className="text-base font-bold text-foreground mt-3 mb-1 group-hover:text-accent transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-sm text-foreground/50 line-clamp-2">{rel.description}</p>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            );
          })()}

        </div>
      </main>
    </>
  );
}