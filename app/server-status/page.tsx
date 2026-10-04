import { Metadata } from 'next';
import Link from 'next/link';
import { Activity, ArrowLeft, ExternalLink, RefreshCw, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Server Status | UNIX-TEAM',
  description: 'Check the real-time status of UNIX-TEAM services and infrastructure.',
};

const services = [
  ['Website','operational','99.99%','Just now'],
  ['Discord API','operational','99.95%','5 minutes ago'],
  ['Game Servers','operational','99.8%','2 minutes ago'],
  ['File Storage','operational','100%','1 minute ago'],
];

export default function ServerStatusPage() {
  return (
    <main className="section-wrap py-16 md:py-24">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent">
        <ArrowLeft size={15}/> Back to Home
      </Link>

      <div className="page-intro">
        <div>
          <div className="tech-label mb-4">INFRASTRUCTURE / STATUS</div>
          <h1 className="text-5xl font-bold tracking-[-0.05em] md:text-7xl">
            Server status.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Snapshot status layanan UNIX-TEAM. Kalau semua hijau, berarti setidaknya belum ada yang kebakaran.
        </p>
      </div>

      <section className="rounded-[30px] p-6 neu-surface md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[18px] neu-inset">
              <Activity size={22} className="text-green-600" />
            </div>
            <div>
              <div className="tech-label">OVERALL SYSTEM</div>
              <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-green-700">All Systems Operational</h2>
            </div>
          </div>
          <Link href="/server-status" className="neu-button inline-flex items-center gap-2 rounded-[16px] px-4 py-3 text-sm font-semibold">
            <RefreshCw size={15}/> Refresh
          </Link>
        </div>
      </section>

      <section className="mt-8 space-y-4">
        {services.map(([name,state,uptime,last], index) => (
          <article key={name} className="grid gap-4 rounded-[24px] p-5 neu-surface sm:grid-cols-[60px_1fr_auto] sm:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] neu-inset">
              <Server size={18} className="text-accent" />
            </div>
            <div>
              <div className="tech-label">SERVICE {String(index + 1).padStart(2,'0')}</div>
              <h3 className="mt-1 text-lg font-bold">{name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Last checked: {last}</p>
            </div>
            <div className="sm:text-right">
              <div className="inline-flex rounded-[12px] px-3 py-1.5 text-xs font-semibold text-green-700 neu-inset">{state}</div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{uptime} uptime</div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-center rounded-[28px] p-6 neu-inset">
        <div>
          <div className="tech-label mb-2">INCIDENT CHANNEL</div>
          <h2 className="text-2xl font-bold">Ada service yang ga beres?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Lapor lewat Discord atau contact page biar ada yang pura-pura panik dulu.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="https://discord.gg/Jdqhnyu2dw" target="_blank" rel="noopener noreferrer" className="neu-primary rounded-[16px] px-4 py-3 text-sm font-semibold">Discord</a>
          <Link href="/contact" className="neu-button inline-flex items-center gap-2 rounded-[16px] px-4 py-3 text-sm font-semibold">
            Contact <ExternalLink size={14}/>
          </Link>
        </div>
      </section>
    </main>
  );
}
