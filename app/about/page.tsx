import { Metadata } from 'next';
import { Compass, Network, Radio, ShieldCheck } from 'lucide-react';
import BrandMark from '@/components/BrandMark';

export const metadata: Metadata = {
  title: 'About | UNIX-TEAM',
  description: 'Komunitas game tidak sehat dan sangat menyesatkan.',
};

const rules = [
  ['Tunduk dan Patuh', 'Sama siapa pun bukan kewajiban kamu. Bebas aja.'],
  ['Bebas Berekspresi', 'Udah jelas dari namanya, bebas.'],
  ['Bebas Berkreasi', 'Mau bikin apa aja, silakan.'],
  ['Bebas Berprestasi', 'Atau ga, juga gapapa.'],
  ['Bebas Berinovasi', 'Inovasi aneh juga boleh.'],
  ['Bebas Berpikir', 'Atau ga mikir sama sekali.'],
  ['Bebas Berinteraksi', 'Saling bully itu interaksi kan.'],
  ['Bebas Bertindak', 'Asal jangan toxic banget ya.'],
];

export default function AboutPage() {
  return (
    <main className="section-wrap py-16 md:py-24">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <div className="tech-label mb-4">SYSTEM PROFILE / ABOUT</div>
          <h1 className="text-[clamp(3.4rem,7vw,6.6rem)] font-bold leading-[0.92] tracking-[-0.055em]">
            About
            <span className="block text-accent">UNIX-TEAM.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Komunitas game tidak sehat dan sangat menyesatkan. Ribut bareng, saling bully, bikin project aneh, lalu tetap nongkrong bareng besoknya.
          </p>
        </div>

        <div className="schematic-grid relative min-h-[360px] rounded-[36px] neu-inset">
          <div className="absolute inset-[16%] rounded-full border border-dashed border-accent/30" />
          <div className="absolute inset-[31%] rounded-full border border-accent/20" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <BrandMark size="hub" />
          </div>
          <span className="absolute left-5 top-5 tech-label">IDENTITY NODE</span>
          <span className="absolute bottom-5 right-5 tech-label">STATUS / ACTIVE</span>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[28px] p-7 neu-surface">
          <div className="flex h-12 w-12 items-center justify-center rounded-[16px] neu-inset">
            <Network size={20} className="text-accent" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-[-0.035em]">Cara sistem ini jalan.</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>UNIX cuma komunitas game, bukan organisasi yang sibuk ngurus jabatan.</p>
            <p>Kalau harus ada ketua, maka semua adalah ketua. Bebas berekspresi, berkarya, berinovasi, berpikir, berinteraksi, dan bertindak.</p>
            <p>Kalau bosen, boleh leave tanpa pamit. Silent leave is our culture.</p>
          </div>
        </article>

        <article className="rounded-[28px] p-7 neu-surface">
          <div className="tech-label mb-5">CORE PRINCIPLES / 08</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {rules.map(([title, description], index) => (
              <div key={title} className="rounded-[20px] p-4 neu-inset">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{title}</span>
                  <span className="tech-label">{String(index + 1).padStart(2,'0')}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <article className="rounded-[28px] p-7 neu-surface">
          <div className="flex items-center gap-3">
            <Compass size={20} className="text-accent" />
            <span className="tech-label">VISION</span>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em]">Visi.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Menjadi komunitas game yang penuh keakraban, kekacauan terstruktur, dan solidaritas absurd tanpa arah yang jelas dan sangat menyesatkan.
          </p>
        </article>

        <article className="rounded-[28px] p-7 neu-surface">
          <div className="flex items-center gap-3">
            <Radio size={20} className="text-accent" />
            <span className="tech-label">MISSION BUS</span>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em]">Misi.</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {[
              'Menjalin keakraban lewat interaksi yang kadang terlalu kreatif.',
              'Mendukung project, dagangan, eksperimen, dan keputusan questionable sesama member.',
              'Melestarikan budaya salah paham, lalu berdamai tanpa menyelesaikan semuanya.',
              'Menciptakan lingkungan gaming yang tidak sehat secara logika, tapi hangat secara batin.',
              'Selalu offline saat dibutuhkan dan online pas lagi butuh.',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <div className="mt-16 rounded-[26px] p-6 text-center neu-inset">
        <p className="text-xl font-semibold tracking-[-0.02em]">UNIX bukan tentang menang, tapi tentang ribut bersama.</p>
      </div>
    </main>
  );
}
