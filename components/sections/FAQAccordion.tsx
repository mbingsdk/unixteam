'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { faqItems } from '@/lib/data';

export default function FAQAccordion() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFAQ = useMemo(
    () => faqItems.filter((item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  return (
    <main className="section-wrap py-16 md:py-24">
      <div className="page-intro">
        <div>
          <div className="tech-label mb-4">HELP NODE / FAQ</div>
          <h1 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl">
            Pertanyaan
            <span className="block text-accent">random.</span>
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Jawaban buat pertanyaan-pertanyaan aneh tentang UNIX-TEAM. Kalau nggak ketemu, kemungkinan memang belum pernah dipikirkan.
        </p>
      </div>

      <div className="relative mb-10 max-w-3xl">
        <input
          type="text"
          placeholder="Cari pertanyaan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="neu-input pr-12"
        />
        <Search size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {filteredFAQ.map((item, index) => {
          const open = openId === item.id;
          return (
            <article key={item.id} className="rounded-[24px] p-1 neu-surface">
              <button
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full cursor-pointer items-center gap-4 rounded-[20px] px-5 py-4 text-left transition-all duration-200 hover:bg-white/25"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] neu-inset">
                  <HelpCircle size={17} className="text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="tech-label mb-1">FAQ {String(index + 1).padStart(2,'0')}</div>
                  <h3 className="font-semibold tracking-[-0.02em]">{item.question}</h3>
                </div>
                <ChevronDown size={18} className={`shrink-0 text-accent transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
              </button>

              {open && (
                <div className="mx-4 mb-4 rounded-[18px] px-5 py-4 text-sm leading-relaxed text-muted-foreground neu-inset">
                  {item.answer}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!filteredFAQ.length && (
        <div className="mt-8 rounded-[24px] p-8 text-center neu-inset">
          <p className="text-muted-foreground">Ga ada pertanyaan yang cocok sama pencarian lu.</p>
        </div>
      )}
    </main>
  );
}
