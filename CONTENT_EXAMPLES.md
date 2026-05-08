# Content Examples & Structure

Dokumentasi lengkap mengenai demo content yang sudah ada dan bagaimana cara menambahkan content baru.

## 📝 Blog Posts yang Sudah Ada

### 1. Getting Started with Luau: A Complete Guide
**File**: `content/blog/getting-started-with-luau.md`
- **Author**: Lex
- **Date**: 2024-05-15
- **Reading Time**: 8 min read
- **Category**: Tutorial
- **Featured**: Yes
- **Size**: 261 lines

**Konten**:
- Pengenalan Luau
- Environment setup
- Hello World
- Variables dan data types
- Control flow (if/while/for)
- Functions
- Roblox instances
- Events dan connections
- Best practices
- Common mistakes
- Next steps dan resources

**Key Point**: Artikel ini adalah entrypoint untuk complete beginners. Menjelaskan dari dasar dengan banyak code examples.

---

### 2. Performance Optimization Tips for Roblox Games
**File**: `content/blog/performance-optimization-tips.md`
- **Author**: Zyx
- **Date**: 2024-05-10
- **Reading Time**: 10 min read
- **Category**: Development
- **Featured**: Yes
- **Size**: 340 lines

**Konten**:
- Understanding performance (server, client, network)
- 10 optimization techniques dengan code examples:
  1. Instance pooling
  2. Custom properties optimization
  3. Ray casting limits
  4. Streaming enabled
  5. Part count optimization
  6. Task scheduling
  7. Cache references
  8. Debris service
  9. Rendering optimization
  10. Performance profiling

**Key Point**: Practical tips dengan before/after code examples. Setiap technique punya impact metrics.

---

### 3. Roblox UI Design: Creating Professional Interfaces
**File**: `content/blog/roblox-ui-design-guide.md`
- **Author**: Luna
- **Date**: 2024-05-05
- **Reading Time**: 7 min read
- **Category**: Design
- **Featured**: No
- **Size**: 351 lines

**Konten**:
- UI fundamentals (hierarchy, contrast, spacing)
- Professional button creation
- Color palettes
- Responsive layouts
- Custom scrolling lists
- Animations dan polish
- Accessibility tips
- Common UI patterns:
  - Loading screens
  - Health bars
- Design checklist
- Resources

**Key Point**: Complete guide untuk UI development dengan code examples dan design principles.

---

## 📚 Documentation yang Sudah Ada

### 1. Installation & Setup
**File**: `content/docs/installation.md`
- **Category**: Getting Started
- **Order**: 1
- **Size**: 155 lines

**Konten**:
- Prerequisites
- Download Roblox Studio
- Create first game
- Interface navigation (Left, Center, Right panels)
- Insert first part
- Write first script
- Test gameplay
- Keyboard shortcuts
- Settings (Autocomplete, Output, etc)
- Common issues & solutions

**Learning Goal**: Bisa buka Roblox Studio dan jalankan script pertama

---

### 2. Luau Basics
**File**: `content/docs/luau-basics.md`
- **Category**: Programming
- **Order**: 2
- **Size**: 468 lines

**Konten**:
- What is Luau
- Variables & data types
- String operations
- Arithmetic & logic operators
- Conditional statements
- Loops (for, while, table iteration)
- Functions dengan type annotations
- Tables (arrays & objects)
- Common patterns (safe access, debouncing, task scheduling)
- Best practices
- Summary & next steps

**Learning Goal**: Mengerti syntax Luau dan bisa menulis basic scripts

---

### 3. Roblox API Basics
**File**: `content/docs/api-basics.md`
- **Category**: Programming
- **Order**: 3
- **Size**: 405 lines

**Konten**:
- Game structure hierarchy
- Accessing game objects (FindFirstChild, WaitForChild, etc)
- Reading & modifying properties
- Creating objects (Parts, Models, GUI)
- Events dan connections
- Services (Players, UserInputService, TweenService, etc)
- Humanoids dan characters
- Vectors & CFrames
- Common patterns
- Summary & next steps

**Learning Goal**: Tahu cara interact dengan Roblox game objects dan services

---

## 📊 Data Structure di lib/content.ts

File `lib/content.ts` berisi sample data yang digunakan di website:

### Stats
```typescript
export const stats = [
  { label: 'Active Members', value: '5,000+', icon: '👥' },
  { label: 'Projects Built', value: '250+', icon: '🎮' },
  // ... lebih banyak
];
```

### Team Members
```typescript
export const teamMembers = [
  {
    id: '1',
    name: 'Lex',
    role: 'Founder & Lead Developer',
    bio: '...',
    avatar: '👨‍💻',
    social: { twitter, github, discord },
  },
  // ... lebih banyak
];
```

### Projects
```typescript
export const projects = [
  {
    id: '1',
    title: 'RobloxFramework',
    description: '...',
    category: 'Framework',
    status: 'Active',
    tags: ['Luau', 'Framework', 'Open Source'],
    featured: true,
  },
  // ... lebih banyak
];
```

### FAQ Items
```typescript
export const faqItems = [
  {
    id: '1',
    question: 'What is UNIX-TEAM?',
    answer: '...',
    category: 'General',
  },
  // ... lebih banyak
];
```

---

## 🎯 Cara Menambah Content Baru

### Menambah Blog Post

**Step 1**: Buat file di `content/blog/[slug].md`

