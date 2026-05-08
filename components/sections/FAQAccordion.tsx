'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { faqItems } from '@/lib/content';
import { ChevronDown } from 'lucide-react';

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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-foreground/60 text-lg">
            Find answers to common questions about UNIX-TEAM
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
              className="w-full px-6 py-3 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/40">
              🔍
            </span>
          </div>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.05}>
              <motion.div
                className="glass-effect rounded-lg overflow-hidden"
                layout
              >
                <button
                  onClick={() =>
                    setOpenId(openId === item.id ? null : item.id)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/5 transition-colors duration-200 group"
                >
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {item.question}
                    </h3>
                    {item.category && (
                      <p className="text-xs text-accent mt-1">{item.category}</p>
                    )}
                  </div>
                  <motion.div
                    animate={{
                      rotate: openId === item.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
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
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 border-t border-border/50 text-foreground/60 text-sm leading-relaxed">
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
            <p className="text-foreground/60 text-lg">
              No FAQ items found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
