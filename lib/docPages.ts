export interface DocSection {
  title: string;
  content: string;
  code?: string;
  tips?: string;
  subsections?: Array<{
    title: string;
    content: string;
    code?: string;
  }>;
}

export interface DocPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  sections: DocSection[];
}

// export const docPages: DocPage[] = [
//   {
//     id: '1',
//     slug: 'cara-join',
//     title: 'Cara Join UNIX (Dan Kenapa Kamu Mungkin Akan Menyesal)',
//     description: 'Panduan resmi tidak resmi untuk bergabung ke komunitas yang tidak sehat tapi entah kenapa hangat ini.',
//     category: 'Memulai',
//     order: 1,
//     sections: [
//       {
//         title: 'Syarat untuk Join',
//         content: 'Tidak ada. Ini bukan typo. Benar-benar tidak ada syarat. Tidak perlu umur minimal, tidak perlu pengalaman gaming, tidak perlu keahlian khusus, tidak perlu nulis motivation letter. Cukup punya Discord dan mau ribut.',
//         tips: 'Kalau kamu mencari komunitas dengan seleksi ketat dan hierarki formal, kamu salah tempat. Kalau kamu mencari tempat gabut yang entah kenapa produktif, lanjutkan membaca.',
//       },
//       {
//         title: 'Proses Join',
//         content: 'Klik link Discord. Itu saja. Serius.',
//         subsections: [
//           {
//             title: 'Langkah 1',
//             content: 'Klik link Discord yang tersedia di halaman utama website ini.',
//           },
//           {
//             title: 'Langkah 2',
//             content: 'Kamu sudah masuk. Selamat atau turut berduka, tergantung perspektif.',
//           },
//           {
//             title: 'Langkah 3 (Opsional)',
//             content: 'Baca rules. Tapi kalau tidak mau baca pun tidak ada konsekuensinya, karena isi rules pada dasarnya hanya "kamu bebas melakukan apapun".',
//           },
//         ],
//       },
//       {
//         title: 'Apa yang Terjadi Setelah Join',
//         content: 'Beberapa skenario yang mungkin terjadi, berurutan dari paling umum ke paling jarang.',
//         subsections: [
//           {
//             title: 'Skenario A: Tidak Ada yang Notice',
//             content: 'Paling umum. Kamu masuk, channel penuh percakapan yang tidak kamu mengerti, dan tidak ada yang menyapa. Ini bukan tanda penolakan. Semua orang sibuk ribut. Beri waktu.',
//           },
//           {
//             title: 'Skenario B: Langsung Dibully',
//             content: 'Ini justru tanda bagus. Berarti ada yang notice kehadiranmu dan menganggapmu cukup menarik untuk diganggu. Respon dengan santai dan kamu akan baik-baik saja.',
//           },
//           {
//             title: 'Skenario C: Disambut dengan Hangat',
//             content: 'Sangat jarang terjadi tapi pernah ada presedennya. Kalau ini terjadi, jangan terlalu terharu besoknya kamu tetap akan dibully.',
//           },
//         ],
//         tips: 'Perkenalan tidak wajib. Tapi kalau mau perkenalan, hindari terlalu formal. "Halo, nama saya X, saya tertarik bergabung karena..." akan langsung mendapat reaksi yang tidak ingin kamu terima.',
//       },
//       {
//         title: 'Cara Keluar Kalau Sudah Bosan',
//         content: 'Leave saja. Tanpa pamit, tanpa pengumuman, tanpa drama. Silent leave adalah budaya yang dihormati di UNIX. Kalau mau balik lagi, juga tidak perlu announcement masuk saja seolah tidak pernah pergi. Tidak ada yang akan nanya kemana saja.',
//       },
//     ],
//   },
//   {
//     id: '2',
//     slug: 'hierarki-unix',
//     title: 'Hierarki Tidak Resmi UNIX yang Tidak Diakui tapi Semua Tahu',
//     description: 'Peta tatanan sosial absurd di UNIX yang tidak pernah ditulis tapi berjalan dengan konsistensi yang mengkhawatirkan.',
//     category: 'Memulai',
//     order: 2,
//     sections: [
//       {
//         title: 'Disclaimer Penting',
//         content: 'UNIX secara resmi tidak memiliki hierarki. Tidak ada struktur jabatan, tidak ada ketua, tidak ada moderator dengan kekuasaan nyata. Dokumen ini tidak resmi dan tidak diakui oleh siapapun. Tapi kalau kamu sudah cukup lama di sini, kamu tahu ini akurat.',
//       },
//       {
//         title: 'Tingkatan yang Ada',
//         content: 'Ada beberapa level tidak resmi yang diakui secara kolektif tanpa pernah dibahas secara eksplisit.',
//         subsections: [
//           {
//             title: 'Member Baru',
//             content: 'Fase awal semua orang. Ditandai dengan tidak mengerti konteks apapun, sering salah baca situasi, dan jadi target bully yang dimaafkan karena "belum tahu". Fase ini berlangsung antara seminggu sampai sebulan, tergantung seberapa cepat kamu menyerap budaya lokal.',
//           },
//           {
//             title: 'Member Biasa',
//             content: 'Sudah paham konteks, sudah punya inside joke sendiri, sudah tahu siapa yang jangan diganggu dan siapa yang aman untuk dibulli. Mayoritas populasi UNIX ada di sini. Tidak ada ambisi untuk naik level, dan itu sepenuhnya valid.',
//           },
//           {
//             title: 'Yang Paling Ribut',
//             content: 'Level informal yang dicapai melalui konsistensi ribut yang tinggi dan pendapat-pendapat yang selalu memancing diskusi. Dianggap paling bijak bukan karena paling benar, tapi karena paling banyak ngomong dan masih didengarkan.',
//           },
//           {
//             title: 'AFK Legend',
//             content: 'Paradoks tertinggi dalam hierarki UNIX. Paling jarang online, tapi paling ditakuti. Ketika mereka muncul, semua notice. Ketika mereka ngomong, semua dengerin. Ketika mereka pergi lagi, semua masih membahas apa yang mereka bilang tadi.',
//           },
//         ],
//       },
//       {
//         title: 'Posisi Khusus yang Tidak Masuk Hierarki Normal',
//         content: 'Beberapa entitas di UNIX memiliki posisi yang tidak bisa dikategorikan dalam hierarki standar.',
//         subsections: [
//           {
//             title: 'Popol',
//             content: 'Satu-satunya entitas yang boleh dipuji di UNIX tanpa mendapat reaksi negatif. Posisinya ada di atas semua hierarki normal dan tidak bisa diganggu gugat. Tidak ada yang tahu persis bagaimana Popol bisa mencapai status ini. Ada yang bilang sudah masuk tahap disembah. Tidak ada yang membantah.',
//           },
//           {
//             title: 'CEO Diks',
//             content: 'Jabatan yang terdengar bergengsi tapi secara operasional adalah posisi paling tragis di UNIX. Tugasnya berdagang. Misinya yang didukung penuh oleh komunitas adalah terus rugi demi menjaga keseimbangan kosmis ekonomi UNIX. Tidak ada yang benar-benar mengerti kenapa ini harus terjadi, tapi semua sepakat bahwa itu perlu.',
//           },
//           {
//             title: '@katspoll: NPC Legendaris',
//             content: 'Bukan member biasa, bukan AFK Legend. @katspoll telah bertransendensi dari kategori member dan menjadi karakter bagian dari cerita yang tidak bisa dihapus tanpa mengubah identitas komunitas itu sendiri.',
//           },
//         ],
//         tips: 'Jangan mencoba merebut posisi-posisi khusus ini. Mereka tidak bisa direbut. Mereka terbentuk secara organik dan waktu yang memutuskan siapa yang mendapatkannya.',
//       },
//     ],
//   },
//   {
//     id: '3',
//     slug: 'budaya-unix',
//     title: 'Budaya dan Tradisi UNIX yang Wajib Tapi Tidak Pernah Diajarkan',
//     description: 'Kompilasi norma, kebiasaan, dan tradisi tidak tertulis yang membentuk identitas UNIX sebagai komunitas yang aneh tapi entah kenapa berfungsi.',
//     category: 'Komunitas',
//     order: 3,
//     sections: [
//       {
//         title: 'Mengapa Budaya Ini Tidak Tertulis',
//         content: 'Karena tidak ada yang sempat menulisnya. Komunitas ini tumbuh terlalu organik dan terlalu cepat untuk didokumentasikan dengan benar. Dokumen ini adalah upaya pertama, dan sudah terlambat beberapa bulan dari seharusnya.',
//       },
//       {
//         title: 'Tradisi Inti',
//         content: 'Beberapa praktik yang sudah menjadi bagian tak terpisahkan dari kehidupan UNIX.',
//         subsections: [
//           {
//             title: 'Silent Leave',
//             content: 'Pergi tanpa pamit. Ini bukan ketidaksopanan ini efisiensi komunikasi. Tidak ada yang perlu tahu kamu pergi. Kalau kamu kembali, tidak ada yang perlu tahu kamu sudah kembali. Kamu hanya ada atau tidak ada, dan itu cukup.',
//           },
//           {
//             title: 'Ritual Bully @katspoll',
//             content: 'Bukan bullying dalam arti negatif ini lebih ke olahraga komunal. Setiap member, cepat atau lambat, akan ikut berpartisipasi. @katspoll tidak keberatan, atau setidaknya sudah melewati fase keberatan.',
//           },
//           {
//             title: 'Debat Sidang PBB',
//             content: 'Topik apapun bisa berubah menjadi debat serius kalau timing-nya tepat. Pilihan topping pizza, meta game yang sudah tidak relevan, atau pendapat tentang karakter fiksi bisa berlangsung berjam-jam dengan argumen yang lebih terstruktur dari diskusi kebanyakan orang tentang hal-hal yang sebenarnya penting.',
//           },
//         ],
//       },
//       {
//         title: 'Filosofi Tidak Resmi UNIX',
//         content: 'Ada beberapa prinsip yang dipegang secara kolektif, walaupun tidak ada yang pernah menyebutkannya sebagai prinsip.',
//         subsections: [
//           {
//             title: 'Alon-Alon Masak Kalkun',
//             content: 'Pendekatan UNIX terhadap segala hal yang membutuhkan usaha. Tidak perlu terburu-buru. Kerjakan dengan santai, sambil ngobrol, sambil ribut kalau perlu. Hasilnya mungkin datang lebih lambat dari yang seharusnya. Tapi lebih baik selesai dengan tenang daripada selesai dengan burnout.',
//           },
//           {
//             title: 'Copium sebagai Bahan Bakar',
//             content: 'UNIX berjalan di atas copium kolektif. Harapan yang secara logis tidak mungkin terwujud tapi tetap dipelihara bersama. Ada yang bilang ini tidak sehat. Tapi tanpa copium, separuh project UNIX tidak akan pernah dimulai dan meskipun tidak selesai, setidaknya sudah dimulai.',
//           },
//           {
//             title: 'Solidaritas yang Kelihatannya Palsu',
//             content: 'Semua orang bilang gas tapi tidak ada yang bergerak. Semua orang bilang ntar tapi tidak ada yang tahu kapan. Tapi ketika ada yang benar-benar butuh sesuatu ketika situasinya nyata dan mendesak entah dari mana, orang-orang muncul. Solidaritasnya terlihat palsu di permukaan, tapi strukturnya ada di bawah.',
//           },
//         ],
//         tips: 'Tidak perlu mencoba memahami semua ini sekaligus. Sebagian besar hal di UNIX baru masuk akal setelah kamu mengalaminya, bukan setelah kamu membacanya.',
//       },
//     ],
//   },
// ];