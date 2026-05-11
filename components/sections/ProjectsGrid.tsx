'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { projects } from '@/lib/data';
import { ExternalLink, Info, Loader2, Search } from 'lucide-react';
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
        return 'bg-green-500/15 text-green-400 border-green-500/30';
      case 'In Development':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Archived':
        return 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30';
      default:
        return 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30';
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-4">
            Project Aneh Kita
          </h1>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto font-medium">
            Liat semua game Roblox, tools, scripts, dan library gila kita
          </p>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1} className="mb-12">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari project aneh..."
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

            <div>
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
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
                    {category === 'all' ? 'All Projects' : category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">Status</p>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedStatus === status
                        ? 'bg-accent text-accent-foreground shadow-md shadow-accent/20'
                        : 'bg-white/[0.04] border border-white/[0.08] text-foreground/70 hover:bg-white/[0.08] hover:text-foreground'
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
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
                  className="rounded-3xl overflow-hidden h-full flex flex-col group transition-all duration-300"
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {/* Thumbnail */}
                  <div className="w-full h-48 bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center overflow-hidden relative">
                    {project.image ? (
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        fallback={
                          <div className="text-7xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-500">
                            {project.title[0]}
                          </div>
                        }
                      />
                    ) : (
                      <div className="text-7xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-500">
                        {project.title[0]}
                      </div>
                    )}

                    {/* Status badge */}
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-xl border ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs font-semibold text-foreground/30 uppercase tracking-wider mb-1.5">
                      {project.category}
                    </span>

                    <h3 className="text-lg font-bold text-foreground mb-1.5 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-foreground/50 text-sm mb-4 flex-1 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex gap-2 pt-4 border-t border-white/[0.06]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground/70 hover:bg-white/[0.08] hover:text-foreground text-sm font-medium transition-all duration-200"
                      >
                        <Info size={13} />
                        Detail
                      </Link>

                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 text-sm font-medium transition-all duration-200"
                        >
                          <ExternalLink size={13} />
                          Demo
                        </a>
                      ) : (
                        <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/[0.04] text-foreground/25 text-sm font-medium cursor-not-allowed select-none">
                          <ExternalLink size={13} />
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
            <p className="text-foreground/50 text-base">
              Ga ada project yang cocok sama filter aneh kamu.
            </p>
          </motion.div>
        )}

        {/* Sentinel + loading spinner */}
        <div ref={sentinelRef} className="py-8 flex justify-center">
          {hasMore && (
            <Loader2 size={22} className="animate-spin text-accent/50" />
          )}
        </div>
      </div>
    </section>
  );
}