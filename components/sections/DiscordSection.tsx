'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { Users, MessageSquare, Zap, MessageCircle } from 'lucide-react';

export default function DiscordSection() {
  const features = [
    {
      icon: Users,
      title: '120+ Member Ribut',
      description: 'Join komunitas aneh sampai ketularan anehnya, dan temukan teman baru yang aneh juga',
    },
    {
      icon: MessageSquare,
      title: 'Komunitas Aktif',
      description: 'Dapat bulliyan, share keluhan, dan debat kalo ga ngegibah',
    },
    {
      icon: Zap,
      title: 'Update Real-time',
      description: 'Informasi update tentang drama terbaru, event, dan inisiatif gila',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <ScrollReveal>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
                  Join Discord Buat Ribut
                </h2>
                <p className="text-foreground/50 text-lg font-medium leading-relaxed">
                  Sini ribut bareng kita, jadi bagian orang aneh yang konsisten, menjaga kesalah pahaman bersama, dan saling berprasangka buruk terhadap sesama anggota.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <div 
                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.15) 0%, rgba(255, 184, 0, 0.08) 100%)',
                          border: '1px solid rgba(255, 184, 0, 0.2)',
                          boxShadow: '0 4px 12px -2px rgba(255, 184, 0, 0.15)'
                        }}
                      >
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground tracking-tight">{feature.title}</h3>
                        <p className="text-foreground/50 text-sm mt-0.5">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.a
                href="https://https://discord.gg/Jdqhnyu2dw"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent text-accent-foreground font-semibold text-base hover:bg-accent/90 transition-all duration-300 shadow-xl shadow-accent/25 w-fit"
              >
                <span>Join Discord Server</span>
                <span className="text-lg">→</span>
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Right: Visual Element - macOS Card Style */}
          <ScrollReveal delay={0.2}>
            <motion.div
              className="relative rounded-3xl p-10 h-96 flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 16px 48px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
              }}
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 184, 0, 0.12) 0%, transparent 50%)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  className="flex justify-center mb-6"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div 
                    className="p-5 rounded-3xl"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.15) 0%, rgba(255, 184, 0, 0.08) 100%)',
                      border: '1px solid rgba(255, 184, 0, 0.25)',
                      boxShadow: '0 8px 24px -4px rgba(255, 184, 0, 0.2)'
                    }}
                  >
                    <MessageCircle size={48} className="text-accent" strokeWidth={1.5} />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                  Gabut Bareng
                </h3>
                <p className="text-foreground/50 text-sm max-w-xs mx-auto leading-relaxed">
                  Jadi bagian dari sesuatu yang aneh. Join ribuan orang yang bikin masa depan yang gila.
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
