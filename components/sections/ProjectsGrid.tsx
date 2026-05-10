'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { projects } from '@/lib/content';
import { ExternalLink, Info, Loader2 } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

export default function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = useMemo(() => {
    const unique = [...new Set(projects.map((p) => p.category))].sort();
    return ['all', ...unique];
  }, []);

  const statuses = useMemo(() => {
    const unique = [...new Set(projects.map((p) => p.status))].sort();
    return ['all', ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const { visibleItems, sentinelRef, hasMore } = useInfiniteScroll(
    filteredProjects,
    6,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-400';
      case 'In Development':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'Archived':
        return 'bg-gray-500/10 text-gray-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
            Project Aneh Kita
          </h1>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Liat semua game Roblox, tools, scripts, dan library gila kita
          </p>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1} className="mb-12">
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari project aneh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/40">
                🔍
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
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
                    {category === 'all' ? 'All Projects' : category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Status</p>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedStatus === status
                        ? 'bg-accent text-brand-dark'
                        : 'bg-card border border-border text-foreground hover:border-accent'
                    }`}
                  >
                    {status === 'all' ? 'All Status' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            key={`${selectedCategory}-${selectedStatus}-${searchQuery}`}
          >
            {visibleItems.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: (index % 6) * 0.05 }}
              >
                <motion.div
                  className="glass-effect rounded-lg overflow-hidden h-full flex flex-col group hover:border-accent/50 transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  {/* Thumbnail */}
                  <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden relative">
                    {project.image ? (
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        fallback={
                          <div className="text-6xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-300">
                            {project.title[0]}
                          </div>
                        }
                      />
                    ) : (
                      <div className="text-6xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-300">
                        {project.title[0]}
                      </div>
                    )}

                    {/* Status badge — overlay top-left */}
                    <span
                      className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground/40 uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-foreground/60 text-sm mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex gap-2 pt-4 border-t border-border/50">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-foreground/70 hover:border-accent hover:text-accent text-sm font-medium transition-all duration-200"
                      >
                        <Info size={14} />
                        Detail
                      </Link>

                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 text-sm font-medium transition-all duration-200"
                        >
                          <ExternalLink size={14} />
                          Demo
                        </a>
                      ) : (
                        <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border/40 text-foreground/30 text-sm font-medium cursor-not-allowed select-none">
                          <ExternalLink size={14} />
                          Demo
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-foreground/60 text-lg">
              Ga ada project yang cocok sama filter aneh kamu.
            </p>
          </motion.div>
        )}

        {/* Sentinel + loading spinner */}
        <div ref={sentinelRef} className="py-8 flex justify-center">
          {hasMore && (
            <Loader2 size={24} className="animate-spin text-accent/50" />
          )}
        </div>
      </div>
    </section>
  );
}