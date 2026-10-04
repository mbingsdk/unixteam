import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import ReadingProgress from '@/components/effects/ReadingProgress';
import { SectionsRenderer, HtmlContentRenderer } from '@/components/blog/BlogContentRenderer';
import { blogPosts } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { formatDateFull } from '@/lib/date';
import StructuredData, { generateBlogPostingSchema, generateBreadcrumbSchema } from '@/components/StructuredData';
import ReadingTimeClient from '@/components/blog/ReadingTimeClient';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | UNIX-TEAM Blog`,
    description: post.description,
    keywords: ['UNIX-TEAM', 'blog', post.category, ...post.title.toLowerCase().split(' ')],
    authors: [{ name: post.author || 'UNIX-TEAM', url: 'https://unixteam.my.id' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://unixteam.my.id/blog/${post.slug}`,
      siteName: 'UNIX-TEAM',
      locale: 'id_ID',
      images: [{
        url: post.image ? `https://unixteam.my.id${post.image}` : 'https://unixteam.my.id/og-image.png',
        width: 1200,
        height: 630,
        alt: post.title,
      }],
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author || 'UNIX-TEAM'],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image ? `https://unixteam.my.id${post.image}` : 'https://unixteam.my.id/og-image.png'],
    },
    alternates: { canonical: `https://unixteam.my.id/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  if (!post) {
    return (
      <main className="section-wrap py-24 text-center">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <p className="mt-3 text-muted-foreground">Artikel yang kamu cari tidak ada.</p>
        <Link href="/blog" className="neu-primary mt-7 inline-flex items-center gap-2 rounded-[18px] px-5 py-3 font-semibold">
          <ArrowLeft size={16}/> Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <>
      <StructuredData data={generateBlogPostingSchema(post)} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: 'Home', url: 'https://unixteam.my.id' },
        { name: 'Blog', url: 'https://unixteam.my.id/blog' },
        { name: post.title, url: `https://unixteam.my.id/blog/${post.slug}` },
      ])} />
      <ReadingProgress />

      <main className="section-wrap py-14 md:py-20">
        <article className="mx-auto max-w-4xl">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent">
            <ArrowLeft size={15}/> Back to Blog
          </Link>

          <header>
            <div className="flex flex-wrap gap-2">
              <span className="neu-chip text-accent">{post.category}</span>
              <span className="neu-chip">
                <ReadingTimeClient selector="article" fallback={post.readingTime} showIcon={false} />
              </span>
            </div>

            <h1 className="mt-6 text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.055em]">
              {post.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.description}</p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar size={15}/>{formatDateFull(post.date)}</span>
              <span className="flex items-center gap-2"><Clock size={15}/><ReadingTimeClient selector="article" fallback={post.readingTime} showIcon={false}/></span>
              {post.author && <span className="flex items-center gap-2"><User size={15}/>By {post.author}</span>}
            </div>
          </header>

          <div className="mt-10 overflow-hidden rounded-[30px] neu-surface">
            <div className="relative aspect-[16/9] bg-secondary">
              {post.image ? (
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  sizes="(max-width:768px) 100vw, 800px"
                  className="object-cover"
                  loading="eager"
                  fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Featured Image</div>}
                />
              ) : (
                <div className="schematic-grid flex h-full items-center justify-center">
                  <span className="tech-label">NO FEATURED IMAGE</span>
                </div>
              )}
            </div>
          </div>

          <section className="mt-12 rounded-[30px] p-6 neu-surface md:p-8">
            <div className="prose max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-accent">
              {post.content ? (
                <HtmlContentRenderer html={post.content} />
              ) : post.sections ? (
                <SectionsRenderer sections={post.sections} />
              ) : null}
            </div>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="rounded-[24px] p-5 neu-surface transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent"><ArrowLeft size={14}/> Artikel Sebelumnya</div>
                <div className="mt-2 font-bold">{prevPost.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{prevPost.category}</div>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="rounded-[24px] p-5 text-right neu-surface transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-end gap-2 text-sm font-semibold text-accent">Artikel Berikutnya <ArrowRight size={14}/></div>
                <div className="mt-2 font-bold">{nextPost.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{nextPost.category}</div>
              </Link>
            ) : <div />}
          </section>

          {blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0,2).length > 0 && (
            <section className="mt-12">
              <div className="tech-label mb-4">RELATED LOGS</div>
              <div className="grid gap-4 md:grid-cols-2">
                {blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0,2).map((related) => (
                  <Link key={related.id} href={`/blog/${related.slug}`} className="rounded-[22px] p-5 neu-inset">
                    <div className="text-xs font-semibold text-accent">{related.category}</div>
                    <h3 className="mt-2 font-bold">{related.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{related.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
