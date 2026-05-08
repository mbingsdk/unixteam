# Content Management Guide

Panduan lengkap untuk mengelola blog posts dan dokumentasi di UNIX-TEAM website.

## Struktur Folder

```
content/
├── blog/
│   ├── getting-started-with-luau.md
│   ├── performance-optimization-tips.md
│   ├── roblox-ui-design-guide.md
│   └── [more posts...]
└── docs/
    ├── installation.md
    ├── luau-basics.md
    ├── api-basics.md
    └── [more docs...]
```

## Blog Posts

### Membuat Blog Post Baru

1. **Buat file markdown** di `content/blog/` dengan nama: `nama-artikel-anda.md`

2. **Struktur File**:

```markdown
---
title: "Judul Artikel Anda"
slug: "nama-artikel-anda"
date: "2024-05-20"
author: "Nama Penulis"
category: "Tutorial"
readingTime: "5 min read"
featured: true
description: "Deskripsi singkat artikel untuk preview di listing page."
---

# Judul Artikel

Konten artikel dimulai dari sini...

## Subheading

Paragraph dan code blocks bisa langsung ditambah di sini.

```luau
-- Contoh kode Luau
local message = "Hello, World!"
print(message)
```

---

Artikel selesai!
```

3. **Penjelasan Frontmatter**:
   - `title`: Judul artikel (ditampilkan di blog listing)
   - `slug`: URL-friendly identifier (misal: `getting-started-with-luau`)
   - `date`: Tanggal publikasi (format: YYYY-MM-DD)
   - `author`: Nama penulis
   - `category`: Kategori (Tutorial, Development, Design, Community, etc)
   - `readingTime`: Estimasi waktu baca (format: "5 min read")
   - `featured`: Boolean - tampilkan di featured section? (true/false)
   - `description`: Deskripsi singkat untuk preview

### Contoh Blog Post Real

File: `content/blog/getting-started-with-luau.md`
- **Judul**: Getting Started with Luau: A Complete Guide
- **Panjang**: 261 baris konten
- **Mencakup**: Pengantar, setup, syntax dasar, best practices, common mistakes

File: `content/blog/performance-optimization-tips.md`
- **Judul**: Performance Optimization Tips for Roblox Games
- **Panjang**: 340 baris konten
- **Mencakup**: 10 optimization techniques dengan code examples

File: `content/blog/roblox-ui-design-guide.md`
- **Judul**: Roblox UI Design: Creating Professional Interfaces
- **Panjang**: 351 baris konten
- **Mencakup**: UI fundamentals, button creation, color palettes, patterns

### Categories yang Tersedia

```
- Tutorial
- Development
- Design
- Community
- Tips & Tricks
- Case Studies
- News
```

### Cara Blog Ditampilkan

**Blog Listing Page** (`/blog`):
- Menampilkan semua articles
- Sorted by date (terbaru pertama)
- Ada search dan filter by category
- Featured articles ditampilkan lebih prominent

### Best Practices

