'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { formatDate } from '@/lib/date';

const featuredPosts = [...blogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .filter((p) => p.featured)
  .slice(0, 3);

export default function BlogPreview() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-16">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Artikel Terbaru
              </h2>
              <p className="text-foreground/60 text-lg mt-4">
                Tips, tutorial, dan random stuff dari komunitas kita
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/5 transition-all duration-300 group"
            >
              Semua Artikel
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <motion.div
                className="glass-effect rounded-lg overflow-hidden h-full flex flex-col group hover:border-accent/50 transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="relative w-full h-40 bg-gradient-to-br from-accent/10 to-brand-dark/50 overflow-hidden">
                  {post.image ? (
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      // Gambar pertama eager biar LCP ga warning
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fallback={
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-5xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-300">
                            📝
                          </div>
                        </div>
                      }
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-5xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-300">
                        📝
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-accent/10 text-accent">
                      {post.category}
                    </span>
                    <span className="text-xs text-foreground/50">{post.readingTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-4 flex-1 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xs text-foreground/50">
                      {formatDate(post.date, 'id-ID')}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-accent hover:text-accent/80 transition-colors text-sm font-medium flex items-center gap-1"
                    >
                      Baca
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex md:hidden justify-center mt-12">
          <Link
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/5 transition-all duration-300 group"
          >
            Baca Semua Artikel
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}