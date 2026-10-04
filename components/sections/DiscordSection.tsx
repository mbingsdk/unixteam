import { MessageCircle, Radio, Users, Zap } from 'lucide-react';
import BrandMark from '@/components/BrandMark';

const features = [
  [Users, '120+ member ribut', 'Orang baru datang, ikut ramai, lalu tidak pernah benar-benar keluar dari orbit.'],
  [MessageCircle, 'Komunitas aktif', 'Chat, project, debat, dan obrolan random numpuk di node yang sama.'],
  [Zap, 'Update real-time', 'Event, drama, eksperimen, dan ide baru lewat lebih cepat dari dokumentasi.'],
] as const;

export default function DiscordSection() {
  return (
    <section className="section-wrap py-20 md:py-28">
      <div className="grid gap-8 rounded-[28px] p-5 neu-surface sm:p-6 md:rounded-[36px] lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="tech-label mb-4">COMMUNICATION BUS / DISCORD</div>
          <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">
            Join Discord
            <span className="block text-accent">buat ribut.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Central communication node untuk semua hal yang terlalu random kalau dipisah jadi lima server berbeda.
          </p>

          <div className="mt-8 space-y-4">
            {features.map(([Icon, title, desc]) => (
              <div key={title} className="grid grid-cols-[52px_1fr] gap-4 rounded-[22px] p-4 neu-inset">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] neu-surface-sm">
                  <Icon size={19} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://discord.gg/Jdqhnyu2dw"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-primary mt-8 inline-flex w-full justify-center sm:w-auto cursor-pointer items-center gap-2 rounded-[18px] px-6 py-4 font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            <Radio size={17} />
            Connect to Discord
          </a>
        </div>

        <div className="schematic-grid relative min-h-[320px] sm:min-h-[380px] lg:min-h-[430px] overflow-hidden rounded-[30px] neu-inset">
          <div className="absolute inset-[12%] rounded-full border border-dashed border-accent/25" />
          <div className="absolute inset-[28%] rounded-full border border-accent/20" />
          <div className="absolute left-1/2 top-1/2 h-[68%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-px w-[68%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <BrandMark size="hub" />
          </div>
          <span className="absolute left-5 top-5 tech-label">PUBLIC NODE</span>
          <span className="absolute bottom-5 right-5 tech-label">STATUS / OPEN</span>
        </div>
      </div>
    </section>
  );
}
