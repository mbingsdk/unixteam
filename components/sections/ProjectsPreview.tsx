import Link from 'next/link';
import { ArrowUpRight, Box } from 'lucide-react';
import { projects } from '@/lib/data';

export default function ProjectsPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="section-wrap py-20 md:py-28">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="tech-label mb-4">ACTIVE MODULES / PROJECTS</div>
          <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">Project aneh.</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Eksperimen yang keburu jadi repository sebelum sempat dipikirkan matang-matang.
          </p>
        </div>
        <Link href="/projects" className="text-sm font-semibold text-accent hover:underline">View all projects</Link>
      </div>

      <div className="space-y-6">
        {featured.map((project, index) => (
          <article
            key={project.id}
            className="grid gap-6 rounded-[28px] p-6 neu-surface lg:grid-cols-[110px_1fr_auto] lg:items-center"
          >
            <div className="flex h-[96px] items-center justify-center rounded-[22px] neu-inset">
              <Box size={30} className="text-accent" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="tech-label">MODULE {String(index + 1).padStart(2,'0')}</span>
                <span className="rounded-[12px] px-2.5 py-1 text-xs font-semibold neu-inset">{project.status}</span>
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em]">{project.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-[12px] px-2.5 py-1 text-xs font-medium neu-inset">{tag}</span>
                ))}
              </div>
            </div>
            <Link href={`/projects/${project.slug}`} className="neu-button w-full cursor-pointer rounded-[18px] px-4 py-3 text-center text-sm font-semibold sm:w-auto lg:w-auto">
              <span className="flex items-center gap-2">Detail <ArrowUpRight size={15} /></span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
