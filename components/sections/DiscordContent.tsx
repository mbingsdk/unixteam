import { Hash, MessageCircle, Radio, Users, Zap } from 'lucide-react';
import BrandMark from '@/components/BrandMark';

const features = [
  [Users, '120+ member ribut', 'Kumpulan orang yang ga jelas tapi entah kenapa betah di sini.'],
  [MessageCircle, 'Channel aktif', 'Ada channel buat ribut, debat hal ga penting, dan salah paham berkepanjangan.'],
  [Zap, 'Update real-time', 'Tau info terbaru kecuali pas semua lagi AFK, yang juga cukup sering terjadi.'],
] as const;

const channels = [
  ['#announcements', 'Pengumuman penting yang sering diabaikan semua orang.'],
  ['#general-chat', 'Tempat ribut utama. Topiknya random. Durasinya sampai bosen sendiri.'],
  ['#tutorial', 'Share tutor atau project aneh dan dapat feedback yang mungkin lebih aneh lagi.'],
  ['#media', 'Upload karya buat pamer. Jangan terlalu berharap dipuji.'],
  ['#support', 'Minta bantuan. Dijawab? Tergantung siapa yang lagi gabut.'],
  ['#unix-selipkol', 'Tempat curhat. Solusi opsional, dramatisasi wajib.'],
] as const;

export default function DiscordContent() {
  return (
    <main className="section-wrap py-12 sm:py-16 lg:py-24">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <div className="tech-label mb-4">COMMUNICATION BUS / DISCORD</div>
          <h1 className="text-[clamp(3.4rem,7vw,6.4rem)] font-bold leading-[0.92] tracking-[-0.055em]">
            Join Discord
            <span className="block text-accent">buat ribut.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Tempat di mana gas berarti males banget, ntar berarti brisik lu, dan diam berarti lagi nyimak buat ribut nanti.
          </p>
          <a
            href="https://discord.gg/Jdqhnyu2dw"
            target="_blank"
            rel="noopener noreferrer"
            className="neu-primary mt-8 inline-flex w-full justify-center sm:w-auto cursor-pointer items-center gap-2 rounded-[18px] px-6 py-4 font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            <Radio size={17}/>
            Connect to Discord
          </a>
        </div>

        <div className="schematic-grid relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] rounded-[34px] neu-inset">
          <div className="absolute inset-[12%] rounded-full border border-dashed border-accent/30" />
          <div className="absolute inset-[29%] rounded-full border border-accent/20" />
          <div className="absolute left-1/2 top-1/2 h-[70%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-accent/45 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><BrandMark size="hub" /></div>
          <span className="absolute left-5 top-5 tech-label">PUBLIC NODE</span>
          <span className="absolute bottom-5 right-5 tech-label">INVITE / OPEN</span>
        </div>
      </section>

      <section className="mt-16 grid gap-5 lg:grid-cols-3">
        {features.map(([Icon,title,description], index) => (
          <article key={title} className="rounded-[26px] p-6 neu-surface">
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] neu-inset">
              <Icon size={19} className="text-accent"/>
            </div>
            <div className="tech-label mt-7">NODE {String(index + 1).padStart(2,'0')}</div>
            <h2 className="mt-2 text-xl font-bold tracking-[-0.025em]">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>

      <section className="mt-16">
        <div className="page-intro">
          <div>
            <div className="tech-label mb-4">CHANNEL MAP</div>
            <h2 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">Isi dalemnya.</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">Beberapa jalur utama di communication bus UNIX. Sisanya muncul sesuai kebutuhan dan tingkat kegabutan.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {channels.map(([name,description]) => (
            <article key={name} className="flex gap-4 rounded-[22px] p-5 neu-surface">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] neu-inset">
                <Hash size={18} className="text-accent"/>
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-accent">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[30px] p-7 text-center neu-inset">
        <h2 className="text-2xl font-bold tracking-[-0.03em]">Silent leave is our culture.</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">Kalau bosen dan ga suka di sini, boleh leave dan ga perlu pamit. Sistem tidak akan mengeluarkan alarm.</p>
      </section>
    </main>
  );
}
