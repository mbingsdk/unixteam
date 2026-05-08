# Content Quick Reference Card

Quick cheat sheet untuk mengelola blog & docs. Print atau simpan untuk referensi.

## Blog Posts Checklist

### Before Publishing
- [ ] Title adalah specific dan descriptive
- [ ] Description singkat (1-2 sentences)
- [ ] Author name ditambahkan
- [ ] Category sesuai (Tutorial, Development, Design, Community)
- [ ] Featured = true jika article penting
- [ ] Reading time estimate sudah ada
- [ ] Minimal 500 words content
- [ ] Minimal 3 code examples

### File Naming
```
content/blog/[kebab-case-slug].md
✅ getting-started-with-luau.md
❌ Getting Started With Luau.md
❌ gettingstartedwithluau.md
```

### Frontmatter Template
```markdown
---
title: "Exact Title Here"
slug: "exact-slug-here"
date: "2024-05-20"
author: "Author Name"
category: "Category"
readingTime: "5 min read"
featured: true
description: "1-2 sentence description for preview."
---
```

### Update BlogListing.tsx
```typescript
const blogPosts = [
  // ... existing
  {
    id: '6',
    slug: 'exact-slug-here',
    title: 'Exact Title Here',
    description: '1-2 sentence description',
    date: '2024-05-20',
    readingTime: '5 min read',
    category: 'Category',
    featured: true,
  },
];
```

---

## Documentation Checklist

### Before Publishing
- [ ] Title adalah clear dan descriptive
- [ ] Category sudah ditentukan
- [ ] Order unique dalam category
- [ ] Minimal 2 sections
- [ ] Include minimal 2 code examples
- [ ] "Next steps" di akhir
- [ ] Links to related docs
- [ ] Proofread untuk typos

### File Naming
```
content/docs/[kebab-case-slug].md
✅ installation.md
✅ luau-basics.md
❌ Installation Guide.md
❌ lua-basics.md
```

### Frontmatter Template
```markdown
---
title: "Clear Title Here"
category: "Category Name"
order: 3
---
```

### Category Convention
```
Getting Started
├── installation (order: 1)
├── first-steps (order: 2)

Programming
├── luau-basics (order: 1)
├── api-basics (order: 2)
├── advanced-patterns (order: 3)

API Reference
├── services (order: 1)
├── events (order: 2)

Advanced
├── performance (order: 1)
```

---

## Content Frontmatter Reference

### Blog Post Frontmatter
| Field | Type | Required | Example |
|-------|------|----------|---------|
| title | string | Yes | "Getting Started with Luau" |
| slug | string | Yes | "getting-started-with-luau" |
| date | date | Yes | "2024-05-20" |
| author | string | Yes | "Lex" |
| category | string | Yes | "Tutorial" |
| readingTime | string | Yes | "5 min read" |
| featured | boolean | No | true |
| description | string | Yes | "Short description" |

### Documentation Frontmatter
| Field | Type | Required | Example |
|-------|------|----------|---------|
| title | string | Yes | "Luau Basics" |
| category | string | Yes | "Programming" |
| order | number | Yes | 2 |

---

## Data Structure Updates

### Adding to lib/content.ts

#### Adding Team Member
```typescript
export const teamMembers = [
  // ... existing
  {
    id: '5',
    name: 'Name',
    role: 'Role Title',
    bio: 'Short bio',
    avatar: '🎨',  // emoji
    social: {
      twitter: 'https://twitter.com/handle',
      github: 'https://github.com/handle',
      discord: 'username#1234',
    },
  },
];
```

#### Adding Project
```typescript
export const projects = [
  // ... existing
  {
    id: '7',
    title: 'Project Name',
    description: 'Short description',
    category: 'Framework|Library|Tool',
    status: 'Active|In Development|Archived',
    tags: ['tag1', 'tag2', 'tag3'],
    featured: true,
  },
];
```

#### Adding FAQ
```typescript
export const faqItems = [
  // ... existing
  {
    id: '9',
    question: 'Question here?',
    answer: 'Answer here',
    category: 'General|Technical|Community|Learning',
  },
];
```

---

