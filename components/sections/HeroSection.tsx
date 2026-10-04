'use client';

import Link from 'next/link';
import {
  BookOpen,
  Boxes,
  Gamepad2,
  MessageCircle,
  Radio,
  Sparkles,
} from 'lucide-react';
import BrandMark from '@/components/BrandMark';

const nodes = [
  { label: 'ROBLOX', icon: Gamepad2, pos: 'top-4 left-1/2 -translate-x-1/2' },
  { label: 'PROJECTS', icon: Boxes, pos: 'top-1/2 right-2 -translate-y-1/2' },
  { label: 'BLOG', icon: BookOpen, pos: 'bottom-4 left-1/2 -translate-x-1/2' },
  { label: 'DISCORD', icon: MessageCircle, pos: 'top-1/2 left-2 -translate-y-1/2' },
];

export default function HeroSection() {
  return (
    <section className="section-wrap grid grid-cols-1 gap-10 py-12 sm:gap-14 sm:py-16 lg:min-h-[calc(100dvh-96px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-[16px] px-4 py-2 neu-surface-sm tech-label">
          <Radio size={14} className="text-accent" />
          UNIX SYSTEM / ONLINE
        </div>

        <h1 className="max-w-3xl text-[clamp(2.7rem,10vw,6.8rem)] font-bold leading-[0.92] tracking-[-0.055em]">
          Komunitas game
          <span className="block text-accent">tidak sehat.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg md:text-xl">
          Ribut bareng, bikin project aneh, share eksperimen, lalu bertindak seolah semuanya bagian dari sistem yang sangat terencana.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
          <Link
            href="/projects"
            className="neu-primary w-full cursor-pointer rounded-[18px] px-5 py-3.5 text-center font-semibold sm:w-auto sm:px-6 sm:py-4 transition-all duration-200 hover:-translate-y-0.5"
          >
            Lihat Project Aneh
          </Link>
          <a
            href="https://discord.gg/Jdqhnyu2dw"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-button w-full cursor-pointer rounded-[18px] px-5 py-3.5 text-center font-semibold sm:w-auto sm:px-6 sm:py-4"
          >
            Join Discord
          </a>
        </div>

        <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
          {[
            ['120+', 'member'],
            ['50+', 'project'],
            ['24/7', 'ribut'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[16px] p-3 neu-inset sm:rounded-[18px] sm:p-4">
              <div className="text-xl font-bold text-foreground sm:text-2xl">{value}</div>
              <div className="tech-label mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[620px]">
        <div className="schematic-grid relative aspect-square rounded-[28px] p-3 neu-inset sm:rounded-[40px] sm:p-6 lg:rounded-[48px] lg:p-10">
          <div className="absolute inset-[14%] rounded-full border border-dashed border-accent/35" />
          <div className="absolute inset-[29%] rounded-full border border-accent/20" />

          <div className="absolute left-1/2 top-1/2 h-[70%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute -inset-5 rounded-full border border-accent/20" />
              <BrandMark size="hub" priority />
              <div className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-[12px] px-3 py-1.5 neu-surface-sm tech-label sm:block">
                CENTRAL HUB
              </div>
            </div>
          </div>

          {nodes.map(({ label, icon: Icon, pos }) => (
            <div
              key={label}
              className={`absolute ${pos} flex min-w-[66px] flex-col items-center gap-1.5 rounded-[16px] px-2 py-2.5 neu-surface-sm sm:min-w-[82px] sm:rounded-[20px] sm:px-2.5 sm:py-3 lg:min-w-[92px] lg:rounded-[22px] lg:px-3 lg:py-4`}
            >
              <Icon size={18} className="text-accent sm:h-5 sm:w-5" />
              <span className="text-[9px] font-mono font-semibold tracking-[0.08em] text-foreground sm:text-[10px] lg:text-[11px]">{label}</span>
            </div>
          ))}

          <div className="absolute bottom-6 right-6 hidden items-center gap-2 rounded-[16px] px-3 py-2 neu-surface-sm sm:flex">
            <Sparkles size={14} className="text-accent" />
            <span className="tech-label">CHAOS ROUTER v1.0</span>
          </div>
        </div>
      </div>
    </section>
  );
}
