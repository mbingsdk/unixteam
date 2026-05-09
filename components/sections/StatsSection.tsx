'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { stats } from '@/lib/content';

export default function StatsSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Statistik Kekacauan
          </h2>
          <p className="text-foreground/60 text-lg mt-4 max-w-2xl mx-auto">
            Komunitas kita tumbuh dan berkembang dengan orang-orang yang gila di seluruh dunia
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <motion.div
                className="glass-effect p-8 rounded-lg text-center h-full flex flex-col justify-center group hover:border-accent/50 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-accent mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-foreground/60 font-medium">{stat.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
