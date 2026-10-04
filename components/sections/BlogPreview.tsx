import Link from 'next/link';
import { ArrowUpRight, Clock3, FileText } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { formatDate } from '@/lib/date';

export default function BlogPreview() {
  const posts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (!posts.length) return null;

  return (
    <section className="section-wrap py-20 md:py-28">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <div className="tech-label mb-4">LOG STREAM / LATEST</div>
          <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">
            Blog terbaru.
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Catatan hajatan, sejarah, perjalanan, dan kejadian yang seharusnya cukup disimpan di Discord tapi malah jadi artikel.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Link
          href={`/blog/${posts[0].slug}`}
          className="group rounded-[24px] p-5 sm:rounded-[30px] sm:p-7 neu-surface transition-all duration-200 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] neu-inset">
              <FileText size={20} className="text-accent" />
            </div>
            <span className="tech-label">PRIMARY LOG</span>
          </div>
          <h3 className="mt-10 text-3xl font-bold tracking-[-0.035em] md:text-4xl">{posts[0].title}</h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{posts[0].description}</p>
          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatDate(posts[0].date)}</span>
            <span className="flex items-center gap-1"><Clock3 size={14} /> {posts[0].readingTime}</span>
          </div>
          <div className="mt-7 inline-flex items-center gap-2 font-semibold text-accent">Baca <ArrowUpRight size={16} /></div>
        </Link>

        <div className="space-y-5">
          {posts.slice(1).map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block rounded-[24px] p-5 neu-surface transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="tech-label">LOG {String(index + 2).padStart(2,'0')}</span>
                <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.025em]">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
