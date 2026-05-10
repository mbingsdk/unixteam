import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import ReadingProgress from '@/components/effects/ReadingProgress';
import { SectionsRenderer, HtmlContentRenderer } from '@/components/blog/BlogContentRenderer';
import { blogPosts } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { formatDateFull } from '@/lib/date';
import StructuredData, {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
} from '@/components/StructuredData';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
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
      images: [
        {
          url: post.image
            ? `https://unixteam.my.id${post.image}`
            : 'https://unixteam.my.id/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author || 'UNIX-TEAM'],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [
        post.image
          ? `https://unixteam.my.id${post.image}`
          : 'https://unixteam.my.id/og-image.png',
      ],
    },
    alternates: { canonical: `https://unixteam.my.id/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  // Prev / Next
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  if (!post) {
    return (
      <main className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-foreground/60 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-brand-dark font-semibold hover:bg-accent/90 transition-all"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <StructuredData data={generateBlogPostingSchema(post)} />
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: 'Home', url: 'https://unixteam.my.id' },
          { name: 'Blog', url: 'https://unixteam.my.id/blog' },
          { name: post.title, url: `https://unixteam.my.id/blog/${post.slug}` },
        ])}
      />

      {/* Reading progress — client component */}
      <ReadingProgress />

      <main className="min-h-screen py-20 px-4">
        <article className="max-w-4xl mx-auto">
          {/* Back */}
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal className="mb-12">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded bg-accent/10 text-accent text-sm font-semibold">
                  {post.category}
                </span>
                <span className="px-3 py-1 rounded bg-card border border-border text-foreground/60 text-sm">
                  {post.readingTime}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-balance text-foreground">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-foreground/60 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{formatDateFull(post.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{post.readingTime}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>By {post.author}</span>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Featured Image */}
          <ScrollReveal delay={0.1} className="mb-16">
            {post.image ? (
              <div className="relative w-full h-96 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-border overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  loading="eager"
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-foreground/40 text-sm">Featured Image</p>
                    </div>
                  }
                />
              </div>
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-border flex items-center justify-center">
                <p className="text-foreground/40 text-sm">Featured Image</p>
              </div>
            )}
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.2} className="prose prose-invert max-w-none">
            {post.content ? (
              <HtmlContentRenderer html={post.content} />
            ) : post.sections ? (
              <SectionsRenderer sections={post.sections} />
            ) : null}
          </ScrollReveal>

          {/* Prev / Next navigation */}
          <ScrollReveal
            delay={0.3}
            className="flex gap-4 mt-20 pt-12 border-t border-border"
          >
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="flex-1 glass-effect rounded-lg p-6 hover:border-accent/50 transition-all group text-left"
              >
                <p className="text-xs text-accent mb-2 flex items-center gap-1">
                  <ArrowLeft size={12} /> Artikel Sebelumnya
                </p>
                <p className="font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {prevPost.title}
                </p>
                <p className="text-xs text-foreground/50 mt-1">
                  {prevPost.category}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="flex-1 glass-effect rounded-lg p-6 hover:border-accent/50 transition-all group text-right"
              >
                <p className="text-xs text-accent mb-2 flex items-center gap-1 justify-end">
                  Artikel Berikutnya <ArrowRight size={12} />
                </p>
                <p className="font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {nextPost.title}
                </p>
                <p className="text-xs text-foreground/50 mt-1">
                  {nextPost.category}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </ScrollReveal>

          {/* Related Posts */}
          <ScrollReveal delay={0.4} className="mt-12 pt-12 border-t border-border">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.category === post.category && p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="glass-effect rounded-lg p-6 hover:border-accent/50 transition-all group"
                  >
                    <span className="text-xs text-accent font-semibold">
                      {relatedPost.category}
                    </span>
                    <h4 className="text-lg font-bold text-foreground mt-2 group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-foreground/60 text-sm mt-2 line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
            </div>
          </ScrollReveal>
        </article>
      </main>
    </>
  );
}