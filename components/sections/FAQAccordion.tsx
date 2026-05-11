'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { faqItems } from '@/lib/data';
import { ChevronDown, Search } from 'lucide-react';

export default function FAQAccordion() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFAQ = useMemo(() => {
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-4">
            Pertanyaan Random
          </h1>
          <p className="text-foreground/50 text-lg font-medium">
            Jawaban buat pertanyaan-pertanyaan aneh tentang UNIX-TEAM
          </p>
        </ScrollReveal>

        {/* Search */}
        <ScrollReveal delay={0.1} className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all backdrop-blur-xl"
              style={{
                boxShadow: '0 2px 12px -2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
              }}
            />
            <Search
              size={18}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-foreground/35 pointer-events-none"
            />
          </div>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.05}>
              <motion.div
                className="rounded-2xl overflow-hidden"
                layout
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 4px 16px -4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                <button
                  onClick={() =>
                    setOpenId(openId === item.id ? null : item.id)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.04] transition-colors duration-200 group"
                >
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors tracking-tight">
                      {item.question}
                    </h3>
                    {item.category && (
                      <p className="text-xs text-accent/80 mt-1.5">{item.category}</p>
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: openId === item.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="ml-4 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-accent" />
                  </motion.div>
                </button>

                {/* Answer */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openId === item.id ? 'auto' : 0,
                    opacity: openId === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-5 border-t border-white/[0.06] text-foreground/50 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQ.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-foreground/50 text-lg">
              Ga ada pertanyaan yang cocok sama pencarian lu.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
