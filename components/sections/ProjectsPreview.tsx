'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { projects } from '@/lib/content';
import { ArrowRight, ExternalLink, Info } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function ProjectsPreview() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Project Aneh
              </h2>
              <p className="text-foreground/60 text-lg mt-4">
                Liat kreasi aneh dan inovasi gila kita
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/5 transition-all duration-300 group"
            >
              View All
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <motion.div
                className="glass-effect rounded-lg overflow-hidden h-full flex flex-col group hover:border-accent/50 transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                {/* Thumbnail */}
                <div className="relative w-full h-40 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                  {project.image ? (
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      fallback={
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-6xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-300">
                            {project.title[0]}
                          </div>
                        </div>
                      }
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-300">
                        {project.title[0]}
                      </div>
                    </div>
                  )}

                  {/* Status badge overlay — top-left, konsisten sama ProjectsGrid */}
                  <span
                    className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-1">
                    <span className="text-xs font-semibold text-foreground/40 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-foreground/60 text-sm mb-4 flex-1">{project.description}</p>

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

                  {/* CTA buttons — konsisten sama ProjectsGrid */}
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
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="flex md:hidden justify-center mt-12">
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/5 transition-all duration-300 group"
          >
            View All Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}