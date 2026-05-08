'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    slug: 'getting-started-with-roblox',
    title: 'Getting Started with Roblox Development',
    description: 'A comprehensive guide to starting your Roblox development journey with best practices and tips.',
    date: '2024-05-01',
    readingTime: '5 min read',
    category: 'Tutorial',
  },
  {
    id: '2',
    slug: 'advanced-lua-patterns',
    title: 'Advanced Lua Patterns for Game Development',
    description: 'Learn advanced Lua patterns and techniques to write more efficient and maintainable code.',
    date: '2024-04-28',
    readingTime: '8 min read',
    category: 'Development',
  },
  {
    id: '3',
    slug: 'community-spotlight',
    title: 'May Community Spotlight',
    description: 'Showcasing incredible projects and talented developers from our vibrant community.',
    date: '2024-04-25',
    readingTime: '4 min read',
    category: 'Community',
  },
];

export default function BlogPreview() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Latest Articles
              </h2>
              <p className="text-foreground/60 text-lg mt-4">
                Tips, tutorials, and insights from our community
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/5 transition-all duration-300 group"
            >
              All Articles
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1}>
              <motion.div
                className="glass-effect rounded-lg overflow-hidden h-full flex flex-col group hover:border-accent/50 transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                {/* Thumbnail */}
                <div className="w-full h-40 bg-gradient-to-br from-accent/10 to-brand-dark/50 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/10" />
                  <div className="relative text-5xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-300">
                    📝
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-accent/10 text-accent">
                      {post.category}
                    </span>
                    <span className="text-xs text-foreground/50">{post.readingTime}</span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-4 flex-1 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xs text-foreground/50">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-accent hover:text-accent/80 transition-colors text-sm font-medium flex items-center gap-1"
                    >
                      Read
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="flex md:hidden justify-center mt-12">
          <Link
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/5 transition-all duration-300 group"
          >
            Read All Articles
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
