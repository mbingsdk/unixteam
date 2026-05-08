'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { projects } from '@/lib/content';
import { ArrowRight } from 'lucide-react';

export default function ProjectsPreview() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <ScrollReveal>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Featured Projects
              </h2>
              <p className="text-foreground/60 text-lg mt-4">
                Explore our latest creations and innovations
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
                {/* Thumbnail Placeholder */}
                <div className="w-full h-40 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl font-bold text-accent/20 group-hover:scale-110 transition-transform duration-300">
                    {project.title[0]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-foreground/60 text-sm mb-4 flex-1">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      project.status === 'active'
                        ? 'bg-green-500/10 text-green-400'
                        : project.status === 'in-development'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {project.status === 'in-development' ? 'In Development' : project.status === 'active' ? 'Active' : 'Archived'}
                    </span>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                      >
                        Demo →
                      </a>
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
