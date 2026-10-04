import { Activity, Boxes, RadioTower, Users } from 'lucide-react';
import { stats } from '@/lib/content';

const icons = [Users, Boxes, Activity, RadioTower];

export default function StatsSection() {
  return (
    <section className="section-wrap py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <div className="tech-label mb-4">SYSTEM TELEMETRY / LIVE</div>
          <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">
            Statistik
            <span className="block text-accent">kekacauan.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Angka-angka dari jaringan UNIX. Sebagian penting, sebagian cuma terlihat keren kalau masuk dashboard.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={stat.label} className="rounded-[24px] p-6 neu-surface">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[16px] neu-inset">
                    <Icon size={19} className="text-accent" />
                  </div>
                  <span className="tech-label">NODE {String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="mt-8 text-4xl font-bold tracking-[-0.04em] md:text-5xl">{stat.value}</div>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
