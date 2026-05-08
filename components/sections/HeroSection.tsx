'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/effects/ParticleBackground';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Welcome to UNIX-TEAM</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter"
          >
            <span className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
              Build Next-Gen
            </span>
            <br />
            <span className="text-accent">Gaming Experiences</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed"
          >
            Join a premium community of developers creating innovative Roblox games, tools, and frameworks. From concept to deployment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/projects"
              className="group relative px-8 py-4 rounded-lg bg-accent text-brand-dark font-semibold text-lg hover:bg-accent/90 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Explore Projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>

            <a
              href="https://discord.gg/unix-team"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg border border-accent/30 text-foreground font-semibold text-lg hover:bg-accent/5 transition-all duration-300"
            >
              Join Discord
            </a>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 pt-12 border-t border-border/50"
          >
            {[
              { value: '5K+', label: 'Members' },
              { value: '12', label: 'Projects' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  className="text-2xl md:text-3xl font-bold text-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
