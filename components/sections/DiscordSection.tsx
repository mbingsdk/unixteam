'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { Users, MessageSquare, Zap } from 'lucide-react';

export default function DiscordSection() {
  const features = [
    {
      icon: Users,
      title: '5000+ Members',
      description: 'Join a thriving community of passionate developers',
    },
    {
      icon: MessageSquare,
      title: 'Active Community',
      description: 'Get help, share ideas, and collaborate with peers',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Stay informed about new projects and announcements',
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <ScrollReveal>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">
                  Join Our Discord Community
                </h2>
                <p className="text-foreground/60 text-lg">
                  Connect with developers, share your projects, get feedback, and collaborate on exciting new initiatives.
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
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{feature.title}</h3>
                        <p className="text-foreground/60 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.a
                href="https://discord.gg/unix-team"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-accent text-brand-dark font-bold text-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl w-fit"
              >
                <span>Join Discord Server</span>
                <span className="text-xl">→</span>
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Right: Visual Element */}
          <ScrollReveal delay={0.2}>
            <motion.div
              className="glass-effect rounded-lg p-8 h-96 flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💬
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Get Involved
                </h3>
                <p className="text-foreground/60 text-sm max-w-xs">
                  Be part of something amazing. Join thousands of developers building the future.
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
