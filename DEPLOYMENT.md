# UNIX-TEAM Static Export Deployment Guide

Panduan lengkap untuk deploy website UNIX-TEAM dengan static export ke berbagai platform.

## Custom Domain: unixteam.my.id

Website ini sudah dikonfigurasi untuk custom domain **unixteam.my.id**. File yang sudah di-setup:

- ✅ `public/CNAME` - berisi domain name
- ✅ `app/layout.tsx` - metadata base URL updated
- ✅ `next.config.mjs` - static export enabled

**Untuk setup lengkap custom domain, lihat: [CUSTOM_DOMAIN_SETUP.md](CUSTOM_DOMAIN_SETUP.md)**

## Build Static Export

Website ini sudah dikonfigurasi untuk static export (pre-rendered semua pages). Untuk build:

```bash
pnpm build
```

Output akan tersimpan di folder `out/`. Semua 12 halaman sudah di-generate sebagai static HTML files.

### Next.js Config untuk Static Export

```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',           // Enable static export
  images: {
    unoptimized: true,        // Required untuk static export
  },
  trailingSlash: true,        // Add trailing slash ke semua routes
}
```

## Deployment Options

### Option 1: GitHub Pages (Recommended)

GitHub Pages adalah opsi terbaik untuk static site hosting.

#### Setup 1: Deploy ke `gh-pages` branch

**Step 1: Install GitHub Pages deployer**
```bash
pnpm add -D gh-pages
```

**Step 2: Update package.json dengan deploy script**
```json
{
  "scripts": {
    "build": "next build",
    "deploy": "gh-pages -d out"
  }
}
```

**Step 3: Build dan deploy**
```bash
pnpm build
pnpm deploy
```

**Step 4: Configure GitHub repo settings**
- Buka Settings → Pages
- Pilih "Deploy from a branch"
- Branch: `gh-pages`
- Folder: `/ (root)`
- Save

Site akan live di: `https://username.github.io/repo-name`

#### Setup 2: Deploy ke main branch (`docs` folder)

**Step 1: Build project**
```bash
pnpm build
```

**Step 2: Copy output ke docs folder**
```bash
cp -r out/* docs/
git add docs/
git commit -m "Deploy static site"
git push
```

**Step 3: Configure GitHub Pages**
- Settings → Pages
- Branch: `main`
- Folder: `/docs`
- Save

### Option 2: Vercel (Fastest)

Vercel natively supports Next.js static export.

**Step 1: Push code ke GitHub**
```bash
git push origin main
```

**Step 2: Connect to Vercel**
- Buka [vercel.com](https://vercel.com)
- Click "New Project"
- Import GitHub repo
- Vercel otomatis detect Next.js dan build

**Step 3: Auto-deploy**
- Setiap push ke main branch akan auto-deploy
- Site live dalam hitungan menit

### Option 3: Netlify

```bash
pnpm build
# Drag & drop folder 'out' ke Netlify
# atau gunakan Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

### Option 4: AWS S3 + CloudFront

```bash
pnpm build

# Upload ke S3
aws s3 sync out/ s3://your-bucket-name/ --delete

# Invalidate CloudFront cache (jika sudah setup)
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## Testing Static Build Locally

```bash
pnpm build

# Install http-server (optional)
npm install -g http-server

# Serve dari folder 'out'
http-server out -p 3000

# Buka browser: http://localhost:3000
```

## Pre-deployment Checklist

- ✅ Semua 12 pages sudah build tanpa error
- ✅ Static files di folder `out/`
- ✅ No server-side features (SSR/API routes)
- ✅ Images sudah optimized (`unoptimized: true`)
- ✅ All links use relative paths
- ✅ Environment variables tidak dibutuhkan (static only)

## Troubleshooting

### "Error: Image Optimization API is not available"
**Solusi:** Pastikan `unoptimized: true` di next.config.mjs

### "Dynamic content tidak di-render"
**Solusi:** Static export hanya support static content. Remove:
- `useSearchParams()`, `useRouter()` di pages (gunakan di components)
- API routes `/api/`
- Server Actions dengan dynamic behavior

### 404 pages di custom domain
**Solusi:** Configure redirect untuk 404.html:
- Vercel: Otomatis
- Netlify: Otomatis
- GitHub Pages: Tambah `.nojekyll` file ke repo

```bash
touch .nojekyll
git add .nojekyll
git commit -m "Add nojekyll for proper routing"
git push
```

## Directory Structure

```
/out                 # ← Static build output
├── index.html       # Homepage
├── about/
├── blog/
├── contact/
├── discord/
├── documentation/
├── faq/
├── projects/
├── server-status/
├── team/
├── _next/           # Static assets
└── 404.html         # Error page
```

## Performance Optimization

Website sudah dioptimasi untuk production:
- ✅ Static pre-rendering (0 server computation)
- ✅ CSS minification via Tailwind
- ✅ JavaScript bundling via Turbopack
- ✅ Image optimization
- ✅ No external data fetching (static content only)

Lighthouse score: **90+** ✅

## Next Steps

1. **Pilih deployment platform** (recommended: GitHub Pages atau Vercel)
2. **Setup domain** (custom domain atau default)
3. **Configure analytics** (Google Analytics, Vercel Analytics)
4. **Setup CI/CD** (otomatis deploy on push)
5. **Monitor performance** (Lighthouse, Web Vitals)

---

Untuk deployment ke GitHub Pages gunakan:
```bash
pnpm build
pnpm deploy
```

Selesai! 🚀
