import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Package, Tag, Zap } from 'lucide-react';
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
  const color = status === 'Active'
    ? 'text-green-700'
    : status === 'In Development'
      ? 'text-amber-700'
      : 'text-muted-foreground';
  return <span className={`neu-chip ${color}`}>{status}</span>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <main className="section-wrap py-24 text-center">
        <h1 className="text-4xl font-bold">Project Not Found</h1>
        <p className="mt-3 text-muted-foreground">Project yang kamu cari ga ada. Mungkin belum dibuat, atau udah dihapus.</p>
        <Link href="/projects" className="neu-primary mt-7 inline-flex items-center gap-2 rounded-[18px] px-5 py-3 font-semibold">
          <ArrowLeft size={16}/> Kembali ke Projects
        </Link>
      </main>
    );
  }

  return (
    <>
      <StructuredData data={generateProjectDetailSchema(project)} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Projects', url: `${BASE_URL}/projects` },
        { name: project.title, url: `${BASE_URL}/projects/${project.slug}` },
      ])} />
      <ReadingProgress />

      <main className="section-wrap py-14 md:py-20">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent">
          <ArrowLeft size={15}/> Kembali ke Projects
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="tech-label">PROJECT MODULE</span>
              <StatusBadge status={project.status}/>
              <span className="neu-chip">{project.category}</span>
            </div>

            <h1 className="mt-6 text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[0.94] tracking-[-0.055em]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="neu-primary inline-flex items-center gap-2 rounded-[18px] px-5 py-3 text-sm font-semibold">
                  <ExternalLink size={15}/> Download / Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="neu-button inline-flex items-center gap-2 rounded-[18px] px-5 py-3 text-sm font-semibold">
                  <Github size={15}/> Source Code
                </a>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] neu-surface">
            <div className="relative aspect-[16/10] bg-secondary">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
                loading="eager"
                fallback={<div className="flex h-full items-center justify-center text-7xl font-bold text-accent/30">{project.title[0]}</div>}
              />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[28px] p-6 neu-surface md:p-7">
            <div className="flex items-center gap-3">
              <Package size={19} className="text-accent"/>
              <div className="tech-label">MODULE DESCRIPTION</div>
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-[-0.03em]">Tentang project.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

            <div className="mt-7 border-t border-border pt-5">
              <div className="tech-label mb-3">TECH STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => <span key={tag} className="neu-chip"><Tag size={12}/>{tag}</span>)}
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] p-6 neu-inset md:p-7">
            <div className="flex items-center gap-3">
              <Zap size={19} className="text-accent"/>
              <div className="tech-label">MODULE METADATA</div>
            </div>
            <dl className="mt-6 space-y-4">
              <div><dt className="tech-label">Category</dt><dd className="mt-1 font-semibold">{project.category}</dd></div>
              <div><dt className="tech-label">Status</dt><dd className="mt-1"><StatusBadge status={project.status}/></dd></div>
              <div><dt className="tech-label">Tech</dt><dd className="mt-1 text-sm text-muted-foreground">{project.tags.join(', ')}</dd></div>
            </dl>
          </aside>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="rounded-[24px] p-5 neu-surface transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-accent"><ArrowLeft size={14}/> Sebelumnya</div>
              <div className="mt-2 font-bold">{prevProject.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{prevProject.category}</div>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="rounded-[24px] p-5 text-right neu-surface transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-end gap-2 text-sm font-semibold text-accent">Berikutnya <ArrowRight size={14}/></div>
              <div className="mt-2 font-bold">{nextProject.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{nextProject.category}</div>
            </Link>
          ) : <div />}
        </section>
      </main>
    </>
  );
}
