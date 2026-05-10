import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Tag } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { projects } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import StructuredData, {
  generateBreadcrumbSchema,
} from '@/components/StructuredData';

const BASE_URL = 'https://unixteam.my.id';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const description = project.description.slice(0, 155);
  const imageUrl = project.image
    ? `${BASE_URL}${project.image}`
    : `${BASE_URL}/og-image.png`;

  return {
    title: `${project.title} | UNIX-TEAM Projects`,
    description,
    keywords: [
      'UNIX-TEAM',
      project.title,
      project.category,
      ...project.tags,
    ],
    alternates: {
      canonical: `${BASE_URL}/projects/${project.slug}`,
    },
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
  const imageUrl = project.image
    ? `${BASE_URL}${project.image}`
    : `${BASE_URL}/og-image.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/projects/${project.slug}`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows, macOS, Linux, Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    image: imageUrl,
    keywords: project.tags.join(', '),
    softwareVersion: project.status === 'In Development' ? 'Beta' : '1.0',
    author: {
      '@type': 'Organization',
      name: 'UNIX-TEAM',
      url: BASE_URL,
    },
  };
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Active':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'In Development':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <p className="text-foreground/60 mb-8">
            Project yang kamu cari ga ada. Mungkin belum dibuat, atau udah
            dihapus.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-brand-dark font-semibold hover:bg-accent/90 transition-all"
          >
            <ArrowLeft size={20} />
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

      <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <ScrollReveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8"
            >
              <ArrowLeft size={18} />
              Kembali ke Projects
            </Link>
          </ScrollReveal>

          {/* Hero Image */}
          {project.image && (
            <ScrollReveal className="mb-10">
              <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-border">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                  loading="eager"
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-8xl font-bold text-accent/20">
                        {project.title[0]}
                      </span>
                    </div>
                  }
                />
              </div>
            </ScrollReveal>
          )}

          {/* Header */}
          <ScrollReveal className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}
              >
                {project.status}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full border border-accent/20 bg-accent/10 text-accent">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>

            <p className="text-lg text-foreground/70 leading-relaxed">
              {project.description}
            </p>
          </ScrollReveal>

          {/* Tags + CTA */}
          <ScrollReveal delay={0.1} className="mb-12">
            <div className="glass-effect rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Tags */}
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground/50 mb-3 flex items-center gap-1">
                  <Tag size={12} />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-brand-dark font-semibold hover:bg-accent/90 transition-all shrink-0"
                >
                  Lihat Project
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </ScrollReveal>

          {/* Prev / Next navigation */}
          <ScrollReveal
            delay={0.2}
            className="flex gap-4 pt-12 border-t border-border"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="flex-1 glass-effect rounded-lg p-6 hover:border-accent/50 transition-all group text-left"
              >
                <p className="text-xs text-accent mb-2">← Sebelumnya</p>
                <p className="font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {prevProject.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="flex-1 glass-effect rounded-lg p-6 hover:border-accent/50 transition-all group text-right"
              >
                <p className="text-xs text-accent mb-2">Berikutnya →</p>
                <p className="font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {nextProject.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}