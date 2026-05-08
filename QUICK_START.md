# UNIX-TEAM Website - Quick Start Guide

Panduan cepat untuk build dan deploy website UNIX-TEAM.

## 1. Build Static Export (5 menit)

```bash
# Build semua pages menjadi static HTML
pnpm build

# Output tersimpan di folder 'out/'
# Sudah ready untuk deploy ke hosting apapun
```

## 2. Deploy ke GitHub Pages (10 menit)

### Setup Pertama Kali

```bash
# 1. Install gh-pages (sudah di package.json)
pnpm install

# 2. Build project
pnpm build

# 3. Deploy ke GitHub Pages
pnpm deploy
```

### GitHub Settings

Setelah `pnpm deploy`, setup repository:

1. Go ke GitHub repo → **Settings** → **Pages**
2. Pilih **Deploy from a branch**
3. Branch: `gh-pages` (akan otomatis muncul setelah deploy)
4. Folder: `/root`
5. Click **Save**

Website akan live di: `https://username.github.io/unix-team`

### Custom Domain (optional)

1. Buka repo → **Settings** → **Pages**
2. Di bagian "Custom domain", masukkan: `unix-team.com`
3. Pastikan DNS record sudah setup:
   ```
   CNAME: your-domain.com → username.github.io
   ```

## 3. Test Locally (2 menit)

```bash
# Install http-server (jika belum)
npm install -g http-server

# Build
pnpm build

# Run local server
cd out
http-server -p 3000

# Buka browser: http://localhost:3000
```

## 4. Auto-Deploy Setup (GitHub Actions)

Workflow sudah setup di `.github/workflows/deploy.yml`

Setiap push ke `main` branch akan:
- ✅ Auto-build
- ✅ Auto-deploy ke GitHub Pages
- ✅ Website auto-update dalam 2 menit

Cara cek status:
1. GitHub repo → **Actions**
2. Lihat latest workflow run
3. Check deployment success

## Command Reference

```bash
# Development
pnpm dev              # Local dev server (port 3000)

# Production
pnpm build            # Build static files
pnpm start            # Run production server (untuk testing)
pnpm build-and-deploy # Build + deploy ke GitHub Pages

# Testing
npm install -g http-server
http-server out -p 3000
```

## Project Structure

```
unix-team/
├── app/
│   ├── (root)/
│   │   ├── page.tsx           # Homepage
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── discord/
│   │   ├── documentation/
│   │   ├── faq/
│   │   ├── projects/
│   │   ├── server-status/
│   │   └── team/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── effects/
│   │   ├── ParticleBackground.tsx
│   │   └── ScrollReveal.tsx
│   └── sections/         # Reusable page sections
├── lib/
│   ├── content.ts        # Static content (teams, projects, FAQ)
│   ├── i18n.ts          # Internationalization setup
│   └── seo.ts           # SEO utilities
├── out/                 # Generated static files (after build)
├── next.config.mjs      # Next.js config dengan static export
├── tailwind.config.ts   # Tailwind CSS config
└── DEPLOYMENT.md        # Detailed deployment guide
```

## Troubleshooting

### Error: "pnpm: command not found"
Install pnpm:
```bash
npm install -g pnpm
pnpm --version  # Verify
```

### Build fails dengan error
```bash
# Clear cache dan rebuild
rm -rf .next out
pnpm build
```

### GitHub Pages tidak update
1. Check status di GitHub → Actions
2. Pastikan `.nojekyll` file ada di repo
3. Clear GitHub Pages cache:
   - Settings → Pages → Save (again)
   - Tunggu 2-5 menit

### Local server menunjukkan 404
```bash
# Pastikan build succeeded
pnpm build

# Test di folder yang benar
cd out
http-server -p 3000
```

## Performance

Website ini sudah dioptimasi untuk production:

- ✅ **Static pre-rendering**: All pages pre-generated
- ✅ **Zero server cost**: Pure static files
- ✅ **Fast load time**: < 1 second
- ✅ **Lighthouse score**: 90+
- ✅ **Mobile optimized**: Responsive design

## What's Next?

1. **Customize content** → Edit `lib/content.ts`
2. **Update styling** → Modify `tailwind.config.ts` atau `app/globals.css`
3. **Add pages** → Create new files di `app/(root)/your-page/`
4. **Setup analytics** → Add Google Analytics ke layout.tsx
5. **Monitor performance** → Use Vercel Analytics atau Google Analytics

## Support

Dokumentasi lengkap ada di `DEPLOYMENT.md`

Untuk masalah:
1. Check console logs: `pnpm dev` → browser DevTools
2. Read Next.js docs: https://nextjs.org/docs
3. Check GitHub Actions logs untuk deploy issues

---

**Ready to deploy?** Gunakan:
```bash
pnpm build
pnpm deploy
```

Done! 🚀
