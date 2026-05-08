# Custom Domain Setup: unixteam.my.id

## Overview

Website UNIX-TEAM sudah dikonfigurasi untuk menggunakan custom domain **unixteam.my.id**. Panduan ini menjelaskan semua langkah setup yang diperlukan.

## Pre-configured Files

File-file berikut sudah di-setup untuk custom domain:

1. **public/CNAME** - Berisi: `unixteam.my.id`
2. **app/layout.tsx** - Metadata Base URL: `https://unixteam.my.id`
3. **next.config.mjs** - Static export enabled

## Deployment Options

### Option 1: GitHub Pages (Recommended for unixteam.my.id)

#### Step 1: Setup GitHub Repository
```bash
cd /path/to/unix-team
git init
git add .
git commit -m "Initial commit: UNIX-TEAM website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/unix-team.git
git push -u origin main
```

#### Step 2: Enable GitHub Pages
1. Go to GitHub repo → Settings → Pages
2. Under "Source", select: `Deploy from a branch`
3. Select branch: `main`
4. Select folder: `/ (root)` atau `docs` (depending on your setup)
5. **Save**

#### Step 3: Add Custom Domain in GitHub
1. Go to Settings → Pages
2. Under "Custom domain", enter: `unixteam.my.id`
3. Click **Save**
4. GitHub akan create CNAME file automatically (or use existing one)

#### Step 4: Configure DNS Records at Domain Registrar

Jika domain registrar ada di:

**Namecheap / IDwebhost / Rumahweb / etc:**

1. Login ke domain control panel
2. Cari DNS settings / Advanced DNS
3. Add/Update records:

```
Type: A Record
Host: @ (atau unixteam)
Value: 185.199.108.153
TTL: 3600

Type: A Record
Host: @ (atau unixteam)
Value: 185.199.109.153
TTL: 3600

Type: A Record
Host: @ (atau unixteam)
Value: 185.199.110.153
TTL: 3600

Type: A Record
Host: @ (atau unixteam)
Value: 185.199.111.153
TTL: 3600

Type: CNAME Record
Host: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**Alternative: CNAME approach (simpler)**
```
Type: CNAME
Host: @ (or unixteam)
Value: YOUR_USERNAME.github.io
TTL: 3600
```

#### Step 5: Verify DNS Configuration
```bash
# Check if DNS is pointing correctly
dig unixteam.my.id

# Should show GitHub Pages IP addresses:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

#### Step 6: Deploy to GitHub Pages
```bash
# Build static files
pnpm build

# Deploy to GitHub Pages
pnpm deploy

# Or one command:
pnpm build-and-deploy
```

Wait 10-60 minutes untuk DNS propagation. Site akan accessible di: `https://unixteam.my.id`

**Enable HTTPS (automatic):**
1. In GitHub Pages settings, enable "Enforce HTTPS"
2. GitHub akan auto-provision Let's Encrypt certificate

---

### Option 2: Vercel (Easier if using Vercel)

#### Step 1: Connect to Vercel
```bash
pnpm i -g vercel
vercel login
vercel link
```

#### Step 2: Add Custom Domain
1. Go to Vercel dashboard
2. Select project
3. Settings → Domains
4. Add domain: `unixteam.my.id`
5. Follow Vercel's DNS instructions

#### Step 3: Update DNS at Registrar
Follow Vercel's provided DNS records (usually CNAME pointing to Vercel)

#### Step 4: Deploy
```bash
git push origin main
# Vercel auto-deploys on push
```

---

### Option 3: Netlify

#### Step 1: Connect Repository
1. Go to netlify.com
2. Click "New site from Git"
3. Connect GitHub
4. Select repository

#### Step 2: Build Settings
- Build command: `pnpm build`
- Publish directory: `out`

#### Step 3: Add Custom Domain
1. Site settings → Domain management
2. Add custom domain: `unixteam.my.id`
3. Update DNS at registrar per Netlify instructions

---

## DNS Propagation Checker

Check DNS status:
- https://www.whatsmydns.net/?q=unixteam.my.id

