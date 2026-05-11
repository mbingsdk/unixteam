'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { blogPosts } from '@/lib/data';
import { formatDate } from '@/lib/date';

export default function BlogPreview() {
  const posts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
            Blog Terbaru
          </h2>
          <p className="text-foreground/50 text-lg font-medium max-w-2xl mx-auto">
            Tips, tutorial, dan hal-hal random dari komunitas yang ga jelas arahnya
          </p>
        </ScrollReveal>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <motion.article
                  className="rounded-3xl overflow-hidden h-full flex flex-col group"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-accent/15 to-accent/5 overflow-hidden">
                    {post.image ? (
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        fallback={
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-5xl font-bold text-accent/20">
                              {post.title[0]}
                            </span>
                          </div>
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-bold text-accent/20">
                          {post.title[0]}
                        </span>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent/15 text-accent border border-accent/25 backdrop-blur-xl">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-foreground/40 mb-3">
                      <span>{formatDate(post.date)}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/20" />
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-foreground/50 text-sm line-clamp-2 flex-1">
                      {post.description}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 text-accent text-sm font-medium">
                      <span>Baca</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Link */}
        <ScrollReveal delay={0.3} className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-foreground/70 hover:text-accent hover:bg-white/[0.08] font-semibold text-sm transition-all duration-200"
          >
            Lihat Semua Artikel
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
