import { Metadata } from 'next';
// import { motion } from 'framer-motion';
import ScrollReveal from '@/components/effects/ScrollReveal';

export const metadata: Metadata = {
  title: 'About | UNIX-TEAM',
  description: 'Komunitas game tidak sehat dan sangat menyesatkan.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
              About UNIX-TEAM
            </h1>
            <p className="text-foreground/60 text-lg">
              Komunitas Game Tidak Sehat Dan Sangat Menyesatkan
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="prose prose-invert max-w-none">
            <div className="glass-effect rounded-lg p-8 space-y-6 text-foreground/80">
              <p className="text-lg">
                Selamat datang di UNIX! Ini cuma komunitas game doang, bukan tempat developer serius. Di sini kita ribut bareng, saling bully, dan nikmatin kekacauan terstruktur.
              </p>
              <p className="text-lg">
                UNIX ga punya struktur jabatan, gada ketua-ketua. Kalau harus ada ketua, maka semua adalah ketua. Bebas berekpresi, bebas berkarya, bebas berprestasi, bebas berinovasi, bebas berpikir, bebas berinteraksi, bebas bertindak.
              </p>
              <p className="text-lg">
                Kalau bosen dan ga suka di sini, boleh leave dan ga perlu pamit. Silent leave is our culture.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Rules
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Tunduk dan Patuh',
                description: 'Sama siapa pun bukan kewajiban kamu. Bebas aja.',
              },
              {
                title: 'Bebas Berekspresi',
                description: 'Udah jelas dari namanya, bebas.',
              },
              {
                title: 'Bebas Berkreasi',
                description: 'Mau bikin apa aja, silakan.',
              },
              {
                title: 'Bebas Berprestasi',
                description: 'Atau ga, juga gapapa.',
              },
              {
                title: 'Bebas Berinovasi',
                description: 'Inovasi aneh juga boleh.',
              },
              {
                title: 'Bebas Berpikir',
                description: 'Atau ga mikir sama sekali.',
              },
              {
                title: 'Bebas Berinteraksi',
                description: 'Saling bully itu interaksi kan.',
              },
              {
                title: 'Bebas Bertindak',
                description: 'Asal jangan toxic banget ya.',
              },
            ].map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="glass-effect rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-accent mb-3">
                    {value.title}
                  </h3>
                  <p className="text-foreground/60">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              VISI & MISI UNIX-TEAM
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal delay={0}>
              <div className="glass-effect rounded-lg p-8">
                <h3 className="text-2xl font-bold text-accent mb-4">VISI</h3>
                <p className="text-foreground/80 text-lg">
                  Menjadi komunitas game yang penuh keakraban, kekacauan terstruktur, dan solidaritas absurd tanpa arah yang jelas dan sangat menyesatkan.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-effect rounded-lg p-8">
                <h3 className="text-2xl font-bold text-accent mb-4">MISI</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li>• Menjalin keakraban dengan ngebully @katspoll bersama-sama sampai kebal mental dan naik pangkat jadi NPC legendaris.</li>
                  <li>• Membangun generasi nyawit yang alon-alon masak kalkun, sambil debat hal sepele seolah sedang sidang PBB.</li>
                  <li>• Saling mendukung untuk berproses dari orang baik-baik, menjadi kurang ajar secara kolektif dan konsisten.</li>
                  <li>• Mendukung penuh dagangan CEO Diks agar semakin rugi demi menjaga keseimbangan kosmis ekonomi UNIX.</li>
                  <li>• Saling merendahkan dan saling bully untuk mematikan hasrat gila pujian. Karena yang boleh dipuji cuma popol. Katanya sih, sudah masuk tahap disembah.</li>
                  <li>• Menjunjung tinggi solidaritas palsu, di mana gas berarti males banget dan ntar berarti brisik lu.</li>
                  <li>• Melestarikan budaya salah paham berkepanjangan, lalu berdamai tanpa menyelesaikan masalah apa pun.</li>
                  <li>• Menghormati hierarki UNIX, di mana yang paling ribut dianggap paling bijak, dan yang paling AFK paling ditakuti.</li>
                  <li>• Menciptakan lingkungan gaming yang tidak sehat secara logika, tapi hangat secara batin.</li>
                  <li>• Berkomitmen untuk selalu offline saat dibutuhkan, dan online pas lagi butuh.</li>
                  <li>• Berkomitmen untuk selalu silent leave kalo sudah bosan.</li>
                  <li>• Mengabadikan copium, hopium, dan delusionium sebagai sumber energi utama komunitas.</li>
                  <li>• Bersatu dalam perbedaan build, skill pas-pasan, dan keputusan gameplay yang jelas-jelas salah.</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-effect rounded-lg p-8 text-center">
                <p className="text-foreground/80 text-lg italic">
                  UNIX bukan tentang menang, tapi tentang ribut bersama.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
