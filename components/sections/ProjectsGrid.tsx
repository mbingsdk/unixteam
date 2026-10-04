'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Box, Search } from 'lucide-react';
import { projects } from '@/lib/data';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

export default function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = useMemo(() => ['all', ...[...new Set(projects.map((p) => p.category))].sort()], []);
  const statuses = useMemo(() => ['all', ...[...new Set(projects.map((p) => p.status))].sort()], []);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return projects.filter((project) => {
      const matchText = !q || project.title.toLowerCase().includes(q) || project.description.toLowerCase().includes(q) || project.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchStatus = selectedStatus === 'all' || project.status === selectedStatus;
      return matchText && matchCategory && matchStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const { visibleItems, sentinelRef, hasMore } = useInfiniteScroll(filteredProjects, 6);

  return (
    <main className="section-wrap py-12 sm:py-16 lg:py-24">
      <div className="page-intro">
        <div>
          <div className="tech-label mb-4">MODULE ARCHIVE / PROJECTS</div>
          <h1 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl">
            Project aneh.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Semua game, tools, script, library, dan eksperimen UNIX yang berhasil lolos dari fase “cuma ide doang”.
        </p>
      </div>

      <section className="rounded-[28px] p-5 neu-surface md:p-6">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari project, tag, atau deskripsi..."
            className="neu-input pr-12"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div>
            <div className="tech-label mb-2">CATEGORY</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button key={category} onClick={() => setSelectedCategory(category)} className={`neu-chip cursor-pointer ${selectedCategory === category ? 'neu-chip-active' : ''}`}>
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="tech-label mb-2">STATUS</div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button key={status} onClick={() => setSelectedStatus(status)} className={`neu-chip cursor-pointer ${selectedStatus === status ? 'neu-chip-active' : ''}`}>
                  {status === 'all' ? 'All Status' : status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-5">
        {visibleItems.map((project, index) => (
          <article key={project.id} className="grid gap-5 rounded-[28px] p-5 neu-surface lg:grid-cols-[90px_1fr_auto] lg:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-[22px] neu-inset">
              <Box size={28} className="text-accent" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="tech-label">MODULE {String(index + 1).padStart(2,'0')}</span>
                <span className="neu-chip !px-2.5 !py-1 text-xs">{project.status}</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em]">{project.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => <span key={tag} className="rounded-[10px] px-2 py-1 text-xs neu-inset">{tag}</span>)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row lg:flex-col">
              <Link href={`/projects/${project.slug}`} className="neu-button min-w-0 inline-flex items-center justify-center gap-2 rounded-[16px] px-4 py-3 text-sm font-semibold">
                Detail <ArrowUpRight size={14}/>
              </Link>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="neu-primary rounded-[16px] px-4 py-3 text-center text-sm font-semibold">
                  Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      {!filteredProjects.length && <div className="mt-8 rounded-[24px] p-8 text-center neu-inset text-muted-foreground">Ga ada project yang cocok.</div>}
      <div ref={sentinelRef} className="py-8 text-center">{hasMore && <span className="tech-label">LOADING MODULES...</span>}</div>
    </main>
  );
}