```markdown
---
title: "Judul Artikel"
slug: "nama-slug"
date: "2024-05-20"
author: "Nama Penulis"
category: "Tutorial"
readingTime: "5 min read"
featured: true
description: "Deskripsi singkat"
---

# Judul Artikel

Konten dimulai di sini...
```

**Step 2**: Update `components/sections/BlogListing.tsx`

```typescript
const blogPosts = [
  // ... existing posts
  {
    id: '6',
    slug: 'nama-slug',
    title: 'Judul Artikel',
    description: 'Deskripsi singkat',
    date: '2024-05-20',
    readingTime: '5 min read',
    category: 'Tutorial',
    featured: true,
  },
];
```

**Step 3**: Test di browser
- Go to `/blog`
- Verify artikel ada di listing

---

### Menambah Documentation

**Step 1**: Buat file di `content/docs/[slug].md`

```markdown
---
title: "Judul Dokumentasi"
category: "Getting Started"
order: 1
---

# Judul Dokumentasi

Konten dimulai di sini...
```

**Step 2**: Dokumentasi otomatis di-load ke halaman `/documentation`

**Step 3**: Update frontmatter jika perlu
- Change `order` untuk reorder
- Update `category` untuk kategorisasi berbeda

---

### Menambah Data ke lib/content.ts

Buka `lib/content.ts` dan add ke array yang sesuai:

```typescript
// Untuk team members
export const teamMembers = [
  // ... existing
  {
    id: '5',
    name: 'New Member',
    role: 'Role',
    bio: 'Bio',
    avatar: '🎨',
    social: { twitter, github, discord },
  },
];

// Untuk projects
export const projects = [
  // ... existing
  {
    id: '7',
    title: 'New Project',
    description: 'Description',
    category: 'Library',
    status: 'Active',
    tags: ['tag1', 'tag2'],
    featured: true,
  },
];

// Untuk FAQ
export const faqItems = [
  // ... existing
  {
    id: '9',
    question: 'New Question?',
    answer: 'New Answer',
    category: 'General',
  },
];
```

---

## 📁 File Organization

```
UNIX-TEAM/
├── content/
│   ├── blog/                    # Blog posts (Markdown)
│   │   ├── getting-started-with-luau.md
│   │   ├── performance-optimization-tips.md
│   │   ├── roblox-ui-design-guide.md
│   │   └── [new-article].md
│   │
│   └── docs/                    # Documentation (Markdown)
│       ├── installation.md
│       ├── luau-basics.md
│       ├── api-basics.md
│       └── [new-doc].md
│
├── lib/
│   ├── content.ts               # Static data (teams, projects, FAQ, etc)
│   ├── markdown.ts              # Utility untuk parse markdown
│   ├── i18n.ts                  # Internationalization
│   ├── seo.ts                   # SEO utilities
│   └── utils.ts
│
├── components/
│   └── sections/
│       ├── BlogListing.tsx       # Blog posts display
│       ├── DiscordContent.tsx
│       ├── FAQAccordion.tsx      # FAQ display
│       └── [other sections]
│
├── app/
│   ├── (root)/
│   │   ├── blog/
│   │   │   └── page.tsx         # /blog
│   │   ├── documentation/
│   │   │   └── page.tsx         # /documentation
│   │   ├── faq/
│   │   │   └── page.tsx         # /faq
│   │   └── [other routes]
│   │
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── CONTENT_MANAGEMENT.md        # Detailed management guide
├── CONTENT_EXAMPLES.md          # This file
├── QUICK_START.md               # Quick reference
├── DEPLOYMENT.md                # Deploy guide
└── [other files]
```

---

## 🎓 Content Guidelines

### Blog Post Guidelines

✅ **Baik**:
- Clear, specific titles ("Getting Started with Luau" bukan "Luau Guide")
- 500-2000 words (3-10 min read)
- Multiple code examples
- Before/after comparisons
- Links ke related content
- Include Discord link

❌ **Hindari**:
- Vague titles
- Terlalu pendek atau panjang
- No code examples
- Outdated information
- Typos dan grammar errors

### Documentation Guidelines

✅ **Baik**:
- Progressive learning path
- Comprehensive examples
- Table of contents untuk long docs
- Next/Previous navigation
- Clear section headings
- "Summary" di akhir

❌ **Hindari**:
- Random ordering
- Incomplete examples
- Dead links
- Outdated API references

---

## 📈 Content Roadmap

### Q2 2024 (Current)
✅ Getting Started with Luau - Complete
✅ Performance Optimization - Complete
✅ UI Design Guide - Complete
✅ Installation & Setup - Complete
✅ Luau Basics - Complete
✅ API Basics - Complete

### Q3 2024 (Planned)
- [ ] Advanced Patterns Guide
- [ ] Networking in Roblox
- [ ] Game Architecture Best Practices
- [ ] Monetization Guide
- [ ] Plugin Development

### Q4 2024 (Planned)
- [ ] Video Tutorials
- [ ] Community Showcase
- [ ] Case Studies
- [ ] Migration Guides

---

## 🔗 Quick Links

- **Content Management**: See `CONTENT_MANAGEMENT.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Quick Start**: See `QUICK_START.md`
- **Discord Community**: `/discord` route

---

**Punya ide untuk blog post atau dokumentasi baru?**
Share di Discord atau submit pull request di GitHub!