---

## SSL/HTTPS Certificate

### GitHub Pages
- Automatic with Let's Encrypt
- Enable in: Settings → Pages → "Enforce HTTPS"

### Vercel
- Automatic with Let's Encrypt

### Netlify
- Automatic with Let's Encrypt

---

## Testing Custom Domain

```bash
# Test if site loads
curl https://unixteam.my.id

# Check SSL certificate
openssl s_client -connect unixteam.my.id:443

# Monitor DNS propagation
dig unixteam.my.id +short
```

---

## Troubleshooting

### Domain not resolving
- Wait 24-48 hours for DNS propagation
- Check if DNS records are correct: `dig unixteam.my.id`
- Clear browser cache or use incognito mode
- Verify CNAME file exists in public folder

### HTTPS not working
- Wait for certificate provisioning (can take 24 hours)
- Check GitHub Pages: "Enforce HTTPS" checkbox
- Verify domain is properly configured in GitHub settings

### GitHub Pages 404 error
- Verify `pnpm build` creates `out/` folder
- Check `.nojekyll` file exists in `public/`
- Check CNAME file in `public/` has correct domain
- Rebuild and redeploy: `pnpm build-and-deploy`

### Slow site loading
- Check if CloudFlare/CDN is properly configured
- Consider enabling CloudFlare free tier for better performance

---

## File Checklist

Before deploying, ensure these files exist:

```
✓ public/CNAME                  (contains: unixteam.my.id)
✓ app/layout.tsx                (metadataBase: https://unixteam.my.id)
✓ next.config.mjs               (output: 'export')
✓ .nojekyll                      (in root or public)
✓ .github/workflows/deploy.yml   (auto-deploy configuration)
```

---

## Auto-Deployment Workflow

The `.github/workflows/deploy.yml` file automatically:

1. Listens for push to `main` branch
2. Installs dependencies: `pnpm install`
3. Builds static files: `pnpm build`
4. Deploys to GitHub Pages: `gh-pages -d out`

No manual deployment needed after git push!

---

## Environment Variables (if needed)

If you add environment variables in future:

```bash
# Create .env.local for development
NEXT_PUBLIC_API_URL=https://api.unixteam.my.id

# These will be baked into static exports
pnpm build
```

---

## Rollback Guide

If something breaks:

```bash
# View deployment history
git log --oneline

# Revert to previous commit
git revert <commit_hash>
git push origin main

# GitHub Pages will auto-redeploy
```

---

## Performance Optimization

### Enable CloudFlare Free Tier

1. Go to cloudflare.com
2. Add site: `unixteam.my.id`
3. Update nameservers at domain registrar
4. Wait for DNS propagation
5. Enable:
   - Page Rules for caching
   - Always use HTTPS
   - Automatic minification

### CDN Benefits
- Faster global delivery
- DDoS protection
- SSL/TLS encryption
- Caching optimization

---

## Monitoring & Analytics

### Google Analytics
1. Add Google Analytics ID to app
2. Setup Search Console for SEO
3. Monitor performance: https://unixteam.my.id/

### Vercel Analytics (if using Vercel)
- Automatic performance monitoring
- Real User Monitoring (RUM)

---

## Next Steps

1. ✅ Website is configured for unixteam.my.id
2. ✅ CNAME file created
3. ✅ Metadata updated
4. ✅ Static export ready
5. 📋 Next: Setup GitHub repository
6. 📋 Next: Configure DNS at domain registrar
7. 📋 Next: Deploy using `pnpm build-and-deploy`
8. 📋 Next: Enable HTTPS in GitHub Pages
9. 📋 Next: Monitor DNS propagation
10. 📋 Next: Test at unixteam.my.id

---

## Support & Resources

- GitHub Pages Docs: https://docs.github.com/en/pages
- Custom Domain Help: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- DNS Records Info: https://mxtoolbox.com
- SSL Certificate: https://www.ssllabs.com/ssltest/

---

**Setup Time: ~15 minutes (excluding DNS propagation)**

Good luck with unixteam.my.id! 🚀
