'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileText, Search } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { formatDate } from '@/lib/date';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(blogPosts.map((post) => post.category))];
  const filteredPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((post) => {
        const q = searchQuery.toLowerCase();
        return (!q || post.title.toLowerCase().includes(q) || post.description.toLowerCase().includes(q))
          && (!selectedCategory || post.category === selectedCategory);
      });
  }, [searchQuery, selectedCategory]);

  const { visibleItems, sentinelRef, hasMore } = useInfiniteScroll(filteredPosts, 6);

  return (
    <main className="section-wrap py-12 sm:py-16 lg:py-24">
      <div className="page-intro">
        <div>
          <div className="tech-label mb-4">LOG ARCHIVE / BLOG</div>
          <h1 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl">
            Field logs.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Tips, tutorial, hajatan, sejarah, dan catatan random dari komunitas yang arah resminya memang tidak pernah jelas.
        </p>
      </div>

      <section className="rounded-[28px] p-5 neu-surface md:p-6">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel..."
            className="neu-input pr-12"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => setSelectedCategory(null)} className={`neu-chip cursor-pointer ${!selectedCategory ? 'neu-chip-active' : ''}`}>
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`neu-chip cursor-pointer ${selectedCategory === category ? 'neu-chip-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-5">
        {visibleItems.map((post, index) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="grid gap-5 rounded-[26px] p-5 neu-surface transition-all duration-200 hover:-translate-y-1 lg:grid-cols-[72px_1fr_auto] lg:items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] neu-inset">
              <FileText size={23} className="text-accent" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="tech-label">LOG {String(index + 1).padStart(2,'0')}</span>
                <span className="text-xs text-muted-foreground">{post.category}</span>
              </div>
              <h2 className="mt-2 text-xl font-bold tracking-[-0.025em]">{post.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
              <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                <span>{formatDate(post.date)}</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              Baca <ArrowUpRight size={15}/>
            </div>
          </Link>
        ))}
      </section>

      {!filteredPosts.length && (
        <div className="mt-8 rounded-[24px] p-8 text-center neu-inset text-muted-foreground">
          Ga ada artikel yang cocok.
        </div>
      )}

      <div ref={sentinelRef} className="py-8 text-center">
        {hasMore && <span className="tech-label">LOADING MORE LOGS...</span>}
      </div>
    </main>
  );
}
