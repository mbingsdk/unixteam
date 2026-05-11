'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { projects } from '@/lib/data';
import { ArrowRight, ExternalLink, Info } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function ProjectsPreview() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Project Aneh
              </h2>
              <p className="text-foreground/50 text-lg mt-3 font-medium">
                Liat kreasi aneh dan inovasi gila kita
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-accent hover:bg-accent/10 transition-all duration-300 group font-medium text-sm"
            >
              View All
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <motion.div
                className="relative rounded-3xl overflow-hidden h-full flex flex-col group"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Thumbnail */}
                <div className="relative w-full h-44 bg-gradient-to-br from-accent/15 to-accent/5 overflow-hidden">
                  {project.image ? (
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      fallback={
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-7xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-500">
                            {project.title[0]}
                          </div>
                        </div>
                      }
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-7xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-500">
                        {project.title[0]}
                      </div>
                    </div>
                  )}

                  {/* Status badge */}
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-md backdrop-blur-xl border ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs font-semibold text-foreground/30 uppercase tracking-wider mb-1.5">
                    {project.category}
                  </span>

                  <h3 className="text-lg font-bold text-foreground mb-1.5 tracking-tight">{project.title}</h3>
                  <p className="text-foreground/50 text-sm mb-4 flex-1 leading-relaxed">{project.description}</p>

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
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="flex md:hidden justify-center mt-12">
          <Link
            href="/projects"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-accent hover:bg-white/[0.08] transition-all duration-300 group font-medium text-sm"
          >
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}