## Common Content Formats

### Code Block with Language
```markdown
\`\`\`luau
-- Luau code
local message = "Hello"
print(message)
\`\`\`

\`\`\`javascript
// JavaScript
console.log("Hello");
\`\`\`
```

### Admonitions / Callouts
```markdown
> **Note**: This is important

> **Warning**: Be careful!

> **Tip**: Pro tip here
```

### Lists
```markdown
- Bullet point
- Another point
  - Nested point

1. First
2. Second
3. Third
```

### Links
```markdown
[Internal](../documentation)
[External](https://example.com)
[Discord](/discord)
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

---

## File Sizes Reference

For content planning, ideal sizes:

### Blog Posts
- Minimum: 3 min read (~500 words)
- Ideal: 5-10 min read (~800-1600 words)
- Maximum: 15 min read (~2500 words)

### Documentation
- Minimum: 2 sections with examples
- Ideal: 3-4 comprehensive sections
- Maximum: Unlimited, but break into multiple pages if >3000 words

---

## Existing Content Summary

### Blog Posts (3 files)
1. **getting-started-with-luau.md** (261 lines, 8 min)
   - Complete beginner guide to Luau
   
2. **performance-optimization-tips.md** (340 lines, 10 min)
   - 10 optimization techniques with examples
   
3. **roblox-ui-design-guide.md** (351 lines, 7 min)
   - Complete UI design guide with patterns

### Documentation (3 files)
1. **installation.md** (155 lines)
   - Setup Roblox Studio, first script
   
2. **luau-basics.md** (468 lines)
   - Complete Luau language reference
   
3. **api-basics.md** (405 lines)
   - Roblox game objects and services

### Sample Data (lib/content.ts)
- 4 stats items
- 4 team members
- 6 projects
- 8 FAQ items
- 4 social links

---

## Markdown Formatting Cheat Sheet

```markdown
# H1 Title
## H2 Subheading
### H3 Sub-subheading

**Bold** *Italic* ~~Strike~~

- List item
- List item

1. Numbered
2. Numbered

[Link text](url)

\`\`\`language
code here
\`\`\`

| Col 1 | Col 2 |
|-------|-------|
| Cell  | Cell  |

> Quote
```

---

## Testing Before Publishing

### Blog Post Testing
```
1. File created at: content/blog/[slug].md ✓
2. Frontmatter correct ✓
3. Added to BlogListing.tsx ✓
4. npm run build succeeds ✓
5. /blog page shows article ✓
```

### Documentation Testing
```
1. File created at: content/docs/[slug].md ✓
2. Frontmatter correct ✓
3. npm run build succeeds ✓
4. /documentation page shows doc ✓
```

---

## Useful Commands

### Build & Test
```bash
# Development
npm run dev

# Production build
npm run build

# Local static testing
npm install -g http-server
cd out
http-server
```

### Edit Content
```bash
# Add new blog post
nano content/blog/my-post.md

# Add new doc
nano content/docs/my-doc.md

# Update data
nano lib/content.ts
```

---

## Common Mistakes & Solutions

| Mistake | Solution |
|---------|----------|
| Slug doesn't match filename | Make them identical with kebab-case |
| frontmatter incomplete | Copy from existing template |
| Not added to list | Update BlogListing.tsx or component |
| Build fails | Check syntax, imports, frontmatter |
| Order not sequential | Use numbers 1, 2, 3, etc in docs |
| Featured but not visible | Rebuild and clear browser cache |

---

## Next Content Ideas

- [ ] Advanced Patterns Guide
- [ ] Networking in Multiplayer
- [ ] Game Architecture Best Practices
- [ ] Monetization Systems
- [ ] Plugin Development
- [ ] Performance Profiling
- [ ] Security Best Practices
- [ ] Community Case Studies

---

## Quick Links

- 📖 Full Guide: `CONTENT_MANAGEMENT.md`
- 📚 Examples: `CONTENT_EXAMPLES.md`
- 🚀 Deploy: `DEPLOYMENT.md`
- ⚡ Quick Start: `QUICK_START.md`

---

**Print this card or save to Notion for quick reference!**
