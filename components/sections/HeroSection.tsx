'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticleBackground from '@/components/effects/ParticleBackground';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with macOS-style gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="UNIX-TEAM Background"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent" />
      </div>

      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Badge - macOS Pill Style */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div 
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{
                boxShadow: '0 2px 16px -2px rgba(255, 184, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent tracking-tight">Welcome to UNIX-TEAM</span>
            </motion.div>
          </motion.div>

          {/* Main Headline - SF Pro inspired typography */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
          >
            <span className="text-foreground">
              Komunitas Game
            </span>
            <br />
            <span className="text-accent relative">
              Tidak Sehat
              <motion.span
                className="absolute -inset-x-4 -inset-y-2 bg-accent/10 rounded-2xl -z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Ribut bareng, saling bully, dan nikmatin kekacauan terstruktur. UNIX bukan tentang menang, tapi tentang ribut bersama.
          </motion.p>

          {/* CTA Buttons - macOS Style */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/projects"
              className="group relative px-8 py-4 rounded-2xl bg-accent text-accent-foreground font-semibold text-base hover:bg-accent/90 transition-all duration-300 flex items-center gap-2.5 shadow-xl shadow-accent/25 hover:shadow-2xl hover:shadow-accent/30 active:scale-[0.98]"
            >
              Liat Project Aneh
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </Link>

            <a
              href="https://discord.gg/Jdqhnyu2dw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-foreground font-semibold text-base hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300 active:scale-[0.98]"
              style={{
                boxShadow: '0 2px 12px -2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              Join Discord Buat Ribut
            </a>
          </motion.div>

          {/* Stats Preview - macOS Card Style */}
          <motion.div
            variants={itemVariants}
            className="pt-16"
          >
            <div 
              className="inline-flex items-center gap-8 md:gap-12 px-8 py-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06]"
              style={{
                boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)'
              }}
            >
              {[
                { value: '120+', label: 'Member Ribut' },
                { value: '50+', label: 'Project Aneh' },
                { value: '99.9%', label: 'Uptime (kadang)' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-sm text-foreground/40 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
