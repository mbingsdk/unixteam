# UNIX-TEAM Website

> Komunitas Game Tidak Sehat Dan Sangat Menyesatkan

[![Status](https://img.shields.io/badge/status-entah-yellow)](https://unixteam.my.id)
[![Build](https://img.shields.io/badge/build-kadang%20works-green)](https://unixteam.my.id)
[![Copium](https://img.shields.io/badge/copium-unlimited-blue)](https://discord.gg/unix-team)
[![AFK](https://img.shields.io/badge/maintainer-AFK-red)](https://discord.gg/unix-team)
[![License](https://img.shields.io/badge/license-UNIX%20Public%20License-orange)](./LICENSE)

---

## Apa Ini?

Website resmi UNIX-TEAM. Dibuat dengan serius tapi tujuannya tidak jelas. Kalau kamu nyasar ke sini dan bingung, itu bukan bug itu memang kondisi default semua orang yang pertama kali ketemu UNIX.

---

## Tech Stack

| Technology | Kenapa Dipilih |
|---|---|
| Next.js 16 | Karena ada yang bilang "gas pakai Next.js" dan semua langsung setuju tanpa tahu alasannya |
| TypeScript | Supaya errornya lebih deskriptif sebelum app-nya crash |
| Tailwind CSS | Karena nulis CSS manual adalah bentuk self-harm |
| Framer Motion | Animasinya keliatan keren, padahal kontennya sama aja |
| shadcn/ui | Copy-paste komponen adalah seni |
| bcryptjs | Password-nya di-hash tapi tetap `admin123` |

---

## Fitur

- ✅ Halaman yang **kadang** load
- ✅ Blog yang isinya dokumentasi kekacauan
- ✅ Team page untuk flex foto member
- ✅ FAQ yang tidak menjawab pertanyaan yang sebenarnya
- ✅ Admin panel yang cuma bisa diakses pas `next dev` karena kita ga mampu bayar server
- ✅ Dark mode (hanya dark mode, karena light mode adalah musuh)
- ✅ SEO yang kata GPT sudah bagus
- ⏳ Fitur lain **ntar**

---

## Instalasi

```bash
# Clone repo ini
git clone https://github.com/mbingsdk/unixteam.git

# Masuk ke folder
cd unixteam

# Install dependencies
pnpm install
# Kalau error, coba lagi. Kalau masih error, restart laptop. Kalau masih error, ini bukan salahmu.

# Jalankan development server
pnpm dev

# Buka browser ke http://localhost:3000
# Kalau blank, tunggu. Kalau tetap blank, tunggu lebih lama.
```

---

## Environment Variables

Buat file `.env.local` di root project:

```env
# Formspree ID untuk contact form
# Kalau ga diisi, form-nya tetap ada tapi ga bisa kirim pesan
# Jujur sih ga ada yang balas emailnya juga
NEXT_PUBLIC_FORMSPREE_ID=isi_kalau_mau

# Variabel lain yang mungkin ada di masa depan
# (copium)
```

---

## Struktur Project

```
unixteam/
├── app/                    # Halaman-halaman
│   ├── admin/              # Area admin, dev-only, jangan di-deploy
│   ├── api/                # API routes, juga dev-only
│   └── ...                 # Halaman lain yang ada karena harus ada
├── components/             # Komponen reusable yang kadang di-reuse
├── data/                   # JSON files, sumber kebenaran tunggal
├── lib/                    # Utilities dan helpers
├── public/                 # Assets, gambar member yang kadang ga ada fotonya
├── scripts/                # Build scripts dan sihir lainnya
└── README.md               # Yang lagi kamu baca ini
```

---

## Build & Deploy

```bash
# Build untuk production (static export)
pnpm build

# Deploy ke GitHub Pages
pnpm deploy

# Build sekaligus deploy (recommended karena males dua langkah)
pnpm build-and-deploy
```

> **Catatan:** Admin panel dan API routes otomatis disembunyikan saat build. Bukan karena alasan keamanan yang canggih, tapi karena GitHub Pages tidak support server-side code dan kita terlalu miskin untuk hosting lain.

---

## Kontribusi

**Boleh banget.** Caranya:

1. Fork repo ini
2. Buat branch baru (`git checkout -b fitur/ide-gila-lu`)
3. Commit perubahan (`git commit -m 'tambah sesuatu yang mungkin berguna'`)
4. Push ke branch (`git push origin fitur/ide-gila-lu`)
5. Buat Pull Request
6. Tunggu di-review **ntar**

Kalau PR kamu di-ignore selama lebih dari seminggu, itu bukan penolakan. Maintainer-nya lagi AFK. Coba ping di Discord.

---

## Melaporkan Bug

Kalau nemuin bug:

1. Cek dulu apakah itu memang bug atau feature yang tidak terdokumentasi
2. Kalau yakin itu bug, buka Issue di GitHub
3. Atau lapor di Discord channel `#support`
4. Atau diam saja dan berharap hilang sendiri (metode yang paling umum dipakai)

---

## Pertanyaan Umum

**Q: Kenapa websitenya begini?**
A: Karena yang bikinnya juga begini.

**Q: Kapan fitur X ditambahkan?**
A: Ntar.

**Q: Siapa yang maintain website ini?**
A: Secara teknis ada orangnya. Secara praktis, tanya Discord.

**Q: Boleh saya pakai kode ini?**
A: Baca LICENSE. Singkatnya: boleh, tapi konsekuensinya tanggung sendiri.

---

## Acknowledgements

Terima kasih kepada:

- **Semua member UNIX-TEAM** yang rela jadi bahan dokumentasi
- **@katspoll** yang tanpa sadar menjadi karakter sentral budaya ini
- **Popol** yang sudah mencapai level disembah
- **CEO Diks** yang dengan setia terus rugi demi komunitas
- **Stack Overflow** atas jawaban-jawaban yang tidak selalu relevan tapi tetap dicoba
- **GPT** dan **CLAUDE** atas kode yang kadang works
- **Kopi** atas eksistensinya

---

## License

[UNIX Public License (UPL-1.0)](./LICENSE) Intinya: Hak cipta diabaikan bersama, bebas pakai, tapi jangan salahkan kami.

---

*"UNIX bukan tentang menang, tapi tentang ribut bersama."*

*Website ini dibuat dengan ☕, copium, dan koneksi internet yang sering putus.*