1. **Judul yang Jelas**: "Getting Started with Luau" bukan "Luau Basics"
2. **Deskripsi Singkat**: 1-2 sentences yang menjelaskan apa yang akan dipelajari
3. **Code Examples**: Selalu ada contoh kode yang bisa dijalankan
4. **Formatting**: Gunakan headers (##, ###) untuk organize konten
5. **Links**: Link ke halaman/resources yang relevan
6. **Length**: Ideal 3-10 menit reading time (500-2000 words)

## Documentation

### Membuat Doc Page Baru

1. **Buat file markdown** di `content/docs/` dengan nama: `topik-anda.md`

2. **Struktur File**:

```markdown
---
title: "Judul Dokumentasi"
category: "Getting Started"
order: 1
---

# Judul Dokumentasi

Konten dokumentasi...

## Section 1

Content di sini.

## Section 2

Content di sini.

---

Next: [Link ke dokumen berikutnya](../next-doc)
```

3. **Penjelasan Frontmatter**:
   - `title`: Judul dokumentasi
   - `category`: Kategori doc (Getting Started, Programming, API Reference, etc)
   - `order`: Urutan dalam kategori (1, 2, 3, dst)

### Contoh Documentation Real

File: `content/docs/installation.md`
- **Kategori**: Getting Started
- **Order**: 1
- **Isi**: Prerequisites, download, setup, first part, first script, testing, shortcuts

File: `content/docs/luau-basics.md`
- **Kategori**: Programming
- **Order**: 2
- **Isi**: Variables, data types, strings, operators, conditionals, loops, functions, tables

File: `content/docs/api-basics.md`
- **Kategori**: Programming
- **Order**: 3
- **Isi**: Game structure, objects access, properties, events, services, humanoids, vectors

### Documentation Categories

```
- Getting Started
  - Installation
  - First Steps
  
- Programming
  - Luau Basics
  - API Basics
  - Advanced Patterns
  
- API Reference
  - Instance Properties
  - Services
  - Events
  
- Advanced
  - Performance
  - Optimization
  - Custom Systems
```

### Cara Docs Ditampilkan

**Documentation Page** (`/documentation`):
- Menampilkan semua docs
- Organized by category
- Linked sequentially (Next article link)
- Searchable

## File Organization Rules

### Blog Posts
```
content/blog/[slug].md

Contoh:
- getting-started-with-luau.md
- performance-optimization-tips.md
- roblox-ui-design-guide.md
```

**Requirements**:
- Slug harus match dengan `slug:` di frontmatter
- Gunakan kebab-case untuk filename (lowercase, hyphen separated)
- Satu artikel = satu file

### Documentation
```
content/docs/[slug].md

Contoh:
- installation.md
- luau-basics.md
- api-basics.md
```

**Requirements**:
- Filename harus match dengan judul (lowercase dengan hyphen)
- Order harus sequential dan unique dalam kategori
- Satu page = satu file

## Markdown Formatting Reference

### Headings
```markdown
# H1 - Judul Artikel
## H2 - Subheading
### H3 - Sub-subheading
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`Inline code`
```

### Code Blocks
```markdown
\`\`\`luau
-- Luau code
local message = "Hello"
print(message)
\`\`\`

\`\`\`javascript
// JavaScript code
console.log("Hello");
\`\`\`
```

### Lists
```markdown
- Item 1
- Item 2
  - Nested item
  
1. First
2. Second
3. Third
```

### Links
```markdown
[Link text](../relative-path)
[External link](https://example.com)
[Anchor](../#section-name)
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Blockquotes
```markdown
> This is a quote
> It can span multiple lines
```

### Horizontal Rule
```markdown
---
```

## Adding to Content Lists

### Updating Blog Listing

File: `components/sections/BlogListing.tsx`

Setiap blog post harus didaftarkan di array `blogPosts`:

```typescript
const blogPosts = [
  {
    id: '1',
    slug: 'getting-started-with-luau',
    title: 'Getting Started with Luau: A Complete Guide',
    description: 'Learn the basics...',
    date: '2024-05-15',
    readingTime: '8 min read',
    category: 'Tutorial',
    featured: true,
  },
  // Tambah post baru di sini
];
```

**Catatan**: Saat ini menggunakan hardcoded array. Untuk production, bisa di-refactor untuk membaca dari markdown files menggunakan `lib/markdown.ts`.

### Updating Documentation List

File: `app/(root)/documentation/page.tsx`

Docs akan di-load dari file system. Struktur otomatis berdasarkan frontmatter `category` dan `order`.

## Workflow untuk Menambah Konten

### Menambah Blog Post

1. Buat file di `content/blog/[slug].md`
2. Tulis dengan format yang sesuai (lihat contoh di atas)
3. Daftarkan di `components/sections/BlogListing.tsx`
4. Test di browser (reload untuk melihat perubahan)
5. Commit dan push ke repo

### Menambah Documentation

1. Buat file di `content/docs/[slug].md`
2. Pastikan `order` unique dalam kategori
3. Test di browser
4. Commit dan push ke repo

## Tips & Best Practices

### Untuk Blog Posts

1. **Tulis untuk beginners terlebih dahulu**
   - Jelaskan konsep dari dasar
   - Gunakan contoh yang relatable
   - Hindari jargon yang terlalu technical

2. **Include Praktik**
   - Setiap section sebaiknya ada code example
   - Contoh harus runnable dan tested
   - Jelaskan apa yang dilakukan code

3. **Structure Baik**
   - Gunakan headers untuk organize
   - Keep paragraphs short (2-3 sentences)
   - Use lists untuk multiple points

4. **Links & References**
   - Link ke related articles/docs
   - Link ke official Roblox docs saat perlu
   - Include links ke Discord di akhir

### Untuk Documentation

1. **Organized by Learning Path**
   - Getting Started → Programming → API → Advanced
   - Setiap section standalone tapi linked

2. **Comprehensive Examples**
   - Setiap concept harus punya code example
   - Show "Good" vs "Bad" patterns
   - Include common pitfalls

3. **Navigation Clear**
   - Setiap doc punya "Next" link
   - Category clear di top
   - Table of contents untuk long docs

4. **Keep Updated**
   - Mark yang belum diverify
   - Update saat API changes
   - Deprecate old docs jelas-jelas

## Common Mistakes to Avoid

❌ **Jangan**:
- Gunakan hardcoded paths tanpa testing
- Copy content tanpa proper attribution
- Tulis content yang outdated tanpa update date
- Gunakan contoh yang tidak runnable
- Lupa update frontmatter
- File naming yang inconsistent (CamelCase vs kebab-case)

✅ **Lakukan**:
- Test semua code examples
- Update content regularly
- Gunakan clear titles
- Include proper attribution
- Keep frontmatter consistent
- Use kebab-case untuk filenames

## Advanced: Auto-Loading from Markdown

Library `lib/markdown.ts` sudah prepared untuk auto-load dari files:

```typescript
import { getBlogPosts, getDocs } from '@/lib/markdown';

// Di component atau page
const posts = await getBlogPosts();
const docs = await getDocs();
```

Ini bisa digunakan untuk refactor dari hardcoded arrays ke dynamic loading. Untuk sekarang, menggunakan hardcoded untuk simplicity dan static export compatibility.

## Summary

- **Blog Posts** di `content/blog/[slug].md`
- **Docs** di `content/docs/[slug].md`
- **Format**: Markdown dengan YAML frontmatter
- **Registration**: Update arrays di component files
- **Best Practice**: Clear structure, good examples, up-to-date

---

Punya pertanyaan tentang content management? Ask di [Discord](/discord)!
