'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { formatDate } from '@/lib/date';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(blogPosts.map((post) => post.category))];

  const filteredPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          !selectedCategory || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
  }, [searchQuery, selectedCategory]);

  const { visibleItems, sentinelRef, hasMore } = useInfiniteScroll(
    filteredPosts,
    6,
  );

  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-4">
              Blog
            </h1>
            <p className="text-foreground/50 text-lg max-w-2xl mx-auto font-medium">
              Tips, tutorial, dan hal-hal random dari komunitas yang ga jelas
              arahnya
            </p>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={0.1} className="mb-12">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all backdrop-blur-xl text-sm"
                  style={{
                    boxShadow: '0 2px 12px -2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
                  }}
                />
                <Search
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/35 pointer-events-none"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !selectedCategory
                      ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20'
                      : 'bg-white/[0.04] border border-white/[0.08] text-foreground/70 hover:bg-white/[0.08] hover:text-foreground'
                  }`}
                >
                  Semua Kategori
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20'
                        : 'bg-white/[0.04] border border-white/[0.08] text-foreground/70 hover:bg-white/[0.08] hover:text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 gap-6">
            {visibleItems.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.05}>
                <motion.div
                  className="rounded-3xl overflow-hidden transition-all duration-300 group"
                  whileHover={{ x: 6 }}
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {/* Featured Image */}
                  {post.image && (
                    <div className="relative aspect-[16/9] w-full max-h-64 bg-gradient-to-br from-accent/15 to-accent/5 overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fallback={
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl font-bold text-accent/20">
                              {post.title[0]}
                            </span>
                          </div>
                        }
                      />
                    </div>
                  )}

                  <div className="p-7">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                            {post.category}
                          </span>
                          <span className="text-xs text-foreground/40">
                            {post.readingTime}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors tracking-tight">
                          {post.title}
                        </h2>
                      </div>
                      <span className="text-sm text-foreground/40 flex-shrink-0">
                        {formatDate(post.date)}
                      </span>
                    </div>

                    <p className="text-foreground/50 text-sm mb-5 line-clamp-2">
                      {post.description}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-sm font-medium group/link"
                    >
                      Baca Artikel
                      <ArrowRight
                        size={15}
                        className="group-hover/link:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-foreground/50 text-base">
                Ga ada artikel yang cocok. Coba cari hal lain, atau emang
                artikelnya belum dibuat.
              </p>
            </motion.div>
          )}

          {/* Sentinel + loading indicator */}
          <div ref={sentinelRef} className="py-8 flex justify-center">
            {hasMore && (
              <Loader2
                size={22}
                className="animate-spin text-accent/50"
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}