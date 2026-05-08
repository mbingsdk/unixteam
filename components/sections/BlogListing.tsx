'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blogPosts';

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(blogPosts.map((post) => post.category))];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              Blog
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Tips, tutorials, and insights from the UNIX-TEAM community
            </p>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={0.1} className="mb-12">
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/40">
                  🔍
                </span>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    !selectedCategory
                      ? 'bg-accent text-brand-dark'
                      : 'bg-card border border-border text-foreground hover:border-accent'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-accent text-brand-dark'
                        : 'bg-card border border-border text-foreground hover:border-accent'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 gap-8">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.05}>
                <motion.div
                  className="glass-effect rounded-lg p-8 hover:border-accent/50 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded text-xs font-semibold bg-accent/10 text-accent">
                          {post.category}
                        </span>
                        <span className="text-xs text-foreground/50">
                          {post.readingTime}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                    </div>
                    <span className="text-sm text-foreground/50 flex-shrink-0">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <p className="text-foreground/60 mb-6 line-clamp-2">
                    {post.description}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium group/link"
                  >
                    Read Article
                    <ArrowRight
                      size={18}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
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
              <p className="text-foreground/60 text-lg">
                No articles found matching your search.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
