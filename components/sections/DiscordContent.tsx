'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { Users, Zap, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: '120+ Member Ribut',
    description: 'Kumpulan orang-orang yang ga jelas tapi entah kenapa betah di sini',
  },
  {
    icon: MessageSquare,
    title: 'Channel Aktif (Kadang)',
    description: 'Ada channel buat ribut, debat hal ga penting, dan saling salah paham',
  },
  {
    icon: Zap,
    title: 'Update Real-time',
    description: 'Tau info terbaru kapanpun kecuali pas semua lagi AFK, yang sering banget terjadi',
  },
];

export default function DiscordContent() {
  return (
    <main className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              Join Discord Buat Ribut
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Gabung tempat di mana gas berarti males banget, ntar berarti brisik lu, dan diam berarti lagi nyimak buat ribut nanti
            </p>
          </ScrollReveal>

          {/* Main CTA */}
          <ScrollReveal delay={0.1} className="mb-16">
            <motion.div
              className="glass-effect rounded-lg p-12 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Siap Gabung Kekacauan?
              </h2>
              <p className="text-foreground/60 mb-8 text-lg max-w-xl mx-auto">
                Klik tombol di bawah buat join server Discord kita. Ga ada paksaan. Tapi kalau ga join, ya sayang banget, ribut-ributnya seru soalnya.
              </p>
              <motion.a
                href="https://discord.gg/Jdqhnyu2dw"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-accent text-brand-dark font-bold text-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Join Discord Server</span>
                <span className="text-2xl">→</span>
              </motion.a>
            </motion.div>
          </ScrollReveal>

          {/* Features */}
          <ScrollReveal delay={0.2} className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Kenapa Harus Join?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-effect rounded-lg p-8 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Channels Overview */}
          <ScrollReveal delay={0.3}>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Isi Dalemnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: '#announcements',
                  description: 'Pengumuman penting yang sering diabaikan semua orang',
                },
                {
                  name: '#general-chat',
                  description: 'Tempat ribut utama. Topiknya? Random. Durasinya? Sampai bosen sendiri.',
                },
                {
                  name: '#tutorial',
                  description: 'Share tutor atau project aneh dan dapat feedback yang mungkin lebih aneh lagi',
                },
                {
                  name: '#media',
                  description: 'Ngupload karya buat pamer. Tapi jangan harap dapet pujian, yang boleh dipuji cuma popol.',
                },
                {
                  name: '#support',
                  description: 'Minta bantuan di sini. Dijawab? Ntar. Pas ada yang gabut.',
                },
                {
                  name: '#unix-selipkol',
                  description: 'Channel khusus buat selipkol, tempat curhat, curhat, dan curhat. Tapi jangan harap dapet solusi, yang penting curhatnya.',
                },
              ].map((channel, index) => (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="glass-effect rounded-lg p-6"
                >
                  <h3 className="font-bold text-accent mb-2">{channel.name}</h3>
                  <p className="text-foreground/60 text-sm">
                    {channel.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Bottom CTA */}
          <ScrollReveal delay={0.5} className="mt-16 text-center">
            <motion.a
              href="https://discord.gg/Jdqhnyu2dw"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-lg bg-accent text-brand-dark font-bold text-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Join Now</span>
              <span className="text-2xl">→</span>
            </motion.a>
            <p className="text-foreground/60 mt-6 text-sm">
              Kalau bosen dan ga suka di sini, boleh leave dan ga perlu pamit. Silent leave is our culture.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}